import { useMutation } from '@apollo/client'
import { DiscussionEmbed } from 'disqus-react'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark as mdCodeTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rehypeRaw from 'rehype-raw'
import gfm from 'remark-gfm'
import MetaHead from 'src/components/Head/Head'
import PostMeta from '../components/PostMeta/PostMeta'
import PrevAndNext from '../components/PrevAndNext/PrevAndNext'
import SharePanel from '../components/SharePanel/SharePanel'
import { UPDATE_PV } from '../typeDefs'
import { IPostItem } from '../types'
import {
  Content,
  ImageAlt,
  ImageGroup,
  PostDetailWrapper,
  Poster,
  Summary,
  TableWrapper,
  Title
} from './styled'
import { combineStr, generatePostUrl, removeEmbededTag } from './utils'

export interface Props {
  post: IPostItem
}

const PostDetail: FC<Props> = ({ post }) => {
  const router = useRouter()

  const {
    query: { id }
  } = router

  const [currLike, setCurrLike] = useState(post.like)

  const markdownWrapperEl = useRef<HTMLDivElement>(null)

  const [updatePV] = useMutation(UPDATE_PV, {
    variables: { id },
    onError() {}
  })

  const handleLikeChange = (newLike: number) => {
    setCurrLike(newLike)
  }

  const customMarkdownComponents = {
    // @ts-expect-error TODO:
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return match ? (
        <SyntaxHighlighter
          style={mdCodeTheme}
          language={match[1]}
          PreTag="div"
          customStyle={{ borderRadius: 0, margin: 0 }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          `{children}`
        </code>
      )
    },
    // @ts-expect-error TODO:
    table({ children, ...props }) {
      return (
        <TableWrapper>
          <table {...props}>{children}</table>
        </TableWrapper>
      )
    },
    img({ ...props }) {
      const { src, alt } = props
      return (
        <Zoom>
          <ImageGroup {...props}>
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt} />
            }
            <ImageAlt>{alt}</ImageAlt>
          </ImageGroup>
        </Zoom>
      )
    },
    // @ts-expect-error TODO:
    h2({ children, ...props }) {
      return (
        <h2 {...props} id={children ? combineStr(children[0]) : ''}>
          {children}
        </h2>
      )
    },
    // @ts-expect-error TODO:
    h3({ children, ...props }) {
      return (
        <h3 {...props} id={children ? combineStr(children[0]) : ''}>
          {children}
        </h3>
      )
    },
    // @ts-expect-error TODO:
    h4({ children, ...props }) {
      return (
        <h3 {...props} id={children ? combineStr(children[0]) : ''}>
          {children}
        </h3>
      )
    },
    // @ts-expect-error TODO:
    blockquote({ children, ...props }) {
      return <Summary {...props}>{children}</Summary>
    }
  }

  useEffect(() => {
    updatePV()
  }, [updatePV])

  const {
    title,
    posterUrl,
    summary,
    tags,
    content,
    createdAt,
    lastModifiedDate,
    pv,
    prev,
    next
  } = post

  return (
    <PostDetailWrapper>
      <MetaHead
        title={`${title} | Yancey Inc.`}
        useTwitterCard
        postTitle={title}
        postSummary={summary}
        postPosterUrl={posterUrl}
        postUrl={generatePostUrl(id as string)}
      />

      <SharePanel
        id={id as string}
        title={title}
        like={currLike}
        handleLikeChange={(newLike: number) => handleLikeChange(newLike)}
        postUrl={generatePostUrl(id as string)}
      />

      <Content>
        <Poster src={posterUrl} alt={title} />
        <Title>{title}</Title>
        <PostMeta
          tags={tags}
          createdAt={createdAt}
          lastModifiedDate={lastModifiedDate}
          pv={pv}
          like={currLike}
        />
        <div ref={markdownWrapperEl}>
          <Summary>{summary}</Summary>

          <ReactMarkdown
            remarkPlugins={[gfm]}
            rehypePlugins={[rehypeRaw]}
            // @ts-expect-error TODO:
            components={customMarkdownComponents}
            className="postDetailContent"
          >
            {removeEmbededTag(content)}
          </ReactMarkdown>
        </div>

        <PrevAndNext prev={prev} next={next} />

        <DiscussionEmbed
          shortname={process.env.NEXT_PUBLIC_DISCUSSION_KEY}
          config={{
            url: generatePostUrl(id as string),
            identifier: id as string,
            title
          }}
        />
      </Content>
    </PostDetailWrapper>
  )
}

export default PostDetail

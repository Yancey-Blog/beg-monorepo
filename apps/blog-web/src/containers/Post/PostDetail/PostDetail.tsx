import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { DiscussionEmbed } from 'disqus-react'
import MetaHead from 'src/components/Head/Head'
import PostMeta from '../components/PostMeta/PostMeta'
import SharePanel from '../components/SharePanel/SharePanel'
import PrevAndNext from '../components/PrevAndNext/PrevAndNext'
import { UPDATE_PV } from '../typeDefs'
import { IPostItem } from '../types'
import { removeEmbededTag, setupTocbot, generatePostUrl } from './utils'
import {
  PostDetailWrapper,
  Poster,
  ImageGroup,
  ImageAlt,
  Title,
  Summary,
  Content,
  Menu,
  TableWrapper
} from './styled'

export interface Props {
  post: IPostItem
}

const PostDetail: FC<Props> = ({ post }) => {
  const {
    query: { id }
  } = useRouter()

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
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomOneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {children.toString().replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children.toString()}
        </code>
      )
    },
    table({ node, inline, className, children, ...props }: any) {
      return (
        <TableWrapper>
          <table {...props}>{children}</table>
        </TableWrapper>
      )
    },
    img({ node, inline, className, children, ...props }: any) {
      const { src, alt } = props
      return (
        <ImageGroup {...props}>
          <img src={src} alt={alt} />
          <ImageAlt>{alt}</ImageAlt>
        </ImageGroup>
      )
    },
    h2({ node, inline, className, children, ...props }: any) {
      return (
        <h2 {...props} id={children ? children[0] : ''}>
          {children}
        </h2>
      )
    },
    h3({ node, inline, className, children, ...props }: any) {
      return (
        <h3 {...props} id={children ? children[0] : ''}>
          {children}
        </h3>
      )
    }
  }

  useEffect(() => {
    setupTocbot()
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
    like,
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
      <Menu className="postMenu" />

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

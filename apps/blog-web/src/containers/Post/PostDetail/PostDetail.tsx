import { FC, useEffect, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useMutation } from '@apollo/client'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { DiscussionEmbed } from 'disqus-react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import MetaHead from 'src/components/Head/Head'
import PostMeta from '../components/PostMeta/PostMeta'
import SharePanel from '../components/SharePanel/SharePanel'
import PrevAndNext from '../components/PrevAndNext/PrevAndNext'
import { UPDATE_PV } from '../typeDefs'
import { IPostItem } from '../types'
import { removeEmbededTag, combineStr, generatePostUrl } from './utils'
import {
  PostDetailWrapper,
  Poster,
  ImageGroup,
  ImageAlt,
  Title,
  Summary,
  Content,
  TableWrapper
} from './styled'

export interface Props {
  post: IPostItem
}

const TocComponent = dynamic(() => import('../components/Toc/Toc'), {
  ssr: false
})

const PostDetail: FC<Props> = ({ post }) => {
  const router = useRouter()
  const theme = useTheme()

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
        <Zoom
          openText={`Zoom Image for ${alt}`}
          closeText={`Unzoom Image for ${alt}`}
          overlayBgColorStart={theme.background.primary}
          overlayBgColorEnd={theme.background.mask}
        >
          <ImageGroup {...props}>
            <img src={src} alt={alt} />
            <ImageAlt>{alt}</ImageAlt>
          </ImageGroup>
        </Zoom>
      )
    },
    h2({ node, inline, className, children, ...props }: any) {
      return (
        <h2 {...props} id={children ? combineStr(children[0]) : ''}>
          {children}
        </h2>
      )
    },
    h3({ node, inline, className, children, ...props }: any) {
      return (
        <h3 {...props} id={children ? combineStr(children[0]) : ''}>
          {children}
        </h3>
      )
    },
    h4({ node, inline, className, children, ...props }: any) {
      return (
        <h3 {...props} id={children ? combineStr(children[0]) : ''}>
          {children}
        </h3>
      )
    },
    blockquote({ node, inline, className, children, ...props }: any) {
      return <Summary {...props}>{children}</Summary>
    }
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', () => updatePV())
  }, [router.events])

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

      <TocComponent />

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

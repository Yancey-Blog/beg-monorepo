import Link from 'next/link'
import { ComponentType } from 'react'
import { Hit } from 'react-instantsearch-core'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { HitContent, HitDescription, HitName, HitTag } from './styled'

interface HitParams {
  content: string
  description: string
  imageUrl: string
  name: string
  objectID: string
  labels: string[]
}

interface Props {
  hit: Hit<HitParams>
}

const HitComponent: ComponentType<Props> = ({ hit }) => {
  return (
    <Link href={`/post/${hit.objectID}`}>
      <HitName>
        <Highlight attribute="name" hit={hit} />
        {hit.labels.map((val: string) => (
          <HitTag key={val}>{val}</HitTag>
        ))}
      </HitName>
      <br />
      <HitDescription>
        <Snippet attribute="description" hit={hit} />
      </HitDescription>
      <br />
      <HitContent>
        <Snippet hit={hit} attribute="content" />
      </HitContent>
    </Link>
  )
}

export default HitComponent

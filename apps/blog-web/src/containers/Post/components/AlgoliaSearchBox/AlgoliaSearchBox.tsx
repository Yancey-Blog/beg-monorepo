import {
  FC,
  useState,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef
} from 'react'
import { useRouter } from 'next/router'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Configure,
  PoweredBy,
  connectStateResults
} from 'react-instantsearch-dom'
import SkeletonIterator from 'src/components/SkeletonIterator/SkeletonIterator'
import AlgoliaSarchBoxSkeleton from '../AlgoliaSarchBoxSkeleton/AlgoliaSarchBoxSkeleton'
import Hit from './Hit'
import { Result, SearchBoxWrapper } from './styled'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  {}
)

const AlgoliaSearchBox: FC = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [showDrawer, setShowDrawer] = useState(false)

  const closeKeyboard = () => {
    // @ts-ignore
    document.activeElement?.blur()
  }

  const handleInputChange = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    const val = e.currentTarget.value.trim()

    if (showDrawer && val !== '') {
      return
    }

    setShowDrawer(val !== '')
  }

  const handleClose = useCallback(() => {
    console.log('fuck me')
    setShowDrawer(false)
    closeKeyboard()

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [])

  const LoadingIndicator = connectStateResults(({ isSearchStalled }) =>
    isSearchStalled ? (
      <SkeletonIterator
        count={5}
        skeletonComponent={<AlgoliaSarchBoxSkeleton />}
      />
    ) : null
  )

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      if (showDrawer) {
        handleClose()
      }
    })
  }, [handleClose, router.events, showDrawer])

  return (
    <InstantSearch
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX_NAME}
      searchClient={searchClient}
    >
      <Configure
        attributesToSnippet={['content:120', 'description:50']}
        snippetEllipsisText="..."
      />
      <SearchBoxWrapper>
        <SearchBox
          inputRef={inputRef}
          onChange={(e) => handleInputChange(e)}
          onReset={handleClose}
        />
      </SearchBoxWrapper>

      <Result className={showDrawer ? 'showDrawer' : ''}>
        <LoadingIndicator />
        <Hits
          // @ts-ignore
          hitComponent={Hit}
        />
        <PoweredBy />
      </Result>
    </InstantSearch>
  )
}

export default AlgoliaSearchBox

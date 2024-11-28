import { algoliasearch } from 'algoliasearch'

const {
  VITE_ALGOLIA_APPLICATION_ID,
  VITE_ALGOLIA_ADMIN_API_KEY,
  VITE_ALGOLIA_SEARCH_INDEX
} = import.meta.env

const client = algoliasearch(
  VITE_ALGOLIA_APPLICATION_ID,
  VITE_ALGOLIA_ADMIN_API_KEY
)

export const sendPostToAlgolia = async (
  objectID: string,
  name: string,
  description: string,
  content: string,
  imageUrl: string,
  labels: string[]
) => {
  await client.saveObject({
    indexName: VITE_ALGOLIA_SEARCH_INDEX,
    body: {
      objectID,
      name,
      description,
      content,
      imageUrl,
      labels,
      autoGenerateObjectIDIfNotExist: true
    }
  })
}

export const deletePostOnAlgolia = async (objectID: string) => {
  await client.deleteObject({ indexName: VITE_ALGOLIA_SEARCH_INDEX, objectID })
}

export const deletePostsOnAlgolia = async (objectIDs: string[]) => {
  await client.deleteObjects({
    indexName: VITE_ALGOLIA_SEARCH_INDEX,
    objectIDs
  })
}

import algoliasearch from 'algoliasearch'

const {
  REACT_APP_ALGOLIA_APPLICATION_ID,
  REACT_APP_ALGOLIA_ADMIN_API_KEY,
  REACT_APP_ALGOLIA_SEARCH_INDEX
} = process.env

const client = algoliasearch(
  REACT_APP_ALGOLIA_APPLICATION_ID,
  REACT_APP_ALGOLIA_ADMIN_API_KEY
)
const index = client.initIndex(REACT_APP_ALGOLIA_SEARCH_INDEX)

export const sendPostToAlgolia = async (
  objectID: string,
  name: string,
  description: string,
  content: string,
  imageUrl: string,
  labels: string[]
) => {
  await index.saveObject(
    {
      objectID,
      name,
      description,
      content,
      imageUrl,
      labels
    },
    { autoGenerateObjectIDIfNotExist: true }
  )
}

export const deletePostOnAlgolia = async (objectID: string) => {
  await index.deleteObject(objectID)
}

export const deletePostsOnAlgolia = async (objectIDs: string[]) => {
  await index.deleteObjects(objectIDs)
}

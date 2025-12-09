import axios from 'axios'
import { useSnackbar } from 'notistack'

export const useUpload = () => {
  const { enqueueSnackbar } = useSnackbar()

  const uploadRequest = async (file: File) => {
    const token = localStorage.getItem('token')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await axios<{
        name: string
        url: string
      }>({
        method: 'post',
        url: `${import.meta.env.VITE_UPLOADER_SERVICE_DOMAIN}/uploadSingleFile`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })

      enqueueSnackbar(`${res.data.name} has been uploaded successfully.`, {
        variant: 'success'
      })

      return res.data.url
    } catch {
      enqueueSnackbar('Upload failed', { variant: 'error' })
      return ''
    }
  }

  return uploadRequest
}

export default useUpload

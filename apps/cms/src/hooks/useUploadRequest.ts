import { useState } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { UploaderResponse } from 'src/components/Uploader/types'

const useUploadRequest = (
  onChange: (file: UploaderResponse) => void,
  setCurrFile?: (file: UploaderResponse) => void
) => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const uploadRequest = async (file: File) => {
    const token = localStorage.getItem('token')

    const formData = new FormData()
    formData.append('file', file)
    setLoading(true)

    try {
      const res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_UPLOADER_SERVICE_DOMAIN}/uploadSingleFile`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })

      if (typeof setCurrFile === 'function') {
        setCurrFile(res.data)
      }

      onChange(res.data)

      enqueueSnackbar(`${res.data.name} has been uploaded successfully.`, {
        variant: 'success'
      })
    } catch (err) {
      enqueueSnackbar('Upload failed', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return { uploadRequest, loading }
}

export default useUploadRequest

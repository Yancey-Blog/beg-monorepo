import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Editor } from '@toast-ui/react-editor'
import { FC, RefObject, useState } from 'react'
import { flushSync } from 'react-dom'
import Uploader from 'src/components/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import { insertImage } from '../editors/enhanceEditor'

interface Props {
  open: boolean
  editorRef: RefObject<Editor>
  onClose: () => void
}

const useStyles = makeStyles({
  uploaderModalContent: {
    margin: '24px auto'
  }
})

const UploaderModal: FC<Props> = ({ open, onClose, editorRef }) => {
  const classes = useStyles()
  const [images, setImages] = useState<UploaderResponse[]>([])

  const handleChange = (file: UploaderResponse) => {
    flushSync(() => {
      setImages((oldImages) => [...oldImages, file])
    })
  }

  const handleClose = () => {
    setImages([])
    onClose()
  }

  const handleOk = () => {
    console.log(images)
    insertImage(editorRef, images)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Insert image to markdown editor.</DialogTitle>
      <DialogContent className={classes.uploaderModalContent}>
        <Uploader onChange={handleChange} needMarginLeft={false} multiple />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleOk}>
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploaderModal

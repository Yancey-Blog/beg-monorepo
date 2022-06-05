import { RefObject } from 'react'
import { Editor } from '@toast-ui/react-editor'
import { UploaderResponse } from 'src/components/Uploader/types'

export const createButton = () => {
  const button = document.createElement('button')
  button.style.margin = '0'
  button.style.backgroundColor = 'transparent'

  return button
}

export const insertImage = (
  editorRef: RefObject<Editor>,
  image: UploaderResponse
) => {
  if (editorRef.current) {
    const instance = editorRef.current.getInstance()
    instance.insertText(`\n\n![${image.name}](${image.url})\n\n`)
  }
}

export const insertImageButton = (setOpen: (open: boolean) => void) => {
  const button = createButton()
  button.innerHTML = 'IMG'
  button.addEventListener('click', () => {
    setOpen(true)
  })

  return button
}

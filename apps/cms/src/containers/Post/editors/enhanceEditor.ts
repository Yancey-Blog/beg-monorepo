import { Editor } from '@toast-ui/react-editor'
import { RefObject } from 'react'
import { UploaderResponse } from 'src/components/Uploader/types'

export const createButton = () => {
  const button = document.createElement('button')
  button.style.margin = '0'
  button.style.backgroundColor = 'transparent'

  return button
}

export const insertImage = (
  editorRef: RefObject<Editor>,
  images: UploaderResponse[]
) => {
  if (editorRef.current) {
    let imageText = ''
    const instance = editorRef.current.getInstance()

    images.forEach((image) => {
      imageText += `\n\n![${image.name}](${image.url})\n\n`
    })

    instance.insertText(imageText)
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

import { RefObject } from 'react'
import { Editor } from '@toast-ui/react-editor'
import { UploaderResponse } from 'src/components/Uploader/types'
import toast from 'src/components/Toast/Toast'

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

export const enhanceUpload = (
  editorRef: RefObject<Editor>,
  setOpen: (open: boolean) => void
) => {
  if (editorRef.current) {
    const instance = editorRef.current.getInstance()

    instance.insertToolbarItem(
      { groupIndex: 0, itemIndex: 0 },
      {
        name: 'IMG',
        tooltip: 'Insert image',
        el: insertImageButton(setOpen)
      }
    )
  }
}

export const enhancePasteUpload = (editorRef: RefObject<Editor>) => {
  // TODO:
  toast.error('暂不支持复制上传图片')
}

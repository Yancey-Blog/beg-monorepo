'use client'

import type { Editor } from '@tiptap/react'
import { useCurrentEditor } from '@tiptap/react'
import * as React from 'react'

export function useTiptapEditor(providedEditor?: Editor | null): Editor | null {
  const { editor: coreEditor } = useCurrentEditor()
  return React.useMemo(
    () => providedEditor || coreEditor,
    [providedEditor, coreEditor]
  )
}

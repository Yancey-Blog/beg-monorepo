import { Editor, EditorContent, EditorContext, useEditor } from '@tiptap/react'

// --- Tiptap Core Extensions ---
import CodeBlock from '@tiptap/extension-code-block'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji'
import { Highlight } from '@tiptap/extension-highlight'
import { Image } from '@tiptap/extension-image'
import { ListKit } from '@tiptap/extension-list'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TableKit } from '@tiptap/extension-table'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { TextAlign } from '@tiptap/extension-text-align'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'
import { all, createLowlight } from 'lowlight'
import { Markdown } from 'tiptap-markdown'

// --- Custom Extensions ---
import { Link } from '../../tiptap-extension/link-extension.ts'
import { Selection } from '../../tiptap-extension/selection-extension'
import { TrailingNode } from '../../tiptap-extension/trailing-node-extension'

// --- UI Primitives ---
import { Button } from '../../tiptap-ui-primitive/button'
import { Spacer } from '../../tiptap-ui-primitive/spacer'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator
} from '../../tiptap-ui-primitive/toolbar'

// --- Tiptap Node ---
import '../../tiptap-node/code-block-node/code-block-node.scss'
import '../../tiptap-node/image-node/image-node.scss'
import { ImageUploadNode } from '../../tiptap-node/image-upload-node/image-upload-node-extension'
import '../../tiptap-node/list-node/list-node.scss'
import '../../tiptap-node/paragraph-node/paragraph-node.scss'

// --- Tiptap UI ---
import { BlockquoteButton } from '../../tiptap-ui/blockquote-button'
import { CodeBlockButton } from '../../tiptap-ui/code-block-button'
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent
} from '../../tiptap-ui/color-highlight-popover'
import { HeadingDropdownMenu } from '../../tiptap-ui/heading-dropdown-menu'
import { ImageUploadButton } from '../../tiptap-ui/image-upload-button'
import {
  LinkButton,
  LinkContent,
  LinkPopover
} from '../../tiptap-ui/link-popover'
import { ListDropdownMenu } from '../../tiptap-ui/list-dropdown-menu'
import { MarkButton } from '../../tiptap-ui/mark-button'
import { TextAlignButton } from '../../tiptap-ui/text-align-button'
import { UndoRedoButton } from '../../tiptap-ui/undo-redo-button'

// --- Icons ---
import { ArrowLeftIcon } from '../../tiptap-icons/arrow-left-icon'
import { HighlighterIcon } from '../../tiptap-icons/highlighter-icon'
import { LinkIcon } from '../../tiptap-icons/link-icon'

// --- Hooks ---
import { useCursorVisibility } from '../../../hooks/use-cursor-visibility'
import { useMobile } from '../../../hooks/use-mobile'
import { useWindowSize } from '../../../hooks/use-window-size'

// --- Lib ---
import { MAX_FILE_SIZE } from '../../../lib/tiptap-utils'

// --- Styles ---
import '../../tiptap-templates/simple/simple-editor.scss'

import { MutableRefObject, useEffect, useRef, useState } from 'react'
import useUpload from 'src/hooks/useUpload.ts'

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />
    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack
}: {
  type: 'highlighter' | 'link'
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)

export function SimpleEditor({
  editorRef
}: {
  editorRef: MutableRefObject<Editor | null>
}) {
  const isMobile = useMobile()
  const uploadRequest = useUpload()
  const windowSize = useWindowSize()
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>(
    'main'
  )
  const toolbarRef = useRef<HTMLDivElement>(null)
  editorRef.current = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.'
      }
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      CodeBlockLowlight.configure({
        lowlight: createLowlight(all)
      }),
      Emoji.configure({
        emojis: gitHubEmojis,
        enableEmoticons: true
      }),
      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: uploadRequest,
        onError: (error) => console.error('Upload failed:', error)
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
      Markdown,
      CodeBlock,
      ListKit,
      TableKit.configure({
        table: { resizable: true }
      })
    ]
  })

  const bodyRect = useCursorVisibility({
    editor: editorRef.current,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0
  })

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main')
    }
  }, [isMobile, mobileView])

  return (
    <EditorContext.Provider value={{ editor: editorRef.current }}>
      <Toolbar
        ref={toolbarRef}
        style={
          isMobile
            ? {
                bottom: `calc(100% - ${windowSize.height - bodyRect.y}px)`
              }
            : {}
        }
      >
        {mobileView === 'main' ? (
          <MainToolbarContent
            onHighlighterClick={() => setMobileView('highlighter')}
            onLinkClick={() => setMobileView('link')}
            isMobile={isMobile}
          />
        ) : (
          <MobileToolbarContent
            type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
            onBack={() => setMobileView('main')}
          />
        )}
      </Toolbar>

      <div className="content-wrapper">
        <EditorContent
          editor={editorRef.current}
          role="presentation"
          className="simple-editor-content"
        />
      </div>
    </EditorContext.Provider>
  )
}

import { useLazyQuery, useMutation } from '@apollo/client'
import { PhotoCamera } from '@mui/icons-material'
import { Button, IconButton, Popover, TextField } from '@mui/material'
import chartPlugin from '@toast-ui/editor-plugin-chart'
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import tableMergedCellPlugin from '@toast-ui/editor-plugin-table-merged-cell'
import umlPlugin from '@toast-ui/editor-plugin-uml'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { useFormik } from 'formik'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { useSnackbar } from 'notistack'
import Prism from 'prismjs'
import 'prismjs/themes/prism-dark.css'
import { FC, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ChipInput from 'src/components/ChipInput/ChipInput'
import Loading from 'src/components/Loading/Loading'
import { UploaderResponse } from 'src/components/Uploader/types'
import Uploader from 'src/components/Uploader/Uploader'
import useUploadRequest from 'src/hooks/useUploadRequest'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN
} from 'src/shared/constants'
import { goBack, parseSearch } from 'src/shared/utils'
import 'tui-color-picker/dist/tui-color-picker.css'
import * as Yup from 'yup'
import { sendPostToAlgolia } from './algolia/algoliaSearch'
import UploaderModal from './components/UploaderModal'
import { getHTML, getMarkdown, setMarkdown } from './editors/editorIO'
import { insertImage, insertImageButton } from './editors/enhanceEditor'
import useStyles from './styles'
import {
  CREATE_ONE_POST,
  CREATE_POST_STATISTICS,
  GET_POST_BY_ID,
  UPDATE_ONE_POST
} from './typeDefs'
import {
  CreatePostMutation,
  CreatePostStatisticsMutation,
  CreatePostVars,
  GetPostByIdQuery,
  PostStatisticsVars,
  SaveType,
  UpdatePostByIdMutation,
  UpdatePostVars
} from './types'

const PostEditor: FC = () => {
  /* query */
  const { search } = useLocation()
  const { id } = parseSearch(search)

  /* message bar */
  const { enqueueSnackbar } = useSnackbar()

  const onCopyImageChange = (file: UploaderResponse) => {
    insertImage(editorRef, [file])
  }
  const { loading, uploadRequest } = useUploadRequest(onCopyImageChange)

  /* graphql */
  const [createPostStatistics] = useMutation<
    CreatePostStatisticsMutation,
    PostStatisticsVars
  >(CREATE_POST_STATISTICS)

  const [fetchPostById] = useLazyQuery<GetPostByIdQuery>(GET_POST_BY_ID, {
    variables: {
      id
    },
    onCompleted(data) {
      const { title, content, summary, tags, posterUrl } =
        data.getPostByIdForCMS

      setValues({
        title,
        summary,
        tags,
        posterUrl
      })

      setMarkdown(editorRef, content)
    },
    notifyOnNetworkStatusChange: true
  })

  const [createPost, { loading: isCreatingPost }] = useMutation<
    CreatePostMutation,
    CreatePostVars
  >(CREATE_ONE_POST, {
    onCompleted(data) {
      const { _id, title, isPublic, summary, posterUrl, tags } = data.createPost
      enqueueSnackbar('Create success!', { variant: 'success' })

      createPostStatistics({
        variables: {
          input: {
            postId: _id,
            postName: title,
            scenes: `created and ${isPublic ? 'public' : 'hide'}`
          }
        }
      })

      if (isPublic) {
        sendPostToAlgolia(
          _id,
          title,
          summary,
          getHTML(editorRef),
          posterUrl,
          tags
        )
      }
    },
    onError() {}
  })

  const [updatePostById, { loading: isUpdatingPost }] = useMutation<
    UpdatePostByIdMutation,
    UpdatePostVars
  >(UPDATE_ONE_POST, {
    onCompleted(data) {
      const { _id, title, summary, isPublic, posterUrl, tags } =
        data.updatePostById
      enqueueSnackbar('Update success!', { variant: 'success' })

      createPostStatistics({
        variables: {
          input: {
            postId: _id,
            postName: title,
            scenes: `updated and ${isPublic ? 'public' : 'hide'}`
          }
        }
      })

      if (isPublic) {
        sendPostToAlgolia(
          _id,
          title,
          summary,
          getHTML(editorRef),
          posterUrl,
          tags
        )
      }
    },
    onError() {}
  })

  /* css styles */
  const classes = useStyles()

  /* editor */
  const editorRef = useRef<Editor>(null)
  const [open, setOpen] = useState(false)

  /* posterUrl */
  const handlePosterImageChange = (data: UploaderResponse) => {
    setFieldValue('posterUrl', data.url)
  }

  /* tags */
  const handleTagChange = (chips: string[]) => {
    setFieldValue('tags', chips)
  }

  /* formik */
  const initialValues = {
    posterUrl: '',
    title: '',
    summary: '',
    tags: [] as string[]
  }

  const validationSchema = Yup.object().shape({
    posterUrl: Yup.string().url().required('PostUrl is required.'),
    title: Yup.string().required('Title is required.'),
    summary: Yup.string().required('Summary is required.'),
    tags: Yup.array().required('Tags is required.')
  })

  const { setFieldValue, getFieldProps, setValues, resetForm, values, errors } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit() {}
    })

  const onSubmit = async (type: SaveType) => {
    const content = getMarkdown(editorRef)

    if (!values.posterUrl) {
      enqueueSnackbar('Please upload a poster.', { variant: 'warning' })
      return
    }

    if (values.tags.length === 0) {
      enqueueSnackbar('Please specify at least one tag for the post.', {
        variant: 'warning'
      })
      return
    }

    if (!content) {
      enqueueSnackbar('Write something...', { variant: 'warning' })
      return
    }

    const lastModifiedDate = new Date().toISOString()

    const params = { ...values, content, lastModifiedDate }
    const _params =
      type === SaveType.DRAFT
        ? { ...params, isPublic: false }
        : { ...params, isPublic: true }

    if (id) {
      await updatePostById({
        variables: { input: { ..._params, id } } as UpdatePostVars
      })
    } else {
      await createPost({
        variables: {
          input: _params
        }
      })
    }
    window.localStorage.removeItem('post_content')
    goBack()
    resetForm()
  }

  useEffect(() => {
    if (id) {
      fetchPostById()
    } else {
      const content = window.localStorage.getItem('post_content')
      if (content) {
        setMarkdown(editorRef, content)
      }
    }

    return () => {
      resetForm()
    }
  }, [id, fetchPostById, resetForm])

  useEffect(() => {
    const timer = setInterval(() => {
      window.localStorage.setItem('post_content', getMarkdown(editorRef))
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    document.querySelector('.toastui-editor-pseudo-clipboard')?.remove()

    if (editorRef.current) {
      editorRef.current
        .getInstance()
        .getEditorElements()
        .mdEditor.addEventListener('paste', (e: ClipboardEvent) => {
          const items = e.clipboardData && e.clipboardData.items

          if (!items) {
            return
          }

          let file = null
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              file = items[i].getAsFile()
              break
            }
          }

          if (file) {
            uploadRequest(file)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className={classes.editorWrapper}>
      <form>
        <div className={classes.header}>
          <TextField
            variant="standard"
            error={!!errors.title}
            helperText={errors.title}
            required
            fullWidth
            label="Title"
            {...getFieldProps('title')}
          />

          <div className={classes.publishTools}>
            <TextField
              variant="standard"
              error={!!errors.posterUrl}
              helperText={errors.posterUrl}
              style={{ display: 'none' }}
              required
              label="PosterUrl"
              disabled={true}
              {...getFieldProps('posterUrl')}
            />
            <PopupState variant="popover" popupId="lrcPoperOver">
              {(popupState) => (
                <div>
                  <IconButton
                    className={classes.uploadImageIcon}
                    aria-label="upload-image"
                    {...bindTrigger(popupState)}
                  >
                    <PhotoCamera />
                  </IconButton>

                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={POPOVER_ANCHOR_ORIGIN}
                    transformOrigin={POPOVER_TRANSFORM_ORIGIN}
                    disableRestoreFocus
                  >
                    <Uploader
                      needMarginLeft={false}
                      onChange={handlePosterImageChange}
                      defaultFile={getFieldProps('posterUrl').value}
                    />
                  </Popover>
                </div>
              )}
            </PopupState>

            <Button
              className={classes.btn}
              color="primary"
              disabled={isCreatingPost || isUpdatingPost}
              onClick={() => onSubmit(SaveType.FINALIZE)}
            >
              Publish
            </Button>

            <Button
              className={classes.btn}
              color="secondary"
              disabled={isCreatingPost || isUpdatingPost}
              onClick={() => onSubmit(SaveType.DRAFT)}
            >
              Save as Draft
            </Button>

            <Button color="warning" className={classes.btn} onClick={goBack}>
              Back
            </Button>
          </div>
        </div>

        <div className={classes.summary}>
          <TextField
            variant="standard"
            className={classes.summaryTxtFiled}
            error={!!errors.summary}
            helperText={errors.summary}
            required
            label="Summary"
            fullWidth
            multiline
            rows="5"
            {...getFieldProps('summary')}
          />

          <div className={classes.chipInput}>
            <ChipInput
              required
              defaultValue={values.tags}
              error={!!errors.tags}
              helperText={errors.tags}
              label="Tags"
              fullWidth
              onChange={handleTagChange}
            />
          </div>
        </div>
      </form>

      <Editor
        useCommandShortcut={true}
        usageStatistics={false}
        initialValue=""
        previewStyle="vertical"
        height="1000px"
        initialEditType="markdown"
        plugins={[
          chartPlugin,
          umlPlugin,
          colorSyntaxPlugin,
          tableMergedCellPlugin,
          [codeSyntaxHighlightPlugin, { highlighter: Prism }]
        ]}
        ref={editorRef}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          [
            'code',
            'codeblock',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            {
              el: insertImageButton(setOpen),
              tooltip: 'ImageX'
            }
          ],
          ['scrollSync']
        ]}
      />

      <UploaderModal
        open={open}
        editorRef={editorRef}
        onClose={() => setOpen(false)}
      />

      {loading && <Loading />}
    </section>
  )
}

export default PostEditor

import { useLazyQuery, useMutation } from '@apollo/client'
import { Button, Paper, TextField } from '@mui/material'
import { Editor } from '@tiptap/react'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import 'prismjs/themes/prism-dark.css'
import { FC, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ChipInput from 'src/components/ChipInput'
import { SimpleEditor } from 'src/components/RichTextEditor/components/tiptap-templates/simple/simple-editor'
import Uploader from 'src/components/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import { goBack, parseSearch } from 'src/shared/utils'
import 'tui-color-picker/dist/tui-color-picker.css'
import * as Yup from 'yup'
import { sendPostToAlgolia } from './algolia/algoliaSearch'
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

  /* css styles */
  const classes = useStyles()

  /* editor */
  const editorRef = useRef<Editor | null>(null)

  /* posterUrl */
  const handlePosterImageChange = (data: UploaderResponse) => {
    setFieldValue('posterUrl', data.url)
  }

  /* tags */
  const handleTagChange = (chips: string[]) => {
    setFieldValue('tags', chips)
  }

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
      editorRef.current?.commands.setContent(content)
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
          // @ts-expect-error markdown is a third-part plugin
          editorRef.current?.storage?.markdown?.getMarkdown(),
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
          // @ts-expect-error markdown is a third-part plugin
          editorRef.current?.storage?.markdown?.getMarkdown(),
          posterUrl,
          tags
        )
      }
    },
    onError() {}
  })

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
    // @ts-expect-error markdown is a third-part plugin
    const content = editorRef.current?.storage?.markdown?.getMarkdown()

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
        editorRef.current?.commands.setContent(content)
      }
    }

    return () => {
      resetForm()
    }
  }, [id, fetchPostById, resetForm])

  useEffect(() => {
    const timer = setInterval(() => {
      window.localStorage.setItem('post_content', '')
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <section className={classes.postDetailWrapper}>
      <form className={classes.form}>
        <div className={classes.formItem}>
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

          <TextField
            variant="standard"
            error={!!errors.title}
            helperText={errors.title}
            required
            fullWidth
            label="Title"
            {...getFieldProps('title')}
          />

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

          <ChipInput
            required
            defaultValue={values.tags}
            error={!!errors.tags}
            helperText={errors.tags}
            label="Tags"
            fullWidth
            onChange={handleTagChange}
          />

          <Uploader
            needMarginLeft={false}
            onChange={handlePosterImageChange}
            defaultFile={getFieldProps('posterUrl').value}
          />
        </div>
        <div className={classes.action}>
          <Button
            color="primary"
            disabled={isCreatingPost || isUpdatingPost}
            onClick={() => onSubmit(SaveType.FINALIZE)}
          >
            Publish
          </Button>

          <Button
            color="secondary"
            disabled={isCreatingPost || isUpdatingPost}
            onClick={() => onSubmit(SaveType.DRAFT)}
          >
            Save as Draft
          </Button>

          <Button color="warning" onClick={goBack}>
            Back
          </Button>
        </div>
      </form>

      <Paper className={classes.editorWrapper}>
        <SimpleEditor editorRef={editorRef} />
      </Paper>
    </section>
  )
}

export default PostEditor

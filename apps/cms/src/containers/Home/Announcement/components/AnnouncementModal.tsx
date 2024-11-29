import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useStyles from 'src/shared/globalStyles'
import { parseSearch } from 'src/shared/utils'
import * as Yup from 'yup'
import useAnnouncement from '../useAnnouncement'

export interface Props {
  open: boolean
  handleOpen: () => void
}

const AnnouncementModal: FC<Props> = ({ open, handleOpen }) => {
  const initialValues = {
    content: ''
  }

  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required.')
  })

  const { createAnnouncement, updateAnnouncementById } = useAnnouncement()
  const classes = useStyles()
  const { search, state } = useLocation()
  const { id } = parseSearch(search)

  const {
    handleSubmit,
    getFieldProps,
    setValues,
    resetForm,
    isSubmitting,
    errors
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (typeof id === 'string') {
        await updateAnnouncementById({
          variables: { input: { ...values, id } }
        })
      } else {
        await createAnnouncement({
          variables: { input: values }
        })
      }

      resetForm()
      handleOpen()
    }
  })

  useEffect(() => {
    resetForm()

    if (id) {
      const { content } = state
      setValues({ content })
    }
  }, [id, resetForm, setValues, state])

  return (
    <Dialog open={open} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} an Announcement</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} an Announcement, please enter the
            following fields here. We will send data after clicking the submit
            button.
          </DialogContentText>
          <TextField
            className={classes.textFieldSpace}
            variant="standard"
            error={!!errors.content}
            helperText={errors.content}
            autoFocus
            required
            label="Content"
            fullWidth
            {...getFieldProps('content')}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleOpen()}>
            Cancel
          </Button>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AnnouncementModal

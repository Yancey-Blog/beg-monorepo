import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { parseSearch } from 'src/shared/utils'
import useStyles from 'src/shared/globalStyles'
import { IMotto } from '../types'

interface Props {
  open: boolean
  handleOpen: Function
  createMotto: Function
  updateMottoById: Function
}

const MottoModal: FC<Props> = ({
  open,
  handleOpen,
  createMotto,
  updateMottoById
}) => {
  const classes = useStyles()

  const { search, state } = useLocation()
  const { id } = parseSearch(search)

  const initialValues = {
    content: ''
  }

  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required.')
  })

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
      if (id) {
        await updateMottoById({
          variables: { input: { ...values, id } }
        })
      } else {
        await createMotto({ variables: { input: values } })
      }
      resetForm()
      handleOpen()
    }
  })

  useEffect(() => {
    resetForm()

    if (id) {
      const { content } = state as IMotto
      setValues({ content })
    }
  }, [id, resetForm, setValues, state])

  return (
    <Dialog open={open} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Motto</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Motto, please enter the following
            fields here. We will send data after clicking the submit button.
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

export default MottoModal

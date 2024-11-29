import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { FC } from 'react'
import { AZURE_BLOB_PATH } from 'src/shared/constants'
import * as Yup from 'yup'
import SettingItemWrapper from '../../components/SettingItemWrapper'
import useStyles from '../styles'
import useAccount from '../useAccount'

const validationSchema = Yup.object().shape({
  username: Yup.string().required()
})

const { username } = JSON.parse(localStorage.getItem('userProfile') || '{}')
const initialValues = {
  username
}

const UpdateUserName: FC = () => {
  const classes = useStyles()
  const { updateUserName } = useAccount()

  const { handleSubmit, getFieldProps, isSubmitting, errors, values } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        await updateUserName({
          variables: { username: values.username }
        })
      }
    })

  return (
    <SettingItemWrapper
      title="Change UserName"
      imageUrl={`${AZURE_BLOB_PATH}/privacycheckup_scene.png`}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          className={classes.input}
          error={!!errors.username}
          autoFocus
          fullWidth
          label="User Name"
          {...getFieldProps('username')}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting || values.username === username}
        >
          Update UserName
        </Button>
      </form>
    </SettingItemWrapper>
  )
}

export default UpdateUserName

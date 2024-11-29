import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { FC } from 'react'
import useSSO from 'src/hooks/useSSO'
import { AZURE_BLOB_PATH } from 'src/shared/constants'
import * as Yup from 'yup'
import SettingItemWrapper from '../../components/SettingItemWrapper'
import useStyles from '../styles'
import useAccount from '../useAccount'

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required()
})

const { email } = JSON.parse(localStorage.getItem('userProfile') || '{}')
const initialValues = {
  email
}

const UpdateEmail: FC = () => {
  const classes = useStyles()
  const keycloak = useSSO()
  const { updateEmail } = useAccount()

  const { handleSubmit, getFieldProps, isSubmitting, errors, values } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        await updateEmail({
          variables: { email: values.email }
        })
      }
    })

  return (
    <SettingItemWrapper
      title="Change Email"
      imageUrl={`${AZURE_BLOB_PATH}/reservations_scene.png`}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          className={classes.input}
          error={!!errors.email}
          autoFocus
          fullWidth
          label="Email"
          {...getFieldProps('email')}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting || values.email === keycloak?.profile?.email}
        >
          Update Email
        </Button>
      </form>
    </SettingItemWrapper>
  )
}

export default UpdateEmail

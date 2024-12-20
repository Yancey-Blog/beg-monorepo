import { useMutation } from '@apollo/client'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import SettingItemWrapper from 'src/containers/Settings/components/SettingItemWrapper'
import { AZURE_BLOB_PATH, PASSWORD_REGEXP } from 'src/shared/constants'
import * as Yup from 'yup'
import { CHANGE_PASSWORD } from '../../typeDefs'
import styles from './changePassword.module.scss'

const ChangePassword: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted() {
      enqueueSnackbar(`Your Password has been changed! Please Re-Login.`, {
        variant: 'success'
      })
      const timer = setTimeout(() => {
        clearTimeout(timer)
      }, 1000)
    }
  })

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required.'),
    newPassword: Yup.string()
      .required('New Password is required.')
      .matches(PASSWORD_REGEXP, 'Please enter a more complex password'),
    confirmNewPassword: Yup.string()
      // FIXME: oneOf's first parameter is an array, and the
      // second element of the array is assignable to type
      // 'string | Ref | undefined', but `@types/yup` has not
      // been updated.
      .oneOf([Yup.ref('newPassword'), undefined], "Passwords don't match")
      .required('Confirm Password is required')
  })

  const { handleSubmit, getFieldProps, resetForm, isSubmitting, errors } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmNewPassword, ...rest } = values
        await changePassword({
          variables: { input: rest }
        })

        resetForm()
      }
    })

  return (
    <SettingItemWrapper
      title="Change Password"
      imageUrl={`${AZURE_BLOB_PATH}/signin_scene.png`}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          type="password"
          className={styles.input}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword}
          required
          label="Old Password"
          {...getFieldProps('oldPassword')}
        />
        <TextField
          variant="standard"
          type="password"
          className={styles.input}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          required
          label="New Password"
          {...getFieldProps('newPassword')}
        />
        <TextField
          variant="standard"
          type="password"
          className={styles.input}
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword}
          required
          label="Confirm New Password"
          {...getFieldProps('confirmNewPassword')}
        />
        <p className={styles.tip}>
          Make sure it's at least 8 characters and at least including a number,
          a lowercase letter, a uppercase letter and a punctuation.
        </p>

        <Button
          disableElevation={true}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          update password
        </Button>
      </form>
    </SettingItemWrapper>
  )
}

export default ChangePassword

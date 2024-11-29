import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { FC } from 'react'
import Uploader from 'src/components/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import * as Yup from 'yup'
import SettingItemWrapper from '../components/SettingItemWrapper'
import SettingsHeader from '../components/SettingsHeader'
import SettingWrapper from '../components/SettingWrapper'
import useStyles from './styles'

const Profile: FC = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { id: userId, attributes } = JSON.parse(
    localStorage.getItem('userProfile') || '{}'
  )

  const validationSchema = Yup.object().shape({
    website: Yup.string().url()
  })

  const formatData = (values: typeof initialValues) => {
    const data = {} as { [index: string]: string[] }
    Object.keys(values).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data[key] = [values[key]]
    })

    return data
  }

  // TODO:
  const initialValues = {
    name: (attributes?.['name']?.[0] as string) || '',
    location: (attributes?.['location']?.[0] as string) || '',
    organization: (attributes?.['organization']?.[0] as string) || '',
    website: (attributes?.['website']?.[0] as string) || '',
    bio: (attributes?.['bio']?.[0] as string) || '',
    avatarUrl: (attributes?.['avatarUrl']?.[0] as string) || ''
  }

  const updateUser = async (data: typeof initialValues) => {
    await axios.put(
      `${import.meta.env.VITE_KEY_CLOAK_URL}/admin/realms/${import.meta.env.VITE_KEY_CLOAK_REALM}/users/${userId}`,
      { attributes: formatData(data) },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    enqueueSnackbar(`Your profile has been updated!`, {
      variant: 'success'
    })
  }

  const { setFieldValue, handleSubmit, getFieldProps, isSubmitting, errors } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        updateUser(values)
      }
    })

  const onChange = async (data: UploaderResponse) => {
    setFieldValue('avatarUrl', data.url)
  }

  return (
    <SettingWrapper>
      <SettingsHeader
        title="Personal info"
        subTitle="Basic info, like your name and photo, that you use on Yancey Blog CMS services"
      />

      <SettingItemWrapper title="Profile">
        <section className={classes.profileContainer}>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              className={classes.input}
              error={!!errors.name}
              helperText={errors.name}
              autoFocus
              fullWidth
              label="Name"
              {...getFieldProps('name')}
            />
            <TextField
              variant="standard"
              className={classes.input}
              error={!!errors.location}
              helperText={errors.location}
              autoFocus
              fullWidth
              label="Location"
              {...getFieldProps('location')}
            />
            <TextField
              variant="standard"
              className={classes.input}
              error={!!errors.organization}
              helperText={errors.organization}
              autoFocus
              fullWidth
              label="Organization"
              {...getFieldProps('organization')}
            />
            <TextField
              variant="standard"
              className={classes.input}
              error={!!errors.website}
              helperText={errors.website}
              autoFocus
              fullWidth
              label="Website"
              {...getFieldProps('website')}
            />
            <TextField
              variant="standard"
              className={classes.input}
              error={!!errors.bio}
              helperText={errors.bio}
              autoFocus
              fullWidth
              multiline
              rows="5"
              label="Bio"
              {...getFieldProps('bio')}
            />

            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </form>

          <Uploader
            variant="outlined"
            className={classes.customUploader}
            needMarginLeft={false}
            onChange={onChange}
            defaultFile={getFieldProps('avatarUrl').value}
          />
        </section>
      </SettingItemWrapper>
    </SettingWrapper>
  )
}

export default Profile

import { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { Card, CircularProgress, Button } from '@mui/material'
import { Add, CloudUpload } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import useUploadRequest from 'src/hooks/useUploadRequest'
import { getURLPathName } from 'src/shared/utils'
import { UploaderResponse, Props } from './types'
import useclasses from './styles'

const Uploader: FC<Props> = ({
  type = 'avatar',
  variant = 'elevation',
  accept = 'image/*',
  defaultFile = '',
  multiple = false,
  needMarginLeft = true,
  onChange,
  className
}) => {
  const classes = useclasses()
  const { enqueueSnackbar } = useSnackbar()
  const [currFile, setCurrFile] = useState<UploaderResponse>()
  const { loading, uploadRequest } = useUploadRequest(onChange, setCurrFile)

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) {
      enqueueSnackbar('Please upload a file!', { variant: 'error' })
      return
    }

    for (let i = 0; i < files.length; i++) {
      uploadRequest(files[i])
    }
  }

  const avatarContent = () => {
    if (loading) {
      return <CircularProgress />
    }

    if (defaultFile) {
      return <img src={defaultFile} alt="default" className={classes.img} />
    } else if (currFile) {
      const { name, url } = currFile
      return <img src={url} alt={name} className={classes.img} />
    } else {
      return <Add className={classes.addBtn} />
    }
  }

  const simpleContent = () => {
    if (currFile) {
      const { url } = currFile
      return <p className={classes.simpleContent}>{getURLPathName(url)}</p>
    } else if (defaultFile) {
      return (
        <p className={classes.simpleContent}>{getURLPathName(defaultFile)}</p>
      )
    }
  }

  return (
    <>
      {type === 'avatar' ? (
        <Card
          variant={variant}
          className={classNames(classes.avatarUploader, className, {
            [classes.simpleUploader]: needMarginLeft
          })}
        >
          {avatarContent()}
          <input
            type="file"
            multiple={multiple}
            accept={accept}
            onChange={(e) => onUpload(e)}
            className={classes.customInput}
          />
        </Card>
      ) : (
        <div className={needMarginLeft ? classes.simpleUploader : undefined}>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={<CloudUpload />}
          >
            {loading && (
              <CircularProgress
                size={24}
                className={classes.customLoadingCircle}
              />
            )}
            Upload
            <input
              type="file"
              multiple={multiple}
              accept={accept}
              className={classes.customInput}
              onChange={(e) => onUpload(e)}
            />
          </Button>
          {simpleContent()}
        </div>
      )}
    </>
  )
}

export default Uploader

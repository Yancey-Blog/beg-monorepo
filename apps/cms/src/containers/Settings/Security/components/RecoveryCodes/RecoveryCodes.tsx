import { useMutation } from '@apollo/client'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { DateTime } from 'luxon'
import { FC, useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import Transition from 'src/components/Transition/Transition'
import { RECOVERY_CODES_FILE_NAME } from 'src/shared/constants'
import { generateFile } from 'src/shared/utils'
import { CREATE_RECOVERY_CODES } from '../../typeDefs'
import styles from './recoveryCode.module.scss'

interface Props {
  setOpen: () => void
  open: boolean
}

const RecoveryCodes: FC<Props> = ({ setOpen, open }) => {
  const [copyTxt, setCopyTxt] = useState('Copy')
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])

  const onClose = () => {
    setOpen(false)
  }

  const [createRecoveryCodes, { loading }] = useMutation(CREATE_RECOVERY_CODES)

  useEffect(() => {
    const fetchTOTPAndRecoveryCodes = async () => {
      const res = await createRecoveryCodes()
      setRecoveryCodes(res.data.createRecoveryCodes.recoveryCodes)
    }

    if (open) fetchTOTPAndRecoveryCodes()
  }, [createRecoveryCodes, open])

  return (
    <Dialog
      className={styles.recoveryCode}
      open={open}
      onClose={onClose}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>Save your backup codes</DialogTitle>
      <DialogContent>
        {loading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={styles.listContainer}>
              <ul className={styles.recoveryCodesGroup}>
                {recoveryCodes.map((recoveryCodes) => (
                  <li className={styles.recoveryCodesItem} key={recoveryCodes}>
                    <span className={styles.square} />
                    {recoveryCodes}
                  </li>
                ))}
              </ul>
            </div>
            <ul>
              <li>You can only use each backup code once.</li>
              <li>
                These codes were generated on: {DateTime.now().toFormat('DD')}.
              </li>
            </ul>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button size="small" color="primary" onClick={onClose}>
          Close
        </Button>
        <Button
          size="small"
          color="primary"
          href={generateFile(recoveryCodes.join('\n'))}
          download={RECOVERY_CODES_FILE_NAME}
          disabled={loading}
        >
          Download
        </Button>
        <CopyToClipboard
          text={recoveryCodes.join(' ')}
          onCopy={() => setCopyTxt('Copied!')}
        >
          <Button size="small" color="primary" disabled={loading}>
            {copyTxt}
          </Button>
        </CopyToClipboard>
      </DialogActions>
    </Dialog>
  )
}

export default RecoveryCodes

import {
  Button,
  DialogActions,
  DialogTitle,
  Paper,
  Popover
} from '@mui/material'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { cloneElement, FC, ReactNode } from 'react'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN
} from 'src/shared/constants'

interface Props {
  title?: string
  children?: ReactNode
  onOk: () => void
}

const ConfirmPopover: FC<Props> = ({ children, onOk, title }) => {
  return (
    <PopupState variant="popover" popupId="deleteOnePopover">
      {(popupState) => (
        <>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            cloneElement(children, {
              ...bindTrigger(popupState)
            })
          }
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={POPOVER_ANCHOR_ORIGIN}
            transformOrigin={POPOVER_TRANSFORM_ORIGIN}
            disableRestoreFocus
          >
            <Paper>
              <DialogTitle>
                {title ? title : 'Are you sure you want to delete?'}
              </DialogTitle>
              <DialogActions>
                <Button onClick={popupState.close} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onOk()
                    popupState.close()
                  }}
                  color="primary"
                >
                  OK
                </Button>
              </DialogActions>
            </Paper>
          </Popover>
        </>
      )}
    </PopupState>
  )
}

export default ConfirmPopover

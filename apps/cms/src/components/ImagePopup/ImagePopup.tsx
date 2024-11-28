import { Popover } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { FC } from 'react'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN
} from 'src/shared/constants'

interface Props {
  imgUrl: string
  imgName: string
}

const useStyles = makeStyles(() =>
  createStyles({
    thumb: {
      width: 150,
      cursor: 'pointer'
    },
    full: {
      display: 'block',
      width: 400
    }
  })
)

const ImagePopup: FC<Props> = ({ imgUrl, imgName }) => {
  const classes = useStyles()

  return (
    <PopupState variant="popover" popupId="imagePopover">
      {(popupState) => (
        <div>
          <img
            className={classes.thumb}
            src={imgUrl}
            alt={imgName}
            {...bindTrigger(popupState)}
          />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={POPOVER_ANCHOR_ORIGIN}
            transformOrigin={POPOVER_TRANSFORM_ORIGIN}
            disableRestoreFocus
          >
            <img className={classes.full} src={imgUrl} alt={imgName} />
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

export default ImagePopup

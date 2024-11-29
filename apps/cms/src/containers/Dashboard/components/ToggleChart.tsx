import { Paper, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { FC, MouseEvent, ReactNode, useState } from 'react'

interface Props {
  handleToggleChange: (value: number) => void
  children?: ReactNode
}

// 1 week, 24 hours, 12 hours, 6 hours, 3 hours, 1 hour
const duration = [24 * 7, 24, 12, 6, 3, 1]

// One data is provided every five minutes,
// so 12 data are provided every hour.
const countByHour = 12

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      position: 'relative',
      padding: 16,
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px!important',
      borderRadius: '16px!important'
    },

    toggleButtonGroup: {
      position: 'absolute',
      top: 4,
      right: 16
    },

    toggleBtn: {
      padding: '0 4px',
      border: 'none'
    }
  })
)

const ToggleChart: FC<Props> = ({ children, handleToggleChange }) => {
  const classes = useStyles()

  const [value, setValue] = useState(countByHour)

  const handleChange = (_: MouseEvent<HTMLElement>, value: number) => {
    handleToggleChange(value)
    setValue(value)
  }

  return (
    <Paper className={classes.paper}>
      <ToggleButtonGroup
        value={value}
        className={classes.toggleButtonGroup}
        size="small"
        exclusive
        onChange={handleChange}
        aria-label="chart-date-picker"
      >
        {duration.map((val) => (
          <ToggleButton
            key={val}
            value={val * countByHour}
            aria-label={`${val} hours`}
            className={classes.toggleBtn}
          >
            {val}H
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {children}
    </Paper>
  )
}

export default ToggleChart

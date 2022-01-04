import { FC, useState, useEffect, KeyboardEvent } from 'react'
import { makeStyles, createStyles } from '@mui/styles'
import { Chip, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'

interface Props {
  required: boolean
  error: boolean
  helperText?: string | string[] | never[]
  fullWidth: boolean
  defaultValue: string[]
  label: string
  onChange: (chips: string[]) => void
}

const useStyles = makeStyles(() =>
  createStyles({
    chip: {
      margin: '10px 10px 10px 0'
    }
  })
)

const ChipInput: FC<Props> = ({
  required,
  label,
  defaultValue,
  error,
  helperText,
  fullWidth,
  onChange
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [chips, setChips] = useState<string[]>(defaultValue)

  const handleDelete = (newChip: string) => () => {
    const newChips = chips.filter((chip) => chip !== newChip)
    setChips(newChips)
    onChange(newChips)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const $inputEl = e.target as HTMLInputElement
      const val = $inputEl.value.trim()

      if (chips.includes(val) || val === '') {
        enqueueSnackbar("Don't enter existing tag!", { variant: 'error' })
        $inputEl.value = ''
        return
      }

      const newChips = [...chips, val]
      setChips(newChips)
      onChange(newChips)
      $inputEl.value = ''
    }
  }

  useEffect(() => {
    setChips(defaultValue)
  }, [defaultValue])

  return (
    <TextField
      required={required}
      variant="standard"
      label={label}
      fullWidth={fullWidth}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: chips.map((item) => (
          <Chip
            className={classes.chip}
            key={item}
            tabIndex={-1}
            label={item}
            onDelete={handleDelete(item)}
          />
        ))
      }}
      onKeyDown={handleKeyDown}
    />
  )
}

export default ChipInput

import { DocumentNode } from '@apollo/client'
import { MoreVert } from '@mui/icons-material'
import { Menu, MenuItem } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { FC } from 'react'

interface Props {
  refetchQueries?: DocumentNode[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  curr: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exchangePosition: (params: any) => void
}

const Move: FC<Props> = ({
  refetchQueries,
  dataSource,
  curr,
  exchangePosition
}) => {
  const move = (
    currId: string,
    nextId: string,
    currWeight: number,
    nextWeight: number,
    closePoper: () => void
  ) => {
    closePoper()

    exchangePosition({
      variables: {
        input: {
          id: currId,
          exchangedId: nextId,
          weight: currWeight,
          exchangedWeight: nextWeight
        }
      },
      refetchQueries
    })
  }

  const { _id: currId, weight: currWeight } = curr
  const currIdx = dataSource.findIndex((item) => item._id === currId)

  const { _id: prevId, weight: prevWeight } = dataSource[currIdx - 1] || {}
  const { _id: nextId, weight: nextWeight } = dataSource[currIdx + 1] || {}
  const { _id: topId, weight: topWeight } = dataSource[0] || {}

  return (
    <>
      {dataSource.length < 2 || (
        <PopupState variant="popover" popupId="movePoperOver">
          {(popupState) => (
            <>
              <MoreVert
                style={{ cursor: 'pointer' }}
                {...bindTrigger(popupState)}
              />

              <Menu {...bindMenu(popupState)}>
                {currWeight !== topWeight ? (
                  <MenuItem
                    onClick={() =>
                      move(
                        currId,
                        topId,
                        currWeight,
                        topWeight,
                        popupState.close
                      )
                    }
                  >
                    Move to the top
                  </MenuItem>
                ) : null}

                {currWeight !== topWeight ? (
                  <MenuItem
                    onClick={() =>
                      move(
                        currId,
                        prevId,
                        currWeight,
                        prevWeight,
                        popupState.close
                      )
                    }
                  >
                    Move up
                  </MenuItem>
                ) : null}

                {currWeight !== 1 ? (
                  <MenuItem
                    onClick={() =>
                      move(
                        currId,
                        nextId,
                        currWeight,
                        nextWeight,
                        popupState.close
                      )
                    }
                  >
                    Move down
                  </MenuItem>
                ) : null}
              </Menu>
            </>
          )}
        </PopupState>
      )}
    </>
  )
}

export default Move

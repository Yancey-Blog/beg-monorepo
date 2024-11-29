import { DeleteForever, Edit } from '@mui/icons-material'
import { Button, Popover, Switch } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridValueGetterParams
} from '@mui/x-data-grid'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { FC, useState } from 'react'
import ConfirmPopover from 'src/components/ConfirmPopover'
import ImagePopup from 'src/components/ImagePopup'
import Move from 'src/components/Move'
import useOpenModal from 'src/hooks/useOpenModal'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN
} from 'src/shared/constants'
import { formatJSONDate } from 'yancey-js-util'
import useStyles from '../styles'
import { PLAYERS } from '../typeDefs'
import { IPlayer } from '../types'
import PlayerModal from './PlayerModal'

interface Props {
  dataSource: IPlayer[]
  isFetching: boolean
  isExchanging: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createPlayer: () => void
  updatePlayerById: () => void
  deletePlayerById: () => void
  deletePlayers: () => void
  exchangePosition: () => void
}

const PlayerTable: FC<Props> = ({
  dataSource,
  createPlayer,
  updatePlayerById,
  deletePlayerById,
  deletePlayers,
  exchangePosition,
  isFetching,
  isExchanging,
  isDeleting,
  isBatchDeleting
}) => {
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState(20)

  const classes = useStyles()

  const columns: GridColDef<IPlayer>[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'weight', headerName: 'Weight', flex: 0.5 },
    { field: 'title', headerName: 'Title', flex: 1.5 },
    { field: 'artist', headerName: 'Artist', flex: 1.5 },
    {
      field: 'lrc',
      headerName: 'LRC',
      renderCell: (params: GridRenderCellParams<'string', IPlayer>) => (
        <PopupState variant="popover" popupId="lrcPoperOver">
          {(popupState) => (
            <div>
              <Button
                color="secondary"
                variant="outlined"
                {...bindTrigger(popupState)}
              >
                Click me!
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={POPOVER_ANCHOR_ORIGIN}
                transformOrigin={POPOVER_TRANSFORM_ORIGIN}
                disableRestoreFocus
              >
                <pre className={classes.lrcTxt}>{params.row.lrc}</pre>
              </Popover>
            </div>
          )}
        </PopupState>
      ),
      flex: 1
    },
    {
      field: 'coverUrl',
      headerName: 'Cover Url',
      renderCell: (params: GridRenderCellParams<'string', IPlayer>) => (
        <ImagePopup imgName={params.row.title} imgUrl={params.row.coverUrl} />
      ),
      flex: 1
    },
    {
      field: 'musicFileUrl',
      headerName: 'Music File Url',
      renderCell: (params: GridRenderCellParams<'string', IPlayer>) => (
        <audio src={params.row.musicFileUrl} controls>
          Your browser does not support the audio element.
        </audio>
      ),
      flex: 2
    },
    {
      field: 'isPublic',
      headerName: 'Is Public',
      renderCell: (params: GridRenderCellParams<'string', IPlayer>) => (
        <Switch
          checked={params.row.isPublic}
          onChange={(e) => {
            updatePlayerById({
              variables: {
                input: { isPublic: e.target.checked, id: params.row._id }
              },
              optimisticResponse: {
                __typename: 'Mutation',
                updatePlayerById: {
                  id: params.row._id,
                  __typename: 'PlayerModel',
                  isPublic: e.target.checked
                }
              }
            })
          }}
        />
      ),
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      valueGetter: (params: GridValueGetterParams<'string', IPlayer>) =>
        formatJSONDate(params.row.createdAt.toString()),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      valueGetter: (params: GridValueGetterParams<'string', IPlayer>) =>
        formatJSONDate(params.row.updatedAt.toString()),
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams<'string', IPlayer>) => (
        <>
          <Edit
            onClick={() => handleOpen({ id: params.row._id, data: params.row })}
          />

          <ConfirmPopover
            onOk={() => deletePlayerById({ variables: { id: params.row._id } })}
          >
            <DeleteForever style={{ margin: '0 20px' }} />
          </ConfirmPopover>

          <Move
            refetchQueries={[PLAYERS]}
            dataSource={dataSource}
            curr={params.row}
            exchangePosition={exchangePosition}
          />
        </>
      ),
      flex: 1
    }
  ]

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 24
        }}
      >
        <Button variant="contained" onClick={() => handleOpen()}>
          Create One
        </Button>
        {selectedRows.length > 0 && (
          <Button variant="contained" color="error" style={{ marginLeft: 24 }}>
            <ConfirmPopover
              onOk={() => deletePlayers({ variables: { ids: selectedRows } })}
            >
              Batch Delete
            </ConfirmPopover>
          </Button>
        )}
      </div>
      <DataGrid
        rowHeight={100}
        loading={isFetching || isDeleting || isBatchDeleting || isExchanging}
        getRowId={(row) => row._id}
        rows={dataSource}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        onSelectionModelChange={(selected) => {
          setSelectedRows(selected)
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[20, 40, 60]}
      />

      <PlayerModal
        open={open}
        handleOpen={handleOpen}
        createPlayer={createPlayer}
        updatePlayerById={updatePlayerById}
      />
    </div>
  )
}

export default PlayerTable

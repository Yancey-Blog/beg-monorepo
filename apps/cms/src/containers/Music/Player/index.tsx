import { useQuery } from '@apollo/client'
import { DeleteForever, Edit } from '@mui/icons-material'
import { Button, Popover, Switch } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowSelectionModel
} from '@mui/x-data-grid'
import { PlayerModel } from '@repo/graphql-types/__generated__/graphql'
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
import PlayerModal from './components/PlayerModal'
import useStyles from './styles'
import { PLAYERS } from './typeDefs'
import usePlayer from './usePlayer'

const Player: FC = () => {
  const { loading: isFetching, data } = useQuery(PLAYERS, {
    notifyOnNetworkStatusChange: true
  })
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([])
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 25
  })
  const {
    updatePlayerById,
    deletePlayerById,
    deletePlayers,
    exchangePosition
  } = usePlayer()

  const classes = useStyles()

  const columns: GridColDef<PlayerModel>[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'weight', headerName: 'Weight', flex: 0.5 },
    { field: 'title', headerName: 'Title', flex: 1.5 },
    { field: 'artist', headerName: 'Artist', flex: 1.5 },
    {
      field: 'lrc',
      headerName: 'LRC',
      renderCell: (params: GridRenderCellParams) => (
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
      renderCell: (params: GridRenderCellParams) => (
        <ImagePopup imgName={params.row.title} imgUrl={params.row.coverUrl} />
      ),
      flex: 1
    },
    {
      field: 'musicFileUrl',
      headerName: 'Music File Url',
      renderCell: (params: GridRenderCellParams) => (
        <audio src={params.row.musicFileUrl} controls>
          Your browser does not support the audio element.
        </audio>
      ),
      flex: 2
    },
    {
      field: 'isPublic',
      headerName: 'Is Public',
      renderCell: (params: GridRenderCellParams) => (
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
      valueGetter: (_, row) => formatJSONDate(row.createdAt.toString()),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      valueGetter: (_, row) => formatJSONDate(row.updatedAt.toString()),
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams) => (
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
            dataSource={data?.getPlayers ?? []}
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
              onOk={() =>
                deletePlayers({
                  variables: { ids: selectedRows.map((row) => row.toString()) }
                })
              }
            >
              Batch Delete
            </ConfirmPopover>
          </Button>
        )}
      </div>
      <DataGrid
        rowHeight={88}
        loading={isFetching}
        getRowId={(row) => row._id}
        rows={data?.getPlayers ?? []}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(selected) => {
          setSelectedRows(selected)
        }}
        paginationModel={{ page: pageModel.page, pageSize: pageModel.pageSize }}
        onPaginationModelChange={(paginationModel) =>
          setPageModel(paginationModel)
        }
      />

      <PlayerModal open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default Player

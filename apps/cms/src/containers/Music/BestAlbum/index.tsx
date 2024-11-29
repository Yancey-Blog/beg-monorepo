import { useQuery } from '@apollo/client'
import { DeleteForever, Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowSelectionModel
} from '@mui/x-data-grid'
import { BestAlbumModel } from 'backend/src/__generated__/graphql'
import { FC, useState } from 'react'
import ConfirmPopover from 'src/components/ConfirmPopover'
import ImagePopup from 'src/components/ImagePopup'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatJSONDate } from 'yancey-js-util'
import BestAlbumModal from './components/BestAlbumModal'
import { BEST_ALBUMS } from './typeDefs'
import useBestAlbum from './useBestAlbum'

const BestAlbumTable: FC = () => {
  const { loading: isFetching, data } = useQuery(BEST_ALBUMS, {
    notifyOnNetworkStatusChange: true
  })

  const { deleteBestAlbumById, deleteBestAlbums } = useBestAlbum()
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([])
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 25
  })

  const columns: GridColDef<BestAlbumModel>[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'artist', headerName: 'Artist', flex: 1 },
    {
      field: 'mvUrl',
      headerName: 'Mv Url',
      renderCell: (params: GridRenderCellParams) => (
        <Button
          href={params.row.mvUrl}
          color="secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click to jump
        </Button>
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
      field: 'releaseDate',
      headerName: 'Release Date',
      renderCell: (params: GridRenderCellParams) => (
        <span>{formatJSONDate(params.row.releaseDate)}</span>
      ),
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      valueGetter: (_, row) => formatJSONDate(row.createdAt),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      valueGetter: (_, row) => formatJSONDate(row.updatedAt),
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
            onOk={() =>
              deleteBestAlbumById({ variables: { id: params.row._id } })
            }
          >
            <DeleteForever style={{ margin: '0 20px' }} />
          </ConfirmPopover>
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
                deleteBestAlbums({
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
        rows={data?.getBestAlbums ?? []}
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

      <BestAlbumModal open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default BestAlbumTable

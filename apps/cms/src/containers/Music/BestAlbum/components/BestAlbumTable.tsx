import { DeleteForever, Edit } from '@mui/icons-material'
import { Button } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridSelectionModel,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { FC, useState } from 'react'
import ConfirmPopover from 'src/components/ConfirmPopover'
import ImagePopup from 'src/components/ImagePopup'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatJSONDate } from 'yancey-js-util'
import { IBestAlbum } from '../types'
import BestAlbumModal from './BestAlbumModal'

interface Props {
  dataSource: IBestAlbum[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createBestAlbum: () => void
  updateBestAlbumById: () => void
  deleteBestAlbumById: () => void
  deleteBestAlbums: () => void
}

const BestAlbumTable: FC<Props> = ({
  dataSource,
  createBestAlbum,
  updateBestAlbumById,
  deleteBestAlbumById,
  deleteBestAlbums,
  isFetching,
  isDeleting,
  isBatchDeleting
}) => {
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState(20)

  const columns: GridColDef<IBestAlbum>[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'artist', headerName: 'Artist', flex: 1 },
    {
      field: 'mvUrl',
      headerName: 'Mv Url',
      renderCell: (params: GridRenderCellParams<'string', IBestAlbum>) => (
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
      renderCell: (params: GridRenderCellParams<'string', IBestAlbum>) => (
        <ImagePopup imgName={params.row.title} imgUrl={params.row.coverUrl} />
      ),
      flex: 1
    },
    {
      field: 'releaseDate',
      headerName: 'Release Date',
      renderCell: (params: GridRenderCellParams<'string', IBestAlbum>) => (
        <span>{formatJSONDate(params.row.releaseDate)}</span>
      ),
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      valueGetter: (params: GridValueGetterParams<'string', IBestAlbum>) =>
        formatJSONDate(params.row.createdAt),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      valueGetter: (params: GridValueGetterParams<'string', IBestAlbum>) =>
        formatJSONDate(params.row.updatedAt),
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams<'string', IBestAlbum>) => (
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
                deleteBestAlbums({ variables: { ids: selectedRows } })
              }
            >
              Batch Delete
            </ConfirmPopover>
          </Button>
        )}
      </div>
      <DataGrid
        rowHeight={100}
        loading={isFetching || isDeleting || isBatchDeleting}
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

      <BestAlbumModal
        open={open}
        handleOpen={handleOpen}
        createBestAlbum={createBestAlbum}
        updateBestAlbumById={updateBestAlbumById}
      />
    </div>
  )
}

export default BestAlbumTable

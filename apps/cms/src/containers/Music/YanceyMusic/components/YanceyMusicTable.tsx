import { FC, useState } from 'react'
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
  GridSelectionModel
} from '@mui/x-data-grid'
import { Edit, DeleteForever } from '@mui/icons-material'
import { Button } from '@mui/material'
import { formatJSONDate } from 'yancey-js-util'
import useOpenModal from 'src/hooks/useOpenModal'
import ConfirmPopover from 'src/components/ConfirmPopover/ConfirmPopover'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import YanceyMusicModal from './YanceyMusicModal'
import { IYanceyMusic } from '../types'

interface Props {
  dataSource: IYanceyMusic[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createYanceyMusic: Function
  updateYanceyMusicById: Function
  deleteYanceyMusicById: Function
  deleteYanceyMusic: Function
}

const YanceyMusicTable: FC<Props> = ({
  dataSource,
  createYanceyMusic,
  updateYanceyMusicById,
  deleteYanceyMusicById,
  deleteYanceyMusic,
  isFetching,
  isDeleting,
  isBatchDeleting
}) => {
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState(20)

  const columns: GridColDef<IYanceyMusic>[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    {
      field: 'soundCloudUrl',
      headerName: 'SoundCloud Url',
      renderCell: (params: GridRenderCellParams<'string', IYanceyMusic>) => (
        <Button
          href={params.row.soundCloudUrl}
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
      field: 'posterUrl',
      headerName: 'Poster Url',
      renderCell: (params: GridRenderCellParams<'string', IYanceyMusic>) => (
        <ImagePopup imgName={params.row.title} imgUrl={params.row.posterUrl} />
      ),
      flex: 1
    },
    {
      field: 'releaseDate',
      headerName: 'Release Date',
      renderCell: (params: GridRenderCellParams<'string', IYanceyMusic>) => (
        <span>{formatJSONDate(params.row.releaseDate)}</span>
      ),
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      valueGetter: (params: GridValueGetterParams<'string', IYanceyMusic>) =>
        formatJSONDate(params.row.createdAt),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      valueGetter: (params: GridValueGetterParams<'string', IYanceyMusic>) =>
        formatJSONDate(params.row.updatedAt),
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams<'string', IYanceyMusic>) => (
        <>
          <Edit
            onClick={() => handleOpen({ id: params.row._id, data: params.row })}
          />

          <ConfirmPopover
            onOk={() =>
              deleteYanceyMusicById({ variables: { id: params.row._id } })
            }
          >
            <DeleteForever
              style={{ margin: '0 20px', position: 'relative', top: 3 }}
            />
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
                deleteYanceyMusic({ variables: { ids: selectedRows } })
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

      <YanceyMusicModal
        open={open}
        handleOpen={handleOpen}
        createYanceyMusic={createYanceyMusic}
        updateYanceyMusicById={updateYanceyMusicById}
      />
    </div>
  )
}

export default YanceyMusicTable

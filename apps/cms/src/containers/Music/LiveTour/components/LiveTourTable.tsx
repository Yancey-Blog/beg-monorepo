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
import ConfirmPopover from 'src/components/ConfirmPopover/ConfirmPopover'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatJSONDate } from 'yancey-js-util'
import { ILiveTour } from '../types'
import LiveTourModal from './LiveTourModal'

interface Props {
  dataSource: ILiveTour[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createLiveTour: () => void
  updateLiveTourById: () => void
  deleteLiveTourById: () => void
  deleteLiveTours: () => void
}

const LiveTourTable: FC<Props> = ({
  dataSource,
  createLiveTour,
  updateLiveTourById,
  deleteLiveTourById,
  deleteLiveTours,
  isFetching,
  isDeleting,
  isBatchDeleting
}) => {
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState(20)

  const columns: GridColDef<ILiveTour>[] = [
    { field: '_id', headerName: 'ID' },
    { field: 'title', headerName: 'Title' },
    {
      field: 'posterUrl',
      headerName: 'Poster Url',
      renderCell: (params: GridRenderCellParams<'string', ILiveTour>) => (
        <ImagePopup imgName={params.row.title} imgUrl={params.row.posterUrl} />
      ),
      flex: 1
    },
    {
      field: 'showTime',
      headerName: 'Show Time',
      valueGetter: (params: GridValueGetterParams<'string', ILiveTour>) =>
        formatJSONDate(params.row.showTime),
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      valueGetter: (params: GridValueGetterParams<'string', ILiveTour>) =>
        formatJSONDate(params.row.createdAt),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      valueGetter: (params: GridValueGetterParams<'string', ILiveTour>) =>
        formatJSONDate(params.row.updatedAt),
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams<'string', ILiveTour>) => (
        <>
          <Edit
            onClick={() => handleOpen({ id: params.row._id, data: params.row })}
          />

          <ConfirmPopover
            onOk={() =>
              deleteLiveTourById({ variables: { id: params.row._id } })
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
              onOk={() => deleteLiveTours({ variables: { ids: selectedRows } })}
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

      <LiveTourModal
        open={open}
        handleOpen={handleOpen}
        createLiveTour={createLiveTour}
        updateLiveTourById={updateLiveTourById}
      />
    </div>
  )
}

export default LiveTourTable

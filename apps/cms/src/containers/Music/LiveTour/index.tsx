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
import { LiveTourModel } from '@repo/graphql-types/__generated__/graphql'
import { FC, useState } from 'react'
import ConfirmPopover from 'src/components/ConfirmPopover'
import ImagePopup from 'src/components/ImagePopup'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatJSONDate } from 'yancey-js-util'
import LiveTourModal from './components/LiveTourModal'
import { LIVE_TOURS } from './typeDefs'
import useLiveTour from './useLiveTour'

const LiveTour: FC = () => {
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([])
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 25
  })
  const { deleteLiveTourById, deleteLiveTours } = useLiveTour()
  const { loading: isFetching, data } = useQuery(LIVE_TOURS, {
    notifyOnNetworkStatusChange: true
  })

  const columns: GridColDef<LiveTourModel>[] = [
    { field: '_id', headerName: 'ID' },
    { field: 'title', headerName: 'Title' },
    {
      field: 'posterUrl',
      headerName: 'Poster Url',
      renderCell: (params: GridRenderCellParams) => (
        <ImagePopup imgName={params.row.title} imgUrl={params.row.posterUrl} />
      ),
      flex: 1
    },
    {
      field: 'showTime',
      headerName: 'Show Time',
      valueGetter: (_, row) => formatJSONDate(row.showTime),
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
              onOk={() =>
                deleteLiveTours({
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
        rows={data?.getLiveTours ?? []}
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

      <LiveTourModal open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default LiveTour

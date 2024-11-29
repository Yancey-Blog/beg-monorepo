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
import { AnnouncementModel } from 'backend/src/__generated__/graphql'
import { FC, useState } from 'react'
import ConfirmPopover from 'src/components/ConfirmPopover'
import Move from 'src/components/Move'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatJSONDate } from 'yancey-js-util'
import AnnouncementModal from './components/AnnouncementModal'
import { ANNOUNCEMENTS } from './typeDefs'
import useAnnouncement from './useAnnouncement'

const Announcement: FC = () => {
  const { deleteAnnouncementById, deleteAnnouncements, exchangePosition } =
    useAnnouncement()

  const { loading, data } = useQuery(ANNOUNCEMENTS, {
    notifyOnNetworkStatusChange: true,
    onError() {}
  })

  const { open, handleOpen } = useOpenModal<AnnouncementModel>()
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([])
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 25
  })

  const columns: GridColDef<AnnouncementModel>[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'weight', headerName: 'Weight', flex: 0.5 },
    { field: 'content', headerName: 'Content', flex: 2 },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      valueGetter: (_, row) => formatJSONDate(row.createdAt),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'UpdatedAt',
      valueGetter: (_, row) => formatJSONDate(row.updatedAt),
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Edit
            onClick={() => handleOpen({ id: params.row._id, data: params.row })}
          />

          <ConfirmPopover
            onOk={() =>
              deleteAnnouncementById({ variables: { id: params.row._id } })
            }
          >
            <DeleteForever style={{ margin: '0 20px' }} />
          </ConfirmPopover>

          <Move
            refetchQueries={[ANNOUNCEMENTS]}
            dataSource={data?.getAnnouncements ?? []}
            curr={params.row}
            exchangePosition={exchangePosition}
          />
        </div>
      ),
      flex: 1
    }
  ]

  return (
    <div style={{ width: '100%', maxHeight: 'calc(100vh - 240px)' }}>
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
                deleteAnnouncements({
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
        loading={loading}
        getRowId={(row) => row._id}
        rows={data?.getAnnouncements ?? []}
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

      <AnnouncementModal open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default Announcement

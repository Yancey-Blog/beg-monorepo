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
import { MottoModel } from '@repo/graphql-types/__generated__/graphql'
import { FC, useState } from 'react'
import ConfirmPopover from 'src/components/ConfirmPopover'
import Move from 'src/components/Move'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatJSONDate } from 'yancey-js-util'
import MottoModal from './components/MottoModal'
import { MOTTOS } from './typeDefs'
import useMotto from './useMotto'

const MottoTable: FC = () => {
  const { deleteMottoById, deleteMottos, exchangePosition } = useMotto()
  const { loading, data } = useQuery(MOTTOS, {
    notifyOnNetworkStatusChange: true
  })

  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([])
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 25
  })

  const columns: GridColDef<MottoModel>[] = [
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
        <>
          <Edit
            onClick={() => handleOpen({ id: params.row._id, data: params.row })}
          />

          <ConfirmPopover
            onOk={() => deleteMottoById({ variables: { id: params.row._id } })}
          >
            <DeleteForever style={{ margin: '0 20px' }} />
          </ConfirmPopover>

          <Move
            refetchQueries={[MOTTOS]}
            dataSource={data?.getMottos ?? []}
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
                deleteMottos({
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
        rows={data?.getMottos ?? []}
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

      <MottoModal open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default MottoTable

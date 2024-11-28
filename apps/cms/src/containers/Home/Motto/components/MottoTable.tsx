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
import Move from 'src/components/Move/Move'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatJSONDate } from 'yancey-js-util'
import { MOTTOS } from '../typeDefs'
import { IMotto } from '../types'
import MottoModal from './MottoModal'

interface Props {
  dataSource: IMotto[]
  isFetching: boolean
  isDeleting: boolean
  isExchanging: boolean
  isBatchDeleting: boolean
  createMotto: () => void
  updateMottoById: () => void
  deleteMottoById: () => void
  deleteMottos: () => void
  exchangePosition: () => void
}

const MottoTable: FC<Props> = ({
  dataSource,
  createMotto,
  deleteMottos,
  deleteMottoById,
  updateMottoById,
  exchangePosition,
  isFetching,
  isDeleting,
  isExchanging,
  isBatchDeleting
}) => {
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState(20)

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'weight', headerName: 'Weight', flex: 0.5 },
    { field: 'content', headerName: 'Content', flex: 2 },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      valueGetter: (params: GridValueGetterParams) =>
        formatJSONDate(params.row.createdAt),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'UpdatedAt',
      valueGetter: (params: GridValueGetterParams) =>
        formatJSONDate(params.row.updatedAt),
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
            <DeleteForever
              style={{ margin: '0 20px', position: 'relative', top: 3 }}
            />
          </ConfirmPopover>

          <Move
            refetchQueries={[MOTTOS]}
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
              onOk={() => deleteMottos({ variables: { ids: selectedRows } })}
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

      <MottoModal
        open={open}
        handleOpen={handleOpen}
        createMotto={createMotto}
        updateMottoById={updateMottoById}
      />
    </div>
  )
}

export default MottoTable

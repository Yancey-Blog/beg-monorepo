import { FC, useState } from 'react'
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
  GridSelectionModel
} from '@mui/x-data-grid'
import { Edit, DeleteForever } from '@mui/icons-material'
import { Switch, Button } from '@mui/material'
import { formatJSONDate } from 'yancey-js-util'
import useOpenModal from 'src/hooks/useOpenModal'
import ConfirmPoper from 'src/components/ConfirmPoper/ConfirmPoper'
import Move from 'src/components/Move/Move'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import CoverModal from './CoverModal'
import { ICover } from '../types'
import { COVERS } from '../typeDefs'

interface Props {
  dataSource: ICover[]
  isFetching: boolean
  isDeleting: boolean
  isExchanging: boolean
  isBatchDeleting: boolean
  isPublicCovers: boolean
  deleteCoverById: Function
  deleteCovers: Function
  createCover: Function
  updateCoverById: Function
  exchangePosition: Function
  publicCovers: Function
}

const CoverTable: FC<Props> = ({
  dataSource,
  deleteCoverById,
  deleteCovers,
  createCover,
  updateCoverById,
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
    { field: 'title', headerName: 'Title', flex: 2 },
    {
      field: 'coverUrl',
      headerName: 'Cover Url',
      renderCell: (params: GridRenderCellParams) => (
        <ImagePopup imgName={params.row.title} imgUrl={params.row.coverUrl} />
      ),
      flex: 1
    },
    {
      field: 'isPublic',
      headerName: 'Is Public',
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={params.row.isPublic}
          onChange={(e) => {
            updateCoverById({
              variables: {
                input: { isPublic: e.target.checked, id: params.row._id }
              },
              optimisticResponse: {
                __typename: 'Mutation',
                updateCoverById: {
                  id: params.row._id,
                  __typename: 'CoverModel',
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
      valueGetter: (params: GridValueGetterParams) =>
        formatJSONDate(params.row.createdAt),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
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

          <ConfirmPoper
            onOk={() => deleteCoverById({ variables: { id: params.row._id } })}
          >
            <DeleteForever
              style={{ margin: '0 20px', position: 'relative', top: 3 }}
            />
          </ConfirmPoper>

          <Move
            refetchQueries={[COVERS]}
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
            <ConfirmPoper
              onOk={() => deleteCovers({ variables: { ids: selectedRows } })}
            >
              Batch Delete
            </ConfirmPoper>
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

      <CoverModal
        open={open}
        handleOpen={handleOpen}
        createCover={createCover}
        updateCoverById={updateCoverById}
      />
    </div>
  )
}

export default CoverTable

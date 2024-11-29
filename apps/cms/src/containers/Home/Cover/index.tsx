import { useQuery } from '@apollo/client'
import { DeleteForever, Edit } from '@mui/icons-material'
import { Button, Switch } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowSelectionModel
} from '@mui/x-data-grid'
import { CoverModel } from 'backend/src/__generated__/graphql'
import { FC, useState } from 'react'
import ConfirmPopover from 'src/components/ConfirmPopover/ConfirmPopover'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import Move from 'src/components/Move/Move'
import useOpenModal from 'src/hooks/useOpenModal'
import { formatJSONDate } from 'yancey-js-util'
import CoverModal from './components/CoverModal'
import { COVERS } from './typeDefs'
import useCover from './useCover'

const Cover: FC = () => {
  const { loading: isFetching, data } = useQuery(COVERS, {
    notifyOnNetworkStatusChange: true
  })
  const {
    loading,
    updateCoverById,
    deleteCoverById,
    deleteCovers,
    exchangePosition
  } = useCover()
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([])
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 1,
    pageSize: 25
  })

  const columns: GridColDef<CoverModel>[] = [
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
            onOk={() => deleteCoverById({ variables: { id: params.row._id } })}
          >
            <DeleteForever style={{ margin: '0 20px' }} />
          </ConfirmPopover>

          <Move
            refetchQueries={[COVERS]}
            dataSource={data?.getCovers ?? []}
            curr={params.row}
            exchangePosition={exchangePosition}
          />
        </>
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
                deleteCovers({
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
        loading={isFetching || loading}
        getRowId={(row) => row._id}
        rows={data?.getCovers ?? []}
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

      <CoverModal open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default Cover

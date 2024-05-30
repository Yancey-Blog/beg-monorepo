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
import OpenSourceModal from './OpenSourceModal'
import { IOpenSource } from '../types'

interface Props {
  dataSource: IOpenSource[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  createOpenSource: Function
  updateOpenSourceById: Function
  deleteOpenSourceById: Function
  deleteOpenSources: Function
}

const OpenSourceTable: FC<Props> = ({
  dataSource,
  createOpenSource,
  updateOpenSourceById,
  deleteOpenSourceById,
  deleteOpenSources,
  isFetching,
  isDeleting,
  isBatchDeleting
}) => {
  const { open, handleOpen } = useOpenModal()
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState(20)

  const columns: GridColDef<IOpenSource>[] = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'url',
      headerName: 'Url',
      renderCell: (params: GridRenderCellParams<'string', IOpenSource>) => (
        <Button
          href={params.row.url}
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
      renderCell: (params: GridRenderCellParams<'string', IOpenSource>) => (
        <ImagePopup imgName={params.row.title} imgUrl={params.row.posterUrl} />
      ),
      flex: 1
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      valueGetter: (params: GridValueGetterParams<'string', IOpenSource>) =>
        formatJSONDate(params.row.createdAt),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      valueGetter: (params: GridValueGetterParams<'string', IOpenSource>) =>
        formatJSONDate(params.row.updatedAt),
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams<'string', IOpenSource>) => (
        <>
          <Edit
            onClick={() => handleOpen({ id: params.row._id, data: params.row })}
          />

          <ConfirmPopover
            onOk={() =>
              deleteOpenSourceById({ variables: { id: params.row._id } })
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
                deleteOpenSources({ variables: { ids: selectedRows } })
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

      <OpenSourceModal
        open={open}
        handleOpen={handleOpen}
        createOpenSource={createOpenSource}
        updateOpenSourceById={updateOpenSourceById}
      />
    </div>
  )
}

export default OpenSourceTable

import { FC, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
  GridSelectionModel
} from '@mui/x-data-grid'
import {
  FormControl,
  Switch,
  Tooltip,
  Chip,
  Paper,
  IconButton,
  Divider,
  InputBase,
  Button
} from '@mui/material'
import { DeleteOutline, Edit, Search, Clear } from '@mui/icons-material'
import { formatJSONDate } from 'yancey-js-util'
import { stringifySearch } from 'src/shared/utils'
import ConfirmPopover from 'src/components/ConfirmPopover/ConfirmPopover'
import ImagePopup from 'src/components/ImagePopup/ImagePopup'
import globalUseStyles from 'src/shared/globalStyles'
import { IPostItem } from '../types'
import useStyles from '../styles'

interface Props {
  page: number
  pageSize: number
  total: number
  dataSource: IPostItem[]
  isFetching: boolean
  isDeleting: boolean
  isBatchDeleting: boolean
  fetchPostsByPage: Function
  deletePostById: Function
  deletePosts: Function
  updatePostById: Function
}

const PostTable: FC<Props> = ({
  page,
  pageSize,
  total,
  dataSource,
  deletePostById,
  deletePosts,
  updatePostById,
  fetchPostsByPage,
  isFetching,
  isDeleting,
  isBatchDeleting
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const classes = useStyles()
  const globalClasses = globalUseStyles()
  const [searchTitle, setSearchTitle] = useState('')
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([])

  const toEditPage = (id?: string) => {
    navigate({
      pathname: `${pathname}/edit`,
      search: stringifySearch({ id })
    })
  }

  const fetchData = (page: number, pageSize: number, title?: string) => {
    fetchPostsByPage({
      variables: {
        input: {
          page,
          pageSize,
          title
        }
      }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value)
  }

  const handlePageChange = (currentPage: number) => {
    fetchData(currentPage + 1, pageSize, searchTitle)
  }

  const handlePageSizeChange = (pageSize: number) => {
    fetchData(page, pageSize, searchTitle)
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      valueGetter: (params: GridValueGetterParams<'string', IPostItem>) =>
        params.row._id,
      flex: 1
    },
    { field: 'title', headerName: 'Title', flex: 2 },
    {
      field: 'summary',
      headerName: 'Summary',
      renderCell: (params: GridRenderCellParams<string, IPostItem>) => (
        <Tooltip title={params.row.summary} placement="top">
          <span>{params.row.summary.slice(0, 15)}...</span>
        </Tooltip>
      ),
      flex: 2
    },
    {
      field: 'tags',
      headerName: 'Tags',
      renderCell: (params: GridRenderCellParams<string[], IPostItem>) => (
        <>
          {params.row.tags.map((tag: string) => (
            <Chip
              key={tag}
              className={classes.btn}
              label={tag}
              clickable
              color="primary"
            />
          ))}
        </>
      ),
      flex: 2
    },
    {
      field: 'posterUrl',
      headerName: 'Poster Url',
      renderCell: (params: GridRenderCellParams<string, IPostItem>) => {
        const curTitle = params.row.title
        return <ImagePopup imgName={curTitle} imgUrl={params.row.posterUrl} />
      },
      flex: 1
    },
    {
      field: 'isPublic',
      headerName: 'IsPublic',
      renderCell: (params: GridRenderCellParams<boolean, IPostItem>) => {
        const { _id, isPublic } = params.row

        return (
          <Switch
            checked={isPublic}
            onChange={(e) => {
              updatePostById({
                variables: { input: { isPublic: e.target.checked, id: _id } },
                optimisticResponse: {
                  __typename: 'Mutation',
                  updatePostById: {
                    id: _id,
                    __typename: 'PostItemModel',
                    isPublic: e.target.checked
                  }
                }
              })
            }}
          />
        )
      }
    },
    { field: 'like', headerName: 'Like', flex: 0.5 },
    { field: 'pv', headerName: 'PV', flex: 0.5 },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      valueGetter: (params: GridValueGetterParams<string, IPostItem>) =>
        formatJSONDate(params.row.createdAt),
      flex: 1
    },
    {
      field: 'updatedAt',
      headerName: 'UpdatedAt',
      valueGetter: (params: GridValueGetterParams<string, IPostItem>) =>
        formatJSONDate(params.row.updatedAt),
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams<string, IPostItem>) => (
        <>
          <FormControl>
            <Edit
              className={globalClasses.editIcon}
              onClick={() => toEditPage(params.row._id)}
            />
          </FormControl>
          <FormControl>
            <ConfirmPopover
              onOk={() => deletePostById({ variables: { id: params.row._id } })}
            >
              <DeleteOutline />
            </ConfirmPopover>
          </FormControl>
        </>
      ),
      flex: 1
    }
  ]

  return (
    <div className={classes.tableWrapper}>
      <section className={classes.headerWrapper}>
        <div>
          <Button variant="contained" onClick={() => toEditPage()}>
            Create One
          </Button>
          {selectedRows.length > 0 && (
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: 24 }}
            >
              <ConfirmPopover
                onOk={() => deletePosts({ variables: { ids: selectedRows } })}
              >
                Batch Delete
              </ConfirmPopover>
            </Button>
          )}
        </div>
        <Paper className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder="Search Posts by Title"
            inputProps={{ 'aria-label': 'search post by title' }}
            onChange={handleInputChange}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={() => fetchData(page, pageSize, searchTitle)}
          >
            <Search />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="clear"
            onClick={() => fetchData(page, pageSize, '')}
          >
            <Clear />
          </IconButton>
        </Paper>
      </section>
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
        rowCount={total}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[10, 20, 40]}
      />
    </div>
  )
}

export default PostTable

import { useQuery } from '@apollo/client'
import { Clear, DeleteOutline, Edit, Search } from '@mui/icons-material'
import {
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  Paper,
  Switch,
  Tooltip
} from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowSelectionModel
} from '@mui/x-data-grid'
import { FC, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ConfirmPopover from 'src/components/ConfirmPopover'
import ImagePopup from 'src/components/ImagePopup'
import globalUseStyles from 'src/shared/globalStyles'
import { stringifySearch } from 'src/shared/utils'
import { formatJSONDate } from 'yancey-js-util'
import useStyles from './styles'
import { POSTS } from './typeDefs'
import { IPostItem } from './types'
import usePost from './usePost'

const PostList: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const classes = useStyles()
  const globalClasses = globalUseStyles()
  const [title, setTitle] = useState('')
  const [rowCount, setRowCount] = useState(0)
  const [pageModel, setPageModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10
  })
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([])
  const { updatePostById, deletePostById, deletePosts } = usePost()

  const { loading, data } = useQuery(POSTS, {
    variables: {
      input: { page: pageModel.page + 1, pageSize: pageModel.pageSize, title }
    },
    notifyOnNetworkStatusChange: true,
    onCompleted(_data) {
      setRowCount(_data?.getPostsForCMS?.total ?? 0)
    },
    onError() {}
  })

  const toEditPage = (id?: string) => {
    navigate({
      pathname: `${pathname}/edit`,
      search: stringifySearch({ id })
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      valueGetter: (_, row) => row._id,
      flex: 1
    },
    { field: 'title', headerName: 'Title', flex: 2 },
    {
      field: 'summary',
      headerName: 'Summary',
      renderCell: (params: GridRenderCellParams<IPostItem>) => (
        <Tooltip title={params.row.summary} placement="top">
          <span>{params.row.summary.slice(0, 15)}...</span>
        </Tooltip>
      ),
      flex: 2
    },
    {
      field: 'tags',
      headerName: 'Tags',
      renderCell: (params: GridRenderCellParams<IPostItem>) => (
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
      renderCell: (params: GridRenderCellParams<IPostItem>) => {
        const curTitle = params.row.title
        return <ImagePopup imgName={curTitle} imgUrl={params.row.posterUrl} />
      },
      flex: 1
    },
    {
      field: 'isPublic',
      headerName: 'IsPublic',
      renderCell: (params: GridRenderCellParams<IPostItem>) => {
        const { _id, isPublic } = params.row

        return (
          <Switch
            checked={isPublic}
            onChange={(e) => {
              updatePostById({
                variables: { input: { isPublic: e.target.checked, id: _id } },
                optimisticResponse: {
                  updatePostById: {
                    ...params.row,
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
      renderCell: (params: GridRenderCellParams<IPostItem>) => (
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
                onOk={() =>
                  deletePosts({
                    variables: {
                      ids: selectedRows.map((row) => row.toString())
                    }
                  })
                }
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
            // onClick={() => fetchData(page, pageSize, title)}
          >
            <Search />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="clear"
            // onClick={() => fetchData(page, pageSize, '')}
          >
            <Clear />
          </IconButton>
        </Paper>
      </section>
      <DataGrid
        rowHeight={88}
        loading={loading}
        getRowId={(row) => row._id}
        rows={data?.getPostsForCMS.items ?? []}
        columns={columns}
        rowCount={rowCount}
        checkboxSelection
        onRowSelectionModelChange={(selected) => {
          setSelectedRows(selected)
        }}
        pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
        paginationModel={pageModel}
        paginationMode="server"
        onPaginationModelChange={(paginationModel) => {
          console.log(paginationModel)
          setPageModel(paginationModel)
        }}
      />
    </div>
  )
}

export default PostList

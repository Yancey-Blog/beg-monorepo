import { FC } from 'react'
import { DateTime } from 'luxon'
import { formatJSONDate } from 'yancey-js-util'
import classNames from 'classnames'
import { Tooltip } from 'react-tooltip'
import CalendarHeatmap, {
  ReactCalendarHeatmapValue,
  TooltipDataAttrs
} from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Paper } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'
import {
  IPostStatistics,
  IPostStatisticsGroupItem
} from 'src/containers/Post/types'

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow:
        'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px!important',
      borderRadius: '16px!important'
    },

    heatmapPaper: {
      padding: '0 16px',
      '& svg': {
        width: '100%',
        height: '100%'
      }
    },

    preWrap: {
      whiteSpace: 'pre-wrap'
    }
  })
)

interface Props {
  loading: boolean
  data: IPostStatistics[]
}

const PostStatistics: FC<Props> = ({ data }) => {
  const classes = useStyles()

  return (
    <Paper className={classNames(classes.paper, classes.heatmapPaper)}>
      <CalendarHeatmap
        startDate={new Date(DateTime.now().plus({ years: -1 }).toISODate())}
        endDate={new Date(DateTime.now().toISODate())}
        values={data.map((postStatisticsItem) => ({
          date: postStatisticsItem._id,
          ...postStatisticsItem
        }))}
        classForValue={(value?: ReactCalendarHeatmapValue<string>) => {
          if (!value) {
            return 'color-empty'
          }
          return `color-gitlab-${value.count}`
        }}
        tooltipDataAttrs={(
          value?: ReactCalendarHeatmapValue<string>
        ): TooltipDataAttrs => ({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          'data-tooltip-id': 'my-tooltip',
          'data-tooltip-content': value?.date
            ? value?.items
                ?.map(
                  (item: IPostStatisticsGroupItem) =>
                    `「${item.postName}」 is ${item.scenes} at ${formatJSONDate(
                      item.operatedAt
                    )}`
                )
                .join('\n')
            : `No contributions on the day.`
        })}
        showWeekdayLabels
      />
      <Tooltip id="my-tooltip" className={classes.preWrap} />
    </Paper>
  )
}

export default PostStatistics

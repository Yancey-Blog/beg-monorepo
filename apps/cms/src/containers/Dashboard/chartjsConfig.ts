import { DateTime } from 'luxon'
import { ChartData } from 'chart.js'
import { IBandwagonUsageStatus } from './types'

const chartConfig = (
  usageStatus: IBandwagonUsageStatus[],
  limit: number,
  type1: Exclude<keyof IBandwagonUsageStatus, 'timestamp'>,
  type2?: Exclude<keyof IBandwagonUsageStatus, 'timestamp'>
): ChartData<'line'> => ({
  labels: usageStatus
    .map(({ timestamp }) =>
      DateTime.fromSeconds(+timestamp).toFormat('MM-dd HH:mm')
    )
    .slice(-limit),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
  datasets: [
    {
      data: usageStatus
        .map((usageStat) =>
          type1 === 'cpu_usage'
            ? usageStat[type1]
            : (Number(usageStat[type1]) * 8) / 60 / 1024 / 1024
        )
        .slice(-limit),
      label: type1.split('_').join(' ').toUpperCase().replace('BYTES', ''),
      borderColor: 'rgb(21, 222, 218)',
      backgroundColor: 'rgba(21, 222, 218, .2)',
      fill: true
    },
    type2 && {
      data: usageStatus
        .map((usageStat) => (Number(usageStat[type2]) * 8) / 60 / 1024 / 1024)
        .slice(-limit),
      label: type2.split('_').join(' ').toUpperCase().replace('BYTES', ''),
      borderColor: 'rgb(51, 112, 255)',
      backgroundColor: 'rgba(51, 112, 255, .2)',
      fill: true
    }
  ].filter(Boolean)
})

export default chartConfig

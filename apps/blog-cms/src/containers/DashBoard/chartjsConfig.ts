import { DateTime } from 'luxon'
import { ChartData } from 'chart.js'
import { IBandwagonUsageStatus } from 'src/containers/DashBoard/types'

const chartConfig = (
  usageStatus: IBandwagonUsageStatus[],
  limit: number,
  type1: Exclude<keyof IBandwagonUsageStatus, 'timestamp'>,
  type2?: Exclude<keyof IBandwagonUsageStatus, 'timestamp'>
): ChartData<'line'> => ({
  labels: usageStatus
    .map(({ timestamp }) => DateTime.fromSeconds(+timestamp).toFormat('HH:mm'))
    .slice(-limit),
  // @ts-ignore
  datasets: [
    {
      data: usageStatus
        .map((usageStat) =>
          type1 === 'cpu_usage'
            ? usageStat[type1]
            : parseInt(usageStat[type1], 10) / 1024 / 1024
        )
        .slice(-limit),
      label: type1.split('_').join(' ').toUpperCase().replace('BYTES', '(Mb)'),
      borderColor: 'rgb(21, 222, 218)',
      backgroundColor: 'rgba(21, 222, 218, .2)',
      fill: true
    },
    type2 && {
      data: usageStatus
        .map((usageStat) => parseInt(usageStat[type2], 10) / 1024 / 1024)
        .slice(-limit),
      label: type2.split('_').join(' ').toUpperCase().replace('BYTES', '(Mb)'),
      borderColor: 'rgb(51, 112, 255)',
      backgroundColor: 'rgba(51, 112, 255, .2)',
      fill: true
    }
  ].filter(Boolean)
})

export default chartConfig

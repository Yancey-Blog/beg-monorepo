import { FC, useState } from 'react'
import { Line } from 'react-chartjs-2'
import chartConfig from '../chartjsConfig'
import { IBandwagonUsageStatus } from '../types'
import ToggleChart from './ToggleChart'
import UsageStatusSkeleton from './UsageStatusSkeleton'

interface Props {
  usageStatus: IBandwagonUsageStatus[]
  isFetchingUsageStatus: boolean
}

const CPUChart: FC<Props> = ({ usageStatus, isFetchingUsageStatus }) => {
  const [cpuLimit, setCPULimit] = useState(12)

  return (
    <>
      {isFetchingUsageStatus ? (
        <UsageStatusSkeleton />
      ) : (
        <ToggleChart handleToggleChange={(value: number) => setCPULimit(value)}>
          <Line
            data={chartConfig(usageStatus, cpuLimit, 'cpu_usage')}
            options={{
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'CPU Usage, 100% = 1 Core'
                },
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  display: true,
                  ticks: {
                    callback: function (value) {
                      return `${value}%`
                    }
                  }
                }
              }
            }}
            height={375}
          />
        </ToggleChart>
      )}
    </>
  )
}

export default CPUChart

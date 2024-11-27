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

const DiskChart: FC<Props> = ({ usageStatus, isFetchingUsageStatus }) => {
  const [diskLimit, setDiskLimit] = useState(12)

  return (
    <>
      {isFetchingUsageStatus ? (
        <UsageStatusSkeleton />
      ) : (
        <ToggleChart
          handleToggleChange={(value: number) => setDiskLimit(value)}
        >
          <Line
            data={chartConfig(
              usageStatus,
              diskLimit,
              'disk_write_bytes',
              'disk_read_bytes'
            )}
            options={{
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'Storage I/O'
                }
              },
              scales: {
                y: {
                  display: true,
                  ticks: {
                    callback: function (value) {
                      return `${value} Mbps`
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

export default DiskChart

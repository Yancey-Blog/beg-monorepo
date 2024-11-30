import { useQuery } from '@apollo/client'
import { ArchiveModel } from '@repo/graphql-types/__generated__/graphql'
import orderBy from 'lodash.orderby'
import { DateTime } from 'luxon'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import ImageHeader from 'src/components/ImageHeader/ImageHeader'
import { ARCHIVE } from 'src/containers/Post/typeDefs'
import { months } from 'src/shared/constants'
import {
  ArchiveWrapper,
  Day,
  DayItem,
  DayList,
  Month,
  MonthTxt,
  Year,
  YearList
} from './styled'

const Archive: FC = () => {
  const { data } = useQuery(ARCHIVE, {
    notifyOnNetworkStatusChange: true
  })

  const totalYearCount = (year: ArchiveModel) => {
    const total = year.months.reduce((acc, month) => acc + month.days.length, 0)
    return total > 1 ? `${total} posts` : `${total} post`
  }

  return (
    <>
      <ImageHeader title="Archive" imageUrl="/archive_page_header.jpg" />

      <ArchiveWrapper>
        {!data
          ? null
          : data.archive.map((year) => (
              <Fragment key={year._id}>
                <Year>{`${year._id} (${totalYearCount(year)})`}</Year>
                <YearList>
                  {year.months.map((month) => (
                    <li key={month.month}>
                      <input type="checkbox" name="tabs" />
                      <label>
                        <Month>
                          <MonthTxt>
                            {months[month.month - 1]}
                            {'. '}({month.days.length}{' '}
                            {month.days.length > 1 ? 'posts' : 'post'})
                          </MonthTxt>
                        </Month>
                      </label>
                      <DayList className="dayListContainer">
                        {
                          // TODO:
                          // The problem of descend ordering by `createdAt`
                          // need to be solved by the backend.
                          orderBy(month.days, ['createdAt'], ['desc']).map(
                            (day) => (
                              <DayItem key={day.id}>
                                <Day>
                                  {DateTime.fromISO(day.createdAt).day}
                                  {': '}
                                </Day>
                                <Link href={`/post/${day.id}`}>
                                  {day.title} ({day.pv} PV)
                                </Link>
                              </DayItem>
                            )
                          )
                        }
                      </DayList>
                    </li>
                  ))}
                </YearList>
              </Fragment>
            ))}
      </ArchiveWrapper>
    </>
  )
}

export default Archive

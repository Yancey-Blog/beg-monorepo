import { useQuery } from '@apollo/client'
import ImageHeader from 'src/components/ImageHeader/ImageHeader'
import SkeletonIterator from 'src/components/SkeletonIterator/SkeletonIterator'
import { POSTS } from 'src/containers/Post/typeDefs'
import BestAlbum from './components/BestAlbum'
import BestAlbumSkeleton from './components/BestAlbumSkeleton'
import Card from './components/Card'
import CardSkeleton from './components/CardSkeleton'
import LiveTour from './components/LiveTour'
import LiveTourSkeleton from './components/LiveTourSkeleton'
import {
  BestAlbumWrapper,
  LiveToursMusicNotes,
  MusicNotes,
  MusicWrapper,
  SubTitle,
  Title,
  YanceyMusicWrapper
} from './styled'
import { BEST_ALBUMS, LIVE_TOURS, YANCEY_MUSIC } from './typeDefs'

const Music = () => {
  const { data: liveTours } = useQuery(LIVE_TOURS)
  const { data: bestAlbums } = useQuery(BEST_ALBUMS)
  const { data: yanceymusics } = useQuery(YANCEY_MUSIC)
  const { data: posts } = useQuery(POSTS, {
    variables: {
      input: {
        page: 1,
        pageSize: 4,
        tag: 'Music'
      }
    }
  })

  return (
    <>
      <Title>
        <ImageHeader title="Music" imageUrl="/music_page_header.jpg" />
      </Title>

      <MusicWrapper>
        <LiveToursMusicNotes>
          <div>
            <SubTitle>LIVE TOURS</SubTitle>
            {!liveTours ? (
              <SkeletonIterator
                count={1}
                skeletonComponent={<LiveTourSkeleton />}
              />
            ) : (
              <LiveTour liveTours={liveTours.getLiveTours} />
            )}
          </div>
          <div>
            <SubTitle>MUSIC NOTES</SubTitle>

            <MusicNotes>
              {!posts ? (
                <SkeletonIterator
                  count={4}
                  skeletonComponent={<CardSkeleton />}
                />
              ) : (
                posts.posts.items.map((post) => (
                  <Card
                    key={post._id}
                    type="note"
                    url={post._id}
                    title={post.summary}
                    date={post.createdAt}
                    cover={post.posterUrl}
                  />
                ))
              )}
            </MusicNotes>
          </div>
        </LiveToursMusicNotes>

        <div>
          <SubTitle>BEST ALBUM</SubTitle>
          <BestAlbumWrapper>
            {!bestAlbums ? (
              <SkeletonIterator
                count={4}
                skeletonComponent={<BestAlbumSkeleton />}
              />
            ) : (
              bestAlbums.getBestAlbums
                .slice(0, 4)
                .map((bestAlbum) => (
                  <BestAlbum key={bestAlbum._id} bestAlbum={bestAlbum} />
                ))
            )}
          </BestAlbumWrapper>
        </div>

        <div>
          <SubTitle>YANCEY MUSIC</SubTitle>
          <YanceyMusicWrapper>
            {!yanceymusics ? (
              <SkeletonIterator
                count={4}
                skeletonComponent={<CardSkeleton />}
              />
            ) : (
              yanceymusics.getYanceyMusic.map((yanceyMusic) => (
                <Card
                  key={yanceyMusic._id}
                  url={yanceyMusic.soundCloudUrl}
                  title={yanceyMusic.title}
                  date={yanceyMusic.releaseDate}
                  cover={yanceyMusic.posterUrl}
                />
              ))
            )}
          </YanceyMusicWrapper>
        </div>
      </MusicWrapper>
    </>
  )
}

export default Music

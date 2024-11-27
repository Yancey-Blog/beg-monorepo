import { FC, useRef, useEffect, useState } from 'react'
import Script from 'next/script'
import { useQuery } from '@apollo/client'
import { APLAYER_CDN } from 'src/shared/constants'
import { PLAYERS } from '../typeDefs'
import { PlayerQuery } from '../types'

const Player: FC = () => {
  const { data } = useQuery<PlayerQuery>(PLAYERS)
  const plyaerRef = useRef<HTMLDivElement>(null)
  const [isLoadedScript, setIsLoadedScript] = useState(false)

  useEffect(() => {
    // @ts-ignore
    if (data && plyaerRef && plyaerRef.current && isLoadedScript) {
      // @ts-ignore
      const ap = new APlayer({
        container: plyaerRef.current,
        fixed: true,
        lrcType: 1,
        preload: 'none',
        audio: data.players.map((musicTrack) => {
          const { title, artist, lrc, coverUrl, musicFileUrl } = musicTrack
          return {
            name: title,
            artist,
            url: musicFileUrl,
            cover: coverUrl,
            lrc
          }
        })
      })
      ap.lrc.show()
    }
  }, [data, plyaerRef, isLoadedScript])

  return (
    <>
      <div ref={plyaerRef} />
      <Script
        src={APLAYER_CDN}
        onLoad={() => {
          setIsLoadedScript(true)
        }}
      />
    </>
  )
}

export default Player

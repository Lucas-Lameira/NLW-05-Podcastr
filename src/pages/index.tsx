import {GetStaticProps} from 'next';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';

import { convertDurationToTImeString } from '../utils/convertDurationToTImeString';
import {dayMonthYear} from '../utils/dateFormat';
import {api} from '../services/api';
import styles from './home.module.scss';

import { usePlayer } from '../context/PlayerContext';

type Episode = {
  id : string,
  title : string,
  members : string,
  publishedAt : string,
  thumbnail : string,
  url : string,
  duration: number
  durationAsString : string
}

type HomeProps = {
  latestEpisodes: Array<Episode>,//same result
  allEpisodes: Episode[] //same result
}

export default function Home({latestEpisodes, allEpisodes}: HomeProps) {
  const {playList} = usePlayer();

  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home Podcastr nlw#5 | Desenvolvido na Next Level Week 💜 </title>
      </Head>
      <section className={styles.latestEpisodes}>
        <h2>Ultimos lançamentos</h2>
        
        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image 
                  width={192} 
                  height={192} 
                  src={episode.thumbnail} 
                  alt={episode.title}
                  objectFit="cover"
                />

                <div className={styles.episodeDetails}>
                  <Link href={`episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>

                <button onClick={ () => playList(episodeList, index)}>
                  <img src="/play-green.svg" alt="green play button"/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

       <section className={styles.allEpisodes}>
          <h2>Todos os Episódios</h2>

          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map((episode, index) => {
                return(
                  <tr key={episode.id}>
                    <td style={{width: 60}}>
                      <Image 
                        width={120} 
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </td>

                    <td>
                      <Link href={`episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>

                    <td>{episode.members}</td>
                    <td style={{width: 100}}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button onClick={() => playList(episodeList, index + latestEpisodes.length)}>
                        <img src="/play-green.svg" alt="tocar episódio"/>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
       </section>
    </div>
  )
}

//next knows that this function should be handle
export const getStaticProps: GetStaticProps = async () => {
  const {data} = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: dayMonthYear(episode.published_at),
      thumbnail: episode.thumbnail,      
      url: episode.file.url,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTImeString(Number(episode.file.duration))
    }
  })

  const latestEpisodes = episodes.slice(0,2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return{
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8 //time in seconds      
  }
}
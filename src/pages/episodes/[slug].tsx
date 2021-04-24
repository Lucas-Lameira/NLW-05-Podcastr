import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '../../services/api';
import { convertDurationToTImeString } from '../../utils/convertDurationToTImeString';
import { dayMonthYear } from '../../utils/dateFormat';

import styles from './episode.module.scss';

type Episode ={
  id : string,
  title : string,
  members : string,
  publishedAt : string,
  thumbnail : string,
  description : string,
  url : string,
  duration : number
  durationAsString : string
};

type EpisodeProps = {
  episode: Episode
};

export default function Episode({episode}: EpisodeProps) {  

  return (
    <div className={styles.container}>
      <div className={styles.episode}>
        <div className={styles.thumbnailContainer}>
          <Link href="/">
            <button>
              <img src="/arrow-left.svg" alt="botão de voltar com um icone"/>
            </button>
          </Link>
          <Image 
            width={700} 
            height={160}
            src={episode.thumbnail}
            objectFit="cover"
          />

          <button>
            <img src="/play.svg" alt="botão de reproduzir um episódio"/>
          </button>
        </div>

        <header>
          <h1>{episode.title}</h1>
          <span>{episode.members}</span>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </header>

        <div className={styles.description} dangerouslySetInnerHTML={{__html:episode.description}}/>
  
      </div>
    </div>
  )
}

//SSG - Static site generation
export const getStaticPaths:GetStaticPaths = async() => {
  const {data} = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const paths = data.map(episode => {
    return {
      params: { 
        slug: episode.id
      }
    }
  })

  return{
    paths,
    fallback: 'blocking'
  }
}

//SSG - Static site generation
export const getStaticProps:GetStaticProps = async (ctx) => {
  const {slug} = ctx.params;

  const {data} = await api.get(`episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    publishedAt: dayMonthYear(data.published_at),
    thumbnail: data.thumbnail,
    description: data.description,
    url: data.file.url,
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTImeString(Number(data.file.duration))
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 //24 horas
  }
} 
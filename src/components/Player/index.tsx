import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import styles from './styles.module.scss';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Player () {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay,
    setPlayingState
  } = useContext(PlayerContext)

  useEffect(() => {
    if(!audioRef.current) return;

    if(isPlaying) audioRef.current.play()
    else audioRef.current.pause()

  }, [isPlaying]);

  const episode = episodeList[currentEpisodeIndex]

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Playing now"/>
        {/* <strong>Nothning is playing now</strong> */}
        <strong>Tocando agora {episode?.title}</strong>

      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image 
            width={592} 
            height={592} 
            src={episode.thumbnail} 
            alt={episode.title}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (  
        <div className={styles.emptyPlayer}>
          <strong>Choose a podcast...</strong>
        </div>

      )}

      <footer className={!episode ? styles.empty : ''}>
        
        <div className={styles.progress}>
          <span>00:00</span>

          <div className={styles.slider}>
            {episode ? (
              <Slider 
                trackStyle={{backgroundColor: '#84d361'}}
                railStyle={{backgroundColor: '#9f75ff'}}
                handleStyle={{borderColor: '#84d361', borderWidth: 4}}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          
          <span>00:00</span>
        </div>

        {episode && (
          <audio 
            src={episode.url} 
            autoPlay 
            ref={audioRef} 
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}


        <div className={styles.buttons}>
          <button  disabled={!episode}>
            <img src="shuffle.svg" alt="shuffle icon"/>
          </button>

          <button disabled={!episode}>
            <img src="/play-previous.svg" alt="play previous icon"/>
          </button>

          <button 
            className={styles.playButton } 
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying             
              ? <img src="/pause.svg" alt="pause button icon"/>
              : <img src="/play.svg" alt="play button icon"/>
            }

          </button>

          <button disabled={!episode}>
            <img src="/play-next.svg" alt="play next button icon"/>
          </button>

          <button disabled={!episode}>
            <img src="/repeat.svg" alt="repeat button icon"/>
          </button>
        </div>
      </footer>
    </div>
  );
};
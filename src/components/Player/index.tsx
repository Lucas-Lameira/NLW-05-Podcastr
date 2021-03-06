import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import styles from './styles.module.scss';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToTImeString } from '../../utils/convertDurationToTImeString';

export default function Player () {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const {
    episodeList, 
    currentEpisodeIndex, 
    isPlaying,
    isLooping, 
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    clearPlayerState
  } = usePlayer()

  useEffect(() => {
    if(!audioRef.current) return;

    if(isPlaying) audioRef.current.play()
    else audioRef.current.pause()

  }, [isPlaying]);

  const episode = episodeList[currentEpisodeIndex]

  function setupProgressListner () {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate' , () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    })
  }

  function handleSeek (amount: number){
    audioRef.current.currentTime = amount;
    setProgress(amount);
  }

  function handleEnded() {
    if(hasNext){
      playNext()
    }else{
      clearPlayerState()
    }
  }
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
          <span>
            {convertDurationToTImeString(progress)}
          </span>

          <div className={styles.slider}>
            {episode ? (
              <Slider 
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{backgroundColor: '#84d361'}}
                railStyle={{backgroundColor: '#9f75ff'}}
                handleStyle={{borderColor: '#84d361', borderWidth: 4}}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          
          <span>
            {convertDurationToTImeString(episode?.duration ?? 0)}
          </span>
        </div>

        {episode && (
          <audio 
            src={episode.url} 
            autoPlay 
            loop={isLooping}
            ref={audioRef}
            onEnded={handleEnded}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setupProgressListner}
          />
        )}


        <div className={styles.buttons}>
          <button 
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
          >
            <img src="shuffle.svg" alt="shuffle icon"/>
          </button>

          <button disabled={!episode || !hasPrevious} onClick={playPrevious}>
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

          <button disabled={!episode || !hasNext} onClick={playNext}> 
            <img src="/play-next.svg" alt="play next button icon"/>
          </button>

          <button 
            disabled={!episode} 
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="repeat button icon"/>
          </button>
        </div>
      </footer>
    </div>
  );
};
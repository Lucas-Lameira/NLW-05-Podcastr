import styles from './styles.module.scss';

export default function Player () {
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Playing now"/>
        <strong>Nothning is playing now</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Choose a podcast...</strong>
      </div>

      <footer className={styles.empty}>
        
        <div className={styles.progress}>
          <span>00:00</span>

          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button>
            <img src="shuffle.svg" alt="shuffle icon"/>
          </button>

          <button>
            <img src="/play-previous.svg" alt="play previous icon"/>
          </button>

          <button className={styles.playButton }>
            <img src="/play.svg" alt="play button icon"/>
          </button>

          <button>
            <img src="/play-next.svg" alt="play next button icon"/>
          </button>

          <button>
            <img src="/repeat.svg" alt="repeat button icon"/>
          </button>
        </div>
      </footer>
    </div>
  );
};
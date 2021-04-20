import React from 'react'
import styles from './styles.module.scss';
import {weekDayMonth} from '../../utils/dateFormat';

export default function Header() {

  

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="podcaster logo"/>

      <p>The best for you to listen</p>

      <span>{weekDayMonth()}</span>
    </header>
  )
}

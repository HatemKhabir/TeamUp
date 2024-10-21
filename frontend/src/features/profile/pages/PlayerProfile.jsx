import PlayerProfileImages from '../components/PlayerProfileImages'
import styles from './PlayerProfile.module.css'
function PlayerProfile() {
  return (
  <div className={styles.player_profile_page}>
      <PlayerProfileImages/>
  </div>
  )
}

export default PlayerProfile
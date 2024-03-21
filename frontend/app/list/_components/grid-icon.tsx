import styles from "./grid-icon.module.css";

export function GridIcon() {
  return <div className={styles.container}>
    <div className={styles.box}></div>
    <div className={styles.box}></div>
    <div className={styles.box}></div>

    <div className={styles.box}></div>
    <div className={styles.box}></div>
    <div className={styles.box}></div>
  </div>
}
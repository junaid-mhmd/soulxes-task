import styles from "./styles.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSpinner} />
      <span className={styles.loadingText}>Loading</span>
    </div>
  );
}

export default Loading;

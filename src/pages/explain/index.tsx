import './index.module.css';
import styles from './index.module.css';

function Explain() {
  return (
    <div className={styles.explaincontainer}>
      <div className={styles.h1}>どのような聞き方をすればよいのか</div>
      <div className={styles.p}>ここは説明ページです。</div>
      <button className={styles.btn}>もっと詳しく</button>
    </div>
  );
}

export default Explain;

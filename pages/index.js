import styles from "../styles/Home.module.css";
import { Header, Editor } from "../components";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Editor />
    </div>
  );
}

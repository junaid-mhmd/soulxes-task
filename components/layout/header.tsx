import Container from "@/components/ui/container";
import styles from "./styles.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <h1>GlobGoer</h1>
      </Container>
    </header>
  );
}

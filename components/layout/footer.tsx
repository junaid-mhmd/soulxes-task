import Container from "@/components/ui/container";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import styles from "./styles.module.scss";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerInner}>
          <div className={styles.footerLeft}>
            <ul className={styles.socialLinks}>
              <li>
                <Link href="#" target="_blank">
                  <Twitter size={24} />
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank">
                  <Instagram size={24} />
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank">
                  <Facebook size={24} />
                </Link>
              </li>
            </ul>
            <span className={styles.brand}>GlobGoer</span>
          </div>
          <p className={styles.copyright}>© {currentYear} GlobGoer Inc.</p>
        </div>
      </Container>
    </footer>
  );
}

import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import styles from "./styles.module.scss";

export default function RightBoxItem({
  title,
  description,
  cta,
  icon: Icon,
  image,
}: {
  title: string;
  description: string;
  cta: string;
  icon?: LucideIcon;
  image?: string;
}) {
  return (
    <article className={styles.promoCard}>
      <div className={styles.promoIcon}>
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className={styles.promoImage}
          />
        ) : Icon ? (
          <Icon size={48} />
        ) : null}
      </div>
      <div className={styles.promoContent}>
        <h4>{title}</h4>
        <p>{description}</p>
        <button type="button">{cta}</button>
      </div>
    </article>
  );
}

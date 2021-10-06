import useScroll from "../hooks/useScroll";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function SomeOtherComponent() {
  const { createScrollTarget, createFocusTarget, next } = useScroll();

  return (
    <div
      className="something-else"
      {...createScrollTarget("something-else", { delay: 1000 })}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae earum
        tenetur eaque animi enim iste voluptatem. Accusamus dolorem mollitia
        illo praesentium, culpa enim est dolores?
      </p>
      <button
        onClick={() => {
          next();
        }}
      >
        NEXT
      </button>

      <button
        className={styles.someFocusTarget}
        {...createFocusTarget("something-else")}
      >
        SHOULD BE BLUE WHEN FOCUSED
      </button>
    </div>
  );
}

import useScroll from "../hooks/useScroll";
import { useEffect } from "react";

export default function SomeOtherComponent() {
  const { createScrollTarget, next } = useScroll();

  return (
    <div className="something-else" {...createScrollTarget("something-else")}>
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
    </div>
  );
}

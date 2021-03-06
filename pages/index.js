import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import useScroll from "../hooks/useScroll";
import { useEffect } from "react";

import SomeOtherComponent from "../components/SomeOtherComponent";

export default function Home() {
  const { createScrollTarget, start, reset, next, setSequence, setOptions } =
    useScroll();

  useEffect(() => {
    reset();
    setOptions({ filterByMounted: true, offset: -50 });
    setSequence(
      "target 0",
      "target 1",
      "target 2",
      "something-else",
      "target 4",
      "target 5",
      "target 6",
      "target 7",
      "target 8",
      "target 9"
    );
    start();

    return () => {
      reset();
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Scroll test</h1>

        <div className="styles next">
          <button
            onClick={() => {
              next();
            }}
          >
            NEXT
          </button>
        </div>

        <div className={styles.box} {...createScrollTarget("target 0")}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
            quisquam delectus cupiditate velit alias earum nostrum ipsam, at
            hic. Deserunt repudiandae alias totam inventore, temporibus
            excepturi? Debitis, animi? Iste, sunt.
          </p>
        </div>
        <SomeOtherComponent />
        {/* <div className={styles.box} {...createScrollTarget("target 1")}>
          <p>
            Quam iure ad aut adipisci illum, similique sint molestiae ut, nemo
            temporibus accusamus voluptates obcaecati soluta accusantium magnam
            amet repellendus laboriosam laborum modi alias ipsa ea aspernatur.
            Optio, numquam corporis.
          </p>
        </div> */}
        <div className={styles.box} {...createScrollTarget("target 2")}>
          <p>
            Earum qui officia nostrum totam est quasi sit tempora soluta.
            Inventore beatae error veritatis ipsam. Ex fugit aliquid explicabo
            repellendus nemo magnam sunt eum obcaecati debitis, culpa temporibus
            officiis minus.
          </p>
        </div>
        <div className={styles.box} {...createScrollTarget("target 3")}>
          <p>
            Possimus maxime voluptas consectetur atque deserunt perspiciatis,
            tenetur voluptatem accusantium neque corrupti dolorem amet officiis
            fugiat? Vel, voluptatibus amet. Assumenda eveniet corrupti tempora
            consequuntur iusto error reprehenderit similique quidem atque.
          </p>
        </div>
        <div className={styles.box} {...createScrollTarget("target 4")}>
          <p>
            Ex blanditiis accusamus, exercitationem aperiam doloribus voluptate
            in consequuntur! Illum natus repellat ad, aliquid corrupti neque
            consectetur voluptatum cumque nostrum! Maxime et dicta cupiditate
            est quisquam labore sint eos placeat.
          </p>
        </div>
        <div className={styles.box} {...createScrollTarget("target 5")}>
          <p>
            Sint unde dignissimos culpa iste in accusamus quaerat consequatur,
            deserunt expedita quam ab impedit et excepturi facere commodi rerum
            maxime! Ratione veritatis natus eveniet accusantium possimus amet
            deleniti dolorum expedita.
          </p>
        </div>
        <div className={styles.box} {...createScrollTarget("target 6")}>
          <p>
            Doloribus eaque nisi quos pariatur, sequi ullam inventore
            perspiciatis reiciendis commodi, ratione libero rem a repellat ad
            beatae tempora! Assumenda quod exercitationem nesciunt nemo illo
            veritatis quisquam libero placeat soluta.
          </p>
        </div>
        <div className={styles.box} {...createScrollTarget("target 7")}>
          <p>
            Eius recusandae suscipit nam harum neque excepturi dolor eligendi
            consequuntur. Atque perferendis blanditiis vitae amet quis
            voluptates, excepturi, incidunt nemo accusantium provident, deserunt
            ut? Velit, nobis. Numquam voluptates laborum adipisci.
          </p>
        </div>
        <div className={styles.box} {...createScrollTarget("target 8")}>
          <p>
            Modi laboriosam qui enim praesentium quam illo molestiae magnam
            dicta, voluptatem labore culpa esse numquam eius ut, aperiam
            similique sit officiis alias distinctio, fugiat voluptas nemo eos
            corporis. Obcaecati, debitis!
          </p>
        </div>
        <div className={styles.box} {...createScrollTarget("target 9")}>
          <p>
            Placeat assumenda labore, quia velit quam illo debitis sit sequi
            temporibus suscipit! Dolorem fugit quod, nihil eaque assumenda ea,
            sint voluptates harum et rerum excepturi debitis eligendi ut
            voluptate numquam?
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

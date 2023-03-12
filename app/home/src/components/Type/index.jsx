import { useEffect, useRef } from "react";
import Typed from 'typed.js';

// strings: [
//     "Some <i>strings</i> are slanted",
//     "Some <strong>strings</strong> are bold",
//     "HTML characters &times; &copy;",
//   ],
//   typeSpeed: 50,
//   backSpeed: 50,
export default function TypedComponent({ strings = [], resOptions = {} }) {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);
  // Create reference to store the Typed instance itself
  const typed = useRef(null);
  console.log({resOptions})
  useEffect(() => {
    const options = {
      strings,
      typeSpeed: 50,
      backSpeed: 50,
      // smartBackspace: true,
      loop: true,
      ...resOptions,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  return <span ref={el} />;
}

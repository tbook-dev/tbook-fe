import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function ({ src, alt, className }) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      placeholder={
        <svg
          width="359"
          height="172"
          viewBox="0 0 359 172"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="359" height="172" fill="#F0F0F0" />
        </svg>
      }
      className={className}
      width={"100%"}
      height="100%"
    />
  );
}

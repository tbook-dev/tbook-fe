import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import holderSvg from '@/images/holder.svg';

export default function ({ src, alt, className }) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      placeholderSrc={holderSvg}
      className={className}
      width="100%"
      height="100%"
    />
  );
}

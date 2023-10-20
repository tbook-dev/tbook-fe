import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function ({ src, alt, className }) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      placeholder={
        <div className="bg-[#F0F0F0] w-full h-[172px] lg:h-[294px]"/>
      }
      className={className}
      width={"100%"}
      height="100%"
    />
  );
}

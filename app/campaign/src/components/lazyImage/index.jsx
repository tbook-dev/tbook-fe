import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import banner from '@/images/banner.png'
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0'+
  'JveD0iMCAwIDE0MCAxNDAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj4KICA8cGF0aCBkPSJNMTE4Lj'+
  'csMTQwIGMwLjYsMC4zLDAuOSwxLjIsMC4zLDEuOGMwLjcsMC40LDEuMywxLjUsMS44LDEuN2MxLjksM'+
  'CwyLjEsMC45LDIuMSwxLjdzLTEuOC0wLjItMi41LTEuMmMtMC42LTAuMi0xLjItMC40LTEuMi0wLj'+
  'RzLTEuOCwwLjItMi41LDEuMmMwLjYsMC4yLDEuMi0wLjQsMS4yLTAuNHMxLjgsMC4yLDIuNSwxLj'+
  'IgYzAuNiwwLjIsMS4yLDAuNCwxLjIsMC40UzEwOS42LDE0MCwxMTguNywxNDAiLz4KPC9zdmc+Cg==';


export default function ({ src, alt, className }) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      placeholderSrc={banner}
      className={className}
      width={"100%"}
      height="100%"
    />
  );
}

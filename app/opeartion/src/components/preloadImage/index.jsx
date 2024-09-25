import React, { useEffect, useState } from "react";

const PreloadImage = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setIsLoading(false);
    };

    return () => {
      // Clean up the image object
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return (
    <div>
      {isLoading ? (
        <div className={className}></div>
      ) : (
        <img src={src} alt={alt} className={className} />
      )}
    </div>
  );
};

export default PreloadImage;

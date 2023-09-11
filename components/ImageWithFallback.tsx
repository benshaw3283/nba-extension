import defaultPic from "../public/darius_days.png";

import { useState, useEffect } from "react";
import Image from "next/image";

const ImageWithFallback = ({
  fallbackImage = defaultPic,
  alt,
  src,
  ...props
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallbackImage : src}
      {...props}
      width={props.width}
      height={props.height}
    />
  );
};

export default ImageWithFallback;

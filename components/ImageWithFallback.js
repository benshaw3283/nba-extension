import defaultPic from "../public/darius_days.png";

import { useState, useEffect } from "react";
import Image from "next/image";

const ImageWithFallback = ({
  fallbackImage = defaultPic,

  ...props
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [props.src]);

  return (
    <Image
      alt={props.alt}
      onError={() => setError(true)}
      src={error ? fallbackImage : props.src}
      {...props}
      width={props.width}
      height={props.height}
    />
  );
};

export default ImageWithFallback;

import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface WorkImageProps {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = ({ image, alt = "Project preview", video, link }: WorkImageProps) => {
  const [showVideo, setShowVideo] = useState(false);

  const media = (
    <>
      {link && (
        <span className="work-link" aria-hidden="true">
          <MdArrowOutward />
        </span>
      )}
      <img src={image} alt={alt} loading="lazy" decoding="async" />
      {showVideo && video && (
        <video src={video} autoPlay muted playsInline loop aria-label={`${alt} video`} />
      )}
    </>
  );

  return (
    <div className="work-image">
      {link ? (
        <a
          className="work-image-in"
          href={link}
          onMouseEnter={() => setShowVideo(true)}
          onMouseLeave={() => setShowVideo(false)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="disable"
          aria-label={`Open ${alt}`}
        >
          {media}
        </a>
      ) : (
        <div
          className="work-image-in"
          onMouseEnter={() => setShowVideo(true)}
          onMouseLeave={() => setShowVideo(false)}
        >
          {media}
        </div>
      )}
    </div>
  );
};

export default WorkImage;

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageSequence = ({ frameCount = 240 }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const sequence = useRef({ frame: 0 });

  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    const preloadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i.toString().padStart(3, '0')}.jpg`;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / frameCount) * 100));
          if (loadedCount === frameCount) {
            setIsLoading(false);
          }
        };
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    preloadImages();
  }, [frameCount]);

  useEffect(() => {
    if (isLoading || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const render = () => {
      const frameIndex = Math.round(sequence.current.frame);
      const img = images[frameIndex] || images[0];

      if (img && img.complete) {
        const scale = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * scale;
        canvas.height = window.innerHeight * scale;

        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const tl = gsap.to(sequence.current, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: "main", // Animates over entire page scroll
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      onUpdate: render,
    });

    window.addEventListener('resize', render);
    render();

    return () => {
      tl.kill();
      window.removeEventListener('resize', render);
    };
  }, [isLoading, images, frameCount]);

  return (
    <>
      {isLoading && (
        <div className="loader">
          <div className="loader-text">PREPARING EXPERIENCE... {progress}%</div>
        </div>
      )}
      <div className="canvas-container">
        <canvas ref={canvasRef} id="hero-canvas" />
      </div>
    </>
  );
};

export default ImageSequence;

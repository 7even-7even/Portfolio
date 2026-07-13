gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");
const progressText = document.getElementById("progress");
const loader = document.querySelector(".loader");

const frameCount = 240;
const currentFrame = index => (
  `./frames/frame_${(index + 1).toString().padStart(3, '0')}.jpg`
);

const images = [];
const airpods = {
  frame: 0
};

let imagesLoaded = 0;
let animationStarted = false;

// Set canvas size for high DPI screens
function setCanvasSize() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    render();
}

const preloadImages = () => {
  // Graceful fallback: start anyway after 8 seconds if at least 20% is loaded
  const timeoutId = setTimeout(() => {
    if (!animationStarted && imagesLoaded > frameCount * 0.2) {
        console.warn("Loading slow, starting with partial frames...");
        startAnimation();
    }
  }, 8000);

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.onload = () => {
      imagesLoaded++;
      const progress = Math.round((imagesLoaded / frameCount) * 100);
      if (progressText) progressText.textContent = `${progress}%`;
      if (imagesLoaded === frameCount) {
        clearTimeout(timeoutId);
        startAnimation();
      }
    };
    img.onerror = () => {
        console.error(`Failed to load image: ${currentFrame(i)}`);
        imagesLoaded++;
        if (imagesLoaded === frameCount) {
            clearTimeout(timeoutId);
            startAnimation();
        }
    };
    img.src = currentFrame(i);
    images.push(img);
  }
};

const render = () => {
  const frameIndex = Math.round(airpods.frame);
  // Try to find the nearest loaded image if the current frame isn't loaded yet
  let img = images[frameIndex];
  
  if (!img || !img.complete || img.naturalWidth === 0) {
      // Look for the closest loaded frame
      for (let i = 1; i < frameCount; i++) {
          const next = images[frameIndex + i];
          const prev = images[frameIndex - i];
          if (next && next.complete && next.naturalWidth !== 0) {
              img = next;
              break;
          }
          if (prev && prev.complete && prev.naturalWidth !== 0) {
              img = prev;
              break;
          }
      }
  }

  if (!img || !img.complete || img.naturalWidth === 0) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  const canvasRatio = canvasWidth / canvasHeight;
  const imgRatio = imgWidth / imgHeight;

  let drawWidth, drawHeight, offsetX, offsetY;

  if (canvasRatio > imgRatio) {
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawWidth = canvasHeight * imgRatio;
    drawHeight = canvasHeight;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
};

const startAnimation = () => {
  if (animationStarted) return;
  animationStarted = true;
  
  if (loader) loader.classList.add("hidden");
  
  gsap.to(airpods, {
    frame: frameCount - 1,
    roundProps: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=400%", // 400% of viewport height scroll distance
      scrub: 0.5, // Lower value for more responsive feel, higher for smoother
      pin: true,
      anticipatePin: 1,
    },
    onUpdate: render
  });

  // Hero text animation
  const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "+=100%",
        scrub: true,
    }
  });

  tl.fromTo(".hero-content", { opacity: 1 }, { opacity: 0, y: -100, ease: "none" });

  // Initial render
  render();
};

window.addEventListener("resize", setCanvasSize);

// Initialize
setCanvasSize();
preloadImages();

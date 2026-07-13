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
const sequence = {
  frame: 0
};

let imagesLoaded = 0;
let animationStarted = false;

function setCanvasSize() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    render();
}

const preloadImages = () => {
  const timeoutId = setTimeout(() => {
    if (!animationStarted && imagesLoaded > frameCount * 0.1) {
        startAnimation();
    }
  }, 10000);

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
  const frameIndex = Math.round(sequence.frame);
  let img = images[frameIndex];
  
  // Fallback for missing frames
  if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = 1; i < 20; i++) {
          const next = images[frameIndex + i];
          const prev = images[frameIndex - i];
          if (next && next.complete && next.naturalWidth !== 0) { img = next; break; }
          if (prev && prev.complete && prev.naturalWidth !== 0) { img = prev; break; }
      }
  }

  if (!img || !img.complete || img.naturalWidth === 0) return;

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
};

const startAnimation = () => {
  if (animationStarted) return;
  animationStarted = true;
  if (loader) loader.classList.add("hidden");
  
  // Main scroll-linked sequence
  // We span the entire page scroll to the frame sequence
  gsap.to(sequence, {
    frame: frameCount - 1,
    ease: "none",
    scrollTrigger: {
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
    onUpdate: render
  });

  // Animate sections
  const sections = gsap.utils.toArray('.glass-card');
  sections.forEach(section => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      },
      y: 0,
      opacity: 1,
      ease: "power2.out"
    });
  });

  // Initial render
  render();
};

window.addEventListener("resize", setCanvasSize);
setCanvasSize();
preloadImages();

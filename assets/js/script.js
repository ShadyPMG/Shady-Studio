// =============================
// HERO PARALLAX
// =============================
const hero = document.querySelector(".hero");

if (hero) {
  window.addEventListener("scroll", () => {
    let offset = window.scrollY;
    hero.style.transform = `translateY(${offset * 0.3}px)`;
  });
}

// =============================
// REVEAL ANIMATION
// =============================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
  reveals.forEach(el=>{
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if(elementTop < windowHeight - 100){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
window.addEventListener("load", revealOnScroll);
window.addEventListener("DOMContentLoaded", revealOnScroll);

// =============================
// CATEGORY FILTER
// =============================
const categoryLinks = document.querySelectorAll(".work-categories a");
const projects = document.querySelectorAll(".project");
const mobileFilter = document.getElementById("mobile-filter");

function filterProjects(category) {
  projects.forEach(project => {
    const type = project.dataset.type;
    if (category === "all" || type === category) {
      project.classList.remove("hide");
    } else {
      project.classList.add("hide");
    }
  });
}

categoryLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    categoryLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const category = link.dataset.category;
    filterProjects(category);

    // Sync mobile dropdown
    if (mobileFilter) {
      mobileFilter.value = category;
    }
  });
});

// Mobile dropdown filter
if (mobileFilter) {
  mobileFilter.addEventListener("change", e => {
    const category = e.target.value;
    filterProjects(category);

    // Sync button states
    categoryLinks.forEach(l => {
      l.classList.remove("active");
      if (l.dataset.category === category) {
        l.classList.add("active");
      }
    });
  });
}

// =============================
// LIGHTBOX
// =============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

if (lightbox && lightboxImg) {

  const title = document.getElementById("lightbox-title");
  const desc = document.getElementById("lightbox-desc");

  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  const images = document.querySelectorAll(".project img");

  let galleryImages = [];
  let currentIndex = 0;
  let zoomed = false;

  // OPEN
  images.forEach(img => {
    img.addEventListener("click", () => {

      const gallery = img.dataset.gallery;

      if (gallery) {
        galleryImages = gallery.split(",");
        currentIndex = 0;
      } else {
        galleryImages = [img.src];
        currentIndex = 0;
      }

     showImage();
lightboxImg.classList.add("show");

      if (title) title.textContent = img.dataset.title || "";
      if (desc) desc.textContent = img.dataset.desc || "";

      lightbox.classList.add("active");
document.body.classList.add("lightbox-open");
    });
  });

  // SHOW IMAGE
  function showImage(index, direction="next"){

  lightboxImg.classList.remove("zoomed");
  lightboxImg.style.transform = "scale(1) translate(0,0)";
  zoomLevel = 1;

  lightboxImg.classList.remove("slide-next","slide-prev");

  void lightboxImg.offsetWidth;

  if(direction === "next"){
    lightboxImg.classList.add("slide-next");
  }else{
    lightboxImg.classList.add("slide-prev");
  }

  lightboxImg.src = galleryImages[index];
}

lightboxImg.classList.remove("show");

setTimeout(()=>{

lightboxImg.src = galleryImages[currentIndex].trim();

requestAnimationFrame(()=>{
lightboxImg.classList.add("show");
});

},120);

}

  // NEXT
  nextBtn?.addEventListener("click", () => {
  currentIndex = (currentIndex+1) % galleryImages.length;
showImage(currentIndex,"next");

  // PREV
  prevBtn?.addEventListener("click", () => {
  currentIndex = (currentIndex-1 + galleryImages.length) % galleryImages.length;
showImage(currentIndex,"prev");

  // CLOSE
 closeBtn?.addEventListener("click", () => {
  lightbox.classList.remove("active");
  document.body.classList.remove("lightbox-open");
    zoomed = false;
    lightboxImg.style.transform = "scale(1)";
    lightboxImg.style.transformOrigin = "center";
    lightboxImg.style.cursor = "zoom-in";
  });

  lightbox.addEventListener("click", e=>{
  if(e.target === lightbox){
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
      zoomed = false;
      lightboxImg.style.transform = "scale(1)";
      lightboxImg.style.transformOrigin = "center";
      lightboxImg.style.cursor = "zoom-in";
    }
  });

  // DOUBLE CLICK ZOOM + PAN
  lightboxImg.addEventListener("dblclick", e => {
    const rect = lightboxImg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (!zoomed) {
      lightboxImg.style.transformOrigin = `${x}% ${y}%`;
      lightboxImg.style.transform = "scale(1.6)";
      lightboxImg.style.cursor = "zoom-out";
      zoomed = true;
    } else {
      lightboxImg.style.transform = "scale(1)";
      lightboxImg.style.transformOrigin = "center";
      lightboxImg.style.cursor = "zoom-in";
      zoomed = false;
    }
  });

  // Pan: when zoomed, image follows mouse (transform-origin tracks cursor)
  lightboxImg.addEventListener("mousemove", e => {
    if (!zoomed) return;

    const rect = lightboxImg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    lightboxImg.style.transformOrigin = `${x}% ${y}%`;
  });

  // =============================
  // MOBILE SWIPE
  // =============================

  let touchStartX = 0;
  let touchEndX = 0;

lightboxImg.addEventListener("touchstart", e=>{
  touchStartX = e.changedTouches[0].screenX;
});

lightboxImg.addEventListener("touchend", e=>{
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

  function handleSwipe(){

    const swipeDistance = touchEndX - touchStartX;

    if(Math.abs(swipeDistance) < 30) return;

    if(swipeDistance < 0){
  currentIndex = (currentIndex+1) % galleryImages.length;
  showImage(currentIndex,"next");
}else{
  currentIndex = (currentIndex-1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex,"prev");
}
    }

  
}

// =============================
// PARTICLES
// =============================
const canvas = document.getElementById("particleCanvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let mouse = { x: null, y: null };
  let time = 0;

  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Track mouse
  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function flow(x, y) {
    let scale = 0.002;
    return Math.sin(x * scale + time) + Math.cos(y * scale + time);
  }

  class Particle {
    constructor() {
      this.reset();
      this.speed = 0.4 + this.size * 0.2;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      let r = Math.random();
      this.size = r < 0.85 ? Math.random() * 1 + 0.2 : Math.random() * 3 + 1;
    }

    update() {
      let angle = flow(this.x, this.y) * Math.PI;
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * this.speed;

      if (mouse.x !== null) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          this.x += dx * 0.02;
          this.y += dy * 0.02;
        }
      }

      if (
        this.x < -50 ||
        this.x > canvas.width + 50 ||
        this.y < -50 ||
        this.y > canvas.height + 50
      ) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,200,200,${0.15 + this.size * 0.12})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 120 : 350;

for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time += 0.002;
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
}
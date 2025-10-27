/***** 📅 Fecha/hora del evento (Chile) *****/
/* Ejemplo: 27 dic 2025 a las 16:00 hora de Chile (UTC-03 en verano) */
const WEDDING_DATE = "2025-12-27T16:00:00-03:00";

/***** ⏳ Cuenta regresiva *****/
const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

function pad(n){ return String(n).padStart(2,"0"); }
function tick(){
  const target = new Date(WEDDING_DATE).getTime();
  const now = Date.now();
  let diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000*60*60*24)); diff -= days*(1000*60*60*24);
  const hours = Math.floor(diff / (1000*60*60));   diff -= hours*(1000*60*60);
  const minutes = Math.floor(diff / (1000*60));    diff -= minutes*(1000*60);
  const seconds = Math.floor(diff / 1000);

  if (dEl) dEl.textContent = pad(days);
  if (hEl) hEl.textContent = pad(hours);
  if (mEl) mEl.textContent = pad(minutes);
  if (sEl) sEl.textContent = pad(seconds);
}
tick();
setInterval(tick, 1000);

/***** 🎵 Spotify flotante: cerrar/abrir y ocultar por scroll *****/
const spotifyBar = document.getElementById("spotifyBar");
const toggleBtn  = document.getElementById("toggleSpotify");
let reopenBtn = null;

toggleBtn?.addEventListener("click", () => {
  spotifyBar.classList.add("hidden");
  if (!reopenBtn) {
    reopenBtn = document.createElement("button");
    reopenBtn.textContent = "🎵 Abrir música";
    reopenBtn.className = "reopen-spotify-btn";
    document.body.appendChild(reopenBtn);
    reopenBtn.addEventListener("click", () => {
      spotifyBar.classList.remove("hidden");
      reopenBtn.remove();
      reopenBtn = null;
    });
  }
});

// Ocultar al bajar, mostrar al subir
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    spotifyBar.classList.add("hidden");
  } else if (scrollTop < lastScrollTop - 30) {
    spotifyBar.classList.remove("hidden");
  }
  lastScrollTop = Math.max(scrollTop, 0);
});

/***** ✨ Animación al hacer scroll (reveal) *****/
function setupReveal(selector){
  const items = document.querySelectorAll(selector);
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: .2 });
  items.forEach(i=>io.observe(i));
}

// Aplica a secciones y timeline items
setupReveal(".reveal");
setupReveal(".timeline-item");

/* ===============================================================
   PORTFOLIO SCRIPT — Moamen Fathy
   =============================================================== */

/* ── 1. THEME ─────────────────────────────────────────────────── */
(function initTheme() {
  const btn  = document.getElementById("themeBtn");
  const mode = localStorage.getItem("theme") || "dark";
  if (mode === "light") applyLight();

  if (btn) btn.addEventListener("click", () => {
    document.body.classList.contains("light-mode") ? applyDark() : applyLight();
  });

  function applyLight() {
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    if (btn) btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  function applyDark() {
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
    if (btn) btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
})();

/* ── 2. MOBILE MENU ───────────────────────────────────────────── */
const menuBtn   = document.getElementById("menuBtn");
const navLinks  = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const isOpen = navLinks.classList.contains("active");
    menuBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ── 3. NAV SCROLL EFFECTS ────────────────────────────────────── */
const navbar   = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navAs    = document.querySelectorAll(".nav-links a[href^='#']");

window.addEventListener("scroll", () => {
  // Sticky shadow
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 60);

  // Scroll progress bar
  const bar = document.querySelector(".scroll-progress");
  if (bar) {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  }

  // Active link highlight
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  navAs.forEach(a => {
    a.classList.toggle("active-link", a.getAttribute("href") === `#${current}`);
  });

  // Back-to-top button
  const btt = document.getElementById("backToTop");
  if (btt) btt.classList.toggle("show", window.scrollY > 400);
});

/* ── 4. BACK TO TOP ───────────────────────────────────────────── */
const bttBtn = document.getElementById("backToTop");
if (bttBtn) bttBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ── 5. TYPING EFFECT ─────────────────────────────────────────── */
const typingEl = document.getElementById("typingEl");
if (typingEl) {
  const words = ["Frontend Developer", "Web Designer", "UI Creator", "Freelancer"];
  let wi = 0, li = 0, del = false;

  (function type() {
    const w = words[wi];
    typingEl.textContent = del
      ? w.substring(0, --li)
      : w.substring(0, ++li);

    if (!del && li === w.length) {
      del = true;
      return setTimeout(type, 1400);
    }
    if (del && li === 0) {
      del = false;
      wi = (wi + 1) % words.length;
    }
    setTimeout(type, del ? 55 : 110);
  })();
}

/* ── 6. HERO FLOATING DOTS ────────────────────────────────────── */
const dotsWrap = document.getElementById("heroDots");
if (dotsWrap) {
  for (let i = 0; i < 22; i++) {
    const s = document.createElement("span");
    const size = Math.random() * 4 + 2;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${Math.random() * .5 + .1};
    `;
    dotsWrap.appendChild(s);
  }
}

/* ── 7. STATS COUNTER ─────────────────────────────────────────── */
const statNums = document.querySelectorAll(".stat-num[data-target]");
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const firstStat = statNums[0];
  if (!firstStat) return;
  const rect = firstStat.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    statsAnimated = true;
    statNums.forEach(el => {
      const target = parseInt(el.dataset.target);
      let count = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + "+";
        if (count >= target) clearInterval(interval);
      }, 40);
    });
  }
}
window.addEventListener("scroll", animateStats);
animateStats();

/* ── 8. SKILL RINGS ───────────────────────────────────────────── */
const rings = document.querySelectorAll(".ring-fill[data-pct]");
let ringsAnimated = false;

function animateRings() {
  if (ringsAnimated) return;
  const first = rings[0];
  if (!first) return;
  const rect = first.getBoundingClientRect();
  if (rect.top < window.innerHeight - 60) {
    ringsAnimated = true;
    rings.forEach(ring => {
      const pct = parseInt(ring.dataset.pct);
      const circumference = 2 * Math.PI * 35; // r=35
      const offset = circumference * (1 - pct / 100);
      ring.style.strokeDasharray  = circumference;
      ring.style.strokeDashoffset = circumference;
      requestAnimationFrame(() => {
        ring.style.transition = "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)";
        ring.style.strokeDashoffset = offset;
      });
    });
  }
}
window.addEventListener("scroll", animateRings);
animateRings();

/* ── 9. CV SKILL BARS ─────────────────────────────────────────── */
const cvBars = document.querySelectorAll(".cv-skill-fill[data-w]");
let cvBarsAnimated = false;

function animateCvBars() {
  if (cvBarsAnimated || !cvBars.length) return;
  const rect = cvBars[0].getBoundingClientRect();
  if (rect.top < window.innerHeight - 60) {
    cvBarsAnimated = true;
    cvBars.forEach(bar => {
      bar.style.width = bar.dataset.w;
    });
  }
}
window.addEventListener("scroll", animateCvBars);
animateCvBars();

/* ── 10. PROJECT FILTER ───────────────────────────────────────── */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card[data-category]");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.display = match ? "" : "none";
      if (match) card.classList.add("reveal", "revealed");
    });
  });
});

/* ── 11. CONTACT FORM ─────────────────────────────────────────── */
const form       = document.getElementById("contactForm");
const submitBtn  = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");
const msgArea    = document.getElementById("fmessage");
const charCount  = document.getElementById("charCount");

if (msgArea && charCount) {
  msgArea.addEventListener("input", () => {
    charCount.textContent = `${msgArea.value.length} / 1000`;
  });
}

function showStatus(type, msg) {
  if (!formStatus) return;
  formStatus.className = "form-status " + type;
  formStatus.innerHTML = `<i class="fa-solid fa-${type === "success" ? "circle-check" : "circle-xmark"}"></i> ${msg}`;
  setTimeout(() => { formStatus.className = "form-status"; }, 6000);
}

function validateField(el) {
  if (!el.value.trim()) {
    el.classList.add("error"); return false;
  }
  if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
    el.classList.add("error"); return false;
  }
  el.classList.remove("error"); return true;
}

if (form) {
  // Live validation on blur
  form.querySelectorAll("input[required], textarea[required]").forEach(el => {
    el.addEventListener("blur", () => validateField(el));
    el.addEventListener("input", () => el.classList.remove("error"));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name  = document.getElementById("fname");
    const email = document.getElementById("femail");
    const msg   = document.getElementById("fmessage");

    const valid = [validateField(name), validateField(email), validateField(msg)].every(Boolean);
    if (!valid) return;

    // Check if Formspree is configured
    const action = form.action || "";
    const isConfigured = action.includes("formspree.io/f/") && !action.includes("YOUR_FORM_ID");

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

    if (!isConfigured) {
      // Demo mode — simulate success
      await new Promise(r => setTimeout(r, 1200));
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      showStatus("success", "Message sent! (Demo mode — connect Formspree for real delivery)");
      form.reset();
      if (charCount) charCount.textContent = "0 / 1000";
      return;
    }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });
      if (res.ok) {
        showStatus("success", "Message sent successfully! I'll get back to you within 24 hours.");
        form.reset();
        if (charCount) charCount.textContent = "0 / 1000";
      } else {
        throw new Error("Server error");
      }
    } catch {
      showStatus("error-msg", "Something went wrong. Please email me directly at moamenfathy279@gmail.com");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    }
  });
}

/* ── 12. SCROLL REVEAL ────────────────────────────────────────── */
const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach(el => io.observe(el));
}

/* ===============================================================
   PORTFOLIO SCRIPT — Moamen Fathy
   Vanilla JS, no dependencies (EmailJS is optional).
   =============================================================== */
"use strict";

/* ── 0. HELPERS ───────────────────────────────────────────────── */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const IS_AR = document.documentElement.lang === "ar";
const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* localStorage can throw (private mode, blocked cookies) → never let it break the page */
const store = {
  get(k)    { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); }     catch { /* ignore */ } }
};

const TXT = IS_AR ? {
  hi:      "مرحباً مؤمن، أنا",
  service: "الخدمة",
  budget:  "الميزانية",
  waTitle: "خطوة أخيرة: أرسلها عبر واتساب",
  waDesc:  "فتحت لك واتساب ومعه رسالتك جاهزة. اضغط <strong>إرسال</strong> هناك وسأرد عليك في أقرب وقت.",
  okTitle: "تم إرسال رسالتك",
  okDesc:  "شكراً لك! سأرد عليك خلال <strong>24 ساعة</strong>.",
  fail:    "تعذر الإرسال الآن. راسلني على moamenfathy279@gmail.com أو عبر واتساب."
} : {
  hi:      "Hi Moamen, I'm",
  service: "Service",
  budget:  "Budget",
  waTitle: "Almost done: send it on WhatsApp",
  waDesc:  "I opened WhatsApp with your message ready. Press <strong>Send</strong> there and I’ll reply as soon as I can.",
  okTitle: "Message sent",
  okDesc:  "Thanks! I’ll reply within <strong>24 hours</strong>.",
  fail:    "Couldn’t send right now. Please email moamenfathy279@gmail.com or message me on WhatsApp."
};

/* ── 1. THEME ─────────────────────────────────────────────────── */
(function initTheme() {
  const btn = $("#themeBtn");
  const set = (light) => {
    document.body.classList.toggle("light-mode", light);
    store.set("theme", light ? "light" : "dark");
    if (btn) btn.innerHTML = `<i class="fa-solid fa-${light ? "sun" : "moon"}"></i>`;
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", light ? "#f7f5f1" : "#0b1118");
  };
  if (store.get("theme") === "light") set(true);
  if (btn) btn.addEventListener("click", () => set(!document.body.classList.contains("light-mode")));
})();

/* ── 2. MOBILE MENU ───────────────────────────────────────────── */
(function initMenu() {
  const btn = $("#menuBtn"), links = $("#navLinks");
  if (!btn || !links) return;

  const setOpen = (open) => {
    links.classList.toggle("active", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.innerHTML = `<i class="fa-solid fa-${open ? "xmark" : "bars"}"></i>`;
  };
  btn.addEventListener("click", () => setOpen(!links.classList.contains("active")));
  $$("a", links).forEach(a => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
  document.addEventListener("click", e => {
    if (links.classList.contains("active") && !links.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });
  window.matchMedia("(min-width: 861px)").addEventListener?.("change", e => { if (e.matches) setOpen(false); });
})();

/* ── 3. STATS COUNTER (called from the scroll handler) ────────── */
const statNums = $$(".stat-num[data-target]");
let statsDone = false;
function runStats() {
  if (statsDone || !statNums.length) return;
  if (statNums[0].getBoundingClientRect().top >= window.innerHeight - 80) return;
  statsDone = true;
  statNums.forEach(el => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : "+";
    if (REDUCED) { el.textContent = target + suffix; return; }
    const start = performance.now(), dur = 1000;
    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);                      // ease-out
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  });
}

/* ── 4. SCROLL EFFECTS — one passive, rAF-throttled listener ──── */
let sweepReveal = () => {};                 // assigned by initReveal(); called on scroll
const navbar  = $("#navbar");
const bar     = $(".scroll-progress");
const bttBtn  = $("#backToTop");
const sects   = $$("section[id]");
const navAs   = $$(".nav-links a[href^='#']");
let ticking = false;

function onScroll() {
  ticking = false;
  const y = window.scrollY;
  if (navbar) navbar.classList.toggle("scrolled", y > 60);

  if (bar) {
    const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  }
  if (navAs.length) {
    let current = "";
    for (const s of sects) if (y >= s.offsetTop - 150) current = s.id;
    navAs.forEach(a => a.classList.toggle("active-link", a.getAttribute("href") === "#" + current));
  }
  if (bttBtn) bttBtn.classList.toggle("show", y > 400);
  runStats();
  sweepReveal();
}
window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
window.addEventListener("resize", onScroll, { passive: true });
onScroll();

if (bttBtn) bttBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }));

/* ── 5. HERO / CASE-STUDY TITLE: WORD MASK REVEAL ─────────────── */
(function splitTitle() {
  const t = $(".hero-title");
  if (!t || t.dataset.split || REDUCED) return;
  t.setAttribute("aria-label", t.textContent.replace(/\s+/g, " ").trim());
  t.dataset.split = "1";

  const parts = [];                                   // keep child elements (e.g. the PRO badge) intact
  t.childNodes.forEach(n => {
    if (n.nodeType === Node.TEXT_NODE) n.textContent.split(/\s+/).filter(Boolean).forEach(w => parts.push(document.createTextNode(w)));
    else parts.push(n);
  });
  t.textContent = "";
  parts.forEach((n, i) => {
    const outer = document.createElement("span"); outer.className = "w"; outer.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span"); inner.style.setProperty("--i", i);
    inner.appendChild(n); outer.appendChild(inner);
    t.appendChild(outer);
    if (i < parts.length - 1) t.appendChild(document.createTextNode(" "));
  });
})();

/* ── 6. PROJECT FILTER (+ sliding pill) ───────────────────────── */
(function initFilter() {
  const wrap = $(".project-filters");
  const btns = $$(".filter-btn");
  const cards = $$(".project-card[data-category]");
  if (!wrap || !btns.length) return;

  const ind = document.createElement("span");
  ind.className = "filter-ind";
  wrap.prepend(ind);

  const movePill = () => {
    const a = $(".filter-btn.active", wrap);
    if (!a) return;
    ind.style.width  = a.offsetWidth  + "px";
    ind.style.height = a.offsetHeight + "px";
    ind.style.transform = `translate(${a.offsetLeft}px, ${a.offsetTop}px)`;
    wrap.classList.add("has-ind");
  };

  btns.forEach(btn => btn.addEventListener("click", () => {
    btns.forEach(b => { b.classList.toggle("active", b === btn); b.setAttribute("aria-pressed", String(b === btn)); });
    const f = btn.dataset.filter;
    cards.forEach(card => {
      const show = f === "all" || card.dataset.category === f;
      card.style.display = show ? "" : "none";
      if (show) {
        card.classList.add("reveal", "revealed", "done");
        card.classList.remove("pop-in"); void card.offsetWidth; card.classList.add("pop-in");
      }
    });
    movePill();
  }));
  btns.forEach(b => b.setAttribute("aria-pressed", String(b.classList.contains("active"))));

  window.addEventListener("resize", movePill, { passive: true });
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(movePill);
  movePill();
})();

/* ── 7. CASE STUDY: ROLE / PERMISSION TABS ────────────────────── */
(function initRoles() {
  const tabs = $$(".role-tab"), panels = $$(".role-panel");
  if (!tabs.length) return;
  const show = (id, focus) => {
    tabs.forEach(t => { const on = t.dataset.role === id; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
    panels.forEach(p => {
      const on = p.dataset.role === id;
      p.hidden = !on;
      if (on) $$(".perm", p).forEach(el => { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; });
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => show(t.dataset.role));
    t.addEventListener("keydown", e => {                       // arrow-key navigation
      const dir = { ArrowDown: 1, ArrowRight: IS_AR ? -1 : 1, ArrowUp: -1, ArrowLeft: IS_AR ? 1 : -1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      show(tabs[(i + dir + tabs.length) % tabs.length].dataset.role, true);
    });
  });
  show(tabs[0].dataset.role);
})();

/* ── 8. CONTACT FORM ──────────────────────────────────────────── */
/*
  EMAILJS SETUP (optional — without it the form hands the message to WhatsApp)
  1. emailjs.com → create a free account
  2. Email Services → Add New Service → Gmail → copy the Service ID
  3. Email Templates → Create New Template
       Subject: New message from {{from_name}}
       Body:    Name: {{from_name}} / Email: {{reply_to}} / Service: {{project_type}}
                Budget: {{budget}} / Message: {{message}}
     → copy the Template ID
  4. Account → General → Public Key
  5. Paste the three values below
*/
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const emailReady = () =>
  typeof emailjs !== "undefined" &&
  ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].some(v => v.includes("YOUR"));
if (emailReady()) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

(function initForm() {
  const form = $("#contactForm");
  if (!form) return;

  const submitBtn = $("#submitBtn"), statusEl = $("#formStatus"), okScreen = $("#formSuccessScreen");
  const again = $("#sendAnotherBtn"), msg = $("#fmessage"), counter = $("#charCount");
  const val = id => (document.getElementById(id)?.value || "").trim();
  const sel = id => { const s = document.getElementById(id); return s && s.value ? s.options[s.selectedIndex].text : ""; };

  const setError = (inputId, errId, show) => {
    $("#" + inputId)?.classList.toggle("input-error", show);
    $("#" + errId)?.classList.toggle("visible", show);
    $("#" + inputId)?.setAttribute("aria-invalid", String(show));
  };
  const checks = {
    fname:    () => { const ok = val("fname").length >= 2;                              setError("fname", "nameErr", !ok);  return ok; },
    femail:   () => { const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("femail"));       setError("femail", "emailErr", !ok); return ok; },
    fmessage: () => { const ok = val("fmessage").length >= 10;                          setError("fmessage", "msgErr", !ok); return ok; }
  };
  const errIds = { fname: "nameErr", femail: "emailErr", fmessage: "msgErr" };
  Object.entries(checks).forEach(([id, fn]) => {
    $("#" + id)?.addEventListener("blur", fn);
    $("#" + id)?.addEventListener("input", () => setError(id, errIds[id], false));
  });
  if (msg && counter) msg.addEventListener("input", () => { counter.textContent = `${msg.value.length} / 1000`; });

  let statusTimer;
  const showStatus = (type, text) => {
    if (!statusEl) return;
    clearTimeout(statusTimer);
    statusEl.className = "form-status visible status-" + type;
    statusEl.textContent = "";
    const i = document.createElement("i"); i.className = `fa-solid fa-circle-${type === "error" ? "xmark" : "check"}`;
    statusEl.append(i, " ", text);
    statusTimer = setTimeout(() => { statusEl.className = "form-status"; }, 7000);
  };
  const setLoading = (on) => {
    if (!submitBtn) return;
    submitBtn.disabled = on;
    const t = $(".btn-text", submitBtn), l = $(".btn-loading", submitBtn);
    if (t) t.style.display = on ? "none" : "";
    if (l) l.style.display = on ? "" : "none";
  };
  const showSuccess = (title, html) => {
    const t = $("#successTitle"), d = $("#successDesc");
    if (t) t.textContent = title || TXT.okTitle;
    if (d) d.innerHTML   = html  || TXT.okDesc;
    form.style.display = "none";
    okScreen?.classList.add("visible");
    okScreen?.setAttribute("tabindex", "-1"); okScreen?.focus({ preventScroll: true });
  };

  again?.addEventListener("click", () => {
    okScreen?.classList.remove("visible");
    form.style.display = ""; form.reset();
    if (counter) counter.textContent = "0 / 1000";
    Object.entries(errIds).forEach(([id, e]) => setError(id, e, false));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submitBtn?.disabled) return;                                   // ignore double submits

    const ok = Object.values(checks).map(fn => fn()).every(Boolean);   // run all so every error shows
    if (!ok) { $(".input-error", form)?.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" }); return; }

    /* Not configured → open WhatsApp with the message prefilled so no lead is lost */
    if (!emailReady()) {
      const text =
        `${TXT.hi} ${val("fname")} (${val("femail")}).\n` +
        (sel("fsubject") ? `${TXT.service}: ${sel("fsubject")}\n` : "") +
        (sel("fbudget")  ? `${TXT.budget}: ${sel("fbudget")}\n`   : "") +
        `\n${val("fmessage")}`;
      const url = "https://wa.me/201224234925?text=" + encodeURIComponent(text);
      const w = window.open(url, "_blank");          // (no "noopener" feature: it would make w always null)
      if (w) w.opener = null;
      else   { window.location.href = url; return; } // popup blocked → navigate instead
      showSuccess(TXT.waTitle, TXT.waDesc);
      return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      showSuccess();
    } catch (err) {
      console.error("EmailJS error:", err);
      showStatus("error", TXT.fail);
    } finally {
      setLoading(false);
    }
  });
})();

/* ── 9. SCROLL REVEAL ─────────────────────────────────────────── */
(function initReveal() {
  const els = $$(".reveal, .reveal-left, .reveal-right");
  if (!els.length) return;
  const reveal = (el) => {
    el.classList.add("revealed");
    const wait = (parseInt(el.dataset.delay, 10) || 0) * 100 + 650;
    setTimeout(() => el.classList.add("done"), wait);     // stagger delay no longer needed → instant hover
  };
  if (!("IntersectionObserver" in window) || REDUCED) { els.forEach(reveal); return; }   // never leave content hidden
  const pending = new Set(els);
  const show = (el) => { if (pending.delete(el)) { reveal(el); io.unobserve(el); } };
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting || en.boundingClientRect.top < 0) show(en.target);
  }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => io.observe(el));

  /* Fast scrolling / anchor jumps can skip elements entirely (the observer never fires for them),
     so on scroll also reveal anything that is at or above the bottom of the viewport. */
  sweepReveal = () => {
    if (!pending.size) return;
    const limit = window.innerHeight - 40;
    pending.forEach(el => { if (el.getBoundingClientRect().top < limit) show(el); });
  };
  sweepReveal();
})();

/* ── 10. PRESELECT SERVICE FROM ?service=… ────────────────────── */
(function preselect() {
  const s = $("#fsubject");
  const wanted = new URLSearchParams(location.search).get("service");
  if (!s || !wanted) return;
  const opt = [...s.options].find(o => o.value.toLowerCase() === wanted.toLowerCase());
  if (opt) s.value = opt.value;
})();

/* ── 11. CV: SAVE AS PDF ──────────────────────────────────────── */
$$(".download-cv-btn").forEach(b => b.addEventListener("click", () => window.print()));

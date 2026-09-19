// ==========================================================================
// Jayr Rolloque — Portfolio interactions
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  cleanUpAddressBar();
  initTheme();
  initMobileNav();
  initScrollSpy();
  renderProjects();
  initModal();
  initZoomViewer();
  initFilters();
  initCarousel();
  initRoleRotator();
  initInquiryForm();
});

/* ---------------------------------------------------------------------- */
/* Keep "index.html" out of the visible URL when served from a real       */
/* web server (http/https). This is a no-op on file:// and on hosts that  */
/* already serve the clean directory URL (Netlify, Vercel, GitHub Pages). */
/* ---------------------------------------------------------------------- */
function cleanUpAddressBar() {
  if (location.protocol === "file:") return; // can't rewrite local file paths
  if (/\/index\.html$/i.test(location.pathname)) {
    const cleanPath = location.pathname.replace(/index\.html$/i, "");
    history.replaceState(null, "", cleanPath + location.search + location.hash);
  }
}

/* ---------------------------------------------------------------------- */
/* Theme (light / dark) — persisted                                       */
/* ---------------------------------------------------------------------- */
function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const stored = localStorage.getItem("theme");
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)",
  ).matches;
  const initial = stored || (prefersLight ? "light" : "dark");
  root.setAttribute("data-theme", initial);
  toggle.setAttribute("aria-checked", String(initial === "light"));

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    toggle.setAttribute("aria-checked", String(next === "light"));
  });
  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle.click();
    }
  });
}

/* ---------------------------------------------------------------------- */
/* Mobile nav rail                                                        */
/* ---------------------------------------------------------------------- */
function initMobileNav() {
  const rail = document.getElementById("rail");
  const scrim = document.getElementById("railScrim");
  const openBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("railCloseBtn");

  const open = () => {
    rail.classList.add("is-open");
    scrim.classList.add("is-open");
    openBtn.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    rail.classList.remove("is-open");
    scrim.classList.remove("is-open");
    openBtn.setAttribute("aria-expanded", "false");
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  scrim.addEventListener("click", close);
  rail
    .querySelectorAll(".nav-link")
    .forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* ---------------------------------------------------------------------- */
/* Scroll-spy for active nav link                                         */
/* ---------------------------------------------------------------------- */
function initScrollSpy() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.id;
          links.forEach((l) =>
            l.classList.toggle("is-active", l.getAttribute("href") === id),
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((s) => io.observe(s));
}

/* ---------------------------------------------------------------------- */
/* Rotating role line in hero                                             */
/* ---------------------------------------------------------------------- */
function initRoleRotator() {
  const el = document.getElementById("roleRotator");
  if (!el) return;
  const roles = [
    "Full-Stack Software Engineer",
    "GHL CRM & Funnel Builder",
    "E-commerce Developer",
    "AI Automation Builder",
  ];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % roles.length;
    el.textContent = roles[i];
  }, 2600);
}

/* ---------------------------------------------------------------------- */
/* Project data                                                           */
/* ---------------------------------------------------------------------- */
const CATEGORY_COLORS = {
  "GHL & CRM": "#D7FFE0",
  "Internal Systems": "#3B82C4",
  "E-commerce": "#E8A33D",
  "AI & Automation": "#B389F5",
};

const PROJECTS = [
  {
    id: "hris",
    name: "HRIS — Human Resource Information System",
    category: "Internal Systems",
    status: "live",
    blurb:
      "A full HR platform built to feel welcoming, not bureaucratic — headcount and attendance at a glance, leave requests and approvals, employment-type breakdowns, and payroll periods, so HR teams and employees both actually enjoy opening it.",
    tags: [
      "Employee 360°",
      "Attendance & Leave",
      "Payroll Integration",
      "Analytics Dashboard",
    ],
    images: [
      "assets/projects/hris-login-1.png",
      "assets/projects/hris-dashboard-1.png",
      "assets/projects/hris-dashboard-2.png",
    ],
  },
  {
    id: "star-system",
    name: "STAR — Sales & Fulfillment System",
    category: "Internal Systems",
    status: "live",
    blurb:
      "End-to-end order fulfillment: bookings, picklists, sales-order/DR generation, replacements, credit memos, and aging reports in one dashboard.",
    tags: ["Order Management", "Document Generation", "Fulfillment"],
    images: [
      "assets/projects/star-system-2.png",
      "assets/projects/star-system-3.png",
      "assets/projects/star-system-1.png",
    ],
  },
  {
    id: "ecommerce-store",
    name: "E-commerce Storefront & Back-Office Ops Dashboard",
    category: "E-commerce",
    status: "live",
    blurb:
      "A hardware & lifestyle storefront built for real customers, paired with the internal ops dashboard the team actually runs the business from — live revenue, order status, low-stock alerts, and top-product analytics, side by side with the shopping experience.",
    tags: [
      "Storefront",
      "Admin Dashboard",
      "Revenue Analytics",
      "Inventory Alerts",
    ],
    images: [
      "assets/projects/ecommerce-hero-1.png",
      "assets/projects/ecommerce-hero-2.png",
      // "assets/projects/ecommerce-catalog-1.png",
      "assets/projects/ecommerce-storefront-2.png",
      "assets/projects/ecommerce-backoffice-1.png",
    ],
  },
  {
    id: "itams",
    name: "ITAMS — IT Asset Management System",
    category: "Internal Systems",
    status: "live",
    blurb:
      "Tracks computers, software licenses, warranties and vendors company-wide, with live dashboards for license compliance and warranty coverage.",
    tags: ["Asset Tracking", "Dashboards", "Audit Log"],
    images: ["assets/projects/itams-2.png", "assets/projects/itams-1.png"],
  },
  {
    id: "announcement-system",
    name: "Internal Announcement & Ticketing Console",
    category: "Internal Systems",
    status: "live",
    blurb:
      "A super-admin console for company-wide announcements, maintenance notices, tickets, and a knowledge base — used to keep every branch in sync.",
    tags: ["Admin Panel", "Role-based Access", "CMS"],
    images: [
      "assets/projects/announcement-system-2.png",
      "assets/projects/announcement-system-1.png",
    ],
  },
  {
    id: "cargoflow",
    name: "CargoFlow — Freight Operations Console",
    category: "Internal Systems",
    status: "live",
    blurb:
      "Tracks freight from booking to delivery, clears customs paperwork, manages warehouse stock and client billing, with role-based staff access.",
    tags: ["Logistics", "RBAC", "Billing"],
    images: [
      "assets/projects/cargoflow-1.png",
      "assets/projects/cargoflow-2.png",
    ],
  },
  {
    id: "mdcu-ers",
    name: "MDCU-ERS Request System",
    category: "Internal Systems",
    status: "live",
    blurb:
      "A digital MPC request workflow — submit, review, route for signing, and post straight to SAP — replacing a fully paper-based approval chain.",
    tags: ["Approval Workflow", "SAP Integration", "E-signing"],
    images: [
      "assets/projects/mdcu-ers-2.png",
      "assets/projects/mdcu-ers-1.png",
    ],
  },
  {
    id: "pms",
    name: "Performance Management System",
    category: "Internal Systems",
    status: "live",
    blurb:
      "Handles 3rd/5th-month probationary and annual performance appraisals — criteria, feedback cycles, and development-plan tracking for HR teams.",
    tags: ["HR Tech", "Appraisals", "Workflow"],
    images: ["assets/projects/pms-2.png", "assets/projects/pms-1.png"],
  },

  {
    id: "newmarket-eportal",
    name: "New Market E-Portal",
    category: "Internal Systems",
    status: "live",
    blurb:
      "A field sales portal for promo staff to log daily sales, track quota attainment, monitor P.O.D., foot traffic, and stock requests per store.",
    tags: ["Sales Ops", "Reporting", "Multi-store"],
    images: [
      "assets/projects/newmarket-eportal-2.png",
      "assets/projects/newmarket-eportal-1.png",
    ],
  },
  {
    id: "medical-benefits",
    name: "Medical Benefits Portal",
    category: "Internal Systems",
    status: "live",
    blurb:
      "A secure self-service portal for employees to manage healthcare benefits, submit claims, and check coverage without going through HR each time.",
    tags: ["Employee Portal", "Auth", "Claims"],
    images: [
      "assets/projects/medical-benefits-1.png",
      "assets/projects/medical-benefits-2.png",
      "assets/projects/medical-benefits-3.png",
    ],
  },

  {
    id: "ap-payroll",
    name: "APAS — AP Payroll System",
    category: "Internal Systems",
    status: "live",
    blurb:
      "Automates accounts-payable payroll runs straight from raw Excel exports — reusable sheet/column mapping templates, detection rules for dynamic vs. standard formats, and a full audit trail across company codes, cost centers, and GL accounts.",
    tags: [
      "Excel Import Engine",
      "Payroll Automation",
      "Audit Trail",
      "Master Data Config",
    ],
    images: [
      "assets/projects/apas-ap-payroll-2.png",
      "assets/projects/apas-ap-payroll-1.png",
    ],
  },
  {
    id: "s2d-scale",
    name: "S2D Scale System",
    category: "Internal Systems",
    status: "live",
    blurb:
      "A plant-floor weighing and dispatch system: scale transactions, box counts, SO/DO matching, and print-per-weigh tickets for warehouse teams.",
    tags: ["Desktop App", ".NET", "MSSQL", "POS Integration"],
    images: [
      "assets/projects/s2d-scale-1.png",
      "assets/projects/s2d-scale-2.png",
    ],
  },

  {
    id: "ghl-automation",
    name: "GHL Funnels, Pipelines & AI Voice/Chat Agents",
    category: "GHL & CRM",
    status: "live",
    blurb:
      "GoHighLevel builds for coaches and agencies: coded funnels, pipeline automation, missed-call text-back, and Claude/GPT-powered chat & voice agents.",
    tags: ["GoHighLevel", "Workflows", "AI Agents"],
    images: [],
  },
  {
    id: "non-payroll",
    name: "Non-Payroll Disbursement System",
    category: "Internal Systems",
    status: "nda",
    blurb:
      "Handles non-payroll requests and disbursements end-to-end, from request submission to finance approval and release.",
    tags: ["Finance Ops", "Approvals"],
    images: [],
  },
];

function statusPillHTML(status) {
  if (status === "live") {
    return `<span class="pill pill-live"><i class="ph-fill ph-circle" style="font-size:.55rem;"></i> Live build</span>`;
  }
  return `<span class="pill pill-nda"><i class="ph-fill ph-lock-simple"></i> NDA protected</span>`;
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = PROJECTS.map((p) => {
    const color = CATEGORY_COLORS[p.category] || "var(--accent)";
    const hasImages = p.images && p.images.length > 0;
    const thumb = hasImages
      ? `<img src="${p.images[0]}" alt="Screenshot of ${p.name}" loading="lazy">`
      : `<div class="no-shot"><i class="ph ph-lock-key"></i><span>${p.status === "nda" ? "Screenshots under NDA" : "Client-confidential builds"}</span></div>`;

    return `
      <button type="button" class="project-card ${!hasImages ? "is-locked" : ""}" style="--cat-color:${color}"
        data-id="${p.id}" aria-haspopup="dialog" ${!hasImages ? 'aria-label="' + p.name + ' — details only, no screenshots available"' : ""}>
        <div class="thumb ${hasImages ? "" : "no-shot"}">${thumb}</div>
        <div class="card-body">
          <div class="card-top">
            <span class="card-cat">${p.category}</span>
            ${statusPillHTML(p.status)}
          </div>
          <h3>${p.name}</h3>
          <p>${p.blurb}</p>
          <div class="card-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
          ${hasImages ? `<span class="card-cta">View screenshots <i class="ph ph-arrow-up-right"></i></span>` : ""}
        </div>
      </button>
    `;
  }).join("");

  grid.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openProjectModal(card.dataset.id));
  });
}

/* ---------------------------------------------------------------------- */
/* Category filters                                                       */
/* ---------------------------------------------------------------------- */
function initFilters() {
  const row = document.getElementById("filterRow");
  const cats = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  row.innerHTML = cats
    .map(
      (c, i) =>
        `<button type="button" class="filter-btn ${i === 0 ? "is-active" : ""}" data-cat="${c}">${c}</button>`,
    )
    .join("");

  row.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    row
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const cat = btn.dataset.cat;
    document.querySelectorAll(".project-card").forEach((card) => {
      const p = PROJECTS.find((pr) => pr.id === card.dataset.id);
      card.style.display = cat === "All" || p.category === cat ? "" : "none";
    });
    const track = document.getElementById("projectGrid");
    track.scrollLeft = 0;
    buildCarouselDots();
    updateCarouselTilt();
  });
}

/* ---------------------------------------------------------------------- */
/* Diagonal-tilt, one-at-a-time project carousel                          */
/* ---------------------------------------------------------------------- */
function visibleCards() {
  return Array.from(
    document.querySelectorAll("#projectGrid .project-card"),
  ).filter((c) => c.style.display !== "none");
}

function initCarousel() {
  const track = document.getElementById("projectGrid");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  buildCarouselDots();

  const scrollByCard = (dir) => {
    const cards = visibleCards();
    if (!cards.length) return;
    const step = cards[0].getBoundingClientRect().width + 32; // card width + gap
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  prevBtn.addEventListener("click", () => scrollByCard(-1));
  nextBtn.addEventListener("click", () => scrollByCard(1));

  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    }
  });

  let ticking = false;
  track.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateCarouselTilt();
      ticking = false;
    });
  });

  window.addEventListener("resize", updateCarouselTilt);
  updateCarouselTilt();
}

function buildCarouselDots() {
  const dotsWrap = document.getElementById("carouselDots");
  const cards = visibleCards();
  dotsWrap.innerHTML = cards
    .map(
      (_, i) =>
        `<button type="button" class="carousel-dot ${i === 0 ? "is-active" : ""}" data-index="${i}" aria-label="Go to project ${i + 1} of ${cards.length}"></button>`,
    )
    .join("");

  dotsWrap.querySelectorAll(".carousel-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const i = Number(dot.dataset.index);
      const card = visibleCards()[i];
      if (card)
        card.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
    });
  });
}

/* Applies a subtle "card deck" tilt/scale/fade to cards as they move away
   from the centre of the viewport — the diagonal-carousel effect. */
function updateCarouselTilt() {
  const track = document.getElementById("projectGrid");
  const cards = visibleCards();
  if (!track || !cards.length) return;

  const trackRect = track.getBoundingClientRect();
  const centerX = trackRect.left + trackRect.width / 2;
  let closestIndex = 0;
  let closestDist = Infinity;

  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const offset = (cardCenter - centerX) / (trackRect.width / 2); // ~ -1..1
    const clamped = Math.max(-1, Math.min(1, offset));
    const rotate = clamped * -3; // degrees — subtle, keeps neighbours legible
    const scale = 1 - Math.abs(clamped) * 0.06;
    const opacity = 1 - Math.abs(clamped) * 0.22;
    const translateY = Math.abs(clamped) * 6;
    card.style.transform = `perspective(1200px) rotate(${rotate}deg) translateY(${translateY}px) scale(${scale})`;
    card.style.opacity = String(Math.max(opacity, 0.72));

    const dist = Math.abs(cardCenter - centerX);
    if (dist < closestDist) {
      closestDist = dist;
      closestIndex = i;
    }
  });

  document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
    dot.classList.toggle("is-active", i === closestIndex);
  });

  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  if (prevBtn) prevBtn.disabled = track.scrollLeft <= 4;
  if (nextBtn)
    nextBtn.disabled =
      track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
}

/* ---------------------------------------------------------------------- */
/* Modal / lightbox                                                       */
/* ---------------------------------------------------------------------- */
let lastFocused = null;

function initModal() {
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalClose");
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open"))
      closeModal();
  });
}

function openProjectModal(id) {
  const p = PROJECTS.find((pr) => pr.id === id);
  if (!p || !p.images || p.images.length === 0) return; // NDA / no-shot cards are informational only

  const overlay = document.getElementById("modalOverlay");
  const title = document.getElementById("modalTitle");
  const meta = document.getElementById("modalMeta");
  const desc = document.getElementById("modalDesc");
  const gallery = document.getElementById("modalGallery");

  title.textContent = p.name;
  meta.innerHTML =
    `<span class="tag">${p.category}</span>` +
    p.tags.map((t) => `<span class="tag">${t}</span>`).join("");
  desc.textContent = p.blurb;
  gallery.innerHTML = p.images
    .map(
      (src) =>
        `<button type="button" class="zoomable-shot" data-src="${src}" aria-label="Zoom into screenshot of ${p.name}"><img src="${src}" alt="Screenshot of ${p.name}"><span class="zoom-hint"><i class="ph-bold ph-magnifying-glass-plus"></i> Click to zoom</span></button>`,
    )
    .join("");
  gallery.querySelectorAll(".zoomable-shot").forEach((btn) => {
    btn.addEventListener("click", () => openZoom(btn.dataset.src, p.name));
  });

  lastFocused = document.activeElement;
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

/* ---------------------------------------------------------------------- */
/* Screenshot zoom viewer — click a gallery image to zoom in/out and pan   */
/* ---------------------------------------------------------------------- */
let zoomState = { scale: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0 };
let zoomLastFocused = null;

function initZoomViewer() {
  const overlay = document.getElementById("zoomOverlay");
  const viewport = document.getElementById("zoomViewport");
  const img = document.getElementById("zoomImg");
  if (!overlay || !viewport || !img) return;

  document.getElementById("zoomCloseBtn").addEventListener("click", closeZoom);
  document
    .getElementById("zoomInBtn")
    .addEventListener("click", () => setZoom(zoomState.scale + 0.5));
  document
    .getElementById("zoomOutBtn")
    .addEventListener("click", () => setZoom(zoomState.scale - 0.5));
  document.getElementById("zoomResetBtn").addEventListener("click", resetZoom);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeZoom();
  });

  document.addEventListener(
    "keydown",
    (e) => {
      if (!overlay.classList.contains("is-open")) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        closeZoom();
      }
      if (e.key === "+" || e.key === "=") setZoom(zoomState.scale + 0.5);
      if (e.key === "-") setZoom(zoomState.scale - 0.5);
    },
    true,
  );

  // Scroll wheel to zoom, centered roughly on cursor
  viewport.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      setZoom(zoomState.scale + (e.deltaY < 0 ? 0.35 : -0.35));
    },
    { passive: false },
  );

  // Drag to pan once zoomed in
  viewport.addEventListener("pointerdown", (e) => {
    if (zoomState.scale <= 1) return;
    zoomState.dragging = true;
    zoomState.startX = e.clientX - zoomState.x;
    zoomState.startY = e.clientY - zoomState.y;
    viewport.classList.add("is-dragging");
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener("pointermove", (e) => {
    if (!zoomState.dragging) return;
    zoomState.x = e.clientX - zoomState.startX;
    zoomState.y = e.clientY - zoomState.startY;
    applyZoomTransform(false);
  });
  const endDrag = () => {
    zoomState.dragging = false;
    viewport.classList.remove("is-dragging");
  };
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);

  // Double-click / double-tap to quick zoom
  viewport.addEventListener("dblclick", () => {
    setZoom(zoomState.scale > 1 ? 1 : 2.5);
  });

  // Two-finger pinch to zoom on touch devices
  let pinchStartDist = null;
  let pinchStartScale = 1;
  const touchDist = (t1, t2) =>
    Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
  viewport.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 2) {
        pinchStartDist = touchDist(e.touches[0], e.touches[1]);
        pinchStartScale = zoomState.scale;
      }
    },
    { passive: true },
  );
  viewport.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 2 && pinchStartDist) {
        e.preventDefault();
        const ratio = touchDist(e.touches[0], e.touches[1]) / pinchStartDist;
        setZoom(pinchStartScale * ratio);
      }
    },
    { passive: false },
  );
  viewport.addEventListener("touchend", (e) => {
    if (e.touches.length < 2) pinchStartDist = null;
  });
}

function openZoom(src, alt) {
  const overlay = document.getElementById("zoomOverlay");
  const img = document.getElementById("zoomImg");
  img.src = src;
  img.alt = "Zoomed screenshot of " + alt;
  zoomState = { scale: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0 };
  applyZoomTransform(false);
  zoomLastFocused = document.activeElement;
  overlay.classList.add("is-open");
  document.getElementById("zoomCloseBtn").focus();
}

function closeZoom() {
  const overlay = document.getElementById("zoomOverlay");
  overlay.classList.remove("is-open");
  if (zoomLastFocused) zoomLastFocused.focus();
}

function setZoom(next) {
  zoomState.scale = Math.max(1, Math.min(4, next));
  if (zoomState.scale === 1) {
    zoomState.x = 0;
    zoomState.y = 0;
  }
  applyZoomTransform(true);
}

function resetZoom() {
  zoomState.scale = 1;
  zoomState.x = 0;
  zoomState.y = 0;
  applyZoomTransform(true);
}

function applyZoomTransform(animate) {
  const img = document.getElementById("zoomImg");
  const viewport = document.getElementById("zoomViewport");
  const level = document.getElementById("zoomLevel");
  if (!img) return;
  img.style.transition = animate ? "transform .2s ease" : "none";
  img.style.transform = `translate(${zoomState.x}px, ${zoomState.y}px) scale(${zoomState.scale})`;
  if (level) level.textContent = Math.round(zoomState.scale * 100) + "%";
  if (viewport)
    viewport.style.cursor = zoomState.scale > 1 ? "grab" : "zoom-in";
  const outBtn = document.getElementById("zoomOutBtn");
  const inBtn = document.getElementById("zoomInBtn");
  if (outBtn) outBtn.disabled = zoomState.scale <= 1;
  if (inBtn) inBtn.disabled = zoomState.scale >= 4;
}

/* ---------------------------------------------------------------------- */
/* Inquiry form — sends to jayrrolloque16@gmail.com via Web3Forms        */
/* ---------------------------------------------------------------------- */
function initInquiryForm() {
  const form = document.getElementById("inquiryForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("inqSubmit");
  const originalBtnHTML = submitBtn.innerHTML;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    if (!form.checkValidity()) {
      status.textContent = "Please fill in all fields with a valid email.";
      status.classList.add("is-error");
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="ph ph-circle-notch"></i> Sending…`;

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const json = await res.json();

      if (json.success) {
        form.reset();
        status.textContent =
          "Thanks — your message has been sent. I'll get back to you within 24 hours.";
        status.classList.add("is-success");
      } else {
        throw new Error(json.message || "Submission failed");
      }
    } catch (err) {
      status.textContent =
        "Something went wrong sending your message. Please email me directly at jayrrolloque16@gmail.com.";
      status.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });
}

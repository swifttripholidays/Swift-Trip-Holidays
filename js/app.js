/* ============================================================
   SWIFT TRIP HOLIDAYS — app.js
   All JavaScript: Preloader, GSAP, AOS, Swiper, Particles,
   Typed.js, FAQ, Dark Mode, WhatsApp, Counter, Navbar
   ============================================================ */

/* ---- Wait for DOM to be ready ---- */
document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     1. PRELOADER
     Shows a 4-second luxury intro animation, then fades out.
     ============================================================ */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    /* Particles in preloader (if particles.js is loaded) */
    if (
      typeof particlesJS !== "undefined" &&
      document.getElementById("particles-preload")
    ) {
      particlesJS(
        "particles-preload",
        getParticleConfig("rgba(247,148,29,0.4)", 60),
      );
    }

    /* Progress bar animation */
    const fill = document.querySelector(".preloader-progress-fill");
    const pct = document.querySelector(".preloader-percent");
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 4 + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      if (fill) fill.style.width = progress + "%";
      if (pct) pct.textContent = Math.floor(progress) + "%";
    }, 50);

    /* GSAP logo entrance */
    if (typeof gsap !== "undefined") {
      const tl = gsap.timeline();
      tl.fromTo(
        ".preloader-logo-wrap",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" },
      )
        .fromTo(
          ".preloader-logo-text",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          ".preloader-sub",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.2",
        )
        .fromTo(
          ".preloader-progress-wrap",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.1",
        );
    }

    /* Fade out preloader after 4 seconds */
    setTimeout(() => {
      if (typeof gsap !== "undefined") {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            preloader.style.display = "none";
            initHeroAnimations();
          },
        });
      } else {
        preloader.style.transition = "opacity 0.8s";
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
          initHeroAnimations();
        }, 800);
      }
    }, 4000);
  } else {
    initHeroAnimations();
  }

  /* ============================================================
     2. HERO PARTICLES (homepage only)
     ============================================================ */
  if (typeof particlesJS !== "undefined") {
    const heroParticles = document.getElementById("particles-hero");
    if (heroParticles) {
      particlesJS(
        "particles-hero",
        getParticleConfig("rgba(255,255,255,0.3)", 80),
      );
    }
  }

  /* ============================================================
     3. TYPED.JS — animated text in hero
     ============================================================ */
  /* ============================================================
   TYPED JS — FIXED DOUBLE CURSOR ISSUE
============================================================ */

  /* ============================================================
     4. AOS — Animate On Scroll
     ============================================================ */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      delay: 0,
    });
  }

  /* ============================================================
     5. NAVBAR — Sticky scroll + hamburger menu
     ============================================================ */
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const navOverlay = document.querySelector(".nav-overlay");

  /* Scroll handler */
  window.addEventListener(
    "scroll",
    () => {
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
      }
      /* Scroll to top button */
      const scrollTop = document.getElementById("scroll-top");
      if (scrollTop) {
        scrollTop.classList.toggle("visible", window.scrollY > 400);
      }
    },
    { passive: true },
  );

  /* Hamburger toggle */
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("open");
      navOverlay?.classList.toggle("active");
      document.body.style.overflow = mobileNav.classList.contains("open")
        ? "hidden"
        : "";
    });

    navOverlay?.addEventListener("click", closeNav);
    document
      .querySelectorAll(".mobile-nav a")
      .forEach((a) => a.addEventListener("click", closeNav));
  }

  function closeNav() {
    hamburger?.classList.remove("active");
    mobileNav?.classList.remove("open");
    navOverlay?.classList.remove("active");
    document.body.style.overflow = "";
  }

  /* Active nav link highlighter */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((link) => {
    if (
      link.getAttribute("href") === currentPage ||
      (currentPage === "" && link.getAttribute("href") === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  /* ============================================================
     6. DARK MODE TOGGLE
     ============================================================ */
  const darkToggle = document.querySelector(".dark-toggle");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme") || "light";

  body.setAttribute("data-theme", savedTheme);
  updateDarkIcon(savedTheme);

  darkToggle?.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateDarkIcon(next);
  });

  function updateDarkIcon(theme) {
    const icon = darkToggle?.querySelector("i");
    if (icon) {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }

  /* ============================================================
     7. SCROLL TO TOP BUTTON
     ============================================================ */
  const scrollTopBtn = document.getElementById("scroll-top");
  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ============================================================
     8. FAQ ACCORDION
     ============================================================ */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");

    q?.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      /* Close all */
      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("active");
        const ai = i.querySelector(".faq-a");
        if (ai) ai.style.maxHeight = "0";
      });

      /* Open clicked (if was closed) */
      if (!isOpen) {
        item.classList.add("active");
        if (a) a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ============================================================
     9. TESTIMONIALS SWIPER
     ============================================================ */
  if (typeof Swiper !== "undefined") {
    const testimonialSwiper = document.querySelector(".swiper-testimonials");
    if (testimonialSwiper) {
      new Swiper(".swiper-testimonials", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }

    /* Countries swiper (mobile) */
    const countrySwiper = document.querySelector(".swiper-countries");
    if (countrySwiper) {
      new Swiper(".swiper-countries", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination-countries", clickable: true },
        breakpoints: {
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        },
      });
    }

    /* Success stories swiper */
    const storiesSwiper = document.querySelector(".swiper-stories");
    if (storiesSwiper) {
      new Swiper(".swiper-stories", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 3500 },
        pagination: { el: ".swiper-pagination-stories", clickable: true },
        breakpoints: {
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }
  }

  /* ============================================================
     10. COUNTER ANIMATION (Stats)
     ============================================================ */
  const counters = document.querySelectorAll(
    ".stat-num, .achievement-num, .counter",
  );
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = true;
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => counterObserver.observe(c));

  function animateCounter(el) {
    const text = el.textContent.trim();
    const suffix = text.replace(/[\d,]/g, ""); /* e.g. '+', '%', 'k' */
    const rawNum = parseFloat(text.replace(/[^0-9.]/g, ""));
    const isFloat = text.includes(".");
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); /* ease out cubic */
      const current = rawNum * eased;
      el.textContent =
        (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) +
        suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ============================================================
     11. CONTACT FORM (EmailJS)
     ============================================================ */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const msg = document.getElementById("form-msg");

      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      try {
        if (typeof emailjs !== "undefined") {
          /* 
            ⚠️ REPLACE THESE WITH YOUR EMAILJS CREDENTIALS:
            Service ID:  Go to emailjs.com → Email Services
            Template ID: Go to emailjs.com → Email Templates
            Public Key:  Go to emailjs.com → Account → API Keys
          */
          await emailjs.sendForm(
            "service_so7sf9k" /* ← Replace this */,
            "template_idc7jca" /* ← Replace this */,
            contactForm,
            "_s4w3GtgFpIO3lZPL" /* ← Replace this */,
          );

          msg.className = "form-msg success";
          msg.textContent = "✅ Thank you! We'll contact you within 24 hours.";
          msg.style.display = "block";
          contactForm.reset();
        } else {
          throw new Error("EmailJS not loaded");
        }
      } catch (err) {
        msg.className = "form-msg error";
        msg.textContent =
          "❌ Something went wrong. Please try WhatsApp or email us directly.";
        msg.style.display = "block";
        console.error("EmailJS error:", err);
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        setTimeout(() => {
          msg.style.display = "none";
        }, 6000);
      }
    });
  }

  /* ============================================================
     12. NEWSLETTER FORM
     ============================================================ */
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      const btn = newsletterForm.querySelector("button");
      if (input?.value) {
        btn.textContent = "✅ Subscribed!";
        input.value = "";
        setTimeout(() => {
          btn.textContent = "Subscribe";
        }, 3000);
      }
    });
  }

  /* ============================================================
     13. SMOOTH SCROLL for anchor links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ============================================================
     14. GALLERY LIGHTBOX (simple)
     ============================================================ */
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return;

      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,0.92);
        z-index:99000; display:flex; align-items:center; justify-content:center;
        cursor:pointer; animation:fadeIn 0.3s ease;
      `;

      const image = document.createElement("img");
      image.src = img.src;
      image.style.cssText = `
        max-width:90vw; max-height:90vh; border-radius:12px;
        box-shadow:0 20px 80px rgba(0,0,0,0.8);
      `;

      const close = document.createElement("button");
      close.innerHTML = "✕";
      close.style.cssText = `
        position:absolute; top:20px; right:24px; background:none; border:none;
        color:white; font-size:28px; cursor:pointer;
      `;

      overlay.appendChild(image);
      overlay.appendChild(close);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => overlay.remove());
    });
  });

  /* ============================================================
     15. RATING BARS ANIMATION
     ============================================================ */
  const ratingBars = document.querySelectorAll(".rating-bar-fill");
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "width 1s ease";
        }
      });
    },
    { threshold: 0.5 },
  );

  ratingBars.forEach((bar) => barObserver.observe(bar));
}); /* END DOMContentLoaded */

/* ============================================================
   HERO GSAP ANIMATIONS
   Called after preloader fades out
   ============================================================ */
function initHeroAnimations() {
  if (typeof gsap === "undefined") return;

  const heroLeft = document.querySelector(".hero-left");
  if (!heroLeft) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.fromTo(
    ".hero-badge",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
  )
    .fromTo(
      ".hero-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4",
    )
    .fromTo(
      ".hero-typed-wrap",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.4",
    )
    .fromTo(
      ".hero-desc",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.4",
    )
    .fromTo(
      ".hero-actions",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3",
    )
    .fromTo(
      ".hero-trust",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3",
    )
    .fromTo(
      ".hero-right",
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9 },
      "-=0.8",
    )
    .fromTo(
      ".hero-float-1",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 },
      "-=0.4",
    )
    .fromTo(
      ".hero-float-2",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 },
      "-=0.4",
    );
  // Fixed: Added missing closing bracket

  /* Floating animation for hero cards */
  gsap.to(".hero-float-1", {
    y: -12,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
  gsap.to(".hero-float-2", {
    y: -10,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.5,
  });
}

/* ============================================================
   PARTICLES CONFIG HELPER
   ============================================================ */
function getParticleConfig(color, quantity) {
  return {
    particles: {
      number: { value: quantity, density: { enable: true, value_area: 800 } },
      color: { value: "#f7941d" },
      shape: { type: "circle" },
      opacity: {
        value: 0.4,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: { value: 3, random: true, anim: { enable: false } },
      line_linked: {
        enable: true,

        // ✅ FIX 1: force valid hex color instead of rgba string
        color: "#ffffff",

        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.5 } },
        push: { particles_nb: 3 },
      },
    },
    retina_detect: true,
  };
}

/* ============================================================
   WHATSAPP BUTTON
   Change the number below to your WhatsApp number.
   Format: country code + number (no spaces, no +)
   Example: 447911123456 for UK +44 7349856977
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const waBtn = document.querySelector(".wa-btn");
  if (waBtn) {
    waBtn.addEventListener("click", () => {
      /* 
        ⚠️ CHANGE THIS NUMBER:
        Replace 447911123456 with your WhatsApp business number
        Format: country code + number (no spaces, no +, no dashes)
      */
      const phone = "447349856977"; /* ← CHANGE THIS */
      const message = encodeURIComponent(
        "Hi Swift Trip Holidays, I need information about Schengen Tourist Visa from UK.",
        /* ← You can change this message text too */
      );
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    });
  }
});

// // Mobile Menu
//     const hamburger = document.querySelector(".hamburger");
//     const mobileNav = document.querySelector(".mobile-nav");
//     const overlay = document.querySelector(".nav-overlay");

//     hamburger.addEventListener("click", () => {
//       hamburger.classList.toggle("active");
//       mobileNav.classList.toggle("open");
//       overlay.classList.toggle("active");
//     });

//     overlay.addEventListener("click", () => {
//       hamburger.classList.remove("active");
//       mobileNav.classList.remove("open");
//       overlay.classList.remove("active");
//     });

//     // Dark Mode
//     const darkToggle = document.querySelector(".dark-toggle");

//     darkToggle.addEventListener("click", () => {
//       document.body.toggleAttribute("data-theme");
//     });

/* ============================================================
   ABOUT PAGE JAVASCRIPT — about.js
   Swift Trip Holidays
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     1. NAVBAR SCROLL EFFECT
     ============================================================ */

  const navbar = document.querySelector(".navbar");

  window.addEventListener(
    "scroll",
    () => {
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      }
    },
    { passive: true },
  );

  /* ============================================================
     2. MOBILE NAVBAR
     ============================================================ */

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const navOverlay = document.querySelector(".nav-overlay");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("open");
      navOverlay?.classList.toggle("active");

      document.body.style.overflow = mobileNav.classList.contains("open")
        ? "hidden"
        : "";
    });

    navOverlay?.addEventListener("click", closeNav);

    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  function closeNav() {
    hamburger?.classList.remove("active");
    mobileNav?.classList.remove("open");
    navOverlay?.classList.remove("active");

    document.body.style.overflow = "";
  }

  /* ============================================================
     3. ACTIVE NAV LINK
     ============================================================ */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* ============================================================
     4. DARK MODE
     ============================================================ */

  // const darkToggle = document.querySelector(".dark-toggle");
  // const body = document.body;

  // const savedTheme = localStorage.getItem("theme") || "light";

  // body.setAttribute("data-theme", savedTheme);

  // updateDarkIcon(savedTheme);

  // darkToggle?.addEventListener("click", () => {
  //   const currentTheme = body.getAttribute("data-theme");

  //   const newTheme = currentTheme === "dark" ? "light" : "dark";

  //   body.setAttribute("data-theme", newTheme);

  //   localStorage.setItem("theme", newTheme);

  //   updateDarkIcon(newTheme);
  // });

  // function updateDarkIcon(theme) {
  //   const icon = darkToggle?.querySelector("i");

  //   if (!icon) return;

  //   icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  // }

  /* ============================================================
     5. AOS ANIMATION
     ============================================================ */

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }

  /* ============================================================
     6. HERO PARTICLES
     ============================================================ */

  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-about")
  ) {
    particlesJS("particles-about", {
      particles: {
        number: {
          value: 70,
          density: {
            enable: true,
            value_area: 900,
          },
        },

        color: {
          value: "#f7941d",
        },

        shape: {
          type: "circle",
        },

        opacity: {
          value: 0.4,
          random: true,
        },

        size: {
          value: 3,
          random: true,
        },

        line_linked: {
          enable: true,
          distance: 140,
          color: "rgba(255,255,255,0.3)",
          opacity: 0.2,
          width: 1,
        },

        move: {
          enable: true,
          speed: 1.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
        },
      },

      interactivity: {
        detect_on: "canvas",

        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },

          onclick: {
            enable: true,
            mode: "push",
          },

          resize: true,
        },

        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },

          push: {
            particles_nb: 4,
          },
        },
      },

      retina_detect: true,
    });
  }

  /* ============================================================
     7. GSAP HERO ANIMATION
     ============================================================ */

  if (typeof gsap !== "undefined") {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.fromTo(
      ".section-label",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
      },
    )

      .fromTo(
        ".about-hero h1",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
        },
        "-=0.4",
      )

      .fromTo(
        ".about-hero p",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        "-=0.5",
      );
  }

  /* ============================================================
     8. COUNTER ANIMATION
     ============================================================ */

  const counters = document.querySelectorAll(".stat-card h3");
  // const counters = document.querySelectorAll(".stat-card1 h3");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 1.0, // Fixed: Must be between 0.0 and 1.0
    },
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  function animateCounter(counter) {
    const text = counter.innerText;

    const target = parseInt(text.replace(/\D/g, ""));

    const suffix = text.replace(/[0-9]/g, "");

    let current = 0;

    const increment = target / 80;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        counter.innerText = Math.floor(current) + suffix;

        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target + suffix;
      }
    };

    updateCounter();
  }

  /* ============================================================
     9. WHY CARDS HOVER EFFECT
     ============================================================ */

  const whyCards = document.querySelectorAll(".why-card");

  whyCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(card.querySelector(".why-icon"), {
          rotate: 10,
          scale: 1.08,
          duration: 0.3,
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(card.querySelector(".why-icon"), {
          rotate: 0,
          scale: 1,
          duration: 0.3,
        });
      }
    });
  });

  /* ============================================================
     10. PROCESS CARDS ANIMATION
     ============================================================ */

  if (typeof gsap !== "undefined") {
    gsap.from(".process-card", {
      scrollTrigger: ".process-grid",

      y: 80,
      opacity: 0,

      duration: 1,

      stagger: 0.2,

      ease: "power3.out",
    });
  }

  /* ============================================================
     11. SMOOTH SCROLL
     ============================================================ */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* ============================================================
     12. FLOATING IMAGE EFFECT
     ============================================================ */

  if (typeof gsap !== "undefined") {
    gsap.to(".about-image", {
      y: -15,

      duration: 3,

      repeat: -1,

      yoyo: true,

      ease: "sine.inOut",
    });
  }

  /* ============================================================
     13. CTA BUTTON ANIMATION
     ============================================================ */

  const ctaButtons = document.querySelectorAll(".btn-primary");

  ctaButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(btn, {
          scale: 1.05,

          duration: 0.3,
        });
      }
    });

    btn.addEventListener("mouseleave", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(btn, {
          scale: 1,

          duration: 0.3,
        });
      }
    });
  });

  /* ============================================================
     14. SCROLL TO TOP BUTTON
     ============================================================ */

  const scrollTopBtn = document.getElementById("scroll-top");

  window.addEventListener("scroll", () => {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
    }
  });

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* ============================================================
     15. WHATSAPP BUTTON
     ============================================================ */

  const waBtn = document.querySelector(".wa-btn");

  waBtn?.addEventListener("click", () => {
    const phone = "447911123456";

    const message = encodeURIComponent(
      "Hi Swift Trip Holidays, I want information about Schengen Tourist Visa.",
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     AOS
  ============================================================ */

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }

  /* ============================================================
     PARTICLES
  ============================================================ */

  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-about")
  ) {
    particlesJS("particles-about", {
      particles: {
        number: {
          value: 70,
          density: {
            enable: true,
            value_area: 800,
          },
        },

        color: {
          value: "#f7941d",
        },

        shape: {
          type: "circle",
        },

        opacity: {
          value: 0.4,
          random: true,
        },

        size: {
          value: 3,
          random: true,
        },

        line_linked: {
          enable: true,
          distance: 140,
          color: "#ffffff",
          opacity: 0.15,
          width: 1,
        },

        move: {
          enable: true,
          speed: 1.5,
          random: true,
        },
      },

      retina_detect: true,
    });
  }

  /* ============================================================
     GSAP HERO
  ============================================================ */

  if (typeof gsap !== "undefined") {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.from(".section-label", {
      y: 20,
      opacity: 0,
      duration: 0.7,
    })

      .from(
        ".about-hero h1",
        {
          y: 40,
          opacity: 0,
          duration: 0.9,
        },
        "-=0.4",
      )

      .from(
        ".about-hero p",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5",
      );
  }

  /* ============================================================
     MOBILE NAV
  ============================================================ */

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const navOverlay = document.querySelector(".nav-overlay");

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("open");
    navOverlay.classList.toggle("active");
  });

  navOverlay?.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("open");
    navOverlay.classList.remove("active");
  });

  /* ============================================================
     DARK MODE
  ============================================================ */

  const darkToggle = document.querySelector(".dark-toggle");

  const savedTheme = localStorage.getItem("theme") || "light";

  document.body.setAttribute("data-theme", savedTheme);

  updateIcon(savedTheme);

  darkToggle?.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");

    const next = current === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", next);

    localStorage.setItem("theme", next);

    updateIcon(next);
  });

  function updateIcon(theme) {
    const icon = darkToggle?.querySelector("i");

    if (!icon) return;

    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     AOS
  ============================================================ */

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
    });
  }

  /* ============================================================
     PARTICLES
  ============================================================ */

  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-stories")
  ) {
    particlesJS("particles-stories", {
      particles: {
        number: {
          value: 80,
        },

        color: {
          value: "#f7941d",
        },

        shape: {
          type: "circle",
        },

        opacity: {
          value: 0.4,
        },

        size: {
          value: 3,
          random: true,
        },

        line_linked: {
          enable: true,
          distance: 140,
          color: "#ffffff",
          opacity: 0.15,
        },

        move: {
          enable: true,
          speed: 1.5,
        },
      },
    });
  }

  /* ============================================================
     SWIPER
  ============================================================ */

  if (typeof Swiper !== "undefined") {
    new Swiper(".swiper-stories", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,

      autoplay: {
        delay: 3500,
      },

      pagination: {
        el: ".swiper-pagination-stories",
        clickable: true,
      },

      breakpoints: {
        768: {
          slidesPerView: 2,
        },

        1100: {
          slidesPerView: 3,
        },
      },
    });
  }

  /* ============================================================
     MOBILE NAV
  ============================================================ */

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const navOverlay = document.querySelector(".nav-overlay");

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("open");
    navOverlay.classList.toggle("active");
  });

  navOverlay?.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("open");
    navOverlay.classList.remove("active");
  });

  /* ============================================================
     DARK MODE
  ============================================================ */

  const darkToggle = document.querySelector(".dark-toggle");

  const savedTheme = localStorage.getItem("theme") || "light";

  document.body.setAttribute("data-theme", savedTheme);

  updateIcon(savedTheme);

  darkToggle?.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");

    const next = current === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", next);

    localStorage.setItem("theme", next);

    updateIcon(next);
  });

  function updateIcon(theme) {
    const icon = darkToggle?.querySelector("i");

    if (!icon) return;

    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
});

/* ============================================================
   SWIFT TRIP HOLIDAYS — app.js
   All JavaScript: Preloader, GSAP, AOS, Swiper, Particles,
   Typed.js, FAQ, Dark Mode, WhatsApp, Counter, Navbar
   ============================================================ */

/* ---- Wait for DOM to be ready ---- */
document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     1. PRELOADER
     Shows a 4-second luxury intro animation, then fades out.
     ============================================================ */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    /* Particles in preloader (if particles.js is loaded) */
    if (
      typeof particlesJS !== "undefined" &&
      document.getElementById("particles-preload")
    ) {
      particlesJS(
        "particles-preload",
        getParticleConfig("rgba(247,148,29,0.4)", 60),
      );
    }

    /* Progress bar animation */
    const fill = document.querySelector(".preloader-progress-fill");
    const pct = document.querySelector(".preloader-percent");
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 4 + 1;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }

      if (fill) fill.style.width = progress + "%";
      if (pct) pct.textContent = Math.floor(progress) + "%";
    }, 50);

    /* GSAP logo entrance */
    if (typeof gsap !== "undefined") {
      const tl = gsap.timeline();

      tl.fromTo(
        ".preloader-logo-wrap",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" },
      )

        .fromTo(
          ".preloader-logo-text",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )

        .fromTo(
          ".preloader-sub",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.2",
        )

        .fromTo(
          ".preloader-progress-wrap",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.1",
        );
    }

    /* Fade out preloader after 4 seconds */
    setTimeout(() => {
      if (typeof gsap !== "undefined") {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",

          onComplete: () => {
            preloader.style.display = "none";
            initHeroAnimations();
          },
        });
      } else {
        preloader.style.transition = "opacity 0.8s";
        preloader.style.opacity = "0";

        setTimeout(() => {
          preloader.style.display = "none";
          initHeroAnimations();
        }, 800);
      }
    }, 4000);
  } else {
    initHeroAnimations();
  }

  /* ============================================================
     2. HERO PARTICLES (homepage only)
     ============================================================ */

  if (typeof particlesJS !== "undefined") {
    const heroParticles = document.getElementById("particles-hero");

    if (heroParticles) {
      particlesJS(
        "particles-hero",
        getParticleConfig("rgba(255,255,255,0.3)", 80),
      );
    }
  }

  /* ============================================================
     3. TYPED.JS — animated text in hero
     ============================================================ */

  const typedEl = document.getElementById("typed-text");

  if (typedEl && typeof Typed !== "undefined") {
    new Typed("#typed-text", {
      strings: [
        "Schengen Tourist Visa",
        "Explore Europe",
        "Travel With Confidence",
        "Fast Visa Approvals",
        "Trusted Visa Experts",
      ],
      // typeDelay:3000,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      typeDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
  }

  /* ============================================================
     4. AOS — Animate On Scroll
     ============================================================ */

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      delay: 0,
    });
  }

  /* ============================================================
     5. NAVBAR — Sticky scroll + hamburger menu
     ============================================================ */

  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const navOverlay = document.querySelector(".nav-overlay");

  /* Scroll handler */

  window.addEventListener(
    "scroll",
    () => {
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
      }

      /* Scroll to top button */

      const scrollTop = document.getElementById("scroll-top");

      if (scrollTop) {
        scrollTop.classList.toggle("visible", window.scrollY > 400);
      }
    },
    { passive: true },
  );

  /* ============================================================
     FIXED MOBILE NAVBAR
     ============================================================ */

  function openNav() {
    if (!hamburger || !mobileNav) return;

    hamburger.classList.add("active");
    mobileNav.classList.add("open");

    if (navOverlay) {
      navOverlay.classList.add("active");
    }

    document.body.style.overflow = "hidden";
  }

  function closeNav() {
    if (!hamburger || !mobileNav) return;

    hamburger.classList.remove("active");
    mobileNav.classList.remove("open");

    if (navOverlay) {
      navOverlay.classList.remove("active");
    }

    document.body.style.overflow = "";
  }

  function toggleNav() {
    if (!mobileNav) return;

    if (mobileNav.classList.contains("open")) {
      closeNav();
    } else {
      openNav();
    }
  }

  /* CLICK EVENT */

  if (hamburger) {
    hamburger.addEventListener("click", toggleNav);

    /* KEYBOARD ACCESSIBILITY */

    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleNav();
      }
    });
  }

  /* OVERLAY CLICK */

  if (navOverlay) {
    navOverlay.addEventListener("click", closeNav);
  }

  /* CLOSE ON LINK CLICK */

  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  /* ESC KEY CLOSE */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeNav();
    }
  });

  /* Active nav link highlighter */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((link) => {
    if (
      link.getAttribute("href") === currentPage ||
      (currentPage === "" && link.getAttribute("href") === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  /* ============================================================
     6. DARK MODE TOGGLE
     ============================================================ */

  const darkToggle = document.querySelector(".dark-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme") || "light";

  body.setAttribute("data-theme", savedTheme);

  updateDarkIcon(savedTheme);

  darkToggle?.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");

    const next = current === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", next);

    localStorage.setItem("theme", next);

    updateDarkIcon(next);
  });

  function updateDarkIcon(theme) {
    const icon = darkToggle?.querySelector("i");

    if (icon) {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }

  /* ============================================================
     7. SCROLL TO TOP BUTTON
     ============================================================ */

  const scrollTopBtn = document.getElementById("scroll-top");

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* ============================================================
     8. FAQ ACCORDION
     ============================================================ */

  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");

    q?.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      /* Close all */

      document.querySelectorAll(".faq-item").forEach((i) => {
        i.classList.remove("active");

        const ai = i.querySelector(".faq-a");

        if (ai) ai.style.maxHeight = "0";
      });

      /* Open clicked */

      if (!isOpen) {
        item.classList.add("active");

        if (a) {
          a.style.maxHeight = a.scrollHeight + "px";
        }
      }
    });
  });

  /* ============================================================
     9. TESTIMONIALS SWIPER
     ============================================================ */

  if (typeof Swiper !== "undefined") {
    const testimonialSwiper = document.querySelector(".swiper-testimonials");

    if (testimonialSwiper) {
      new Swiper(".swiper-testimonials", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,

        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },

        breakpoints: {
          640: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },
        },
      });
    }

    /* Countries swiper */

    const countrySwiper = document.querySelector(".swiper-countries");

    if (countrySwiper) {
      new Swiper(".swiper-countries", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,

        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination-countries",
          clickable: true,
        },

        breakpoints: {
          480: {
            slidesPerView: 2,
          },

          768: {
            slidesPerView: 3,
          },

          1024: {
            slidesPerView: 4,
          },
        },
      });
    }

    /* Success stories swiper */

    const storiesSwiper = document.querySelector(".swiper-stories");

    if (storiesSwiper) {
      new Swiper(".swiper-stories", {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,

        autoplay: {
          delay: 3500,
        },

        pagination: {
          el: ".swiper-pagination-stories",
          clickable: true,
        },

        breakpoints: {
          640: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },
        },
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     AOS
  ============================================================ */

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
    });
  }

  /* ============================================================
     PARTICLES
  ============================================================ */

  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-services")
  ) {
    particlesJS("particles-services", {
      particles: {
        number: {
          value: 90,
        },

        color: {
          value: "#f7941d",
        },

        shape: {
          type: "circle",
        },

        opacity: {
          value: 0.4,
        },

        size: {
          value: 3,
          random: true,
        },

        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.15,
        },

        move: {
          enable: true,
          speed: 1.6,
        },
      },
    });
  }
});

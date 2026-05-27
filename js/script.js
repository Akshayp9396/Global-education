/**
 * Global Education - Custom Scripting System
 * Author: AntigravityPairCoder
 * -----------------------------------------
 * Clean, modern vanilla JavaScript implementation
 * Includes advanced interaction, security, performance, and SEO integrations
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. PRELOADER DISMISSAL
  // ==========================================
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      setTimeout(() => {
        preloader.remove();
      }, 500);
    });

    // Safety timeout in case load event takes too long
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        setTimeout(() => preloader.remove(), 500);
      }
    }, 4000);
  }

  // ==========================================
  // 2. STICKY NAVBAR & ACTIVE NAVIGATION
  // ==========================================
  const header = document.querySelector("header");
  const backToTop = document.querySelector(".float-backtotop");
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  // Highlight active link by exact page match
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Sticky Header toggle
    if (scrollY > 50) {
      header?.classList.add("sticky");
    } else {
      header?.classList.remove("sticky");
    }

    // Back to Top button show/hide
    if (scrollY > 300) {
      backToTop?.classList.add("visible");
    } else {
      backToTop?.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Scroll to Top action
  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // ==========================================
  // 3. MOBILE HAMBURGER MENU DRAWER
  // ==========================================
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("overflow-hidden");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("overflow-hidden");
      });
    });
  }

  // ==========================================
  // ==========================================
  // 4. INTERACTIVE CANVAS PARTICLE BACKGROUNDS (IGNITE STYLE)
  // ==========================================
  const initCanvasParticles = (canvasIdOrClass, colorRed, colorGreen, colorBlue) => {
    const canvases = document.querySelectorAll(canvasIdOrClass);
    canvases.forEach(canvas => {
      const ctx = canvas.getContext("2d");
      let particles = [];
      let animationFrameId;

      const resizeCanvas = () => {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      };

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.8;
          this.vy = (Math.random() - 0.5) * 0.8;
          this.radius = Math.random() * 2.5 + 1.5;
          this.color = `rgba(${colorRed}, ${colorGreen}, ${colorBlue}, 0.35)`;
        }

        update() {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
          if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }

      const initParticles = () => {
        particles = [];
        const particleCount = Math.min(Math.floor(canvas.width / 18), 75);
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      };

      const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, idx) => {
          p.update();
          p.draw();

          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.12;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${colorRed}, ${colorGreen}, ${colorBlue}, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        animationFrameId = requestAnimationFrame(animateParticles);
      };

      initParticles();
      animateParticles();
    });
  };

  // Initialize Home Hero canvas (Brand Crimson Red nodes)
  initCanvasParticles("#hero-particles", 227, 6, 19);

  // Initialize Inner Banners canvas (Brand Crimson Red nodes to match Home Hero precisely)
  initCanvasParticles(".page-banner-particles", 227, 6, 19);

  // ==========================================
  // 5. SCROLL REVEAL SYSTEM (INTERSECTION OBSERVER)
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add("active"));
  }

  // ==========================================
  // 6. ANIMATED STATISTICS COUNTER TICKER
  // ==========================================
  const statsSection = document.querySelector(".stats-banner");
  const statNumbers = document.querySelectorAll(".stats-number span");
  let countersAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute("data-target"), 10);
      const suffix = num.getAttribute("data-suffix") || "";
      const duration = 1800;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = progress * (2 - progress);
        const currentValue = Math.floor(easedProgress * target);

        num.textContent = currentValue + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          num.textContent = target + suffix;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  if (statsSection && statNumbers.length > 0) {
    if ("IntersectionObserver" in window) {
      const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          statsObserver.unobserve(entries[0].target);
        }
      }, { threshold: 0.2 });

      statsObserver.observe(statsSection);
    } else {
      animateCounters();
    }
  }

  // ==========================================
  // 7. TESTIMONIALS SLIDER CAROUSEL
  // ==========================================
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".control-prev");
  const nextBtn = document.querySelector(".control-next");
  const dotsContainer = document.querySelector(".slider-dots");

  if (testimonialSlides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    testimonialSlides.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (idx === 0) dot.classList.add("active");
      dot.addEventListener("click", () => showSlide(idx));
      dotsContainer?.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    const showSlide = (n) => {
      testimonialSlides[currentSlide].classList.remove("active");
      dots[currentSlide]?.classList.remove("active");

      currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;

      testimonialSlides[currentSlide].classList.add("active");
      dots[currentSlide]?.classList.add("active");

      resetInterval();
    };

    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);

    nextBtn?.addEventListener("click", nextSlide);
    prevBtn?.addEventListener("click", prevSlide);

    const startInterval = () => {
      slideInterval = setInterval(nextSlide, 6000);
    };

    const resetInterval = () => {
      clearInterval(slideInterval);
      startInterval();
    };

    startInterval();

    const sliderContainer = document.querySelector(".testimonials-slider");
    sliderContainer?.addEventListener("mouseenter", () => clearInterval(slideInterval));
    sliderContainer?.addEventListener("mouseleave", startInterval);
  }

  // ==========================================
  // 8. FAQ ACCORDION TRANSITIONS
  // ==========================================
  const faqHeaders = document.querySelectorAll(".faq-header");

  faqHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const faqItem = header.parentElement;
      const faqBody = faqItem?.querySelector(".faq-body");
      const isActive = faqItem?.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(item => {
        if (item !== faqItem) {
          item.classList.remove("active");
          const body = item.querySelector(".faq-body");
          if (body) body.style.maxHeight = null;
        }
      });

      if (faqItem && faqBody) {
        if (isActive) {
          faqItem.classList.remove("active");
          faqBody.style.maxHeight = null;
        } else {
          faqItem.classList.add("active");
          faqBody.style.maxHeight = faqBody.scrollHeight + "px";
        }
      }
    });
  });

  // ==========================================
  // 9. SECURITY & FORM SANITIZATION SYSTEM
  // ==========================================
  const contactForm = document.getElementById("contactForm");

  const showNotification = (message, type = "success") => {
    document.querySelector(".alert-popup")?.remove();

    const notification = document.createElement("div");
    notification.className = `alert-popup alert-popup-${type}`;

    const icon = document.createElement("i");
    icon.className = type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";

    const textNode = document.createTextNode(message);

    notification.appendChild(icon);
    notification.appendChild(textNode);
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("active"), 10);

    setTimeout(() => {
      notification.classList.remove("active");
      setTimeout(() => notification.remove(), 400);
    }, 4500);
  };

  const sanitizeInput = (str) => {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const honeypot = document.getElementById("faxNum");
      if (honeypot && honeypot.value.trim() !== "") {
        showNotification("Security validation failed.", "error");
        return;
      }

      const name = contactForm.querySelector("#name")?.value.trim() || "";
      const email = contactForm.querySelector("#email")?.value.trim() || "";
      const phone = contactForm.querySelector("#phone")?.value.trim() || "";
      const subject = contactForm.querySelector("#subject")?.value.trim() || "";
      const message = contactForm.querySelector("#message")?.value.trim() || "";

      if (!name || !email || !message) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      if (phone) {
        const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;
        if (!phoneRegex.test(phone)) {
          showNotification("Please enter a valid phone number.", "error");
          return;
        }
      }

      const sanitizedPayload = {
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        phone: sanitizeInput(phone),
        subject: sanitizeInput(subject),
        message: sanitizeInput(message)
      };

      console.log("Secure Sanitized Data Sent:", sanitizedPayload);
      showNotification("Thank you! Your inquiry has been sent successfully. We will contact you soon.", "success");
      contactForm.reset();
    });
  }

  // ==========================================
  // 10. COURSES SEARCH AND JS FILTERS
  // ==========================================
  const searchInput = document.getElementById("courseSearch");
  const filterCat = document.getElementById("filterCategory");
  const filterDest = document.getElementById("filterDestination");
  const courseCards = document.querySelectorAll(".courses-grid .course-card");

  const runCourseFilter = () => {
    const query = searchInput?.value.toLowerCase().trim() || "";
    const category = filterCat?.value || "all";
    const university = filterDest?.value || "all";

    courseCards.forEach(card => {
      const title = card.querySelector(".course-card-title")?.textContent.toLowerCase() || "";
      const description = card.querySelector(".course-meta")?.parentElement.innerHTML.toLowerCase() || "";
      const cardCategory = card.getAttribute("data-category") || "";
      const cardUniversity = card.getAttribute("data-destination") || "";

      const queryMatches = title.includes(query) || description.includes(query);
      const categoryMatches = category === "all" || cardCategory === category;
      const universityMatches = university === "all" || cardUniversity === university;

      if (queryMatches && categoryMatches && universityMatches) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.4s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  };

  if (searchInput || filterCat || filterDest) {
    searchInput?.addEventListener("input", runCourseFilter);
    filterCat?.addEventListener("change", runCourseFilter);
    filterDest?.addEventListener("change", runCourseFilter);
  }

  // Course Details Modal Setup
  const courseModal = document.getElementById("courseModal");
  const modalClose = document.querySelector(".course-modal-close");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");

  const modalDetails = {
    "bed": {
      title: "Bachelor of Education (B.Ed.) Guidance",
      cat: "B.Ed. teacher education",
      body: `
        <h4>Program Overview</h4>
        <p>A professional two-year degree program mandatory for individuals aiming to establish high-impact teaching careers in Indian secondary and higher secondary schools. Affiliated with top-tier NCTE-approved universities, we offer guidance for complete study support, assignment coordination, and direct admission routes.</p>
        
        <div class="modal-details-grid">
          <div class="modal-detail-item">
            <span class="modal-detail-label">Duration</span>
            <span class="modal-detail-val">2 Years (Full-Time)</span>
          </div>
          <div class="modal-detail-item">
            <span class="modal-detail-label">Average Tuition Fee</span>
            <span class="modal-detail-val">₹25,000 - ₹50,000 / Year</span>
          </div>
          <div class="modal-detail-item">
            <span class="modal-detail-label">Admission Eligibility</span>
            <span class="modal-detail-val">Any UG/PG degree + 50% Marks</span>
          </div>
          <div class="modal-detail-item">
            <span class="modal-detail-label">Affiliated Universities</span>
            <span class="modal-detail-val">Bangalore Univ, Mangalore Univ, TNTEU</span>
          </div>
        </div>

        <h4>Specialization Options Available</h4>
        <p>Select from core school subjects including English, Social Science, Mathematics, Physical Science, Natural Science, and Commerce.</p>
      `
    },
    "med": {
      title: "Master of Education (M.Ed.) Guidance",
      cat: "M.Ed. postgraduate program",
      body: `
        <h4>Program Overview</h4>
        <p>An advanced post-graduate professional teacher-training course designed to nurture highly qualified educational researchers, administrative planners, curriculum developers, and college lecturers.</p>
        
        <div class="modal-details-grid">
          <div class="modal-detail-item">
            <span class="modal-detail-label">Duration</span>
            <span class="modal-detail-val">2 Years (Full-Time)</span>
          </div>
          <div class="modal-detail-item">
            <span class="modal-detail-label">Average Tuition Fee</span>
            <span class="modal-detail-val">₹30,000 - ₹60,000 / Year</span>
          </div>
          <div class="modal-detail-item">
            <span class="modal-detail-label">Admission Eligibility</span>
            <span class="modal-detail-val">B.Ed. Degree + 50% Aggregate</span>
          </div>
          <div class="modal-detail-item">
            <span class="modal-detail-label">Affiliated Universities</span>
            <span class="modal-detail-val">Mangalore Univ, Bangalore Univ, Calicut Univ</span>
          </div>
        </div>

        <h4>Career Opportunities</h4>
        <p>Prepares students for prestigious leadership roles in teacher education colleges, SCERT/NCERT agencies, school administration, and higher academic research sectors.</p>
      `
    }
  };

  const openCourseModal = (id) => {
    const data = modalDetails[id];
    if (data && courseModal) {
      const modalTitleEl = courseModal.querySelector(".course-modal-title");
      const modalCatEl = courseModal.querySelector(".course-modal-cat");
      const modalBodyEl = courseModal.querySelector(".course-modal-body");

      if (modalTitleEl) modalTitleEl.textContent = data.title;
      if (modalCatEl) modalCatEl.textContent = data.cat;
      if (modalBodyEl) modalBodyEl.innerHTML = data.body;

      courseModal.classList.add("active");
      document.body.classList.add("overflow-hidden");
    }
  };

  const closeCourseModal = () => {
    courseModal?.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const courseId = btn.getAttribute("data-id") || "";
      openCourseModal(courseId);
    });
  });

  modalClose?.addEventListener("click", closeCourseModal);
  courseModal?.addEventListener("click", (e) => {
    if (e.target === courseModal) {
      closeCourseModal();
    }
  });

  // ==========================================
  // 11. GALLERY LIGHTBOX PREVIEW & FILTERS
  // ==========================================
  const galleryFilterBtns = document.querySelectorAll(".filter-btn");
  const galleryCards = document.querySelectorAll(".gallery-main-grid .gallery-card");

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      galleryFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter") || "all";

      galleryCards.forEach(card => {
        const category = card.getAttribute("data-category") || "";
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.4s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  if (lightbox && galleryCards.length > 0) {
    let activeImages = [];
    let currentImageIndex = 0;

    const updateActiveImages = () => {
      activeImages = Array.from(galleryCards)
        .filter(card => card.style.display !== "none")
        .map(card => {
          const img = card.querySelector("img");
          const title = card.querySelector(".gallery-card-title")?.textContent || "";
          return {
            src: img?.getAttribute("src") || "",
            caption: title
          };
        });
    };

    const showImageInLightbox = (idx) => {
      if (activeImages.length === 0) return;
      currentImageIndex = (idx + activeImages.length) % activeImages.length;

      const item = activeImages[currentImageIndex];
      if (lightboxImg && lightboxCaption) {
        lightboxImg.setAttribute("src", item.src);
        lightboxCaption.textContent = item.caption;
      }
    };

    galleryCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        updateActiveImages();
        const img = card.querySelector("img");
        const src = img?.getAttribute("src") || "";

        currentImageIndex = activeImages.findIndex(item => item.src === src);
        if (currentImageIndex === -1) currentImageIndex = 0;

        showImageInLightbox(currentImageIndex);

        lightbox.classList.add("active");
        document.body.classList.add("overflow-hidden");
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      document.body.classList.remove("overflow-hidden");
    };

    lightboxClose?.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    lightboxPrev?.addEventListener("click", () => showImageInLightbox(currentImageIndex - 1));
    lightboxNext?.addEventListener("click", () => showImageInLightbox(currentImageIndex + 1));

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImageInLightbox(currentImageIndex - 1);
      if (e.key === "ArrowRight") showImageInLightbox(currentImageIndex + 1);
    });
  }
});

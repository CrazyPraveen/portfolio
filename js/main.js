/*
 * Portfolio behaviour.
 * 1. Render content from portfolio-data.js
 * 2. Mobile navigation
 * 3. GSAP animations (only when GSAP loads and motion is not reduced)
 *
 * Content is fully visible without JavaScript. Animations are progressive
 * enhancements and are skipped on failure.
 */
(function () {
  "use strict";

  var data = window.portfolioData || {};

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function hasValue(v) {
    return typeof v === "string" && v.trim() !== "";
  }

  function externalLink(href, label, className) {
    var a = el("a", className, label);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  /* ------------------------------------------------------------------
     1. Content rendering
     ------------------------------------------------------------------ */
  function applyAccent() {
    if (hasValue(data.accentColor)) {
      document.documentElement.style.setProperty("--color-accent", data.accentColor);
    }
  }

  function bindText() {
    document.querySelectorAll("[data-bind]").forEach(function (node) {
      var value = data[node.getAttribute("data-bind")];
      if (hasValue(value)) {
        node.textContent = value;
      } else {
        node.hidden = true;
      }
    });
  }

  function bindLinks() {
    document.querySelectorAll("a[data-link]").forEach(function (a) {
      var key = a.getAttribute("data-link");
      var value = data[key];
      if (!hasValue(value)) {
        a.hidden = true;
        return;
      }
      a.href = key === "email" ? "mailto:" + value : value;
    });

    // Hide any wrapper list item whose link is hidden
    document.querySelectorAll("li").forEach(function (li) {
      var link = li.querySelector("a[data-link]");
      if (link && link.hidden) li.hidden = true;
    });
  }

  function renderAbout() {
    var container = document.getElementById("about-text");
    if (!container || !Array.isArray(data.about)) return;
    data.about.forEach(function (paragraph) {
      container.appendChild(el("p", null, paragraph));
    });
  }

  function renderSkills() {
    var container = document.getElementById("skills-grid");
    if (!container || !Array.isArray(data.skillGroups)) return;

    data.skillGroups.forEach(function (group) {
      var article = el("article", "skill-group");
      article.appendChild(el("h3", null, group.title));

      var list = el("ul", "skill-list");
      group.items.forEach(function (item) {
        list.appendChild(el("li", null, item));
      });
      article.appendChild(list);
      container.appendChild(article);
    });
  }

  function createProjectCard(project, index) {
    var card = el("article", "project-card");

    var meta = el("div", "project-meta");
    meta.appendChild(el("span", "project-index", String(index + 1).padStart(2, "0")));
    if (hasValue(project.status)) {
      meta.appendChild(el("span", "project-status", project.status));
    }
    card.appendChild(meta);

    card.appendChild(el("h3", "project-title", project.title));

    var problem = el("div");
    problem.appendChild(el("span", "project-label", "Problem"));
    problem.appendChild(el("p", "project-problem", project.problem));
    card.appendChild(problem);

    card.appendChild(el("p", "project-description", project.description));

    var contribs = el("ul", "project-contributions");
    project.contributions.forEach(function (c) {
      contribs.appendChild(el("li", null, c));
    });
    card.appendChild(contribs);

    var tech = el("ul", "project-tech");
    project.tech.forEach(function (t) {
      tech.appendChild(el("li", null, t));
    });
    card.appendChild(tech);

    // Only render link buttons for links that actually exist
    var links = el("div", "project-links");
    if (hasValue(project.github)) links.appendChild(externalLink(project.github, "Repository"));
    if (hasValue(project.demo)) links.appendChild(externalLink(project.demo, "Live demo"));
    if (links.childNodes.length) card.appendChild(links);

    return card;
  }

  function renderProjects() {
    var container = document.getElementById("projects-grid");
    if (!container || !Array.isArray(data.projects)) return;
    data.projects.forEach(function (project, index) {
      container.appendChild(createProjectCard(project, index));
    });
  }

  function createExperienceItem(job) {
    var item = el("li", "timeline-item");

    var head = el("div", "timeline-head");
    var titleBlock = el("div");
    titleBlock.appendChild(el("h3", "timeline-role", job.role));
    titleBlock.appendChild(el("p", "timeline-company", job.company));
    head.appendChild(titleBlock);
    head.appendChild(el("p", "timeline-dates", job.start + " – " + job.end));
    item.appendChild(head);

    if (hasValue(job.location)) {
      item.appendChild(el("p", "timeline-meta", job.location));
    }

    var list = el("ul", "timeline-highlights");
    job.highlights.forEach(function (h) {
      list.appendChild(el("li", null, h));
    });
    item.appendChild(list);
    return item;
  }

  function renderExperience() {
    var container = document.getElementById("experience-list");
    if (!container || !Array.isArray(data.experience)) return;
    data.experience.forEach(function (job) {
      container.appendChild(createExperienceItem(job));
    });
  }

  function setYear() {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------
     2. Mobile navigation
     ------------------------------------------------------------------ */
  function setupNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    var label = toggle.querySelector(".nav-toggle-label");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
      if (label) label.textContent = open ? "Close" : "Menu";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a section
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Escape closes the menu and returns focus to the toggle
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset state when the desktop layout takes over
    var desktop = window.matchMedia("(min-width: 768px)");
    function onBreakpoint(e) {
      if (e.matches) setOpen(false);
    }
    if (desktop.addEventListener) {
      desktop.addEventListener("change", onBreakpoint);
    } else if (desktop.addListener) {
      desktop.addListener(onBreakpoint);
    }
  }

  /* ------------------------------------------------------------------
     3. GSAP animations
     ------------------------------------------------------------------ */
  function setupAnimations() {
    if (typeof window.gsap === "undefined") return;

    var gsap = window.gsap;
    var hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
    if (hasScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // gsap.matchMedia reverts its animations automatically when the
    // condition changes, so no manual cleanup is required on resize.
    var mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", function () {
      // Hero entrance: short, staggered, visible almost immediately
      gsap.from(".hero-animate", {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.09,
        clearProps: "transform,opacity"
      });

      if (!hasScrollTrigger) return;

      // Scroll progress bar, scrubbed to page scroll
      gsap.fromTo(
        ".scroll-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
          }
        }
      );

      // Single section headings and intro blocks
      gsap.utils.toArray("[data-reveal]").forEach(function (node) {
        gsap.from(node, {
          opacity: 0,
          y: 26,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            once: true
          }
        });
      });

      // Grids: cards reveal with a light stagger
      gsap.utils.toArray("[data-reveal-group]").forEach(function (group) {
        gsap.from(group.children, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            once: true
          }
        });
      });
    });
  }


  /* ------------------------------------------------------------------
     4. Background scene
     - Canvas particle network (drawn with requestAnimationFrame)
     - Cursor glow (GSAP quickTo for smooth following)
     - Blob drift and scroll parallax (GSAP)
     ------------------------------------------------------------------ */
  function hexToRgb(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
    if (!m) return [139, 184, 255];
    var n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function setupParticles(reduced) {
    var canvas = document.getElementById("bg-canvas");
    if (!canvas || !canvas.getContext) return null;
    var ctx = canvas.getContext("2d");
    if (!ctx) return null;

    var rgb = hexToRgb(data.accentColor);
    var accentRgb = rgb[0] + "," + rgb[1] + "," + rgb[2];
    var width = 0, height = 0, dpr = 1;
    var particles = [];
    var mouse = { x: -9999, y: -9999 };
    var frameId = null;
    var running = false;
    var resizeTimer = null;
    var LINK_DISTANCE = 130;
    var MOUSE_RADIUS = 140;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with screen area and is capped for performance
      var target = Math.round(Math.min(120, Math.max(30, (width * height) / 15000)));
      if (reduced) target = Math.min(target, 40);
      particles = [];
      for (var i = 0; i < target; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.3 + 0.6
        });
      }
    }

    function step() {
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var dx = p.x - mouse.x;
        var dy = p.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0.01) {
          var force = (1 - dist / MOUSE_RADIUS) * 0.6;
          p.vx += (dx / dist) * force * 0.08;
          p.vy += (dy / dist) * force * 0.08;
        }
        // Gentle damping keeps motion calm
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Connection lines
      ctx.lineWidth = 1;
      for (var i = 0; i < particles.length; i++) {
        var a = particles[i];
        for (var j = i + 1; j < particles.length; j++) {
          var b = particles[j];
          var dx = a.x - b.x;
          var dy = a.y - b.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < LINK_DISTANCE * LINK_DISTANCE) {
            var alpha = (1 - Math.sqrt(d2) / LINK_DISTANCE) * 0.22;
            ctx.strokeStyle = "rgba(" + accentRgb + "," + alpha.toFixed(3) + ")";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Points
      ctx.fillStyle = "rgba(" + accentRgb + ",0.75)";
      for (var k = 0; k < particles.length; k++) {
        var p = particles[k];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame() {
      step();
      draw();
      frameId = window.requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduced) return;
      running = true;
      frameId = window.requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = null;
    }

    build();
    if (reduced) {
      draw(); // one static frame, no motion
    } else {
      start();
    }

    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    }, { passive: true });

    window.addEventListener("pointermove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("pointerleave", function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    return { stop: stop };
  }

  function setupCursorGlow(reduced) {
    var glow = document.querySelector(".cursor-glow");
    if (!glow || reduced || typeof window.gsap === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    var gsap = window.gsap;
    var xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
    var yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });

    window.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      xTo(e.clientX);
      yTo(e.clientY);
      glow.classList.add("is-active");
    }, { passive: true });

    document.addEventListener("pointerleave", function () {
      glow.classList.remove("is-active");
    });
  }

  function setupBlobs(reduced) {
    if (reduced || typeof window.gsap === "undefined") return;
    var gsap = window.gsap;
    var blobs = document.querySelectorAll(".blob");

    // Slow, looping drift. Transform only, so it stays on the compositor.
    blobs.forEach(function (blob, i) {
      gsap.to(blob, {
        x: (i % 2 === 0 ? 1 : -1) * 90,
        y: (i === 1 ? -70 : 70),
        scale: 1.08,
        duration: 16 + i * 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    });

    if (window.ScrollTrigger) {
      // Background moves slower than content for depth
      blobs.forEach(function (blob, i) {
        gsap.to(blob, {
          yPercent: -18 - i * 6,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6
          }
        });
      });
    }
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  function init() {
    // Content rendering must never be blocked by animation problems
    try {
      applyAccent();
      bindText();
      bindLinks();
      renderAbout();
      renderSkills();
      renderProjects();
      renderExperience();
      setYear();
      setupNav();
    } catch (err) {
      console.error("Portfolio content failed to render:", err);
    }

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      setupAnimations();
    } catch (err) {
      console.warn("Animations skipped:", err);
    }

    try {
      setupParticles(reduced);
      setupCursorGlow(reduced);
      setupBlobs(reduced);
    } catch (err) {
      console.warn("Background scene skipped:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

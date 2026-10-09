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

    try {
      setupAnimations();
    } catch (err) {
      console.warn("Animations skipped:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

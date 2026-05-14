// Notably — minimal client JS
// Two jobs: toggle the mobile nav, handle the newsletter form gracefully.

(function () {
  "use strict";

  /* ─── Mobile nav toggle ────────────────────────────────────── */

  const toggle = document.querySelector(".nav__toggle");
  const menu = document.querySelector(".nav__mobile");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = !menu.hasAttribute("hidden");
      if (isOpen) {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      } else {
        menu.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
      }
    });

    // Close menu when a link inside is tapped
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ─── Newsletter form ──────────────────────────────────────── */
  //
  // No backend wired up — this just gives the user feedback and prevents
  // the page from refreshing. Replace the success branch with a real fetch
  // to your ESP (ConvertKit, Mailchimp, Buttondown, etc.) when ready.

  const form = document.querySelector("[data-newsletter]");
  if (form) {
    const input = form.querySelector("input[type=email]");
    const status = document.querySelector(".news__status");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = (input.value || "").trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (status) status.textContent = "Please enter a valid email.";
        input.focus();
        return;
      }

      if (status) status.textContent = "Thanks — you're on the list.";
      input.value = "";

      // TODO: replace with real submit
      // fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) })
    });
  }

  /* ─── Scroll-triggered reveals ─────────────────────────────── */
  //
  // Three patterns, two observers:
  //   • [data-role-grid]  — Role Grid card cascade. 25% threshold.
  //   • [data-line-sweep] — Process / Services divider cascade. 25%.
  //   • [data-pill-sweep] — individual highlight pills (Hero "Growing",
  //                         Callout "Right", POV "Quality", Final CTA
  //                         "Count?"). Observed on the pill element
  //                         itself at a 50% threshold so the sweep
  //                         fires when the pill is half on screen.
  //
  // Each element is observed once and unobserved after firing.

  const sectionTargets = document.querySelectorAll(
    "[data-role-grid], [data-line-sweep]"
  );
  const pillTargets = document.querySelectorAll("[data-pill-sweep]");

  if ("IntersectionObserver" in window) {
    const fire = (observer) => (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });

    const sectionObs = new IntersectionObserver(
      (entries) => fire(sectionObs)(entries),
      { threshold: 0.25 }
    );
    const pillObs = new IntersectionObserver(
      (entries) => fire(pillObs)(entries),
      { threshold: 0.5 }
    );

    sectionTargets.forEach((el) => sectionObs.observe(el));
    pillTargets.forEach((el) => pillObs.observe(el));
  } else {
    // No IntersectionObserver support — reveal everything in place.
    sectionTargets.forEach((el) => el.classList.add("in-view"));
    pillTargets.forEach((el) => el.classList.add("in-view"));
  }

  /* ─── Intro pink highlight: scroll-linked growth ──────────── */
  //
  // The pink band behind the Intro divider line grows from left to
  // right as the user scrolls past the section. Progress 0 = the
  // section's top edge has just reached the bottom of the viewport;
  // progress 1 = the section's bottom edge has just left the top.
  // The value is written to --intro-progress; CSS scales the
  // ::before via transform: scaleX(var(--intro-progress)).
  //
  // We only run the scroll math while the section is anywhere near
  // the viewport (gated by IntersectionObserver with a wide margin),
  // and throttle with requestAnimationFrame so updates stay frame-rate
  // aligned.

  const intro = document.querySelector(".intro");
  const prefersReducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (intro && !prefersReducedMotion) {
    let ticking = false;

    const update = () => {
      const rect = intro.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + rect.height;
      const passed = vh - rect.top;
      const progress = Math.max(0, Math.min(1, passed / total));
      intro.style.setProperty("--intro-progress", progress.toFixed(4));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    let scrolling = false;
    if ("IntersectionObserver" in window) {
      // Only listen to scroll while the section is anywhere near the
      // viewport — keeps the scroll handler off the main thread when
      // the user is elsewhere on the page.
      const watcher = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !scrolling) {
              window.addEventListener("scroll", onScroll, { passive: true });
              scrolling = true;
            } else if (!entry.isIntersecting && scrolling) {
              window.removeEventListener("scroll", onScroll);
              scrolling = false;
            }
          });
        },
        { rootMargin: "200px 0px" }
      );
      watcher.observe(intro);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    update();
  }

  /* ─── Smooth-scroll offset for sticky nav ──────────────────── */
  //
  // Sticky nav covers ~70px. When the user clicks an in-page anchor,
  // scroll a touch above the target so the section title isn't hidden.

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      const navHeight = document.querySelector(".nav")?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });

})();

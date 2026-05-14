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
  // Two patterns ride the same IntersectionObserver:
  //   • [data-role-grid] — the Role Grid card cascade (CSS handles the
  //     per-card slide-down; we just flip .in-view on the list).
  //   • [data-pill-sweep] — sections that contain a pill that should
  //     mask in (Callout "Right", Final CTA "Count?"). CSS handles the
  //     scaleX sweep; we flip .in-view on the section.
  //
  // Each element is observed once and unobserved after firing.

  const revealTargets = document.querySelectorAll(
    "[data-role-grid], [data-pill-sweep]"
  );
  if (revealTargets.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // No IntersectionObserver support — reveal everything in place.
    revealTargets.forEach((el) => el.classList.add("in-view"));
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

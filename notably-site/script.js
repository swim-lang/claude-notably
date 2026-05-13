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

(() => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");

  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    };

    toggle.addEventListener("click", () => {
      const willOpen = !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", willOpen);
      toggle.setAttribute("aria-expanded", String(willOpen));
      toggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const quoteForm = document.querySelector("[data-quote-form]");
  if (quoteForm) {
    let quoteText = "";
    const status = quoteForm.querySelector("[data-form-status]");
    const fallback = quoteForm.querySelector(".quote-fallback");
    const copyButton = quoteForm.querySelector("[data-copy-quote]");

    const buildQuoteText = () => {
      const data = new FormData(quoteForm);
      const value = (name) => String(data.get(name) || "").trim() || "Not provided";
      return [
        "Aircraft Detail Quote Request",
        `Name: ${value("name")}`,
        `Phone: ${value("phone")}`,
        `Aircraft: ${value("aircraft")}`,
        `Airport/Location: ${value("location")}`,
        `Service: ${value("service")}`,
        `Preferred Date: ${value("preferred_date")}`,
        `Tail Number: ${value("tail_number")}`,
        `Notes: ${value("notes")}`
      ].join("\n");
    };

    const copyQuote = async () => {
      if (!quoteText) quoteText = buildQuoteText();
      try {
        await navigator.clipboard.writeText(quoteText);
        status.textContent = "Quote details copied. Paste them into a text message to 417-989-0976.";
      } catch {
        const helper = document.createElement("textarea");
        helper.value = quoteText;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        const copied = document.execCommand("copy");
        helper.remove();
        status.textContent = copied
          ? "Quote details copied. Paste them into a text message to 417-989-0976."
          : "Copy was unavailable. Please call or text 417-989-0976 and share the details above.";
      }
    };

    copyButton?.addEventListener("click", copyQuote);

    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!quoteForm.reportValidity()) return;

      quoteText = buildQuoteText();
      const smsUrl = `sms:+14179890976?body=${encodeURIComponent(quoteText)}`;
      status.textContent = "Your text-message app should open with the quote details. Review the message, then send it when ready. If it did not open, copy the details or use the call and text links below.";
      fallback.classList.add("is-visible");
      window.location.href = smsUrl;
    });
  }
})();

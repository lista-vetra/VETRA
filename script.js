// VETRA: interacciones de navegación, propuestas y formulario.
document.addEventListener("DOMContentLoaded", () => {
  // Reemplaza los logos de imagen por la marca tipográfica en todas las páginas.
  document.querySelectorAll(".brand img").forEach(image => {
    const wordmark = document.createElement("span");
    wordmark.className = "brand-mark";
    wordmark.textContent = "VETRA";
    image.replaceWith(wordmark);
  });

  // Ajusta la marca tipográfica y el encabezado para escritorio y móvil.
  const logoStyles = document.createElement("style");
  logoStyles.textContent = `
    .site-header { height: 100px; }
    .brand img.brand-logo { width: 210px; height: 88px; object-fit: contain; }
    .brand-mark { font-size: 34px; font-weight: 800; letter-spacing: .14em; -webkit-text-stroke: .45px currentColor; }
    @media (max-width: 650px) {
      .site-header { height: 82px; }
      .brand img.brand-logo { width: 160px; height: 68px; }
      .brand-mark { font-size: 29px; }
      .main-nav { top: 81px; }
    }
  `;
  document.head.appendChild(logoStyles);

  // La sección Comunidad está retirada; elimina cualquier enlace a esa página del sitio.
  document.querySelectorAll('a[href="comunidad.html"]').forEach(link => link.remove());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll(".proposal-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".proposal-card");
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      card.classList.toggle("open", !expanded);
    });
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const proposalCards = document.querySelectorAll(".proposal-card");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    proposalCards.forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  }));

  // Reemplaza esta URL por el Instagram oficial de la lista.
  const instagramUrl = "";
  document.querySelectorAll("[data-instagram]").forEach(link => {
    if (instagramUrl) link.href = instagramUrl;
    else {
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Agrega el enlace de Instagram de VETRA en script.js, en la variable instagramUrl.");
      });
    }
  });

  const form = document.getElementById("idea-form");
  if (form) {
    // Reemplaza el campo opcional de nombre por correo institucional obligatorio.
    const emailInput = form.querySelector('[name="name"]');
    if (emailInput) {
      const label = form.querySelector('label[for="student-name"]');
      if (label) {
        label.htmlFor = "student-email";
        label.textContent = "Correo personal de la universidad (USS)";
      }
      emailInput.id = "student-email";
      emailInput.name = "email";
      emailInput.type = "email";
      emailInput.placeholder = "nombre@uss.cl o nombre@correo.uss.cl";
      emailInput.required = true;
      emailInput.setAttribute("pattern", "[^\\s@]+@(uss\\.cl|correo\\.uss\\.cl)");
      emailInput.title = "Ingresa un correo institucional terminado en @uss.cl o @correo.uss.cl";
    }

    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const email = data.get("email");
      const year = data.get("year") || "No indicado";
      const type = data.get("type");
      const message = data.get("message");
      // Configura aquí el correo oficial antes de publicar.
      const contactEmail = "lista.vetra@gmail.com";
      const status = document.getElementById("form-status");
      if (!contactEmail) {
        status.textContent = "El formulario está diseñado. Para recibir mensajes, agrega el correo oficial en script.js (variable contactEmail).";
        return;
      }
      const subject = encodeURIComponent("Mensaje para VETRA: " + type);
      const body = encodeURIComponent(`Correo institucional: ${email}\nAño: ${year}\nTipo: ${type}\n\n${message}`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      status.textContent = "Abriendo tu aplicación de correo…";
    });
  }
});

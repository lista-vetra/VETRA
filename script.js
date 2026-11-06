// VETRA: interacciones de navegación, propuestas y formulario.
document.addEventListener("DOMContentLoaded", () => {
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
    form.addEventListener("submit", event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get("name") || "Estudiante";
      const year = data.get("year") || "No indicado";
      const type = data.get("type");
      const message = data.get("message");
      // Configura aquí el correo oficial antes de publicar.
      const contactEmail = "";
      const status = document.getElementById("form-status");
      if (!contactEmail) {
        status.textContent = "El formulario está diseñado. Para recibir mensajes, agrega el correo oficial en script.js (variable contactEmail).";
        return;
      }
      const subject = encodeURIComponent("Mensaje para VETRA: " + type);
      const body = encodeURIComponent(`Nombre: ${name}\nAño: ${year}\nTipo: ${type}\n\n${message}`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      status.textContent = "Abriendo tu aplicación de correo…";
    });
  }
});
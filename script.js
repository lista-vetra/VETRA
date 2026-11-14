// VETRA: interacciones de navegación, propuestas y formulario.
document.addEventListener("DOMContentLoaded", () => {
  // Reemplaza los logos de imagen del encabezado y pie por la marca tipográfica.
  document.querySelectorAll(".brand img").forEach(image => {
    const wordmark = document.createElement("span");
    wordmark.className = "brand-mark";
    wordmark.textContent = "VETRA";
    image.replaceWith(wordmark);
  });

  // Muestra el logo original en grande a la derecha del texto principal de Conócenos.
  const aboutHero = document.querySelector(".page-hero .container");
  const aboutHeading = aboutHero?.querySelector("h1");
  if (aboutHero && aboutHeading?.textContent.includes("Personas distintas")) {
    const heroCopy = document.createElement("div");
    heroCopy.className = "about-hero-copy";
    while (aboutHero.firstChild) heroCopy.appendChild(aboutHero.firstChild);

    const heroLogo = document.createElement("img");
    heroLogo.className = "about-hero-logo";
    heroLogo.src = "logo-vetra.png";
    heroLogo.alt = "Logo VETRA";

    aboutHero.append(heroCopy, heroLogo);
  }

  // Estilos de marca, encabezado y logo del hero de Conócenos.
  const logoStyles = document.createElement("style");
  logoStyles.textContent = `
    .site-header { height: 100px; }
    .brand img.brand-logo { width: 210px; height: 88px; object-fit: contain; }
    .brand-mark {
      font-size: 51px;
      font-weight: 900;
      letter-spacing: .12em;
      line-height: 1;
      -webkit-text-stroke: .45px currentColor;
    }
    .page-hero .container:has(.about-hero-logo) {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(260px, .8fr);
      align-items: center;
      gap: 48px;
    }
    .about-hero-copy { min-width: 0; }
    .about-hero-logo {
      display: block;
      width: min(100%, 380px);
      max-height: 340px;
      justify-self: center;
      object-fit: contain;
    }
    @media (max-width: 650px) {
      .site-header { height: 82px; }
      .brand img.brand-logo { width: 160px; height: 68px; }
      .brand-mark { font-size: 43px; }
      .main-nav { top: 81px; }
      .page-hero .container:has(.about-hero-logo) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      .about-hero-logo { width: min(72%, 280px); max-height: 240px; }
    }
  `;
  document.head.appendChild(logoStyles);

  // La sección Comunidad está retirada; elimina cualquier enlace a esa página del sitio.
  document.querySelectorAll('a[href="comunidad.html"]').forEach(link => link.remove());

  // Quita únicamente el espacio reservado para la foto de campaña de la página de inicio.
  const homeHeroArt = document.querySelector(".hero .hero-art");
  if (homeHeroArt) {
    homeHeroArt.remove();
    const homeHeroStyles = document.createElement("style");
    homeHeroStyles.textContent = `
      .hero-grid { grid-template-columns: 1fr; }
      .hero-copy { width: 100%; max-width: none; }
      .hero-copy h1 {
        width: 100%;
        max-width: none;
        font-size: clamp(42px, 6vw, 78px);
        line-height: 1.08;
      }
      @media (max-width: 650px) {
        .hero-copy h1 {
          font-size: clamp(19px, 5.8vw, 36px);
          line-height: 1.12;
        }
        .hero-copy h1 br { display: none; }
      }
    `;
    document.head.appendChild(homeHeroStyles);
  }

  // Las propuestas quedan sin etiquetas ni mecanismos de clasificación.
  document.querySelectorAll(".filters").forEach(filters => filters.remove());
  document.querySelectorAll(".proposal-card").forEach(card => {
    card.removeAttribute("data-category");
    card.querySelectorAll(".proposal-top .tag").forEach(tag => tag.remove());
  });

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

  // URL oficial de Instagram de la lista.
  const instagramUrl = "https://www.instagram.com/lista_vetra?dlrf=OGloZDVpYW9kMHdp";
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

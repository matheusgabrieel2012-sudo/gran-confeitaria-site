
/* ==========================================
   GRAN CONFEITARIA
   Interações e encomendas
========================================== */

// WhatsApp comercial da Gran Confeitaria.
const WHATSAPP_NUMBER = "5511980601787";

// ATENÇÃO:
// Confirme o @ exato do Instagram antes de publicar.
// O endereço abaixo é provisório.
const INSTAGRAM_URL = "https://www.instagram.com/";

// Atualiza todos os links do Instagram.
document.querySelectorAll("[data-instagram-link]").forEach((link) => {
  link.href = INSTAGRAM_URL;
});

// Atualiza automaticamente o ano do rodapé.
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ==========================================
// MENU MOBILE
// ==========================================

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    const nextState = !isOpen;

    menuToggle.setAttribute("aria-expanded", String(nextState));
    menuToggle.setAttribute(
      "aria-label",
      nextState ? "Fechar menu" : "Abrir menu"
    );

    mainNav.classList.toggle("is-open", nextState);
    document.body.classList.toggle("menu-open", nextState);
  });

  // Fecha o menu quando o usuário escolhe uma seção.
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");

      mainNav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });

  // Fecha o menu caso o usuário volte para o desktop.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");

      mainNav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }
  });
}

// ==========================================
// ANIMAÇÕES AO ROLAR A PÁGINA
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Compatibilidade com navegadores antigos.
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

// ==========================================
// FILTROS DO CATÁLOGO
// ==========================================

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Atualiza o botão selecionado.
    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    // Mostra apenas os produtos da categoria selecionada.
    productCards.forEach((card) => {
      const category = card.dataset.category;

      const matches =
        selectedFilter === "todos" ||
        category === selectedFilter;

      card.classList.toggle("is-hidden", !matches);
    });
  });
});

// ==========================================
// PEDIDOS PERSONALIZADOS PELO WHATSAPP
// ==========================================

document.querySelectorAll(".product-order").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product || "Produto da confeitaria";

    const message =
      `Olá! Vim pelo site da Gran Confeitaria e gostaria de consultar ` +
      `sabores, tamanhos, valores e disponibilidade para: ${productName}.`;

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
});

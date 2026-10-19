// NATURALHEMP — interações partilhadas
(function () {
  "use strict";

  var EMAIL = "info@naturalhemp.pt";

  // Menu móvel
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Revelar secções ao fazer scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Formulários: sem servidor, abrem o cliente de email com a mensagem preenchida
  function mailto(subject, lines) {
    return "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }

  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var lines = [];
      form.querySelectorAll("[data-label]").forEach(function (f) {
        var val;
        if (f.multiple) {
          val = Array.prototype.map.call(f.selectedOptions, function (o) { return o.text; }).join(", ");
        } else {
          val = f.value.trim();
        }
        if (val) lines.push(f.getAttribute("data-label") + ": " + val);
      });
      window.location.href = mailto(form.getAttribute("data-mailto"), lines);
      var status = form.querySelector(".form-status");
      if (status) status.textContent = "A abrir o teu email para enviar a mensagem…";
    });
  });

  // Carrossel (Natureza)
  var track = document.querySelector(".cards-track");
  if (track) {
    var step = function () {
      var card = track.querySelector(".vcard");
      return card ? card.getBoundingClientRect().width + 32 : 280;
    };
    document.querySelectorAll("[data-scroll]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        track.scrollBy({ left: step() * Number(btn.getAttribute("data-scroll")), behavior: "smooth" });
      });
    });
  }

  // Menus suspensos das categorias (Biomateriais)
  document.querySelectorAll(".categoria button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.closest(".categoria");
      var open = cat.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
})();

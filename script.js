var iframe = document.querySelector(".video-background iframe");

document.addEventListener("visibilitychange", function () {
  if (iframe) {
    if (document.hidden) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*",
      );
    } else {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*",
      );
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  /* --- DİL MENÜSÜ --- */
  const langBtn = document.querySelector(".lang-selected");
  const langList = document.querySelector(".lang-list");

  if (langBtn && langList) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = langList.style.opacity === "1";
      langList.style.opacity = isVisible ? "0" : "1";
      langList.style.visibility = isVisible ? "hidden" : "visible";
      langList.style.transform = isVisible
        ? "translateY(10px)"
        : "translateY(0)";
    });

    document.addEventListener("click", () => {
      langList.style.opacity = "0";
      langList.style.visibility = "hidden";
      langList.style.transform = "translateY(10px)";
    });
  }

  /* --- MOBİL MENÜ --- */
  const menuToggle = document.getElementById("menuToggle");
  const menuLinks = document.getElementById("menuLinks");
  const htmlElement = document.documentElement; // html etiketini seç

  if (menuToggle && menuLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      menuLinks.classList.toggle("active");
      menuToggle.classList.toggle("open");
      document.body.classList.toggle("menu-open");

      // Hem html hem body'ye sınıfı ekle/çıkar
      document.body.classList.toggle("no-scroll");
      htmlElement.classList.toggle("no-scroll");
    });

    document.querySelectorAll(".menu-links a").forEach((link) => {
      link.addEventListener("click", () => {
        menuLinks.classList.remove("active");
        menuToggle.classList.remove("open");
        document.body.classList.remove("menu-open");
        // Sınıfları kaldır
        document.body.classList.remove("no-scroll");
        htmlElement.classList.remove("no-scroll");
      });
    });

    document.addEventListener("click", (e) => {
      if (!menuLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        menuLinks.classList.remove("active");
        menuToggle.classList.remove("open");
        document.body.classList.remove("menu-open");
        // Sınıfları kaldır
        document.body.classList.remove("no-scroll");
        htmlElement.classList.remove("no-scroll");
      }
    });
  }

  /* --- SWIPER --- */
  let swiperInstance;
  if (document.querySelector(".mySwiper")) {
    swiperInstance = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }

  /* --- HEADER SCROLL --- */
  const header = document.querySelector(".navbar");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
        header.style.padding = "10px 0";
      } else {
        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.03)";
        header.style.padding = "20px 0";
      }
    });
  }

  /* --- REVIEWS --- */
  const reviews = document.querySelectorAll(".review-card");
  reviews.forEach((card) => {
    const text = card.querySelector(".review-text");
    const btn = card.querySelector(".read-more-btn");

    if (text && text.scrollHeight > text.clientHeight) {
      btn.style.display = "inline-block";
    }

    btn.addEventListener("click", function () {
      text.classList.toggle("expanded");
      btn.textContent = text.classList.contains("expanded")
        ? "Daha Az Göster"
        : "Devamını Gör";
      if (swiperInstance) swiperInstance.updateAutoHeight();
    });
  });
});

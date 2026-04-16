// YouTube Iframe API hazır olduğunda çalışacak mekanizma
var iframe = document.querySelector('.video-background iframe');

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        // Sekme gizlendiğinde videoyu duraklat
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        console.log("Sekme aktif değil, video durduruldu.");
    } else {
        // Sekmeye geri dönüldüğünde videoyu oynat
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        console.log("Sekme aktif, video devam ediyor.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
  /* --- 1. DİL MENÜSÜ KONTROLÜ --- */
  const langBtn = document.querySelector(".lang-btn");
  const langMenu = document.querySelector(".lang-menu");

  if (langBtn && langMenu) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = langMenu.style.display === "block";
      langMenu.style.display = isVisible ? "none" : "block";
    });

    document.addEventListener("click", () => {
      langMenu.style.display = "none";
    });
  }

  /* --- 2. MOBİL MENÜ (HAMBURGER) KONTROLÜ --- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const htmlElement = document.documentElement; // html etiketini seç

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("open");
      document.body.classList.toggle("menu-open");

      // Hem html hem body'ye sınıfı ekle/çıkar
      document.body.classList.toggle("no-scroll");
      htmlElement.classList.toggle("no-scroll");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("open");
        document.body.classList.remove("menu-open");
        // Sınıfları kaldır
        document.body.classList.remove("no-scroll");
        htmlElement.classList.remove("no-scroll");
      });
    });
    

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("open");
        document.body.classList.remove("menu-open");
        // Sınıfları kaldır
        document.body.classList.remove("no-scroll");
        htmlElement.classList.remove("no-scroll");
      }
    });
  }

  /* --- 3. SWIPER (YORUM SLIDER) AYARLARI --- */
  if (document.querySelector(".mySwiper")) {
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }

  /* --- 4. SCROLL EFECTİ (HEADER KÜÇÜLTME/GÖLGE) --- */
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
});

document.addEventListener("DOMContentLoaded", function() {
    const reviews = document.querySelectorAll('.review-card');

    reviews.forEach(card => {
        const text = card.querySelector('.review-text');
        const btn = card.querySelector('.read-more-btn');

        // Eğer metin belirlenen alandan daha uzunsa butonu göster
        if (text.scrollHeight > text.clientHeight) {
            btn.style.display = 'inline-block';
        }

        btn.addEventListener('click', function() {
            text.classList.toggle('expanded');
            
            if (text.classList.contains('expanded')) {
                btn.textContent = 'Daha Az Göster';
            } else {
                btn.textContent = 'Devamını Gör';
            }
            
            // Swiper kullanıyorsan yüksekliği güncellemesi için:
            if(typeof swiper !== 'undefined') swiper.updateAutoHeight();
        });
    });
});
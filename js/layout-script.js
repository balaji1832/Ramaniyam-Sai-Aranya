//  Master layout plan 

      (function () {
        const images = [
          "images/l1.jpg",
          "images/l2.jpg",
          "images/l3.jpg",
          "images/l4.jpg",
          "images/l5.jpg",
          "images/l6.jpg",
        ];

        let currentIndex = 0;
        let startX = 0;
        let endX = 0;

        const main = document.getElementById("galleryMain");
        const mainImage = document.getElementById("galleryMainImage");
        const prevBtn = document.getElementById("galleryPrev");
        const nextBtn = document.getElementById("galleryNext");
        const thumbs = document.querySelectorAll(".thumb-item");

        const lightbox = document.getElementById("galleryLightbox");
        const lightboxImage = document.getElementById("galleryLightboxImage");
        const lightboxClose = document.getElementById("galleryLightboxClose");
        const lightboxPrev = document.getElementById("galleryLightboxPrev");
        const lightboxNext = document.getElementById("galleryLightboxNext");

        function updateGallery() {
          mainImage.src = images[currentIndex];
          lightboxImage.src = images[currentIndex];

          thumbs.forEach((thumb, index) => {
            thumb.classList.remove("ring-2", "ring-[#6b2d3a]");
            thumb.classList.add("ring-1", "ring-black/10");

            if (index === currentIndex) {
              thumb.classList.remove("ring-1", "ring-black/10");
              thumb.classList.add("ring-2", "ring-[#6b2d3a]");
            }
          });
        }

        function showNext() {
          currentIndex = (currentIndex + 1) % images.length;
          updateGallery();
        }

        function showPrev() {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateGallery();
        }

        function openLightbox() {
          lightbox.classList.remove("hidden");
          lightbox.classList.add("flex");
          document.body.classList.add("overflow-hidden");
          lightboxImage.src = images[currentIndex];
        }

        function closeLightbox() {
          lightbox.classList.add("hidden");
          lightbox.classList.remove("flex");
          document.body.classList.remove("overflow-hidden");
        }

        prevBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          showPrev();
        });

        nextBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          showNext();
        });

        thumbs.forEach((thumb, index) => {
          thumb.addEventListener("click", function () {
            currentIndex = index;
            updateGallery();
          });
        });

        main.addEventListener("click", openLightbox);

        lightboxClose.addEventListener("click", closeLightbox);
        lightboxPrev.addEventListener("click", showPrev);
        lightboxNext.addEventListener("click", showNext);

        lightbox.addEventListener("click", function (e) {
          if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener("keydown", function (e) {
          if (lightbox.classList.contains("hidden")) return;

          if (e.key === "Escape") closeLightbox();
          if (e.key === "ArrowLeft") showPrev();
          if (e.key === "ArrowRight") showNext();
        });

        main.addEventListener(
          "touchstart",
          function (e) {
            startX = e.changedTouches[0].clientX;
          },
          { passive: true },
        );

        main.addEventListener(
          "touchend",
          function (e) {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
              if (diff > 0) showNext();
              else showPrev();
            }
          },
          { passive: true },
        );

        lightbox.addEventListener(
          "touchstart",
          function (e) {
            startX = e.changedTouches[0].clientX;
          },
          { passive: true },
        );

        lightbox.addEventListener(
          "touchend",
          function (e) {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
              if (diff > 0) showNext();
              else showPrev();
            }
          },
          { passive: true },
        );

        updateGallery();
      })();


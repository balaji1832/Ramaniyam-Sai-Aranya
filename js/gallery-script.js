// image slider script section 2 

      (function () {
        const slider = document.getElementById("image-slider");
        const track = document.getElementById("slider-track");
        const dots = document.querySelectorAll(".slider-dot");
        const total = track.children.length;

        let current = 0;
        let autoplay;
        let startX = 0;
        let endX = 0;

        function updateSlider() {
          track.style.transform = `translateX(-${current * 100}%)`;

          dots.forEach((dot, index) => {
            dot.classList.toggle("bg-white", index === current);
            dot.classList.toggle("bg-white/60", index !== current);
          });
        }

        function nextSlide() {
          current = (current + 1) % total;
          updateSlider();
        }

        function prevSlide() {
          current = (current - 1 + total) % total;
          updateSlider();
        }

        function startAutoplay() {
          autoplay = setInterval(nextSlide, 4000);
        }

        function resetAutoplay() {
          clearInterval(autoplay);
          startAutoplay();
        }

        dots.forEach((dot, index) => {
          dot.addEventListener("click", () => {
            current = index;
            updateSlider();
            resetAutoplay();
          });
        });

        slider.addEventListener(
          "touchstart",
          (e) => {
            startX = e.changedTouches[0].clientX;
          },
          { passive: true },
        );

        slider.addEventListener(
          "touchend",
          (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
              if (diff > 0) {
                nextSlide();
              } else {
                prevSlide();
              }
              resetAutoplay();
            }
          },
          { passive: true },
        );

        let isDown = false;
        let mouseStartX = 0;
        let mouseEndX = 0;

        slider.addEventListener("mousedown", (e) => {
          isDown = true;
          mouseStartX = e.clientX;
        });

        slider.addEventListener("mouseup", (e) => {
          if (!isDown) return;
          isDown = false;
          mouseEndX = e.clientX;

          const diff = mouseStartX - mouseEndX;
          if (Math.abs(diff) > 50) {
            if (diff > 0) {
              nextSlide();
            } else {
              prevSlide();
            }
            resetAutoplay();
          }
        });

        slider.addEventListener("mouseleave", () => {
          isDown = false;
        });

        updateSlider();
        startAutoplay();
      })();

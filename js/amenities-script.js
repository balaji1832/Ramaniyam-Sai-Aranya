// Amenities script 

      document.addEventListener("DOMContentLoaded", function () {
        const section = document.getElementById("amenities-section");
        if (!section) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                section.classList.add("section-arrived");
                observer.unobserve(section);
              }
            });
          },
          { threshold: 0.2 },
        );

        observer.observe(section);
      });

// Menu script

      document.addEventListener("DOMContentLoaded", function () {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll("nav a[href^='#']");
        const header = document.querySelector("header");

        // ✅ SMOOTH SCROLL ON CLICK
        navLinks.forEach((link) => {
          link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const headerHeight = header ? header.offsetHeight : 0;

            const targetPosition =
              target.getBoundingClientRect().top +
              window.pageYOffset -
              headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          });
        });

        // ✅ ACTIVE MENU (SCROLL SPY)
        function setActiveLink() {
          let scrollY = window.pageYOffset;

          sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 130;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
              navLinks.forEach((link) => {
                link.classList.remove("text-[#932223]");
                link.classList.add("text-[#374151]");

                if (link.getAttribute("href") === "#" + sectionId) {
                  link.classList.remove("text-[#374151]");
                  link.classList.add("text-[#932223]");
                }
              });
            }
          });
        }

        window.addEventListener("scroll", setActiveLink);
      });
  
//  Model opens initially 

      document.addEventListener("DOMContentLoaded", function () {
        const enquiryModal = document.getElementById("enquiryModal");

        function openEnquiryModal() {
          enquiryModal.classList.remove("hidden");
          enquiryModal.classList.add("flex");
          document.body.classList.add("overflow-hidden");
        }

        function closeEnquiryModal() {
          enquiryModal.classList.add("hidden");
          enquiryModal.classList.remove("flex");
          document.body.classList.remove("overflow-hidden");
        }

        // Make functions global
        window.openEnquiryModal = openEnquiryModal;
        window.closeEnquiryModal = closeEnquiryModal;

        // ✅ AUTO OPEN AFTER 2 SECONDS
        setTimeout(function () {
          openEnquiryModal();
        }, 2000);

        // Close on outside click
        enquiryModal.addEventListener("click", function (e) {
          if (e.target === enquiryModal) {
            closeEnquiryModal();
          }
        });

        // Close on ESC
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape") {
            closeEnquiryModal();
          }
        });
      });
   
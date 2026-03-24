  document.addEventListener("DOMContentLoaded", function () {
    const enquiryModal = document.getElementById("enquiryModal");

    function openEnquiryModal() {
      if (!enquiryModal) return;
      enquiryModal.classList.remove("hidden");
      enquiryModal.classList.add("flex");
      document.body.classList.add("overflow-hidden");
    }

    function closeEnquiryModal() {
      if (!enquiryModal) return;
      enquiryModal.classList.add("hidden");
      enquiryModal.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }

    // Make functions global
    window.openEnquiryModal = openEnquiryModal;
    window.closeEnquiryModal = closeEnquiryModal;

    // ✅ AUTO OPEN ONLY FOR TABLET & DESKTOP
    if (window.innerWidth >= 768) {
      setTimeout(function () {
        openEnquiryModal();
      }, 2000);
    }

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

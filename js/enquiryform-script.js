// form script

(function () {
  const forms = document.querySelectorAll(".ajax-enquiry-form");
  const mobileInputs = document.querySelectorAll(".mobile-only-numbers");

  const toast = document.getElementById("globalToast");
  const toastTitle = document.getElementById("globalToastTitle");
  const toastMessage = document.getElementById("globalToastMessage");
  const toastIconWrap = document.getElementById("globalToastIconWrap");
  const toastProgress = document.getElementById("globalToastProgress");
  const toastSuccessIcon = document.getElementById("globalToastSuccessIcon");
  const toastErrorIcon = document.getElementById("globalToastErrorIcon");
  const toastWarningIcon = document.getElementById("globalToastWarningIcon");
  const toastClose = document.getElementById("globalToastClose");

  let toastTimeout;
  let progressInterval;
  let redirectTimeout;

  mobileInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
  });

  function showToast(type, message) {
    clearTimeout(toastTimeout);
    clearInterval(progressInterval);

    if (!toast) return;

    toastTitle.textContent =
      type === "success"
        ? "Success"
        : type === "warning"
        ? "Warning"
        : "Error";

    toastMessage.textContent = message;

    if (toastSuccessIcon) toastSuccessIcon.classList.add("hidden");
    if (toastErrorIcon) toastErrorIcon.classList.add("hidden");
    if (toastWarningIcon) toastWarningIcon.classList.add("hidden");

    if (type === "success") {
      toastIconWrap.className =
        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-green-100 text-green-600";
      toastProgress.className = "h-full bg-green-600 w-full";
      if (toastSuccessIcon) toastSuccessIcon.classList.remove("hidden");
    } else if (type === "warning") {
      toastIconWrap.className =
        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-yellow-100 text-yellow-600";
      toastProgress.className = "h-full bg-yellow-500 w-full";
      if (toastWarningIcon) toastWarningIcon.classList.remove("hidden");
    } else {
      toastIconWrap.className =
        "w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-red-100 text-red-600";
      toastProgress.className = "h-full bg-red-600 w-full";
      if (toastErrorIcon) toastErrorIcon.classList.remove("hidden");
    }

    toast.classList.remove("translate-x-[120%]", "opacity-0");
    toast.classList.add("translate-x-0", "opacity-100");

    let width = 100;
    if (toastProgress) toastProgress.style.width = "100%";

    progressInterval = setInterval(() => {
      width -= 1;
      if (toastProgress) toastProgress.style.width = width + "%";
      if (width <= 0) clearInterval(progressInterval);
    }, 30);

    toastTimeout = setTimeout(hideToast, 3000);
  }

  function hideToast() {
    clearTimeout(toastTimeout);
    clearInterval(progressInterval);

    if (!toast) return;

    toast.classList.add("translate-x-[120%]", "opacity-0");
    toast.classList.remove("translate-x-0", "opacity-100");
  }

  if (toastClose) {
    toastClose.addEventListener("click", hideToast);
  }

  forms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const mobile = form.querySelector('[name="mobile"]').value.trim();

      const submitBtn = form.querySelector(".form-submit-btn");
      const submitBtnText = form.querySelector(".form-submit-text");

      if (!name || !email || !mobile) {
        showToast("error", "Please fill in all the fields.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast("error", "Please enter a valid email address.");
        return;
      }

      const mobilePattern = /^\d{10}$/;
      if (!mobilePattern.test(mobile)) {
        showToast("error", "Phone number must be exactly 10 digits.");
        return;
      }

      submitBtn.disabled = true;
      submitBtnText.textContent = "Submitting...";

      try {
        const formData = new FormData(form);
        const action = form.getAttribute("action") || "enquiry-form.php";

        const response = await fetch(action, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.status === "success") {
          showToast(
            "success",
            result.message || "Enquiry submitted successfully."
          );

          form.reset();

          // form data-redirect has priority
          const redirectPath =
            form.dataset.redirect ||
            result.redirect ||
            "thankyou.html";

          // builds a proper full URL from current page location
          const finalRedirectUrl = new URL(redirectPath, window.location.href).href;

          clearTimeout(redirectTimeout);
          redirectTimeout = setTimeout(() => {
            window.location.replace(finalRedirectUrl);
          }, 1500);
        } else if (result.status === "warning") {
          showToast(
            "warning",
            result.message ||
              "Saved successfully, but email notification failed."
          );
          form.reset();
        } else {
          showToast("error", result.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Submit error:", error);
        showToast("error", "Server error. Please try again later.");
      } finally {
        submitBtn.disabled = false;
        submitBtnText.textContent = "Submit Enquiry";
      }
    });
  });
})();
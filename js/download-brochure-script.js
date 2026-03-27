  function openBrochureModal(e, brochureUrl) {
    if (e) e.preventDefault();

    const modal = document.getElementById("brochureModal");
    const brochureInput = document.getElementById("brochureUrl");

    if (!modal) return;

    if (brochureInput) {
      brochureInput.value = brochureUrl || "";
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }

  function closeBrochureModal() {
    const modal = document.getElementById("brochureModal");
    if (!modal) return;

    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }

  document.addEventListener("click", function (e) {
    const modal = document.getElementById("brochureModal");
    if (e.target === modal) {
      closeBrochureModal();
    }
  });

  document.querySelectorAll(".mobile-only-numbers").forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
  });

  const brochureForm = document.getElementById("brochureEnquiryForm");

  if (brochureForm) {
    brochureForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = this;
      const submitBtn = form.querySelector(".form-submit-btn");
      const submitText = form.querySelector(".form-submit-text");
      const brochureInput = document.getElementById("brochureUrl");
      const brochureUrl = brochureInput ? brochureInput.value : "";

      const formData = new FormData(form);

      submitBtn.disabled = true;
      submitText.textContent = "Submitting...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.status === "success") {
          closeBrochureModal();
          form.reset();

          if (brochureUrl) {
            const link = document.createElement("a");
            link.href = brochureUrl;
            link.download = "";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }

          setTimeout(() => {
            window.location.href = "thankyou.html";
          }, 800);
        } else {
          alert(result.message || "Something went wrong.");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
      } finally {
        submitBtn.disabled = false;
        submitText.textContent = "Submit Enquiry";
      }
    });
  }

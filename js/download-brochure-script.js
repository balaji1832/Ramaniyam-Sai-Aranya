//   Download brochure script  

      function openBrochureModal(event, brochureUrl) {
        event.preventDefault();

        document.getElementById("brochureUrl").value = brochureUrl;
        const modal = document.getElementById("brochureModal");

        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.classList.add("overflow-hidden");
      }

      function closeBrochureModal() {
        const modal = document.getElementById("brochureModal");

        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.classList.remove("overflow-hidden");
      }

      document
        .getElementById("brochureModal")
        .addEventListener("click", function (e) {
          if (e.target === this) {
            closeBrochureModal();
          }
        });

      document.querySelectorAll(".mobile-only-numbers").forEach((input) => {
        input.addEventListener("input", function () {
          this.value = this.value.replace(/\D/g, "").slice(0, 10);
        });
      });

      document
        .getElementById("brochureEnquiryForm")
        .addEventListener("submit", async function (e) {
          e.preventDefault();

          const form = this;
          const submitBtn = form.querySelector(".form-submit-btn");
          const submitText = form.querySelector(".form-submit-text");
          const brochureUrl = document.getElementById("brochureUrl").value;

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
                link.setAttribute("download", "");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }

              submitBtn.disabled = false;
              submitText.textContent = "Submit Enquiry";
            } else {
              alert(result.message || "Something went wrong.");
              submitBtn.disabled = false;
              submitText.textContent = "Submit Enquiry";
            }
          } catch (error) {
            alert("Something went wrong. Please try again.");
            submitBtn.disabled = false;
            submitText.textContent = "Submit Enquiry";
          }
        });
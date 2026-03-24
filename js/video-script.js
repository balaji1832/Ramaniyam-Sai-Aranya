    // video script 

      const video = document.getElementById("virtualTourVideo");
      const playBtn = document.getElementById("playBtn");

      playBtn.addEventListener("click", () => {
        video.setAttribute("controls", "controls");
        video.play();
        playBtn.style.display = "none";
      });

      video.addEventListener("pause", () => {
        if (video.currentTime > 0 && !video.ended) {
          playBtn.style.display = "flex";
        }
      });

      video.addEventListener("play", () => {
        playBtn.style.display = "none";
      });

      video.addEventListener("ended", () => {
        playBtn.style.display = "flex";
      });

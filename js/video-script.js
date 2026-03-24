document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("virtualTourVideo");
  const playBtn = document.getElementById("playBtn");

  if (!video || !playBtn) return;

  async function startVideo() {
    try {
      video.setAttribute("controls", "controls");
      await video.play();
      playBtn.style.display = "none";
    } catch (error) {
      console.error("Video play failed:", error);
    }
  }

  playBtn.addEventListener("click", startVideo);

  video.addEventListener("click", function () {
    if (video.paused) {
      startVideo();
    } else {
      video.pause();
    }
  });

  video.addEventListener("play", function () {
    playBtn.style.display = "none";
  });

  video.addEventListener("pause", function () {
    if (!video.ended) {
      playBtn.style.display = "flex";
    }
  });

  video.addEventListener("ended", function () {
    playBtn.style.display = "flex";
    video.removeAttribute("controls");
    video.currentTime = 0;
  });
});
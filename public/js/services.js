document.addEventListener("DOMContentLoaded", () => {
  /* AOS */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
    });
  }

  /* Particles */
  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-services")
  ) {
    particlesJS("particles-services", {
      particles: {
        number: {
          value: 90,
        },

        color: {
          value: "#f7941d",
        },

        shape: {
          type: "circle",
        },

        opacity: {
          value: 0.4,
        },

        size: {
          value: 3,
          random: true,
        },

        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.15,
        },

        move: {
          enable: true,
          speed: 1.6,
        },
      },
    });
  }
});

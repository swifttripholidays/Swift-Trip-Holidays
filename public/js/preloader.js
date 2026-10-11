/*=========================================
SWIFTTRIP PREMIUM PRELOADER
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const preloader = document.getElementById("preloader");

    const logo = document.querySelector(".preloader-logo");

    const title = document.querySelector(".preloader-title");

    const tagline = document.querySelector(".preloader-tagline");

    const flight = document.querySelector(".flight-wrapper");

    const loading = document.querySelector(".loading-text");

    const plane = document.getElementById("airplane");

    const path = document.getElementById("flightPath");

    /*-------------------------------------
      Intro Animation
    -------------------------------------*/

    setTimeout(() => {

        logo.style.transition = "all .8s cubic-bezier(.22,.61,.36,1)";
        logo.style.opacity = "1";
        logo.style.transform = "scale(1)";

    }, 200);

    setTimeout(() => {

        title.style.transition = "all .8s ease";
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";

    }, 600);

    setTimeout(() => {

        tagline.style.transition = "all .8s ease";
        tagline.style.opacity = "1";
        tagline.style.transform = "translateY(0)";

    }, 1000);

    setTimeout(() => {

        flight.style.transition = "all .8s ease";
        flight.style.opacity = "1";
        flight.style.transform = "translateY(0)";

    }, 1400);

    setTimeout(() => {

        loading.style.transition = "all .8s ease";
        loading.style.opacity = "1";
        loading.style.transform = "translateY(0)";

        animatePlane();

    }, 1800);

    /*-------------------------------------
      Plane Animation
    -------------------------------------*/

    function animatePlane() {

        const length = path.getTotalLength();

        let progress = 0;

        function move() {

            progress += 2;

            if (progress > length) {

                progress = 0;

            }

            const point = path.getPointAtLength(progress);

            const next = path.getPointAtLength(
                Math.min(progress + 1, length)
            );

            const angle = Math.atan2(
                next.y - point.y,
                next.x - point.x
            ) * 180 / Math.PI;

            plane.setAttribute(
                "transform",
                `translate(${point.x},${point.y}) rotate(${angle})`
            );

            requestAnimationFrame(move);

        }

        move();

    }

});

/*=========================================
HIDE PRELOADER
=========================================*/

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

        setTimeout(() => {

            preloader.remove();

        }, 800);

    }, 3000);

});
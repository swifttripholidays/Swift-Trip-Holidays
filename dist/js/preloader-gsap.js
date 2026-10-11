/*==================================================
  PREMIUM PRELOADER (GSAP)
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin();

    const tl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    /*----------------------------
    Initial State
    -----------------------------*/

    gsap.set(".preloader-logo", {
        scale: .82,
        opacity: 0,
        rotation: -8
    });

    gsap.set(".preloader-title", {
        y: 40,
        opacity: 0
    });

    gsap.set(".preloader-tagline", {
        y: 30,
        opacity: 0
    });

    gsap.set(".flight-wrapper", {
        opacity: 0,
        y: 20
    });

    gsap.set(".loading-text", {
        opacity: 0,
        y: 20
    });

    /*----------------------------
    Flight Path
    -----------------------------*/

    const path = document.querySelector("#flightPath");
    const plane = document.querySelector("#airplane");

    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    /*----------------------------
    Timeline
    -----------------------------*/

    tl.to(".preloader-logo", {

        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2

    })

        .to(".preloader-title", {

            opacity: 1,
            y: 0,
            duration: .8

        }, "-=0.6")

        .to(".preloader-tagline", {

            opacity: 1,
            y: 0,
            duration: .7

        }, "-=0.5")

        .to(".flight-wrapper", {

            opacity: 1,
            y: 0,
            duration: .8

        })

        .to(path, {

            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut"

        }, "-=0.2")

        .to(".loading-text", {

            opacity: 1,
            y: 0,
            duration: .7

        }, "-=1");

    /*----------------------------
    Plane Animation
    -----------------------------*/

    let progress = 0;

    function fly() {

        progress += 2;

        if (progress > pathLength) {

            progress = 0;

        }

        const point = path.getPointAtLength(progress);

        const next = path.getPointAtLength(
            Math.min(progress + 2, pathLength)
        );

        const angle = Math.atan2(

            next.y - point.y,

            next.x - point.x

        ) * 180 / Math.PI;

        gsap.set(plane, {

            x: point.x,

            y: point.y,

            rotation: angle,

            transformOrigin: "center center"

        });

        requestAnimationFrame(fly);

    }

    fly();

});

/*==================================================
  EXIT
==================================================*/

window.addEventListener("load", () => {

    gsap.to("#preloader", {

        delay: 3,

        opacity: 0,

        duration: .9,

        ease: "power2.inOut",

        onComplete() {

            document.getElementById("preloader").remove();

        }

    });

});
document.documentElement.classList.add("is-loading");
document.body.classList.add("is-loading");

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    if (!loader) return;

    const logo = loader.querySelector(".loader-logo");
    const decor = loader.querySelector(".loader-decorate");

    const hero = document.querySelector(".hero");
    const phoneImg1 = hero?.querySelector(".js-phone img");

    if (phoneImg1) {
        gsap.set(phoneImg1, { y: 570 });
    }

    gsap.set(loader, { autoAlpha: 1, y: 0 });
    gsap.set(logo, { autoAlpha: 0, scale: 0.9, transformOrigin: "50% 50%" });
    gsap.set(decor, { autoAlpha: 0, scale: 0.92, rotate: 0, transformOrigin: "50% 50%" });

    const logoPaths = logo ? logo.querySelectorAll("path") : [];
    if (logoPaths.length) gsap.set(logoPaths, { fill: "#FF8587" });
});


window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (!loader) return;

    const logo = loader.querySelector(".loader-logo");
    const decor = loader.querySelector(".loader-decorate");
    const logoPaths = logo ? logo.querySelectorAll("path") : [];

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(logo, { autoAlpha: 1, scale: 1, duration: 2.1 });

    if (logoPaths.length) {
        tl.to(logoPaths, {
            fill: "#FFD2D3",
            duration: 0.35,
            ease: "sine.inOut"
        }, "-=0.25");

        tl.to(logoPaths, {
            fill: "#FFFFFF",
            duration: 0.55,
            ease: "sine.inOut"
        }, ">-=0.05");

        tl.to(logo, {
            scale: 1.03,
            duration: 0.35,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1
        }, "<");
    }

    tl.to(decor, { autoAlpha: 1, scale: 1, duration: 0.8 }, "-=0.25");

    tl.to(decor, { autoAlpha: 1, scale: .8, rotate: 20, duration: 1.4 });

    tl.to(decor, { autoAlpha: 1, scale: 1, rotate: 40, duration: 1.4 });

    tl.to(decor, { autoAlpha: 1, scale: .8, rotate: 60, duration: 1.4 });

    tl.to(loader, {
        y: () => -window.innerHeight,
        duration: 0.9,
        opacity: 0,
        ease: "none"
    }, ">-=0.05");

    tl.add(() => {
        document.documentElement.classList.remove("is-loading");
        document.body.classList.remove("is-loading");

        if (window.ScrollTrigger) ScrollTrigger.refresh();

        const hero = document.querySelector(".hero");
        const phoneImg1 = hero?.querySelector(".js-phone img");

        if (phoneImg1) {
            gsap.to(phoneImg1, {
                y: 0,
                duration: 0.9,
                ease: "none",
                overwrite: "auto"
            });
        }
    }, ">-=1.05");

    tl.set(loader, { autoAlpha: 0, display: "none" });
});



gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const hero = document.querySelector(".hero");
const scene = hero.querySelector(".hero-scene");
const how = document.querySelector(".how-it-works");
const wm = hero.querySelector(".js-watermark");
const cloud = hero.querySelector(".js-cloud");
const phone = hero.querySelector(".js-phone");
const phoneImg = phone.querySelector("img");

gsap.set(scene, { transformOrigin: "50% 30%", y: 0, scale: 1, opacity: 1 });
gsap.set([wm, cloud, phone], { y: 0 });
gsap.set(phoneImg, { transformOrigin: "50% 80%" });

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
    }
});

tl.to(wm, { y: -60, ease: "none" }, 0);
tl.fromTo(
    cloud,
    { y: 100 },
    { y: -45, ease: "none" },
    0
);
tl.to(phone, { y: -85, ease: "none" }, 0);
tl.to(phoneImg, { rotation: -6, ease: "none" }, 0);

tl.to(scene, {
    y: -50,
    scale: 0.72,
    opacity: 0.10,
    ease: "power1.out"
}, 0.25);



const feature = document.querySelector(".feature");

if (feature) {
    const fInner = feature.querySelector(".feature-inner");
    const fPhone = feature.querySelector(".js-feature-phone");
    const fLeftGroup = feature.querySelector(".feature-left");
    const fRightGroup = feature.querySelector(".feature-right");
    const title = feature.querySelector(".section-title-wrap");

    const mm = gsap.matchMedia();

    mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
    }, (ctx) => {
        const { isDesktop, isMobile } = ctx.conditions;

        let phoneHide = parseFloat(getComputedStyle(feature).getPropertyValue("--phone-hide"));
        if (Number.isNaN(phoneHide)) phoneHide = 600;

        gsap.set(fInner, { transformOrigin: "50% 30%", force3D: true });
        gsap.set(fPhone, { y: phoneHide, force3D: true });

        if (isMobile) {
            gsap.set(fLeftGroup, { x: 0, y: 0, scale: 1, autoAlpha: 1, rotate: 0, filter: "blur(0px)", force3D: true });
            gsap.set(fRightGroup, { x: 0, y: 0, scale: 1, autoAlpha: 1, rotate: 0, filter: "blur(0px)", force3D: true });
        } else {
            gsap.set(fLeftGroup, { x: 120, y: 140, scale: 0.55, autoAlpha: 0.25, rotate: -6, filter: "blur(1px)", force3D: true });
            gsap.set(fRightGroup, { x: -120, y: 140, scale: 0.55, autoAlpha: 0.25, rotate: 6, filter: "blur(1px)", force3D: true });
        }

        const tlF = gsap.timeline({
            scrollTrigger: {
                trigger: feature,
                start: "top top",
                end: isMobile ? "+=105%" : "+=115%",
                scrub: isMobile ? 1 : 1.8,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        tlF.to(fPhone, { y: phoneHide * 0.5, ease: "none" }, 0.00);
        tlF.to(fPhone, { y: 0, ease: "none" }, 0.45);
        tlF.to(fPhone, { y: isMobile ? -40 : -85, ease: "none" }, 0.62);

        if (isDesktop) {
            tlF.to(fLeftGroup, { duration: 0.18, x: 60, y: 90, autoAlpha: 0.35, rotate: -4, ease: "none" }, 0.00);
            tlF.to(fRightGroup, { duration: 0.18, x: -60, y: 90, autoAlpha: 0.35, rotate: 4, ease: "none" }, 0.00);

            tlF.to(fLeftGroup, { duration: 0.45, x: -150, y: -160, rotate: 2, scale: 1, autoAlpha: 1, filter: "blur(0px)", ease: "power2.out" }, 0.20);
            tlF.to(fRightGroup, { duration: 0.45, x: 150, y: -160, rotate: -2, scale: 1, autoAlpha: 1, filter: "blur(0px)", ease: "power2.out" }, 0.20);

            tlF.to(fLeftGroup, { duration: 0.12, x: -156, y: -156, rotate: 1.6, ease: "sine.out" }, 0.66);
            tlF.to(fRightGroup, { duration: 0.12, x: 156, y: -156, rotate: -1.6, ease: "sine.out" }, 0.66);

            tlF.to(fLeftGroup, { x: 60, y: -210, rotate: -3, scale: 0.78, autoAlpha: 0.95, ease: "power2.inOut" }, 0.70);
            tlF.to(fRightGroup, { x: -60, y: -210, rotate: 3, scale: 0.78, autoAlpha: 0.95, ease: "power2.inOut" }, 0.70);

            if (title) tlF.to(title, { y: -440, autoAlpha: 0.9, ease: "none" }, 0.52);

        } else {
            gsap.set([fLeftGroup, fRightGroup], { transformOrigin: "50% 60%", force3D: true });

            tlF.fromTo(
                fLeftGroup,
                { x: 0, y: 35, scale: 0.62, autoAlpha: 0.12, rotate: -4, filter: "blur(2px)" },
                { x: 0, y: 15, scale: 0.82, autoAlpha: 0.85, rotate: -1, filter: "blur(0px)", ease: "none" },
                0.20
            );

            tlF.fromTo(
                fRightGroup,
                { x: 0, y: 35, scale: 0.62, autoAlpha: 0.12, rotate: 4, filter: "blur(2px)" },
                { x: 0, y: 15, scale: 0.82, autoAlpha: 0.85, rotate: 1, filter: "blur(0px)", ease: "none" },
                0.20
            );

            tlF.to(fLeftGroup, { x: -5, y: 5, scale: 0.95, autoAlpha: 1, rotate: 0, ease: "none" }, 0.48);
            tlF.to(fRightGroup, { x: 5, y: 5, scale: 0.95, autoAlpha: 1, rotate: 0, ease: "none" }, 0.48);

            tlF.to(fLeftGroup, { x: -1, y: 7, scale: 0.78, autoAlpha: 0.55, rotate: -2, filter: "blur(1px)", ease: "none" }, 0.72);
            tlF.to(fRightGroup, { x: 1, y: 7, scale: 0.78, autoAlpha: 0.55, rotate: 2, filter: "blur(1px)", ease: "none" }, 0.72);
        }


        // tlF.to(fInner, {
        //     y: -100,
        //     scale: 0.72,
        //     autoAlpha: 0.10,
        //     ease: "none"
        // }, 0.88);

        tlF.to(fInner, {
            y: -20,
            scale: 0.9,
            autoAlpha: 0.10,
            ease: "none"
        }, 0.98);

        return () => { };
    });
}



function initOfferDotsSwipe() {
    const section = document.querySelector(".offer");
    if (!section) return;

    const wrapper = section.querySelector(".offer-wrapper");
    const items = Array.from(section.querySelectorAll(".offer-item"));
    const dots = Array.from(section.querySelectorAll(".offer-indicator .offer-dot"));
    if (!wrapper || items.length < 2 || !dots.length) return;

    const setActive = (i) => dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));

    let raf = 0;
    wrapper.addEventListener("scroll", () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            const center = wrapper.scrollLeft + wrapper.clientWidth / 2;
            let best = 0, bestDist = Infinity;

            items.forEach((it, i) => {
                const itCenter = it.offsetLeft + it.offsetWidth / 2;
                const dist = Math.abs(center - itCenter);
                if (dist < bestDist) { bestDist = dist; best = i; }
            });

            setActive(best);
        });
    }, { passive: true });

    setActive(0);
}

initOfferDotsSwipe();




function initUsersDotsSwipe() {
    const section = document.querySelector(".users");
    if (!section) return;

    const wrapper = section.querySelector(".users-wrapper");
    const items = Array.from(section.querySelectorAll(".users-item"));
    const dots = Array.from(section.querySelectorAll(".users-indicator .users-dot"));
    if (!wrapper || items.length < 2 || !dots.length) return;

    const setActive = (i) => dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));

    let raf = 0;
    wrapper.addEventListener("scroll", () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            const center = wrapper.scrollLeft + wrapper.clientWidth / 2;
            let best = 0, bestDist = Infinity;

            items.forEach((it, i) => {
                const itCenter = it.offsetLeft + it.offsetWidth / 2;
                const dist = Math.abs(center - itCenter);
                if (dist < bestDist) { bestDist = dist; best = i; }
            });

            setActive(best);
        });
    }, { passive: true });

    setActive(0);
}

initUsersDotsSwipe();



const wrap = document.querySelector(".scenes");
const pin = document.querySelector(".scenes-pin");
const scenes = gsap.utils.toArray(".scenes .scene");
const inner = pin.querySelector(".scenes-inner");

const indicator = pin?.querySelector(".scene-indicator");
const indCurrent = indicator?.querySelector(".scene-indicator-current");
const indTotal = indicator?.querySelector(".scene-indicator-total");
const indBar = indicator?.querySelector(".scene-indicator-progress");

if (!wrap || !pin || !scenes.length || !indicator || !indCurrent || !indTotal || !indBar) {
    console.warn("Scenes/indicator not found");
} else {
    const total = scenes.length;
    indTotal.textContent = String(total).padStart(2, "0");

    const holdStart = 0.9;
    const holdEnd = 0.45;
    const stepVH = 1.15;

    const accentMap = {
        "scene-green": "#8CD238",
        "scene-purple": "#6438D6",
        "scene-yellow": "#FFD45B",
        "scene-pink": "#FF8587",
        "scene-blue": "#4F7EFF"
    };

    const getAccent = (sceneEl) => {
        for (const key in accentMap) {
            if (sceneEl.classList.contains(key)) return accentMap[key];
        }
        return "#8CD238";
    };

    const accents = scenes.map(getAccent);
    scenes.forEach((s, i) => {
        gsap.set(s, {
            autoAlpha: i === 0 ? 1 : 0,
            scale: i === 0 ? 1 : 1.06,
            y: i === 0 ? 0 : 20,
            force3D: true,
            willChange: "transform,opacity"
        });
        s.classList.toggle("is-active", i === 0);
    });

    const decorByScene = scenes.map(scene =>
        Array.from(scene.querySelectorAll('[class*="decor"]'))
    );

    decorByScene.forEach((decorEls, idx) => {
        if (!decorEls.length) return;
        gsap.set(decorEls, {
            autoAlpha: idx === 0 ? 1 : 0,
            scale: idx === 0 ? 1 : 0.96,
            y: idx === 0 ? 0 : 12
        });
    });

    indBar.style.setProperty("--p", "0%");
    indicator.style.setProperty("--accent", accents[0]);
    indCurrent.textContent = "01";
    // gsap.set(pin, { transformOrigin: "50% 30%" });
    gsap.set(inner, { transformOrigin: "50% 30%" });

    const tl = gsap.timeline({ defaults: { ease: "none" } });

    if (holdStart > 0) tl.to({}, { duration: holdStart });


    for (let i = 0; i < total - 1; i++) {
        const a = scenes[i];
        const b = scenes[i + 1];
        const isFirst = i === 0;

        const outPart = isFirst ? 0.40 : 0.35;
        const inPart = isFirst ? 0.50 : 0.55;
        const setPart = 1 - outPart - inPart;

        const at = i + holdStart;

        tl.to(a, {
            duration: outPart,
            autoAlpha: 0,
            scale: isFirst ? 0.985 : 0.965,
            y: isFirst ? -10 : -14
        }, at);

        tl.fromTo(b,
            { autoAlpha: 0, scale: isFirst ? 1.05 : 1.07, y: isFirst ? 16 : 22 },
            { duration: inPart, autoAlpha: 1, scale: 1, y: 0 },
            at + (outPart * 0.35)
        );

        const decorEls = decorByScene[i + 1];
        if (decorEls && decorEls.length) {
            tl.fromTo(
                decorEls,
                { autoAlpha: 0, scale: 0.96, y: 14, rotate: -1 },
                { duration: 0.45, autoAlpha: 1, scale: 1, y: 0, rotate: 0, stagger: 0.06 },
                at + outPart + 0.08
            );
        }

        tl.to(b, {
            duration: setPart,
            autoAlpha: 1,
            scale: 1,
            y: 0
        }, at + outPart + inPart - 0.02);
    }

    if (holdEnd > 0) tl.to({}, { duration: holdEnd });

    tl.to(inner, {
        duration: 0.55,
        y: -40,
        scale: 0.9,
        autoAlpha: 0.12,
        ease: "power1.out"
    });


    const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => "+=" + (window.innerHeight * stepVH * tl.duration()),
        pin: pin,
        scrub: 1,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        animation: tl,
        onUpdate: (self) => updateIndicatorByTime(self.animation.time(), self.animation.duration()),
        onRefresh: (self) => updateIndicatorByTime(self.animation.time(), self.animation.duration())
    });

    function updateIndicatorByTime(time, totalTime) {
        const p01 = totalTime ? (time / totalTime) : 0;
        indBar.style.setProperty("--p", (p01 * 100).toFixed(2) + "%");

        const transitions = total - 1;
        const t0 = holdStart;
        const t1 = holdStart + transitions;

        let x, i, t;

        if (time <= t0) {
            i = 0; t = 0;
        } else if (time >= t1) {
            i = total - 1; t = 0;
        } else {
            x = time - t0;
            i = Math.floor(x);
            t = x - i;
        }

        const c1 = accents[i];
        const c2 = accents[Math.min(i + 1, total - 1)];
        indicator.style.setProperty("--accent", mixHex(c1, c2, t));

        const idx = Math.min(Math.max(i + (t >= 0.5 ? 1 : 0), 0), total - 1);
        indCurrent.textContent = String(idx + 1).padStart(2, "0");

        scenes.forEach((s, k) => s.classList.toggle("is-active", k === idx));
    }

    function mixHex(a, b, t) {
        const ah = a.replace("#", "");
        const bh = b.replace("#", "");

        const ar = parseInt(ah.slice(0, 2), 16);
        const ag = parseInt(ah.slice(2, 4), 16);
        const ab = parseInt(ah.slice(4, 6), 16);

        const br = parseInt(bh.slice(0, 2), 16);
        const bg = parseInt(bh.slice(2, 4), 16);
        const bb = parseInt(bh.slice(4, 6), 16);

        const rr = Math.round(ar + (br - ar) * t);
        const rg = Math.round(ag + (bg - ag) * t);
        const rb = Math.round(ab + (bb - ab) * t);

        return "#" + [rr, rg, rb].map(v => v.toString(16).padStart(2, "0")).join("");
    }
}



gsap.fromTo(".users-wrapper",
    { y: 120, autoAlpha: 0.15 },
    {
        y: 0,
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: {
            trigger: ".users",
            start: "top top",
            end: "+=120",
            scrub: 0.5,
            invalidateOnRefresh: true,
        },
    }
);



(() => {
    const el = document.getElementById("reviewsSwiper");
    if (!el) return;

    const isDesktop = () =>
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const prefersReduced = () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const desktopAutoplay = () => isDesktop() && !prefersReduced();

    const stopAllVideos = (except = null) => {
        el.querySelectorAll(".review-card").forEach((card) => {
            const v = card.querySelector(".review-video");
            if (!v) return;
            if (v !== except) {
                try { v.pause(); } catch (e) { }
                card.classList.remove("is-playing");
            }
        });
    };

    const swiper = new Swiper(el, {
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        speed: 900,
        grabCursor: true,
        spaceBetween: 22,

        // preventClicks: false,
        // preventClicksPropagation: false,

        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",

        autoplay: desktopAutoplay()
            ? { delay: 1800, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false,

        on: {
            slideChangeTransitionStart() {
                stopAllVideos(null);
            },
        },
    });

    el.querySelectorAll(".review-card").forEach((card) => {
        const btn = card.querySelector(".review-play");
        const v = card.querySelector(".review-video");
        if (!v) return;

        const play = async () => {
            stopAllVideos(v);
            if (swiper.autoplay) swiper.autoplay.stop();
            try {
                await v.play();
                card.classList.add("is-playing");
            } catch (e) { }
        };

        const pause = () => {
            try { v.pause(); } catch (e) { }
            card.classList.remove("is-playing");
            if (swiper.autoplay && desktopAutoplay()) swiper.autoplay.start();
        };

        const toggle = () => (v.paused ? play() : pause());

        if (btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle();
            });
        }

        v.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle();
        });

        v.addEventListener("pause", () => card.classList.remove("is-playing"));
        v.addEventListener("ended", () => {
            card.classList.remove("is-playing");
            if (swiper.autoplay && desktopAutoplay()) swiper.autoplay.start();
        });
    });

    window.addEventListener("resize", () => {
        if (!swiper.autoplay) return;
        if (desktopAutoplay()) swiper.autoplay.start();
        else swiper.autoplay.stop();
    });
})();
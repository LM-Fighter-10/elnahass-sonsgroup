import {S as e, A as r, N as s, P as t} from "./slider2.mjs";


!function() {
    const e = document.createElement("link").relList;
    if (!(e && e.supports && e.supports("modulepreload"))) {
        for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
            r(e);
        new MutationObserver((e=>{
                for (const s of e)
                    if ("childList" === s.type)
                        for (const e of s.addedNodes)
                            "LINK" === e.tagName && "modulepreload" === e.rel && r(e)
            }
        )).observe(document, {
            childList: !0,
            subtree: !0
        })
    }
    function r(e) {
        if (e.ep)
            return;
        e.ep = !0;
        const r = function(e) {
            const r = {};
            return e.integrity && (r.integrity = e.integrity),
            e.referrerpolicy && (r.referrerPolicy = e.referrerpolicy),
                "use-credentials" === e.crossorigin ? r.credentials = "include" : "anonymous" === e.crossorigin ? r.credentials = "omit" : r.credentials = "same-origin",
                r
        }(e);
        fetch(e.href, r)
    }
}();
const swiper = new e(".swiper",{
    modules: [r, s, t, function({swiper: e, on: r}) {
        r("beforeInit", (()=>{
                if ("carousel" !== e.params.effect)
                    return;
                e.classNames.push(`${e.params.containerModifierClass}carousel`);
                const r = {
                    watchSlidesProgress: !0,
                    centeredSlides: !0
                };
                Object.assign(e.params, r),
                    Object.assign(e.originalParams, r)
            }
        )),
            r("progress", (()=>{
                    if ("carousel" !== e.params.effect)
                        return;
                    const r = e.slides.length;
                    for (let s = 0; s < e.slides.length; s += 1) {
                        const t = e.slides[s]
                            , o = e.slides[s].progress
                            , i = Math.abs(o);
                        let a = 1;
                        i > 1 && (a = .3 * (i - 1) + 1);
                        const n = t.querySelectorAll(".swiper-carousel-animate-opacity")
                            , l = o * a * 50 * (e.rtlTranslate ? -1 : 1) + "%"
                            , c = 1 - .2 * i
                            , u = r - Math.abs(Math.round(o));
                        t.style.transform = `translateX(${l}) scale(${c})`,
                            t.style.zIndex = u,
                            t.style.opacity = i > 3 ? 0 : 1,
                            n.forEach((e=>{
                                    e.style.opacity = 1 - i / 3
                                }
                            ))
                    }
                }
            )),
            r("setTransition", ((r,s)=>{
                    if ("carousel" === e.params.effect)
                        for (let t = 0; t < e.slides.length; t += 1) {
                            const r = e.slides[t]
                                , o = r.querySelectorAll(".swiper-carousel-animate-opacity");
                            r.style.transitionDuration = `${s}ms`,
                                o.forEach((e=>{
                                        e.style.transitionDuration = `${s}ms`
                                    }
                                ))
                        }
                }
            ))
    }
    ],
    effect: "carousel",
    grabCursor: !0,
    loop: !0,
    slidesPerView: "auto",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    pagination: {
        el: ".swiper-pagination"
    },
    autoplay: {
        delay: 3000,
        reverseDirection: true
    }
});
function autoScrollSlider() {
            // Trigger the next slide
    swiper.slidePrev();
}

// Set an interval to auto-scroll the slider every 5 seconds (adjust the time interval as needed)
let autoScrollInterval = setInterval(autoScrollSlider, 5000);

// Pause the auto-scrolling when the user interacts with the slider
swiper.on('click', function (event) {
    clearInterval(autoScrollInterval);
});
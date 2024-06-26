function e(e) {
    return null !== e && "object" == typeof e && "constructor"in e && e.constructor === Object
}
function t(s, i) {
    void 0 === s && (s = {}),
    void 0 === i && (i = {}),
        Object.keys(i).forEach((a=>{
                void 0 === s[a] ? s[a] = i[a] : e(i[a]) && e(s[a]) && Object.keys(i[a]).length > 0 && t(s[a], i[a])
            }
        ))
}
const s = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector: ()=>null,
    querySelectorAll: ()=>[],
    getElementById: ()=>null,
    createEvent: ()=>({
        initEvent() {}
    }),
    createElement: ()=>({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: ()=>[]
    }),
    createElementNS: ()=>({}),
    importNode: ()=>null,
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};
function i() {
    const e = "undefined" != typeof document ? document : {};
    return t(e, s),
        e
}
const a = {
    document: s,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: ()=>({
        getPropertyValue: ()=>""
    }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: ()=>({}),
    requestAnimationFrame: e=>"undefined" == typeof setTimeout ? (e(),
        null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e)
    }
};
function r() {
    const e = "undefined" != typeof window ? window : {};
    return t(e, a),
        e
}
function n(e, t) {
    return void 0 === t && (t = 0),
        setTimeout(e, t)
}
function l() {
    return Date.now()
}
function o(e, t) {
    void 0 === t && (t = "x");
    const s = r();
    let i, a, n;
    const l = function(e) {
        const t = r();
        let s;
        return t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
            s
    }(e);
    return s.WebKitCSSMatrix ? (a = l.transform || l.webkitTransform,
    a.split(",").length > 6 && (a = a.split(", ").map((e=>e.replace(",", "."))).join(", ")),
        n = new s.WebKitCSSMatrix("none" === a ? "" : a)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
        i = n.toString().split(",")),
    "x" === t && (a = s.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
    "y" === t && (a = s.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
    a || 0
}
function d(e) {
    return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
}
function c(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
}
function p() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0])
        , t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
        const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
        if (null != i && !c(i)) {
            const s = Object.keys(Object(i)).filter((e=>t.indexOf(e) < 0));
            for (let t = 0, a = s.length; t < a; t += 1) {
                const a = s[t]
                    , r = Object.getOwnPropertyDescriptor(i, a);
                void 0 !== r && r.enumerable && (d(e[a]) && d(i[a]) ? i[a].__swiper__ ? e[a] = i[a] : p(e[a], i[a]) : !d(e[a]) && d(i[a]) ? (e[a] = {},
                    i[a].__swiper__ ? e[a] = i[a] : p(e[a], i[a])) : e[a] = i[a])
            }
        }
    }
    return e
}
function u(e, t, s) {
    e.style.setProperty(t, s)
}
function m(e) {
    let {swiper: t, targetPosition: s, side: i} = e;
    const a = r()
        , n = -t.translate;
    let l, o = null;
    const d = t.params.speed;
    t.wrapperEl.style.scrollSnapType = "none",
        a.cancelAnimationFrame(t.cssModeFrameID);
    const c = s > n ? "next" : "prev"
        , p = (e,t)=>"next" === c && e >= t || "prev" === c && e <= t
        , u = ()=>{
            l = (new Date).getTime(),
            null === o && (o = l);
            const e = Math.max(Math.min((l - o) / d, 1), 0)
                , r = .5 - Math.cos(e * Math.PI) / 2;
            let c = n + r * (s - n);
            if (p(c, s) && (c = s),
                t.wrapperEl.scrollTo({
                    [i]: c
                }),
                p(c, s))
                return t.wrapperEl.style.overflow = "hidden",
                    t.wrapperEl.style.scrollSnapType = "",
                    setTimeout((()=>{
                            t.wrapperEl.style.overflow = "",
                                t.wrapperEl.scrollTo({
                                    [i]: c
                                })
                        }
                    )),
                    void a.cancelAnimationFrame(t.cssModeFrameID);
            t.cssModeFrameID = a.requestAnimationFrame(u)
        }
    ;
    u()
}
function f(e, t) {
    return void 0 === t && (t = ""),
        [...e.children].filter((e=>e.matches(t)))
}
function h(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return s.classList.add(...Array.isArray(t) ? t : [t]),
        s
}
function v(e, t) {
    return r().getComputedStyle(e, null).getPropertyValue(t)
}
function g(e) {
    let t, s = e;
    if (s) {
        for (t = 0; null !== (s = s.previousSibling); )
            1 === s.nodeType && (t += 1);
        return t
    }
}
function b(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i; )
        t ? i.matches(t) && s.push(i) : s.push(i),
            i = i.parentElement;
    return s
}
function w(e, t, s) {
    const i = r();
    return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
}
let y, S, T;
function x() {
    return y || (y = function() {
        const e = r()
            , t = i();
        return {
            smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior"in t.documentElement.style,
            touch: !!("ontouchstart"in e || e.DocumentTouch && t instanceof e.DocumentTouch)
        }
    }()),
        y
}
function E(e) {
    return void 0 === e && (e = {}),
    S || (S = function(e) {
        let {userAgent: t} = void 0 === e ? {} : e;
        const s = x()
            , i = r()
            , a = i.navigator.platform
            , n = t || i.navigator.userAgent
            , l = {
            ios: !1,
            android: !1
        }
            , o = i.screen.width
            , d = i.screen.height
            , c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
        let p = n.match(/(iPad).*OS\s([\d_]+)/);
        const u = n.match(/(iPod)(.*OS\s([\d_]+))?/)
            , m = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
            , f = "Win32" === a;
        let h = "MacIntel" === a;
        return !p && h && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x ${d}`) >= 0 && (p = n.match(/(Version)\/([\d.]+)/),
        p || (p = [0, 1, "13_0_0"]),
            h = !1),
        c && !f && (l.os = "android",
            l.android = !0),
        (p || m || u) && (l.os = "ios",
            l.ios = !0),
            l
    }(e)),
        S
}
function C() {
    return T || (T = function() {
        const e = r();
        let t = !1;
        function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
        }
        if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
                const [e,i] = s.split("Version/")[1].split(" ")[0].split(".").map((e=>Number(e)));
                t = e < 16 || 16 === e && i < 2
            }
        }
        return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
        }
    }()),
        T
}
const M = (e,t)=>{
        if (!e || e.destroyed || !e.params)
            return;
        const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
        if (s) {
            const t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
            t && t.remove()
        }
    }
    , L = (e,t)=>{
        if (!e.slides[t])
            return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading")
    }
    , P = e=>{
        if (!e || e.destroyed || !e.params)
            return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0)
            return;
        t = Math.min(t, s);
        const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView)
            , a = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
            const s = a
                , r = [s - t];
            return r.push(...Array.from({
                length: t
            }).map(((e,t)=>s + i + t))),
                void e.slides.forEach(((t,s)=>{
                        r.includes(t.column) && L(e, s)
                    }
                ))
        }
        const r = a + i - 1;
        if (e.params.rewind || e.params.loop)
            for (let n = a - t; n <= r + t; n += 1) {
                const t = (n % s + s) % s;
                (t < a || t > r) && L(e, t)
            }
        else
            for (let n = Math.max(a - t, 0); n <= Math.min(r + t, s - 1); n += 1)
                n !== a && (n > r || n < a) && L(e, n)
    }
;
function k(e) {
    let {swiper: t, runCallbacks: s, direction: i, step: a} = e;
    const {activeIndex: r, previousIndex: n} = t;
    let l = i;
    if (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
        t.emit(`transition ${a}`),
    s && r !== n) {
        if ("reset" === l)
            return void t.emit(`slideResetTransition ${a}`);
        t.emit(`slideChangeTransition ${a}`),
            "next" === l ? t.emit(`slideNextTransition ${a}`) : t.emit(`slidePrevTransition ${a}`)
    }
}
function O(e) {
    const t = this
        , s = i()
        , a = r()
        , n = t.touchEventsData;
    n.evCache.push(e);
    const {params: o, touches: d, enabled: c} = t;
    if (!c)
        return;
    if (!o.simulateTouch && "mouse" === e.pointerType)
        return;
    if (t.animating && o.preventInteractionOnTransition)
        return;
    !t.animating && o.cssMode && o.loop && t.loopFix();
    let p = e;
    p.originalEvent && (p = p.originalEvent);
    let u = p.target;
    if ("wrapper" === o.touchEventsTarget && !t.wrapperEl.contains(u))
        return;
    if ("which"in p && 3 === p.which)
        return;
    if ("button"in p && p.button > 0)
        return;
    if (n.isTouched && n.isMoved)
        return;
    const m = !!o.noSwipingClass && "" !== o.noSwipingClass
        , f = e.composedPath ? e.composedPath() : e.path;
    m && p.target && p.target.shadowRoot && f && (u = f[0]);
    const h = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`
        , v = !(!p.target || !p.target.shadowRoot);
    if (o.noSwiping && (v ? function(e, t) {
        return void 0 === t && (t = this),
            function t(s) {
                if (!s || s === i() || s === r())
                    return null;
                s.assignedSlot && (s = s.assignedSlot);
                const a = s.closest(e);
                return a || s.getRootNode ? a || t(s.getRootNode().host) : null
            }(t)
    }(h, u) : u.closest(h)))
        return void (t.allowClick = !0);
    if (o.swipeHandler && !u.closest(o.swipeHandler))
        return;
    d.currentX = p.pageX,
        d.currentY = p.pageY;
    const g = d.currentX
        , b = d.currentY
        , w = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection
        , y = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
    if (w && (g <= y || g >= a.innerWidth - y)) {
        if ("prevent" !== w)
            return;
        e.preventDefault()
    }
    Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }),
        d.startX = g,
        d.startY = b,
        n.touchStartTime = l(),
        t.allowClick = !0,
        t.updateSize(),
        t.swipeDirection = void 0,
    o.threshold > 0 && (n.allowThresholdMove = !1);
    let S = !0;
    u.matches(n.focusableElements) && (S = !1,
    "SELECT" === u.nodeName && (n.isTouched = !1)),
    s.activeElement && s.activeElement.matches(n.focusableElements) && s.activeElement !== u && s.activeElement.blur();
    const T = S && t.allowTouchMove && o.touchStartPreventDefault;
    !o.touchStartForcePreventDefault && !T || u.isContentEditable || p.preventDefault(),
    o.freeMode && o.freeMode.enabled && t.freeMode && t.animating && !o.cssMode && t.freeMode.onTouchStart(),
        t.emit("touchStart", p)
}
function I(e) {
    const t = i()
        , s = this
        , a = s.touchEventsData
        , {params: r, touches: n, rtlTranslate: o, enabled: d} = s;
    if (!d)
        return;
    if (!r.simulateTouch && "mouse" === e.pointerType)
        return;
    let c = e;
    if (c.originalEvent && (c = c.originalEvent),
        !a.isTouched)
        return void (a.startMoving && a.isScrolling && s.emit("touchMoveOpposite", c));
    const p = a.evCache.findIndex((e=>e.pointerId === c.pointerId));
    p >= 0 && (a.evCache[p] = c);
    const u = a.evCache.length > 1 ? a.evCache[0] : c
        , m = u.pageX
        , f = u.pageY;
    if (c.preventedByNestedSwiper)
        return n.startX = m,
            void (n.startY = f);
    if (!s.allowTouchMove)
        return c.target.matches(a.focusableElements) || (s.allowClick = !1),
            void (a.isTouched && (Object.assign(n, {
                startX: m,
                startY: f,
                prevX: s.touches.currentX,
                prevY: s.touches.currentY,
                currentX: m,
                currentY: f
            }),
                a.touchStartTime = l()));
    if (r.touchReleaseOnEdges && !r.loop)
        if (s.isVertical()) {
            if (f < n.startY && s.translate <= s.maxTranslate() || f > n.startY && s.translate >= s.minTranslate())
                return a.isTouched = !1,
                    void (a.isMoved = !1)
        } else if (m < n.startX && s.translate <= s.maxTranslate() || m > n.startX && s.translate >= s.minTranslate())
            return;
    if (t.activeElement && c.target === t.activeElement && c.target.matches(a.focusableElements))
        return a.isMoved = !0,
            void (s.allowClick = !1);
    if (a.allowTouchCallbacks && s.emit("touchMove", c),
    c.targetTouches && c.targetTouches.length > 1)
        return;
    n.currentX = m,
        n.currentY = f;
    const h = n.currentX - n.startX
        , v = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(h ** 2 + v ** 2) < s.params.threshold)
        return;
    if (void 0 === a.isScrolling) {
        let e;
        s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? a.isScrolling = !1 : h * h + v * v >= 25 && (e = 180 * Math.atan2(Math.abs(v), Math.abs(h)) / Math.PI,
            a.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
    }
    if (a.isScrolling && s.emit("touchMoveOpposite", c),
    void 0 === a.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (a.startMoving = !0)),
    a.isScrolling || s.zoom && s.params.zoom && s.params.zoom.enabled && a.evCache.length > 1)
        return void (a.isTouched = !1);
    if (!a.startMoving)
        return;
    s.allowClick = !1,
    !r.cssMode && c.cancelable && c.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && c.stopPropagation();
    let g = s.isHorizontal() ? h : v
        , b = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
    r.oneWayMovement && (g = Math.abs(g) * (o ? 1 : -1),
        b = Math.abs(b) * (o ? 1 : -1)),
        n.diff = g,
        g *= r.touchRatio,
    o && (g = -g,
        b = -b);
    const w = s.touchesDirection;
    s.swipeDirection = g > 0 ? "prev" : "next",
        s.touchesDirection = b > 0 ? "prev" : "next";
    const y = s.params.loop && !r.cssMode;
    if (!a.isMoved) {
        if (y && s.loopFix({
            direction: s.swipeDirection
        }),
            a.startTranslate = s.getTranslate(),
            s.setTransition(0),
            s.animating) {
            const e = new window.CustomEvent("transitionend",{
                bubbles: !0,
                cancelable: !0
            });
            s.wrapperEl.dispatchEvent(e)
        }
        a.allowMomentumBounce = !1,
        !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0),
            s.emit("sliderFirstMove", c)
    }
    let S;
    a.isMoved && w !== s.touchesDirection && y && Math.abs(g) >= 1 && (s.loopFix({
        direction: s.swipeDirection,
        setTranslate: !0
    }),
        S = !0),
        s.emit("sliderMove", c),
        a.isMoved = !0,
        a.currentTranslate = g + a.startTranslate;
    let T = !0
        , x = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (x = 0),
        g > 0 ? (y && !S && a.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.size / 2 : s.minTranslate()) && s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }),
        a.currentTranslate > s.minTranslate() && (T = !1,
        r.resistance && (a.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + a.startTranslate + g) ** x))) : g < 0 && (y && !S && a.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.size / 2 : s.maxTranslate()) && s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
        }),
        a.currentTranslate < s.maxTranslate() && (T = !1,
        r.resistance && (a.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - a.startTranslate - g) ** x))),
    T && (c.preventedByNestedSwiper = !0),
    !s.allowSlideNext && "next" === s.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate),
    !s.allowSlidePrev && "prev" === s.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate),
    s.allowSlidePrev || s.allowSlideNext || (a.currentTranslate = a.startTranslate),
    r.threshold > 0) {
        if (!(Math.abs(g) > r.threshold || a.allowThresholdMove))
            return void (a.currentTranslate = a.startTranslate);
        if (!a.allowThresholdMove)
            return a.allowThresholdMove = !0,
                n.startX = n.currentX,
                n.startY = n.currentY,
                a.currentTranslate = a.startTranslate,
                void (n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
    }
    r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(),
        s.updateSlidesClasses()),
    r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
        s.updateProgress(a.currentTranslate),
        s.setTranslate(a.currentTranslate))
}
function A(e) {
    const t = this
        , s = t.touchEventsData
        , i = s.evCache.findIndex((t=>t.pointerId === e.pointerId));
    if (i >= 0 && s.evCache.splice(i, 1),
        ["pointercancel", "pointerout", "pointerleave"].includes(e.type)) {
        if (!("pointercancel" === e.type && (t.browser.isSafari || t.browser.isWebView)))
            return
    }
    const {params: a, touches: r, rtlTranslate: o, slidesGrid: d, enabled: c} = t;
    if (!c)
        return;
    if (!a.simulateTouch && "mouse" === e.pointerType)
        return;
    let p = e;
    if (p.originalEvent && (p = p.originalEvent),
    s.allowTouchCallbacks && t.emit("touchEnd", p),
        s.allowTouchCallbacks = !1,
        !s.isTouched)
        return s.isMoved && a.grabCursor && t.setGrabCursor(!1),
            s.isMoved = !1,
            void (s.startMoving = !1);
    a.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    const u = l()
        , m = u - s.touchStartTime;
    if (t.allowClick) {
        const e = p.path || p.composedPath && p.composedPath();
        t.updateClickedSlide(e && e[0] || p.target),
            t.emit("tap click", p),
        m < 300 && u - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", p)
    }
    if (s.lastClickTime = l(),
        n((()=>{
                t.destroyed || (t.allowClick = !0)
            }
        )),
    !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === r.diff || s.currentTranslate === s.startTranslate)
        return s.isTouched = !1,
            s.isMoved = !1,
            void (s.startMoving = !1);
    let f;
    if (s.isTouched = !1,
        s.isMoved = !1,
        s.startMoving = !1,
        f = a.followFinger ? o ? t.translate : -t.translate : -s.currentTranslate,
        a.cssMode)
        return;
    if (a.freeMode && a.freeMode.enabled)
        return void t.freeMode.onTouchEnd({
            currentPos: f
        });
    let h = 0
        , v = t.slidesSizesGrid[0];
    for (let n = 0; n < d.length; n += n < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
        const e = n < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
        void 0 !== d[n + e] ? f >= d[n] && f < d[n + e] && (h = n,
            v = d[n + e] - d[n]) : f >= d[n] && (h = n,
            v = d[d.length - 1] - d[d.length - 2])
    }
    let g = null
        , b = null;
    a.rewind && (t.isBeginning ? b = a.virtual && a.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
    const w = (f - d[h]) / v
        , y = h < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
    if (m > a.longSwipesMs) {
        if (!a.longSwipes)
            return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection && (w >= a.longSwipesRatio ? t.slideTo(a.rewind && t.isEnd ? g : h + y) : t.slideTo(h)),
        "prev" === t.swipeDirection && (w > 1 - a.longSwipesRatio ? t.slideTo(h + y) : null !== b && w < 0 && Math.abs(w) > a.longSwipesRatio ? t.slideTo(b) : t.slideTo(h))
    } else {
        if (!a.shortSwipes)
            return void t.slideTo(t.activeIndex);
        t.navigation && (p.target === t.navigation.nextEl || p.target === t.navigation.prevEl) ? p.target === t.navigation.nextEl ? t.slideTo(h + y) : t.slideTo(h) : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : h + y),
        "prev" === t.swipeDirection && t.slideTo(null !== b ? b : h))
    }
}
function z() {
    const e = this
        , {params: t, el: s} = e;
    if (s && 0 === s.offsetWidth)
        return;
    t.breakpoints && e.setBreakpoint();
    const {allowSlideNext: i, allowSlidePrev: a, snapGrid: r} = e
        , n = e.virtual && e.params.virtual.enabled;
    e.allowSlideNext = !0,
        e.allowSlidePrev = !0,
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
    const l = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || l ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0),
    e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout),
        e.autoplay.resizeTimeout = setTimeout((()=>{
                e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
            }
        ), 500)),
        e.allowSlidePrev = a,
        e.allowSlideNext = i,
    e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
}
function G(e) {
    const t = this;
    t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(),
    t.params.preventClicksPropagation && t.animating && (e.stopPropagation(),
        e.stopImmediatePropagation())))
}
function D() {
    const e = this
        , {wrapperEl: t, rtlTranslate: s, enabled: i} = e;
    if (!i)
        return;
    let a;
    e.previousTranslate = e.translate,
        e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop,
    0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    a = 0 === r ? 0 : (e.translate - e.minTranslate()) / r,
    a !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1)
}
function $(e) {
    const t = this;
    M(t, e.target),
    t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
}
let _ = !1;
function B() {}
const F = (e,t)=>{
        const s = i()
            , {params: a, el: r, wrapperEl: n, device: l} = e
            , o = !!a.nested
            , d = "on" === t ? "addEventListener" : "removeEventListener"
            , c = t;
        r[d]("pointerdown", e.onTouchStart, {
            passive: !1
        }),
            s[d]("pointermove", e.onTouchMove, {
                passive: !1,
                capture: o
            }),
            s[d]("pointerup", e.onTouchEnd, {
                passive: !0
            }),
            s[d]("pointercancel", e.onTouchEnd, {
                passive: !0
            }),
            s[d]("pointerout", e.onTouchEnd, {
                passive: !0
            }),
            s[d]("pointerleave", e.onTouchEnd, {
                passive: !0
            }),
        (a.preventClicks || a.preventClicksPropagation) && r[d]("click", e.onClick, !0),
        a.cssMode && n[d]("scroll", e.onScroll),
            a.updateOnWindowResize ? e[c](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", z, !0) : e[c]("observerUpdate", z, !0),
            r[d]("load", e.onLoad, {
                capture: !0
            })
    }
;
const N = (e,t)=>e.grid && t.grid && t.grid.rows > 1;
var H = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
};
function V(e, t) {
    return function(s) {
        void 0 === s && (s = {});
        const i = Object.keys(s)[0]
            , a = s[i];
        "object" == typeof a && null !== a ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === e[i] && (e[i] = {
            auto: !0
        }),
            i in e && "enabled"in a ? (!0 === e[i] && (e[i] = {
                enabled: !0
            }),
            "object" != typeof e[i] || "enabled"in e[i] || (e[i].enabled = !0),
            e[i] || (e[i] = {
                enabled: !1
            }),
                p(t, s)) : p(t, s)) : p(t, s)
    }
}
const j = {
    eventsEmitter: {
        on(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            const a = s ? "unshift" : "push";
            return e.split(" ").forEach((e=>{
                    i.eventsListeners[e] || (i.eventsListeners[e] = []),
                        i.eventsListeners[e][a](t)
                }
            )),
                i
        },
        once(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            function a() {
                i.off(e, a),
                a.__emitterProxy && delete a.__emitterProxy;
                for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
                    r[n] = arguments[n];
                t.apply(i, r)
            }
            return a.__emitterProxy = t,
                i.on(e, a, s)
        },
        onAny(e, t) {
            const s = this;
            if (!s.eventsListeners || s.destroyed)
                return s;
            if ("function" != typeof e)
                return s;
            const i = t ? "unshift" : "push";
            return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e),
                s
        },
        offAny(e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed)
                return t;
            if (!t.eventsAnyListeners)
                return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1),
                t
        },
        off(e, t) {
            const s = this;
            return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e=>{
                    void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((i,a)=>{
                            (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(a, 1)
                        }
                    ))
                }
            )),
                s) : s
        },
        emit() {
            const e = this;
            if (!e.eventsListeners || e.destroyed)
                return e;
            if (!e.eventsListeners)
                return e;
            let t, s, i;
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
                r[n] = arguments[n];
            "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0],
                s = r.slice(1, r.length),
                i = e) : (t = r[0].events,
                s = r[0].data,
                i = r[0].context || e),
                s.unshift(i);
            return (Array.isArray(t) ? t : t.split(" ")).forEach((t=>{
                    e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e=>{
                            e.apply(i, [t, ...s])
                        }
                    )),
                    e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e=>{
                            e.apply(i, s)
                        }
                    ))
                }
            )),
                e
        }
    },
    update: {
        updateSize: function() {
            const e = this;
            let t, s;
            const i = e.el;
            t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth,
                s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight,
            0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(v(i, "padding-left") || 0, 10) - parseInt(v(i, "padding-right") || 0, 10),
                s = s - parseInt(v(i, "padding-top") || 0, 10) - parseInt(v(i, "padding-bottom") || 0, 10),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
                Object.assign(e, {
                    width: t,
                    height: s,
                    size: e.isHorizontal() ? t : s
                }))
        },
        updateSlides: function() {
            const e = this;
            function t(t) {
                return e.isHorizontal() ? t : {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[t]
            }
            function s(e, s) {
                return parseFloat(e.getPropertyValue(t(s)) || 0)
            }
            const i = e.params
                , {wrapperEl: a, slidesEl: r, size: n, rtlTranslate: l, wrongRTL: o} = e
                , d = e.virtual && i.virtual.enabled
                , c = d ? e.virtual.slides.length : e.slides.length
                , p = f(r, `.${e.params.slideClass}, swiper-slide`)
                , m = d ? e.virtual.slides.length : p.length;
            let h = [];
            const g = []
                , b = [];
            let y = i.slidesOffsetBefore;
            "function" == typeof y && (y = i.slidesOffsetBefore.call(e));
            let S = i.slidesOffsetAfter;
            "function" == typeof S && (S = i.slidesOffsetAfter.call(e));
            const T = e.snapGrid.length
                , x = e.slidesGrid.length;
            let E = i.spaceBetween
                , C = -y
                , M = 0
                , L = 0;
            if (void 0 === n)
                return;
            "string" == typeof E && E.indexOf("%") >= 0 ? E = parseFloat(E.replace("%", "")) / 100 * n : "string" == typeof E && (E = parseFloat(E)),
                e.virtualSize = -E,
                p.forEach((e=>{
                        l ? e.style.marginLeft = "" : e.style.marginRight = "",
                            e.style.marginBottom = "",
                            e.style.marginTop = ""
                    }
                )),
            i.centeredSlides && i.cssMode && (u(a, "--swiper-centered-offset-before", ""),
                u(a, "--swiper-centered-offset-after", ""));
            const P = i.grid && i.grid.rows > 1 && e.grid;
            let k;
            P && e.grid.initSlides(m);
            const O = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter((e=>void 0 !== i.breakpoints[e].slidesPerView)).length > 0;
            for (let u = 0; u < m; u += 1) {
                let a;
                if (k = 0,
                p[u] && (a = p[u]),
                P && e.grid.updateSlide(u, a, m, t),
                !p[u] || "none" !== v(a, "display")) {
                    if ("auto" === i.slidesPerView) {
                        O && (p[u].style[t("width")] = "");
                        const r = getComputedStyle(a)
                            , n = a.style.transform
                            , l = a.style.webkitTransform;
                        if (n && (a.style.transform = "none"),
                        l && (a.style.webkitTransform = "none"),
                            i.roundLengths)
                            k = e.isHorizontal() ? w(a, "width", !0) : w(a, "height", !0);
                        else {
                            const e = s(r, "width")
                                , t = s(r, "padding-left")
                                , i = s(r, "padding-right")
                                , n = s(r, "margin-left")
                                , l = s(r, "margin-right")
                                , o = r.getPropertyValue("box-sizing");
                            if (o && "border-box" === o)
                                k = e + n + l;
                            else {
                                const {clientWidth: s, offsetWidth: r} = a;
                                k = e + t + i + n + l + (r - s)
                            }
                        }
                        n && (a.style.transform = n),
                        l && (a.style.webkitTransform = l),
                        i.roundLengths && (k = Math.floor(k))
                    } else
                        k = (n - (i.slidesPerView - 1) * E) / i.slidesPerView,
                        i.roundLengths && (k = Math.floor(k)),
                        p[u] && (p[u].style[t("width")] = `${k}px`);
                    p[u] && (p[u].swiperSlideSize = k),
                        b.push(k),
                        i.centeredSlides ? (C = C + k / 2 + M / 2 + E,
                        0 === M && 0 !== u && (C = C - n / 2 - E),
                        0 === u && (C = C - n / 2 - E),
                        Math.abs(C) < .001 && (C = 0),
                        i.roundLengths && (C = Math.floor(C)),
                        L % i.slidesPerGroup == 0 && h.push(C),
                            g.push(C)) : (i.roundLengths && (C = Math.floor(C)),
                        (L - Math.min(e.params.slidesPerGroupSkip, L)) % e.params.slidesPerGroup == 0 && h.push(C),
                            g.push(C),
                            C = C + k + E),
                        e.virtualSize += k + E,
                        M = k,
                        L += 1
                }
            }
            if (e.virtualSize = Math.max(e.virtualSize, n) + S,
            l && o && ("slide" === i.effect || "coverflow" === i.effect) && (a.style.width = `${e.virtualSize + E}px`),
            i.setWrapperSize && (a.style[t("width")] = `${e.virtualSize + E}px`),
            P && e.grid.updateWrapperSize(k, h, t),
                !i.centeredSlides) {
                const t = [];
                for (let s = 0; s < h.length; s += 1) {
                    let a = h[s];
                    i.roundLengths && (a = Math.floor(a)),
                    h[s] <= e.virtualSize - n && t.push(a)
                }
                h = t,
                Math.floor(e.virtualSize - n) - Math.floor(h[h.length - 1]) > 1 && h.push(e.virtualSize - n)
            }
            if (d && i.loop) {
                const t = b[0] + E;
                if (i.slidesPerGroup > 1) {
                    const s = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup)
                        , a = t * i.slidesPerGroup;
                    for (let e = 0; e < s; e += 1)
                        h.push(h[h.length - 1] + a)
                }
                for (let s = 0; s < e.virtual.slidesBefore + e.virtual.slidesAfter; s += 1)
                    1 === i.slidesPerGroup && h.push(h[h.length - 1] + t),
                        g.push(g[g.length - 1] + t),
                        e.virtualSize += t
            }
            if (0 === h.length && (h = [0]),
            0 !== E) {
                const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
                p.filter(((e,t)=>!(i.cssMode && !i.loop) || t !== p.length - 1)).forEach((e=>{
                        e.style[s] = `${E}px`
                    }
                ))
            }
            if (i.centeredSlides && i.centeredSlidesBounds) {
                let e = 0;
                b.forEach((t=>{
                        e += t + (E || 0)
                    }
                )),
                    e -= E;
                const t = e - n;
                h = h.map((e=>e <= 0 ? -y : e > t ? t + S : e))
            }
            if (i.centerInsufficientSlides) {
                let e = 0;
                if (b.forEach((t=>{
                        e += t + (E || 0)
                    }
                )),
                    e -= E,
                e < n) {
                    const t = (n - e) / 2;
                    h.forEach(((e,s)=>{
                            h[s] = e - t
                        }
                    )),
                        g.forEach(((e,s)=>{
                                g[s] = e + t
                            }
                        ))
                }
            }
            if (Object.assign(e, {
                slides: p,
                snapGrid: h,
                slidesGrid: g,
                slidesSizesGrid: b
            }),
            i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
                u(a, "--swiper-centered-offset-before", -h[0] + "px"),
                    u(a, "--swiper-centered-offset-after", e.size / 2 - b[b.length - 1] / 2 + "px");
                const t = -e.snapGrid[0]
                    , s = -e.slidesGrid[0];
                e.snapGrid = e.snapGrid.map((e=>e + t)),
                    e.slidesGrid = e.slidesGrid.map((e=>e + s))
            }
            if (m !== c && e.emit("slidesLengthChange"),
            h.length !== T && (e.params.watchOverflow && e.checkOverflow(),
                e.emit("snapGridLengthChange")),
            g.length !== x && e.emit("slidesGridLengthChange"),
            i.watchSlidesProgress && e.updateSlidesOffset(),
                !(d || i.cssMode || "slide" !== i.effect && "fade" !== i.effect)) {
                const t = `${i.containerModifierClass}backface-hidden`
                    , s = e.el.classList.contains(t);
                m <= i.maxBackfaceHiddenSlides ? s || e.el.classList.add(t) : s && e.el.classList.remove(t)
            }
        },
        updateAutoHeight: function(e) {
            const t = this
                , s = []
                , i = t.virtual && t.params.virtual.enabled;
            let a, r = 0;
            "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
            const n = e=>i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                if (t.params.centeredSlides)
                    (t.visibleSlides || []).forEach((e=>{
                            s.push(e)
                        }
                    ));
                else
                    for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
                        const e = t.activeIndex + a;
                        if (e > t.slides.length && !i)
                            break;
                        s.push(n(e))
                    }
            else
                s.push(n(t.activeIndex));
            for (a = 0; a < s.length; a += 1)
                if (void 0 !== s[a]) {
                    const e = s[a].offsetHeight;
                    r = e > r ? e : r
                }
            (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`)
        },
        updateSlidesOffset: function() {
            const e = this
                , t = e.slides
                , s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
            for (let i = 0; i < t.length; i += 1)
                t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment()
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            const t = this
                , s = t.params
                , {slides: i, rtlTranslate: a, snapGrid: r} = t;
            if (0 === i.length)
                return;
            void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
            let n = -e;
            a && (n = e),
                i.forEach((e=>{
                        e.classList.remove(s.slideVisibleClass)
                    }
                )),
                t.visibleSlidesIndexes = [],
                t.visibleSlides = [];
            let l = s.spaceBetween;
            "string" == typeof l && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * t.size : "string" == typeof l && (l = parseFloat(l));
            for (let o = 0; o < i.length; o += 1) {
                const e = i[o];
                let d = e.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
                const c = (n + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + l)
                    , p = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + l)
                    , u = -(n - d)
                    , m = u + t.slidesSizesGrid[o];
                (u >= 0 && u < t.size - 1 || m > 1 && m <= t.size || u <= 0 && m >= t.size) && (t.visibleSlides.push(e),
                    t.visibleSlidesIndexes.push(o),
                    i[o].classList.add(s.slideVisibleClass)),
                    e.progress = a ? -c : c,
                    e.originalProgress = a ? -p : p
            }
        },
        updateProgress: function(e) {
            const t = this;
            if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = t && t.translate && t.translate * s || 0
            }
            const s = t.params
                , i = t.maxTranslate() - t.minTranslate();
            let {progress: a, isBeginning: r, isEnd: n, progressLoop: l} = t;
            const o = r
                , d = n;
            if (0 === i)
                a = 0,
                    r = !0,
                    n = !0;
            else {
                a = (e - t.minTranslate()) / i;
                const s = Math.abs(e - t.minTranslate()) < 1
                    , l = Math.abs(e - t.maxTranslate()) < 1;
                r = s || a <= 0,
                    n = l || a >= 1,
                s && (a = 0),
                l && (a = 1)
            }
            if (s.loop) {
                const s = t.getSlideIndexByData(0)
                    , i = t.getSlideIndexByData(t.slides.length - 1)
                    , a = t.slidesGrid[s]
                    , r = t.slidesGrid[i]
                    , n = t.slidesGrid[t.slidesGrid.length - 1]
                    , o = Math.abs(e);
                l = o >= a ? (o - a) / n : (o + n - r) / n,
                l > 1 && (l -= 1)
            }
            Object.assign(t, {
                progress: a,
                progressLoop: l,
                isBeginning: r,
                isEnd: n
            }),
            (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e),
            r && !o && t.emit("reachBeginning toEdge"),
            n && !d && t.emit("reachEnd toEdge"),
            (o && !r || d && !n) && t.emit("fromEdge"),
                t.emit("progress", a)
        },
        updateSlidesClasses: function() {
            const e = this
                , {slides: t, params: s, slidesEl: i, activeIndex: a} = e
                , r = e.virtual && s.virtual.enabled
                , n = e=>f(i, `.${s.slideClass}${e}, swiper-slide ${e}`)[0];
            let l;
            if (t.forEach((e=>{
                    e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
                }
            )),
                r)
                if (s.loop) {
                    let t = a - e.virtual.slidesBefore;
                    t < 0 && (t = e.virtual.slides.length + t),
                    t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
                        l = n(`[data-swiper-slide-index="${t}"]`)
                } else
                    l = n(`[data-swiper-slide-index="${a}"]`);
            else
                l = t[a];
            if (l) {
                l.classList.add(s.slideActiveClass);
                let e = function(e, t) {
                    const s = [];
                    for (; e.nextElementSibling; ) {
                        const i = e.nextElementSibling;
                        t ? i.matches(t) && s.push(i) : s.push(i),
                            e = i
                    }
                    return s
                }(l, `.${s.slideClass}, swiper-slide`)[0];
                s.loop && !e && (e = t[0]),
                e && e.classList.add(s.slideNextClass);
                let i = function(e, t) {
                    const s = [];
                    for (; e.previousElementSibling; ) {
                        const i = e.previousElementSibling;
                        t ? i.matches(t) && s.push(i) : s.push(i),
                            e = i
                    }
                    return s
                }(l, `.${s.slideClass}, swiper-slide`)[0];
                s.loop && 0 === !i && (i = t[t.length - 1]),
                i && i.classList.add(s.slidePrevClass)
            }
            e.emitSlidesClasses()
        },
        updateActiveIndex: function(e) {
            const t = this
                , s = t.rtlTranslate ? t.translate : -t.translate
                , {snapGrid: i, params: a, activeIndex: r, realIndex: n, snapIndex: l} = t;
            let o, d = e;
            const c = e=>{
                    let s = e - t.virtual.slidesBefore;
                    return s < 0 && (s = t.virtual.slides.length + s),
                    s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
                        s
                }
            ;
            if (void 0 === d && (d = function(e) {
                const {slidesGrid: t, params: s} = e
                    , i = e.rtlTranslate ? e.translate : -e.translate;
                let a;
                for (let r = 0; r < t.length; r += 1)
                    void 0 !== t[r + 1] ? i >= t[r] && i < t[r + 1] - (t[r + 1] - t[r]) / 2 ? a = r : i >= t[r] && i < t[r + 1] && (a = r + 1) : i >= t[r] && (a = r);
                return s.normalizeSlideIndex && (a < 0 || void 0 === a) && (a = 0),
                    a
            }(t)),
            i.indexOf(s) >= 0)
                o = i.indexOf(s);
            else {
                const e = Math.min(a.slidesPerGroupSkip, d);
                o = e + Math.floor((d - e) / a.slidesPerGroup)
            }
            if (o >= i.length && (o = i.length - 1),
            d === r)
                return o !== l && (t.snapIndex = o,
                    t.emit("snapIndexChange")),
                    void (t.params.loop && t.virtual && t.params.virtual.enabled && (t.realIndex = c(d)));
            let p;
            p = t.virtual && a.virtual.enabled && a.loop ? c(d) : t.slides[d] ? parseInt(t.slides[d].getAttribute("data-swiper-slide-index") || d, 10) : d,
                Object.assign(t, {
                    previousSnapIndex: l,
                    snapIndex: o,
                    previousRealIndex: n,
                    realIndex: p,
                    previousIndex: r,
                    activeIndex: d
                }),
            t.initialized && P(t),
                t.emit("activeIndexChange"),
                t.emit("snapIndexChange"),
            n !== p && t.emit("realIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
        },
        updateClickedSlide: function(e) {
            const t = this
                , s = t.params
                , i = e.closest(`.${s.slideClass}, swiper-slide`);
            let a, r = !1;
            if (i)
                for (let n = 0; n < t.slides.length; n += 1)
                    if (t.slides[n] === i) {
                        r = !0,
                            a = n;
                        break
                    }
            if (!i || !r)
                return t.clickedSlide = void 0,
                    void (t.clickedIndex = void 0);
            t.clickedSlide = i,
                t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = a,
            s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    },
    translate: {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            const {params: t, rtlTranslate: s, translate: i, wrapperEl: a} = this;
            if (t.virtualTranslate)
                return s ? -i : i;
            if (t.cssMode)
                return i;
            let r = o(a, e);
            return r += this.cssOverflowAdjustment(),
            s && (r = -r),
            r || 0
        },
        setTranslate: function(e, t) {
            const s = this
                , {rtlTranslate: i, params: a, wrapperEl: r, progress: n} = s;
            let l, o = 0, d = 0;
            s.isHorizontal() ? o = i ? -e : e : d = e,
            a.roundLengths && (o = Math.floor(o),
                d = Math.floor(d)),
                s.previousTranslate = s.translate,
                s.translate = s.isHorizontal() ? o : d,
                a.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d : a.virtualTranslate || (s.isHorizontal() ? o -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(),
                    r.style.transform = `translate3d(${o}px, ${d}px, 0px)`);
            const c = s.maxTranslate() - s.minTranslate();
            l = 0 === c ? 0 : (e - s.minTranslate()) / c,
            l !== n && s.updateProgress(e),
                s.emit("setTranslate", s.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function(e, t, s, i, a) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            void 0 === i && (i = !0);
            const r = this
                , {params: n, wrapperEl: l} = r;
            if (r.animating && n.preventInteractionOnTransition)
                return !1;
            const o = r.minTranslate()
                , d = r.maxTranslate();
            let c;
            if (c = i && e > o ? o : i && e < d ? d : e,
                r.updateProgress(c),
                n.cssMode) {
                const e = r.isHorizontal();
                if (0 === t)
                    l[e ? "scrollLeft" : "scrollTop"] = -c;
                else {
                    if (!r.support.smoothScroll)
                        return m({
                            swiper: r,
                            targetPosition: -c,
                            side: e ? "left" : "top"
                        }),
                            !0;
                    l.scrollTo({
                        [e ? "left" : "top"]: -c,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return 0 === t ? (r.setTransition(0),
                r.setTranslate(c),
            s && (r.emit("beforeTransitionStart", t, a),
                r.emit("transitionEnd"))) : (r.setTransition(t),
                r.setTranslate(c),
            s && (r.emit("beforeTransitionStart", t, a),
                r.emit("transitionStart")),
            r.animating || (r.animating = !0,
            r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                    r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                        r.onTranslateToWrapperTransitionEnd = null,
                        delete r.onTranslateToWrapperTransitionEnd,
                    s && r.emit("transitionEnd"))
                }
            ),
                r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))),
                !0
        }
    },
    transition: {
        setTransition: function(e, t) {
            const s = this;
            s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`),
                s.emit("setTransition", e, t)
        },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            const s = this
                , {params: i} = s;
            i.cssMode || (i.autoHeight && s.updateAutoHeight(),
                k({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "Start"
                }))
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            const s = this
                , {params: i} = s;
            s.animating = !1,
            i.cssMode || (s.setTransition(0),
                k({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "End"
                }))
        }
    },
    slide: {
        slideTo: function(e, t, s, i, a) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            "string" == typeof e && (e = parseInt(e, 10));
            const r = this;
            let n = e;
            n < 0 && (n = 0);
            const {params: l, snapGrid: o, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: u, wrapperEl: f, enabled: h} = r;
            if (r.animating && l.preventInteractionOnTransition || !h && !i && !a)
                return !1;
            const v = Math.min(r.params.slidesPerGroupSkip, n);
            let g = v + Math.floor((n - v) / r.params.slidesPerGroup);
            g >= o.length && (g = o.length - 1);
            const b = -o[g];
            if (l.normalizeSlideIndex)
                for (let m = 0; m < d.length; m += 1) {
                    const e = -Math.floor(100 * b)
                        , t = Math.floor(100 * d[m])
                        , s = Math.floor(100 * d[m + 1]);
                    void 0 !== d[m + 1] ? e >= t && e < s - (s - t) / 2 ? n = m : e >= t && e < s && (n = m + 1) : e >= t && (n = m)
                }
            if (r.initialized && n !== p) {
                if (!r.allowSlideNext && (u ? b > r.translate && b > r.minTranslate() : b < r.translate && b < r.minTranslate()))
                    return !1;
                if (!r.allowSlidePrev && b > r.translate && b > r.maxTranslate() && (p || 0) !== n)
                    return !1
            }
            let w;
            if (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"),
                r.updateProgress(b),
                w = n > p ? "next" : n < p ? "prev" : "reset",
            u && -b === r.translate || !u && b === r.translate)
                return r.updateActiveIndex(n),
                l.autoHeight && r.updateAutoHeight(),
                    r.updateSlidesClasses(),
                "slide" !== l.effect && r.setTranslate(b),
                "reset" !== w && (r.transitionStart(s, w),
                    r.transitionEnd(s, w)),
                    !1;
            if (l.cssMode) {
                const e = r.isHorizontal()
                    , s = u ? b : -b;
                if (0 === t) {
                    const t = r.virtual && r.params.virtual.enabled;
                    t && (r.wrapperEl.style.scrollSnapType = "none",
                        r._immediateVirtual = !0),
                        t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0,
                            requestAnimationFrame((()=>{
                                    f[e ? "scrollLeft" : "scrollTop"] = s
                                }
                            ))) : f[e ? "scrollLeft" : "scrollTop"] = s,
                    t && requestAnimationFrame((()=>{
                            r.wrapperEl.style.scrollSnapType = "",
                                r._immediateVirtual = !1
                        }
                    ))
                } else {
                    if (!r.support.smoothScroll)
                        return m({
                            swiper: r,
                            targetPosition: s,
                            side: e ? "left" : "top"
                        }),
                            !0;
                    f.scrollTo({
                        [e ? "left" : "top"]: s,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return r.setTransition(t),
                r.setTranslate(b),
                r.updateActiveIndex(n),
                r.updateSlidesClasses(),
                r.emit("beforeTransitionStart", t, i),
                r.transitionStart(s, w),
                0 === t ? r.transitionEnd(s, w) : r.animating || (r.animating = !0,
                r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                            r.onSlideToWrapperTransitionEnd = null,
                            delete r.onSlideToWrapperTransitionEnd,
                            r.transitionEnd(s, w))
                    }
                ),
                    r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)),
                !0
        },
        slideToLoop: function(e, t, s, i) {
            if (void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            "string" == typeof e) {
                e = parseInt(e, 10)
            }
            const a = this;
            let r = e;
            return a.params.loop && (a.virtual && a.params.virtual.enabled ? r += a.virtual.slidesBefore : r = a.getSlideIndexByData(r)),
                a.slideTo(r, t, s, i)
        },
        slideNext: function(e, t, s) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            const i = this
                , {enabled: a, params: r, animating: n} = i;
            if (!a)
                return i;
            let l = r.slidesPerGroup;
            "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
            const o = i.activeIndex < r.slidesPerGroupSkip ? 1 : l
                , d = i.virtual && r.virtual.enabled;
            if (r.loop) {
                if (n && !d && r.loopPreventsSliding)
                    return !1;
                i.loopFix({
                    direction: "next"
                }),
                    i._clientLeft = i.wrapperEl.clientLeft
            }
            return r.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + o, e, t, s)
        },
        slidePrev: function(e, t, s) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            const i = this
                , {params: a, snapGrid: r, slidesGrid: n, rtlTranslate: l, enabled: o, animating: d} = i;
            if (!o)
                return i;
            const c = i.virtual && a.virtual.enabled;
            if (a.loop) {
                if (d && !c && a.loopPreventsSliding)
                    return !1;
                i.loopFix({
                    direction: "prev"
                }),
                    i._clientLeft = i.wrapperEl.clientLeft
            }
            function p(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            const u = p(l ? i.translate : -i.translate)
                , m = r.map((e=>p(e)));
            let f = r[m.indexOf(u) - 1];
            if (void 0 === f && a.cssMode) {
                let e;
                r.forEach(((t,s)=>{
                        u >= t && (e = s)
                    }
                )),
                void 0 !== e && (f = r[e > 0 ? e - 1 : e])
            }
            let h = 0;
            if (void 0 !== f && (h = n.indexOf(f),
            h < 0 && (h = i.activeIndex - 1),
            "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (h = h - i.slidesPerViewDynamic("previous", !0) + 1,
                h = Math.max(h, 0))),
            a.rewind && i.isBeginning) {
                const a = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                return i.slideTo(a, e, t, s)
            }
            return i.slideTo(h, e, t, s)
        },
        slideReset: function(e, t, s) {
            return void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
                this.slideTo(this.activeIndex, e, t, s)
        },
        slideToClosest: function(e, t, s, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === i && (i = .5);
            const a = this;
            let r = a.activeIndex;
            const n = Math.min(a.params.slidesPerGroupSkip, r)
                , l = n + Math.floor((r - n) / a.params.slidesPerGroup)
                , o = a.rtlTranslate ? a.translate : -a.translate;
            if (o >= a.snapGrid[l]) {
                const e = a.snapGrid[l];
                o - e > (a.snapGrid[l + 1] - e) * i && (r += a.params.slidesPerGroup)
            } else {
                const e = a.snapGrid[l - 1];
                o - e <= (a.snapGrid[l] - e) * i && (r -= a.params.slidesPerGroup)
            }
            return r = Math.max(r, 0),
                r = Math.min(r, a.slidesGrid.length - 1),
                a.slideTo(r, e, t, s)
        },
        slideToClickedSlide: function() {
            const e = this
                , {params: t, slidesEl: s} = e
                , i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let a, r = e.clickedIndex;
            const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
            if (t.loop) {
                if (e.animating)
                    return;
                a = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
                    t.centeredSlides ? r < e.loopedSlides - i / 2 || r > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(),
                        r = e.getSlideIndex(f(s, `${l}[data-swiper-slide-index="${a}"]`)[0]),
                        n((()=>{
                                e.slideTo(r)
                            }
                        ))) : e.slideTo(r) : r > e.slides.length - i ? (e.loopFix(),
                        r = e.getSlideIndex(f(s, `${l}[data-swiper-slide-index="${a}"]`)[0]),
                        n((()=>{
                                e.slideTo(r)
                            }
                        ))) : e.slideTo(r)
            } else
                e.slideTo(r)
        }
    },
    loop: {
        loopCreate: function(e) {
            const t = this
                , {params: s, slidesEl: i} = t;
            if (!s.loop || t.virtual && t.params.virtual.enabled)
                return;
            f(i, `.${s.slideClass}, swiper-slide`).forEach(((e,t)=>{
                    e.setAttribute("data-swiper-slide-index", t)
                }
            )),
                t.loopFix({
                    slideRealIndex: e,
                    direction: s.centeredSlides ? void 0 : "next"
                })
        },
        loopFix: function(e) {
            let {slideRealIndex: t, slideTo: s=!0, direction: i, setTranslate: a, activeSlideIndex: r, byController: n, byMousewheel: l} = void 0 === e ? {} : e;
            const o = this;
            if (!o.params.loop)
                return;
            o.emit("beforeLoopFix");
            const {slides: d, allowSlidePrev: c, allowSlideNext: p, slidesEl: u, params: m} = o;
            if (o.allowSlidePrev = !0,
                o.allowSlideNext = !0,
            o.virtual && m.virtual.enabled)
                return s && (m.centeredSlides || 0 !== o.snapIndex ? m.centeredSlides && o.snapIndex < m.slidesPerView ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0) : o.snapIndex === o.snapGrid.length - 1 && o.slideTo(o.virtual.slidesBefore, 0, !1, !0) : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
                    o.allowSlidePrev = c,
                    o.allowSlideNext = p,
                    void o.emit("loopFix");
            const f = "auto" === m.slidesPerView ? o.slidesPerViewDynamic() : Math.ceil(parseFloat(m.slidesPerView, 10));
            let h = m.loopedSlides || f;
            h % m.slidesPerGroup != 0 && (h += m.slidesPerGroup - h % m.slidesPerGroup),
                o.loopedSlides = h;
            const v = []
                , g = [];
            let b = o.activeIndex;
            void 0 === r ? r = o.getSlideIndex(o.slides.filter((e=>e.classList.contains(m.slideActiveClass)))[0]) : b = r;
            const w = "next" === i || !i
                , y = "prev" === i || !i;
            let S = 0
                , T = 0;
            if (r < h) {
                S = Math.max(h - r, m.slidesPerGroup);
                for (let e = 0; e < h - r; e += 1) {
                    const t = e - Math.floor(e / d.length) * d.length;
                    v.push(d.length - t - 1)
                }
            } else if (r > o.slides.length - 2 * h) {
                T = Math.max(r - (o.slides.length - 2 * h), m.slidesPerGroup);
                for (let e = 0; e < T; e += 1) {
                    const t = e - Math.floor(e / d.length) * d.length;
                    g.push(t)
                }
            }
            if (y && v.forEach((e=>{
                    o.slides[e].swiperLoopMoveDOM = !0,
                        u.prepend(o.slides[e]),
                        o.slides[e].swiperLoopMoveDOM = !1
                }
            )),
            w && g.forEach((e=>{
                    o.slides[e].swiperLoopMoveDOM = !0,
                        u.append(o.slides[e]),
                        o.slides[e].swiperLoopMoveDOM = !1
                }
            )),
                o.recalcSlides(),
            "auto" === m.slidesPerView && o.updateSlides(),
            m.watchSlidesProgress && o.updateSlidesOffset(),
                s)
                if (v.length > 0 && y)
                    if (void 0 === t) {
                        const e = o.slidesGrid[b]
                            , t = o.slidesGrid[b + S] - e;
                        l ? o.setTranslate(o.translate - t) : (o.slideTo(b + S, 0, !1, !0),
                        a && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t))
                    } else
                        a && o.slideToLoop(t, 0, !1, !0);
                else if (g.length > 0 && w)
                    if (void 0 === t) {
                        const e = o.slidesGrid[b]
                            , t = o.slidesGrid[b - T] - e;
                        l ? o.setTranslate(o.translate - t) : (o.slideTo(b - T, 0, !1, !0),
                        a && (o.touches[o.isHorizontal() ? "startX" : "startY"] += t))
                    } else
                        o.slideToLoop(t, 0, !1, !0);
            if (o.allowSlidePrev = c,
                o.allowSlideNext = p,
            o.controller && o.controller.control && !n) {
                const e = {
                    slideRealIndex: t,
                    slideTo: !1,
                    direction: i,
                    setTranslate: a,
                    activeSlideIndex: r,
                    byController: !0
                };
                Array.isArray(o.controller.control) ? o.controller.control.forEach((t=>{
                        !t.destroyed && t.params.loop && t.loopFix(e)
                    }
                )) : o.controller.control instanceof o.constructor && o.controller.control.params.loop && o.controller.control.loopFix(e)
            }
            o.emit("loopFix")
        },
        loopDestroy: function() {
            const e = this
                , {params: t, slidesEl: s} = e;
            if (!t.loop || e.virtual && e.params.virtual.enabled)
                return;
            e.recalcSlides();
            const i = [];
            e.slides.forEach((e=>{
                    const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
                    i[t] = e
                }
            )),
                e.slides.forEach((e=>{
                        e.removeAttribute("data-swiper-slide-index")
                    }
                )),
                i.forEach((e=>{
                        s.append(e)
                    }
                )),
                e.recalcSlides(),
                e.slideTo(e.realIndex, 0)
        }
    },
    grabCursor: {
        setGrabCursor: function(e) {
            const t = this;
            if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
                return;
            const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            t.isElement && (t.__preventObserver__ = !0),
                s.style.cursor = "move",
                s.style.cursor = e ? "grabbing" : "grab",
            t.isElement && requestAnimationFrame((()=>{
                    t.__preventObserver__ = !1
                }
            ))
        },
        unsetGrabCursor: function() {
            const e = this;
            e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0),
                e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "",
            e.isElement && requestAnimationFrame((()=>{
                    e.__preventObserver__ = !1
                }
            )))
        }
    },
    events: {
        attachEvents: function() {
            const e = this
                , t = i()
                , {params: s} = e;
            e.onTouchStart = O.bind(e),
                e.onTouchMove = I.bind(e),
                e.onTouchEnd = A.bind(e),
            s.cssMode && (e.onScroll = D.bind(e)),
                e.onClick = G.bind(e),
                e.onLoad = $.bind(e),
            _ || (t.addEventListener("touchstart", B),
                _ = !0),
                F(e, "on")
        },
        detachEvents: function() {
            F(this, "off")
        }
    },
    breakpoints: {
        setBreakpoint: function() {
            const e = this
                , {realIndex: t, initialized: s, params: i, el: a} = e
                , r = i.breakpoints;
            if (!r || r && 0 === Object.keys(r).length)
                return;
            const n = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
            if (!n || e.currentBreakpoint === n)
                return;
            const l = (n in r ? r[n] : void 0) || e.originalParams
                , o = N(e, i)
                , d = N(e, l)
                , c = i.enabled;
            o && !d ? (a.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()) : !o && d && (a.classList.add(`${i.containerModifierClass}grid`),
            (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === i.grid.fill) && a.classList.add(`${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()),
                ["navigation", "pagination", "scrollbar"].forEach((t=>{
                        if (void 0 === l[t])
                            return;
                        const s = i[t] && i[t].enabled
                            , a = l[t] && l[t].enabled;
                        s && !a && e[t].disable(),
                        !s && a && e[t].enable()
                    }
                ));
            const u = l.direction && l.direction !== i.direction
                , m = i.loop && (l.slidesPerView !== i.slidesPerView || u);
            u && s && e.changeDirection(),
                p(e.params, l);
            const f = e.params.enabled;
            Object.assign(e, {
                allowTouchMove: e.params.allowTouchMove,
                allowSlideNext: e.params.allowSlideNext,
                allowSlidePrev: e.params.allowSlidePrev
            }),
                c && !f ? e.disable() : !c && f && e.enable(),
                e.currentBreakpoint = n,
                e.emit("_beforeBreakpoint", l),
            m && s && (e.loopDestroy(),
                e.loopCreate(t),
                e.updateSlides()),
                e.emit("breakpoint", l)
        },
        getBreakpoint: function(e, t, s) {
            if (void 0 === t && (t = "window"),
            !e || "container" === t && !s)
                return;
            let i = !1;
            const a = r()
                , n = "window" === t ? a.innerHeight : s.clientHeight
                , l = Object.keys(e).map((e=>{
                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                        const t = parseFloat(e.substr(1));
                        return {
                            value: n * t,
                            point: e
                        }
                    }
                    return {
                        value: e,
                        point: e
                    }
                }
            ));
            l.sort(((e,t)=>parseInt(e.value, 10) - parseInt(t.value, 10)));
            for (let r = 0; r < l.length; r += 1) {
                const {point: e, value: n} = l[r];
                "window" === t ? a.matchMedia(`(min-width: ${n}px)`).matches && (i = e) : n <= s.clientWidth && (i = e)
            }
            return i || "max"
        }
    },
    checkOverflow: {
        checkOverflow: function() {
            const e = this
                , {isLocked: t, params: s} = e
                , {slidesOffsetBefore: i} = s;
            if (i) {
                const t = e.slides.length - 1
                    , s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                e.isLocked = e.size > s
            } else
                e.isLocked = 1 === e.snapGrid.length;
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
        }
    },
    classes: {
        addClasses: function() {
            const e = this
                , {classNames: t, params: s, rtl: i, el: a, device: r} = e
                , n = function(e, t) {
                const s = [];
                return e.forEach((e=>{
                        "object" == typeof e ? Object.keys(e).forEach((i=>{
                                e[i] && s.push(t + i)
                            }
                        )) : "string" == typeof e && s.push(t + e)
                    }
                )),
                    s
            }(["initialized", s.direction, {
                "free-mode": e.params.freeMode && s.freeMode.enabled
            }, {
                autoheight: s.autoHeight
            }, {
                rtl: i
            }, {
                grid: s.grid && s.grid.rows > 1
            }, {
                "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
            }, {
                android: r.android
            }, {
                ios: r.ios
            }, {
                "css-mode": s.cssMode
            }, {
                centered: s.cssMode && s.centeredSlides
            }, {
                "watch-progress": s.watchSlidesProgress
            }], s.containerModifierClass);
            t.push(...n),
                a.classList.add(...t),
                e.emitContainerClasses()
        },
        removeClasses: function() {
            const {el: e, classNames: t} = this;
            e.classList.remove(...t),
                this.emitContainerClasses()
        }
    }
}
    , R = {};
class q {
    constructor() {
        let e, t;
        for (var s = arguments.length, a = new Array(s), r = 0; r < s; r++)
            a[r] = arguments[r];
        1 === a.length && a[0].constructor && "Object" === Object.prototype.toString.call(a[0]).slice(8, -1) ? t = a[0] : [e,t] = a,
        t || (t = {}),
            t = p({}, t),
        e && !t.el && (t.el = e);
        const n = i();
        if (t.el && "string" == typeof t.el && n.querySelectorAll(t.el).length > 1) {
            const e = [];
            return n.querySelectorAll(t.el).forEach((s=>{
                    const i = p({}, t, {
                        el: s
                    });
                    e.push(new q(i))
                }
            )),
                e
        }
        const l = this;
        l.__swiper__ = !0,
            l.support = x(),
            l.device = E({
                userAgent: t.userAgent
            }),
            l.browser = C(),
            l.eventsListeners = {},
            l.eventsAnyListeners = [],
            l.modules = [...l.__modules__],
        t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
        const o = {};
        l.modules.forEach((e=>{
                e({
                    params: t,
                    swiper: l,
                    extendParams: V(t, o),
                    on: l.on.bind(l),
                    once: l.once.bind(l),
                    off: l.off.bind(l),
                    emit: l.emit.bind(l)
                })
            }
        ));
        const d = p({}, H, o);
        return l.params = p({}, d, R, t),
            l.originalParams = p({}, l.params),
            l.passedParams = p({}, t),
        l.params && l.params.on && Object.keys(l.params.on).forEach((e=>{
                l.on(e, l.params.on[e])
            }
        )),
        l.params && l.params.onAny && l.onAny(l.params.onAny),
            Object.assign(l, {
                enabled: l.params.enabled,
                el: e,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: ()=>"horizontal" === l.params.direction,
                isVertical: ()=>"vertical" === l.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
                },
                allowSlideNext: l.params.allowSlideNext,
                allowSlidePrev: l.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: l.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    evCache: []
                },
                allowClick: !0,
                allowTouchMove: l.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            l.emit("_swiper"),
        l.params.init && l.init(),
            l
    }
    getSlideIndex(e) {
        const {slidesEl: t, params: s} = this
            , i = g(f(t, `.${s.slideClass}, swiper-slide`)[0]);
        return g(e) - i
    }
    getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.filter((t=>1 * t.getAttribute("data-swiper-slide-index") === e))[0])
    }
    recalcSlides() {
        const {slidesEl: e, params: t} = this;
        this.slides = f(e, `.${t.slideClass}, swiper-slide`)
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0,
        e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
    }
    disable() {
        const e = this;
        e.enabled && (e.enabled = !1,
        e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
    }
    setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = s.minTranslate()
            , a = (s.maxTranslate() - i) * e + i;
        s.translateTo(a, void 0 === t ? 0 : t),
            s.updateActiveIndex(),
            s.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = e.el.className.split(" ").filter((t=>0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
        e.emit("_containerClasses", t.join(" "))
    }
    getSlideClasses(e) {
        const t = this;
        return t.destroyed ? "" : e.className.split(" ").filter((e=>0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = [];
        e.slides.forEach((s=>{
                const i = e.getSlideClasses(s);
                t.push({
                    slideEl: s,
                    classNames: i
                }),
                    e.emit("_slideClass", s, i)
            }
        )),
            e.emit("_slideClasses", t)
    }
    slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"),
        void 0 === t && (t = !1);
        const {params: s, slides: i, slidesGrid: a, slidesSizesGrid: r, size: n, activeIndex: l} = this;
        let o = 1;
        if (s.centeredSlides) {
            let e, t = i[l] ? i[l].swiperSlideSize : 0;
            for (let s = l + 1; s < i.length; s += 1)
                i[s] && !e && (t += i[s].swiperSlideSize,
                    o += 1,
                t > n && (e = !0));
            for (let s = l - 1; s >= 0; s -= 1)
                i[s] && !e && (t += i[s].swiperSlideSize,
                    o += 1,
                t > n && (e = !0))
        } else if ("current" === e)
            for (let d = l + 1; d < i.length; d += 1) {
                (t ? a[d] + r[d] - a[l] < n : a[d] - a[l] < n) && (o += 1)
            }
        else
            for (let d = l - 1; d >= 0; d -= 1) {
                a[l] - a[d] < n && (o += 1)
            }
        return o
    }
    update() {
        const e = this;
        if (!e || e.destroyed)
            return;
        const {snapGrid: t, params: s} = e;
        function i() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate
                , s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(s),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
        }
        let a;
        if (s.breakpoints && e.setBreakpoint(),
            [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t=>{
                    t.complete && M(e, t)
                }
            )),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
            i(),
            s.autoHeight && e.updateAutoHeight();
        else {
            if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
                const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
                a = e.slideTo(t.length - 1, 0, !1, !0)
            } else
                a = e.slideTo(e.activeIndex, 0, !1, !0);
            a || i()
        }
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update")
    }
    changeDirection(e, t) {
        void 0 === t && (t = !0);
        const s = this
            , i = s.params.direction;
        return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
            s.el.classList.add(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            s.params.direction = e,
            s.slides.forEach((t=>{
                    "vertical" === e ? t.style.width = "" : t.style.height = ""
                }
            )),
            s.emit("changeDirection"),
        t && s.update()),
            s
    }
    changeLanguageDirection(e) {
        const t = this;
        t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e,
            t.rtlTranslate = "horizontal" === t.params.direction && t.rtl,
            t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
                t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
                t.el.dir = "ltr"),
            t.update())
    }
    mount(e) {
        const t = this;
        if (t.mounted)
            return !0;
        let s = e || t.params.el;
        if ("string" == typeof s && (s = document.querySelector(s)),
            !s)
            return !1;
        s.swiper = t,
        s.parentNode && s.parentNode.host && (t.isElement = !0);
        const i = ()=>`.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let a = (()=>{
                if (s && s.shadowRoot && s.shadowRoot.querySelector) {
                    return s.shadowRoot.querySelector(i())
                }
                return f(s, i())[0]
            }
        )();
        return !a && t.params.createElements && (a = h("div", t.params.wrapperClass),
            s.append(a),
            f(s, `.${t.params.slideClass}`).forEach((e=>{
                    a.append(e)
                }
            ))),
            Object.assign(t, {
                el: s,
                wrapperEl: a,
                slidesEl: t.isElement ? s.parentNode.host : a,
                hostEl: t.isElement ? s.parentNode.host : s,
                mounted: !0,
                rtl: "rtl" === s.dir.toLowerCase() || "rtl" === v(s, "direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === v(s, "direction")),
                wrongRTL: "-webkit-box" === v(a, "display")
            }),
            !0
    }
    init(e) {
        const t = this;
        if (t.initialized)
            return t;
        return !1 === t.mount(e) || (t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
        t.params.loop && t.loopCreate(),
            t.attachEvents(),
            [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e=>{
                    e.complete ? M(t, e) : e.addEventListener("load", (e=>{
                            M(t, e.target)
                        }
                    ))
                }
            )),
            P(t),
            t.initialized = !0,
            P(t),
            t.emit("init"),
            t.emit("afterInit")),
            t
    }
    destroy(e, t) {
        void 0 === e && (e = !0),
        void 0 === t && (t = !0);
        const s = this
            , {params: i, el: a, wrapperEl: r, slides: n} = s;
        return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"),
            s.initialized = !1,
            s.detachEvents(),
        i.loop && s.loopDestroy(),
        t && (s.removeClasses(),
            a.removeAttribute("style"),
            r.removeAttribute("style"),
        n && n.length && n.forEach((e=>{
                e.classList.remove(i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass),
                    e.removeAttribute("style"),
                    e.removeAttribute("data-swiper-slide-index")
            }
        ))),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e=>{
                    s.off(e)
                }
            )),
        !1 !== e && (s.el.swiper = null,
            function(e) {
                const t = e;
                Object.keys(t).forEach((e=>{
                        try {
                            t[e] = null
                        } catch (s) {}
                        try {
                            delete t[e]
                        } catch (s) {}
                    }
                ))
            }(s)),
            s.destroyed = !0),
            null
    }
    static extendDefaults(e) {
        p(R, e)
    }
    static get extendedDefaults() {
        return R
    }
    static get defaults() {
        return H
    }
    static installModule(e) {
        q.prototype.__modules__ || (q.prototype.__modules__ = []);
        const t = q.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach((e=>q.installModule(e))),
            q) : (q.installModule(e),
            q)
    }
}
function W(e, t, s, i) {
    return e.params.createElements && Object.keys(i).forEach((a=>{
            if (!s[a] && !0 === s.auto) {
                let r = f(e.el, `.${i[a]}`)[0];
                r || (r = h("div", i[a]),
                    r.className = i[a],
                    e.el.append(r)),
                    s[a] = r,
                    t[a] = r
            }
        }
    )),
        s
}
function X(e) {
    let {swiper: t, extendParams: s, on: i, emit: a} = e;
    s({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }),
        t.navigation = {
            nextEl: null,
            prevEl: null
        };
    const r = e=>(Array.isArray(e) || (e = [e].filter((e=>!!e))),
        e);
    function n(e) {
        let s;
        return e && "string" == typeof e && t.isElement && (s = t.el.querySelector(e),
            s) ? s : (e && ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
        t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.el.querySelectorAll(e).length && (s = t.el.querySelector(e))),
            e && !s ? e : s)
    }
    function l(e, s) {
        const i = t.params.navigation;
        (e = r(e)).forEach((e=>{
                e && (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
                "BUTTON" === e.tagName && (e.disabled = s),
                t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](i.lockClass))
            }
        ))
    }
    function o() {
        const {nextEl: e, prevEl: s} = t.navigation;
        if (t.params.loop)
            return l(s, !1),
                void l(e, !1);
        l(s, t.isBeginning && !t.params.rewind),
            l(e, t.isEnd && !t.params.rewind)
    }
    function d(e) {
        e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(),
            a("navigationPrev"))
    }
    function c(e) {
        e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(),
            a("navigationNext"))
    }
    function p() {
        const e = t.params.navigation;
        if (t.params.navigation = W(t, t.originalParams.navigation, t.params.navigation, {
            nextEl: "swiper-button-next",
            prevEl: "swiper-button-prev"
        }),
        !e.nextEl && !e.prevEl)
            return;
        let s = n(e.nextEl)
            , i = n(e.prevEl);
        Object.assign(t.navigation, {
            nextEl: s,
            prevEl: i
        }),
            s = r(s),
            i = r(i);
        const a = (s,i)=>{
                s && s.addEventListener("click", "next" === i ? c : d),
                !t.enabled && s && s.classList.add(...e.lockClass.split(" "))
            }
        ;
        s.forEach((e=>a(e, "next"))),
            i.forEach((e=>a(e, "prev")))
    }
    function u() {
        let {nextEl: e, prevEl: s} = t.navigation;
        e = r(e),
            s = r(s);
        const i = (e,s)=>{
                e.removeEventListener("click", "next" === s ? c : d),
                    e.classList.remove(...t.params.navigation.disabledClass.split(" "))
            }
        ;
        e.forEach((e=>i(e, "next"))),
            s.forEach((e=>i(e, "prev")))
    }
    i("init", (()=>{
            !1 === t.params.navigation.enabled ? m() : (p(),
                o())
        }
    )),
        i("toEdge fromEdge lock unlock", (()=>{
                o()
            }
        )),
        i("destroy", (()=>{
                u()
            }
        )),
        i("enable disable", (()=>{
                let {nextEl: e, prevEl: s} = t.navigation;
                e = r(e),
                    s = r(s),
                    [...e, ...s].filter((e=>!!e)).forEach((e=>e.classList[t.enabled ? "remove" : "add"](t.params.navigation.lockClass)))
            }
        )),
        i("click", ((e,s)=>{
                let {nextEl: i, prevEl: n} = t.navigation;
                i = r(i),
                    n = r(n);
                const l = s.target;
                if (t.params.navigation.hideOnClick && !n.includes(l) && !i.includes(l)) {
                    if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === l || t.pagination.el.contains(l)))
                        return;
                    let e;
                    i.length ? e = i[0].classList.contains(t.params.navigation.hiddenClass) : n.length && (e = n[0].classList.contains(t.params.navigation.hiddenClass)),
                        a(!0 === e ? "navigationShow" : "navigationHide"),
                        [...i, ...n].filter((e=>!!e)).forEach((e=>e.classList.toggle(t.params.navigation.hiddenClass)))
                }
            }
        ));
    const m = ()=>{
            t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")),
                u()
        }
    ;
    Object.assign(t.navigation, {
        enable: ()=>{
            t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")),
                p(),
                o()
        }
        ,
        disable: m,
        update: o,
        init: p,
        destroy: u
    })
}
function Y(e) {
    return void 0 === e && (e = ""),
        `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`
}
function U(e) {
    let {swiper: t, extendParams: s, on: i, emit: a} = e;
    const r = "swiper-pagination";
    let n;
    s({
        pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: e=>e,
            formatFractionTotal: e=>e,
            bulletClass: `${r}-bullet`,
            bulletActiveClass: `${r}-bullet-active`,
            modifierClass: `${r}-`,
            currentClass: `${r}-current`,
            totalClass: `${r}-total`,
            hiddenClass: `${r}-hidden`,
            progressbarFillClass: `${r}-progressbar-fill`,
            progressbarOppositeClass: `${r}-progressbar-opposite`,
            clickableClass: `${r}-clickable`,
            lockClass: `${r}-lock`,
            horizontalClass: `${r}-horizontal`,
            verticalClass: `${r}-vertical`,
            paginationDisabledClass: `${r}-disabled`
        }
    }),
        t.pagination = {
            el: null,
            bullets: []
        };
    let l = 0;
    const o = e=>(Array.isArray(e) || (e = [e].filter((e=>!!e))),
        e);
    function d() {
        return !t.params.pagination.el || !t.pagination.el || Array.isArray(t.pagination.el) && 0 === t.pagination.el.length
    }
    function c(e, s) {
        const {bulletActiveClass: i} = t.params.pagination;
        e && (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${i}-${s}`),
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${i}-${s}-${s}`))
    }
    function p(e) {
        const s = e.target.closest(Y(t.params.pagination.bulletClass));
        if (!s)
            return;
        e.preventDefault();
        const i = g(s) * t.params.slidesPerGroup;
        if (t.params.loop) {
            if (t.realIndex === i)
                return;
            const e = t.getSlideIndexByData(i)
                , s = t.getSlideIndexByData(t.realIndex);
            e > t.slides.length - t.loopedSlides && t.loopFix({
                direction: e > s ? "next" : "prev",
                activeSlideIndex: e,
                slideTo: !1
            }),
                t.slideToLoop(i)
        } else
            t.slideTo(i)
    }
    function u() {
        const e = t.rtl
            , s = t.params.pagination;
        if (d())
            return;
        let i, r, p = t.pagination.el;
        p = o(p);
        const u = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length
            , m = t.params.loop ? Math.ceil(u / t.params.slidesPerGroup) : t.snapGrid.length;
        if (t.params.loop ? (r = t.previousRealIndex || 0,
            i = t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex) : void 0 !== t.snapIndex ? (i = t.snapIndex,
            r = t.previousSnapIndex) : (r = t.previousIndex || 0,
            i = t.activeIndex || 0),
        "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
            const a = t.pagination.bullets;
            let o, d, u;
            if (s.dynamicBullets && (n = w(a[0], t.isHorizontal() ? "width" : "height", !0),
                p.forEach((e=>{
                        e.style[t.isHorizontal() ? "width" : "height"] = n * (s.dynamicMainBullets + 4) + "px"
                    }
                )),
            s.dynamicMainBullets > 1 && void 0 !== r && (l += i - (r || 0),
                l > s.dynamicMainBullets - 1 ? l = s.dynamicMainBullets - 1 : l < 0 && (l = 0)),
                o = Math.max(i - l, 0),
                d = o + (Math.min(a.length, s.dynamicMainBullets) - 1),
                u = (d + o) / 2),
                a.forEach((e=>{
                        const t = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e=>`${s.bulletActiveClass}${e}`))].map((e=>"string" == typeof e && e.includes(" ") ? e.split(" ") : e)).flat();
                        e.classList.remove(...t)
                    }
                )),
            p.length > 1)
                a.forEach((e=>{
                        const a = g(e);
                        a === i ? e.classList.add(...s.bulletActiveClass.split(" ")) : t.isElement && e.setAttribute("part", "bullet"),
                        s.dynamicBullets && (a >= o && a <= d && e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                        a === o && c(e, "prev"),
                        a === d && c(e, "next"))
                    }
                ));
            else {
                const e = a[i];
                if (e && e.classList.add(...s.bulletActiveClass.split(" ")),
                t.isElement && a.forEach(((e,t)=>{
                        e.setAttribute("part", t === i ? "bullet-active" : "bullet")
                    }
                )),
                    s.dynamicBullets) {
                    const e = a[o]
                        , t = a[d];
                    for (let i = o; i <= d; i += 1)
                        a[i] && a[i].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
                    c(e, "prev"),
                        c(t, "next")
                }
            }
            if (s.dynamicBullets) {
                const i = Math.min(a.length, s.dynamicMainBullets + 4)
                    , r = (n * i - n) / 2 - u * n
                    , l = e ? "right" : "left";
                a.forEach((e=>{
                        e.style[t.isHorizontal() ? l : "top"] = `${r}px`
                    }
                ))
            }
        }
        p.forEach(((e,r)=>{
                if ("fraction" === s.type && (e.querySelectorAll(Y(s.currentClass)).forEach((e=>{
                        e.textContent = s.formatFractionCurrent(i + 1)
                    }
                )),
                    e.querySelectorAll(Y(s.totalClass)).forEach((e=>{
                            e.textContent = s.formatFractionTotal(m)
                        }
                    ))),
                "progressbar" === s.type) {
                    let a;
                    a = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
                    const r = (i + 1) / m;
                    let n = 1
                        , l = 1;
                    "horizontal" === a ? n = r : l = r,
                        e.querySelectorAll(Y(s.progressbarFillClass)).forEach((e=>{
                                e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`,
                                    e.style.transitionDuration = `${t.params.speed}ms`
                            }
                        ))
                }
                "custom" === s.type && s.renderCustom ? (e.innerHTML = s.renderCustom(t, i + 1, m),
                0 === r && a("paginationRender", e)) : (0 === r && a("paginationRender", e),
                    a("paginationUpdate", e)),
                t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](s.lockClass)
            }
        ))
    }
    function m() {
        const e = t.params.pagination;
        if (d())
            return;
        const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length;
        let i = t.pagination.el;
        i = o(i);
        let r = "";
        if ("bullets" === e.type) {
            let i = t.params.loop ? Math.ceil(s / t.params.slidesPerGroup) : t.snapGrid.length;
            t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
            for (let s = 0; s < i; s += 1)
                e.renderBullet ? r += e.renderBullet.call(t, s, e.bulletClass) : r += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`
        }
        "fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`),
            t.pagination.bullets = [],
            i.forEach((s=>{
                    "custom" !== e.type && (s.innerHTML = r || ""),
                    "bullets" === e.type && t.pagination.bullets.push(...s.querySelectorAll(Y(e.bulletClass)))
                }
            )),
        "custom" !== e.type && a("paginationRender", i[0])
    }
    function f() {
        t.params.pagination = W(t, t.originalParams.pagination, t.params.pagination, {
            el: "swiper-pagination"
        });
        const e = t.params.pagination;
        if (!e.el)
            return;
        let s;
        "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)),
        s || "string" != typeof e.el || (s = [...document.querySelectorAll(e.el)]),
        s || (s = e.el),
        s && 0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(s) && s.length > 1 && (s = [...t.el.querySelectorAll(e.el)],
        s.length > 1 && (s = s.filter((e=>b(e, ".swiper")[0] === t.el))[0])),
        Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(t.pagination, {
                el: s
            }),
            s = o(s),
            s.forEach((s=>{
                    "bullets" === e.type && e.clickable && s.classList.add(e.clickableClass),
                        s.classList.add(e.modifierClass + e.type),
                        s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                    "bullets" === e.type && e.dynamicBullets && (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                        l = 0,
                    e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                    "progressbar" === e.type && e.progressbarOpposite && s.classList.add(e.progressbarOppositeClass),
                    e.clickable && s.addEventListener("click", p),
                    t.enabled || s.classList.add(e.lockClass)
                }
            )))
    }
    function h() {
        const e = t.params.pagination;
        if (d())
            return;
        let s = t.pagination.el;
        s && (s = o(s),
            s.forEach((s=>{
                    s.classList.remove(e.hiddenClass),
                        s.classList.remove(e.modifierClass + e.type),
                        s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                    e.clickable && s.removeEventListener("click", p)
                }
            ))),
        t.pagination.bullets && t.pagination.bullets.forEach((t=>t.classList.remove(...e.bulletActiveClass.split(" "))))
    }
    i("changeDirection", (()=>{
            if (!t.pagination || !t.pagination.el)
                return;
            const e = t.params.pagination;
            let {el: s} = t.pagination;
            s = o(s),
                s.forEach((s=>{
                        s.classList.remove(e.horizontalClass, e.verticalClass),
                            s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass)
                    }
                ))
        }
    )),
        i("init", (()=>{
                !1 === t.params.pagination.enabled ? v() : (f(),
                    m(),
                    u())
            }
        )),
        i("activeIndexChange", (()=>{
                void 0 === t.snapIndex && u()
            }
        )),
        i("snapIndexChange", (()=>{
                u()
            }
        )),
        i("snapGridLengthChange", (()=>{
                m(),
                    u()
            }
        )),
        i("destroy", (()=>{
                h()
            }
        )),
        i("enable disable", (()=>{
                let {el: e} = t.pagination;
                e && (e = o(e),
                    e.forEach((e=>e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass))))
            }
        )),
        i("lock unlock", (()=>{
                u()
            }
        )),
        i("click", ((e,s)=>{
                const i = s.target
                    , r = o(t.pagination.el);
                if (t.params.pagination.el && t.params.pagination.hideOnClick && r && r.length > 0 && !i.classList.contains(t.params.pagination.bulletClass)) {
                    if (t.navigation && (t.navigation.nextEl && i === t.navigation.nextEl || t.navigation.prevEl && i === t.navigation.prevEl))
                        return;
                    const e = r[0].classList.contains(t.params.pagination.hiddenClass);
                    a(!0 === e ? "paginationShow" : "paginationHide"),
                        r.forEach((e=>e.classList.toggle(t.params.pagination.hiddenClass)))
                }
            }
        ));
    const v = ()=>{
            t.el.classList.add(t.params.pagination.paginationDisabledClass);
            let {el: e} = t.pagination;
            e && (e = o(e),
                e.forEach((e=>e.classList.add(t.params.pagination.paginationDisabledClass)))),
                h()
        }
    ;
    Object.assign(t.pagination, {
        enable: ()=>{
            t.el.classList.remove(t.params.pagination.paginationDisabledClass);
            let {el: e} = t.pagination;
            e && (e = o(e),
                e.forEach((e=>e.classList.remove(t.params.pagination.paginationDisabledClass)))),
                f(),
                m(),
                u()
        }
        ,
        disable: v,
        render: m,
        update: u,
        init: f,
        destroy: h
    })
}
function K(e) {
    let t, s, {swiper: a, extendParams: r, on: n, emit: l, params: o} = e;
    a.autoplay = {
        running: !1,
        paused: !1,
        timeLeft: 0
    },
        r({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1
            }
        });
    let d, c, p, u, m, f, h, v = o && o.autoplay ? o.autoplay.delay : 3e3, g = o && o.autoplay ? o.autoplay.delay : 3e3, b = (new Date).getTime;
    function w(e) {
        a && !a.destroyed && a.wrapperEl && e.target === a.wrapperEl && (a.wrapperEl.removeEventListener("transitionend", w),
            C())
    }
    const y = ()=>{
            if (a.destroyed || !a.autoplay.running)
                return;
            a.autoplay.paused ? c = !0 : c && (g = d,
                c = !1);
            const e = a.autoplay.paused ? d : b + g - (new Date).getTime();
            a.autoplay.timeLeft = e,
                l("autoplayTimeLeft", e, e / v),
                s = requestAnimationFrame((()=>{
                        y()
                    }
                ))
        }
        , S = e=>{
            if (a.destroyed || !a.autoplay.running)
                return;
            cancelAnimationFrame(s),
                y();
            let i = void 0 === e ? a.params.autoplay.delay : e;
            v = a.params.autoplay.delay,
                g = a.params.autoplay.delay;
            const r = (()=>{
                    let e;
                    if (e = a.virtual && a.params.virtual.enabled ? a.slides.filter((e=>e.classList.contains("swiper-slide-active")))[0] : a.slides[a.activeIndex],
                        !e)
                        return;
                    return parseInt(e.getAttribute("data-swiper-autoplay"), 10)
                }
            )();
            !Number.isNaN(r) && r > 0 && void 0 === e && (i = r,
                v = r,
                g = r),
                d = i;
            const n = a.params.speed
                , o = ()=>{
                    a && !a.destroyed && (a.params.autoplay.reverseDirection ? !a.isBeginning || a.params.loop || a.params.rewind ? (a.slidePrev(n, !0, !0),
                        l("autoplay")) : a.params.autoplay.stopOnLastSlide || (a.slideTo(a.slides.length - 1, n, !0, !0),
                        l("autoplay")) : !a.isEnd || a.params.loop || a.params.rewind ? (a.slideNext(n, !0, !0),
                        l("autoplay")) : a.params.autoplay.stopOnLastSlide || (a.slideTo(0, n, !0, !0),
                        l("autoplay")),
                    a.params.cssMode && (b = (new Date).getTime(),
                        requestAnimationFrame((()=>{
                                S()
                            }
                        ))))
                }
            ;
            return i > 0 ? (clearTimeout(t),
                t = setTimeout((()=>{
                        o()
                    }
                ), i)) : requestAnimationFrame((()=>{
                    o()
                }
            )),
                i
        }
        , T = ()=>{
            a.autoplay.running = !0,
                S(),
                l("autoplayStart")
        }
        , x = ()=>{
            a.autoplay.running = !1,
                clearTimeout(t),
                cancelAnimationFrame(s),
                l("autoplayStop")
        }
        , E = (e,s)=>{
            if (a.destroyed || !a.autoplay.running)
                return;
            clearTimeout(t),
            e || (h = !0);
            const i = ()=>{
                    l("autoplayPause"),
                        a.params.autoplay.waitForTransition ? a.wrapperEl.addEventListener("transitionend", w) : C()
                }
            ;
            if (a.autoplay.paused = !0,
                s)
                return f && (d = a.params.autoplay.delay),
                    f = !1,
                    void i();
            const r = d || a.params.autoplay.delay;
            d = r - ((new Date).getTime() - b),
            a.isEnd && d < 0 && !a.params.loop || (d < 0 && (d = 0),
                i())
        }
        , C = ()=>{
            a.isEnd && d < 0 && !a.params.loop || a.destroyed || !a.autoplay.running || (b = (new Date).getTime(),
                h ? (h = !1,
                    S(d)) : S(),
                a.autoplay.paused = !1,
                l("autoplayResume"))
        }
        , M = ()=>{
            if (a.destroyed || !a.autoplay.running)
                return;
            const e = i();
            "hidden" === e.visibilityState && (h = !0,
                E(!0)),
            "visible" === e.visibilityState && C()
        }
        , L = e=>{
            "mouse" === e.pointerType && (h = !0,
                E(!0))
        }
        , P = e=>{
            "mouse" === e.pointerType && a.autoplay.paused && C()
        }
    ;
    n("init", (()=>{
            a.params.autoplay.enabled && (a.params.autoplay.pauseOnMouseEnter && (a.el.addEventListener("pointerenter", L),
                a.el.addEventListener("pointerleave", P)),
                i().addEventListener("visibilitychange", M),
                b = (new Date).getTime(),
                T())
        }
    )),
        n("destroy", (()=>{
                a.el.removeEventListener("pointerenter", L),
                    a.el.removeEventListener("pointerleave", P),
                    i().removeEventListener("visibilitychange", M),
                a.autoplay.running && x()
            }
        )),
        n("beforeTransitionStart", ((e,t,s)=>{
                !a.destroyed && a.autoplay.running && (s || !a.params.autoplay.disableOnInteraction ? E(!0, !0) : x())
            }
        )),
        n("sliderFirstMove", (()=>{
                !a.destroyed && a.autoplay.running && (a.params.autoplay.disableOnInteraction ? x() : (p = !0,
                    u = !1,
                    h = !1,
                    m = setTimeout((()=>{
                            h = !0,
                                u = !0,
                                E(!0)
                        }
                    ), 200)))
            }
        )),
        n("touchEnd", (()=>{
                if (!a.destroyed && a.autoplay.running && p) {
                    if (clearTimeout(m),
                        clearTimeout(t),
                        a.params.autoplay.disableOnInteraction)
                        return u = !1,
                            void (p = !1);
                    u && a.params.cssMode && C(),
                        u = !1,
                        p = !1
                }
            }
        )),
        n("slideChange", (()=>{
                !a.destroyed && a.autoplay.running && (f = !0)
            }
        )),
        Object.assign(a.autoplay, {
            start: T,
            stop: x,
            pause: E,
            resume: C
        })
}
Object.keys(j).forEach((e=>{
        Object.keys(j[e]).forEach((t=>{
                q.prototype[t] = j[e][t]
            }
        ))
    }
)),
    q.use([function(e) {
        let {swiper: t, on: s, emit: i} = e;
        const a = r();
        let n = null
            , l = null;
        const o = ()=>{
                t && !t.destroyed && t.initialized && (i("beforeResize"),
                    i("resize"))
            }
            , d = ()=>{
                t && !t.destroyed && t.initialized && i("orientationchange")
            }
        ;
        s("init", (()=>{
                t.params.resizeObserver && void 0 !== a.ResizeObserver ? t && !t.destroyed && t.initialized && (n = new ResizeObserver((e=>{
                        l = a.requestAnimationFrame((()=>{
                                const {width: s, height: i} = t;
                                let a = s
                                    , r = i;
                                e.forEach((e=>{
                                        let {contentBoxSize: s, contentRect: i, target: n} = e;
                                        n && n !== t.el || (a = i ? i.width : (s[0] || s).inlineSize,
                                            r = i ? i.height : (s[0] || s).blockSize)
                                    }
                                )),
                                a === s && r === i || o()
                            }
                        ))
                    }
                )),
                    n.observe(t.el)) : (a.addEventListener("resize", o),
                    a.addEventListener("orientationchange", d))
            }
        )),
            s("destroy", (()=>{
                    l && a.cancelAnimationFrame(l),
                    n && n.unobserve && t.el && (n.unobserve(t.el),
                        n = null),
                        a.removeEventListener("resize", o),
                        a.removeEventListener("orientationchange", d)
                }
            ))
    }
        , function(e) {
            let {swiper: t, extendParams: s, on: i, emit: a} = e;
            const n = []
                , l = r()
                , o = function(e, s) {
                void 0 === s && (s = {});
                const i = new (l.MutationObserver || l.WebkitMutationObserver)((e=>{
                        if (t.__preventObserver__)
                            return;
                        if (1 === e.length)
                            return void a("observerUpdate", e[0]);
                        const s = function() {
                            a("observerUpdate", e[0])
                        };
                        l.requestAnimationFrame ? l.requestAnimationFrame(s) : l.setTimeout(s, 0)
                    }
                ));
                i.observe(e, {
                    attributes: void 0 === s.attributes || s.attributes,
                    childList: void 0 === s.childList || s.childList,
                    characterData: void 0 === s.characterData || s.characterData
                }),
                    n.push(i)
            };
            s({
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            }),
                i("init", (()=>{
                        if (t.params.observer) {
                            if (t.params.observeParents) {
                                const e = b(t.el);
                                for (let t = 0; t < e.length; t += 1)
                                    o(e[t])
                            }
                            o(t.el, {
                                childList: t.params.observeSlideChildren
                            }),
                                o(t.wrapperEl, {
                                    attributes: !1
                                })
                        }
                    }
                )),
                i("destroy", (()=>{
                        n.forEach((e=>{
                                e.disconnect()
                            }
                        )),
                            n.splice(0, n.length)
                    }
                ))
        }
    ]);
export {K as A, X as N, U as P, q as S};

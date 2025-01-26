import { ref as m, openBlock as i, createElementBlock as p, Fragment as u, createElementVNode as t, toDisplayString as a, createTextVNode as s, createVNode as h, createApp as c } from "vue";
const v = "/vite.svg", f = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='37.07'%20height='36'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20198'%3e%3cpath%20fill='%2341B883'%20d='M204.8%200H256L128%20220.8L0%200h97.92L128%2051.2L157.44%200h47.36Z'%3e%3c/path%3e%3cpath%20fill='%2341B883'%20d='m0%200l128%20220.8L256%200h-51.2L128%20132.48L50.56%200H0Z'%3e%3c/path%3e%3cpath%20fill='%2335495E'%20d='M50.56%200L128%20133.12L204.8%200h-47.36L128%2051.2L97.92%200H50.56Z'%3e%3c/path%3e%3c/svg%3e", g = (o, l) => {
  const n = o.__vccOpts || o;
  for (const [e, r] of l)
    n[e] = r;
  return n;
}, _ = { class: "card" }, k = {
  __name: "HelloWorld",
  props: {
    msg: String
  },
  setup(o) {
    const l = m(0);
    return (n, e) => (i(), p(u, null, [
      t("h1", null, a(o.msg), 1),
      t("div", _, [
        t("button", {
          type: "button",
          onClick: e[0] || (e[0] = (r) => l.value++)
        }, "count is " + a(l.value), 1),
        e[1] || (e[1] = t("p", null, [
          s(" Edit "),
          t("code", null, "components/HelloWorld.vue"),
          s(" to test HMR ")
        ], -1))
      ]),
      e[2] || (e[2] = t("p", null, [
        s(" Check out "),
        t("a", {
          href: "https://vuejs.org/guide/quick-start.html#local",
          target: "_blank"
        }, "create-vue"),
        s(", the official Vue + Vite starter ")
      ], -1)),
      e[3] || (e[3] = t("p", null, [
        s(" Learn more about IDE Support for Vue in the "),
        t("a", {
          href: "https://vuejs.org/guide/scaling-up/tooling.html#ide-support",
          target: "_blank"
        }, "Vue Docs Scaling up Guide"),
        s(". ")
      ], -1)),
      e[4] || (e[4] = t("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1))
    ], 64));
  }
}, V = /* @__PURE__ */ g(k, [["__scopeId", "data-v-830e400e"]]), x = {
  __name: "App",
  setup(o) {
    return (l, n) => (i(), p(u, null, [
      n[0] || (n[0] = t("div", null, [
        t("a", {
          href: "https://vite.dev",
          target: "_blank"
        }, [
          t("img", {
            src: v,
            class: "logo",
            alt: "Vite logo"
          })
        ]),
        t("a", {
          href: "https://vuejs.org/",
          target: "_blank"
        }, [
          t("img", {
            src: f,
            class: "logo vue",
            alt: "Vue logo"
          })
        ])
      ], -1)),
      h(V, { msg: "Vite + Vue" })
    ], 64));
  }
}, d = /* @__PURE__ */ g(x, [["__scopeId", "data-v-962047bb"]]);
function w(o) {
  c(d).mount(o);
}
function b(o) {
  c(d).unmount(o);
}
export {
  w as mountDomiScheduler,
  b as unmountDomiScheduler
};

const MathJaxConfig = {
  script:
    "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-MML-AM_HTMLorMML",
  options: {
    extensions: ["tex2jax.js", "mml2jax.js", "asciimath2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    "HTML-CSS": {
      styles: { ".MathJax_Preview": { visibility: "hidden" } },
    },
    tex2jax: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
    },
    TeX: {
      extensions: [
        "AMSmath.js",
        "AMSsymbols.js",
        "action.js",
        "[Extra]/maction.js",
        "[Extra]/mtable.js",
        "[Extra]/mathtools.js",
        "[Extra]/menclose.js",
        "[Extra]/xypic.js",
      ],
    },
  },
};

export default MathJaxConfig;

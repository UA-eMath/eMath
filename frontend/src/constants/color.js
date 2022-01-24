export const tagColor = {
  blue: {
    color: "#003a8c",
    background: "#e6f7ff",
  },
  geekblue: {
    color: "#061178",
    background: "#f0f5ff",
  },
  gold: {
    color: "#874d00",
    background: "#fffbe6",
  },
  green: {
    color: "#135200",
    background: "#f6ffed",
  },
  magenta: {
    color: "#780650",
    background: "#fff0f6",
  },
  purple: {
    color: "#22075e",
    background: "#f9f0ff",
  },
  volcano: {
    color: "#871400",
    background: "#fff2e8",
  },
};

export const subLevelColor = {
  Comment: "blue",
  Convention: "volcano",
  Corollary: "volcano",
  Definition: "gold",
  Example: "green",
  Exercise: "purple",
  Lemma: "magenta",
  Notation: "gold",
  Proof: "geekblue",
  "Proof Idea": "geekblue",
  Proposition: "magenta",
  Remark: "blue",
  "Sketch of Proof": "geekblue",
  Solution: "geekblue",
  Terminology: "gold",
  Theorem: "magenta",
};

export function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

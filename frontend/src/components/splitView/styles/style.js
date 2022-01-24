import paperTexture from "../../../static/img/paper_white.jpeg";

export default {
  titleBar: {
    WebkitUserSelect: "none",
    userSelect: "none",
    WebkitAppRegion: "drag",
    appRegion: "drag",
    cursor: "default",
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent", //#EAE8DC
    textAlign: "center",
  },
  title: {
    WebkitUserSelect: "none",
    userSelect: "none",
    cursor: "default",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "20px",
    color: "#000000",
    flex: 1,
    display: "inline-block",
    letterSpacing: " 0.81px",
  },
  secondborder: {
    backgroundColor: "#F7F7EE",
    backgroundImage: `url(${paperTexture})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    width: "100%",
    padding: "1%",
    margin: "auto",
    borderRadius: "7px",
    boxShadow: "inset 0 3px 6px rgba(0,0,0,0.16), 0 4px 6px rgba(0,0,0,0.45)",
  },
  window: {
    background: "#F7F7EE",
    borderRadius: "4px",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 1px 5px rgba(0,0,0,0.35)",
    margin: "12px",
    padding: "10px",
  },
};

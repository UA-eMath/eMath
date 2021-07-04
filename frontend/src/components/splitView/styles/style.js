import paperTexture from "../../../static/img/paper.jpg";

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
    margin: "10px 0",
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
  window: {
    backgroundImage: `url(${paperTexture})`, //#EAE7DC
    backgroundSize: "cover",
    overflow: "hidden",
    width: "100%",
    borderRadius: "2px",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.35)",
  },
};

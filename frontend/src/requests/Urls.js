const domain = {
  local: "http://localhost",
  http: "http://142.244.163.49",
  https: "https://eMath.math.ualberta.ca",
};

function checkURL() {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return domain["local"];
  } else if (window.location.protocol === "https") {
    return domain["https"];
  } else {
    return domain["http"];
  }
}

export default {
  domain: checkURL(),
  port: window.location.protocol === "https" ? "" : 8000,
  endpoints: {
    roots: {
      address: "database",
      methods: ["GET"],
    },
  },
};

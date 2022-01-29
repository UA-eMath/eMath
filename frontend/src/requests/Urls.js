const domain = {
  local: "http://localhost",
  http: "http://142.244.163.49",
  https: "http://142.244.163.49", //"https://eMath.math.ualberta.ca"
};

function checkURL() {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return domain["local"];
  } else if (window.location.protocol === "http") {
    return domain["http"];
  } else {
    return domain["https"];
  }
}

export default {
  domain: checkURL(),
  port: 8000,
  endpoints: {
    roots: {
      address: "database",
      methods: ["GET"],
    },
  },
};

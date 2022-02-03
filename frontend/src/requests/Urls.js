export default {
  domain: window.location.origin,
  port: window.location.protocol === "https:" ? "" : 8000,
  endpoints: {
    roots: {
      address: "database",
      methods: ["GET"],
    },
  },
};

const local = true;
const domain = local ? "http://localhost" : "http://142.244.163.49";
// "https://emath-backend.herokuapp.com"

export default {
  domain: domain,
  port: 8000,
  endpoints: {
    roots: {
      address: "database",
      methods: ["GET"],
    },
  },
};

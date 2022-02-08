function generateDoamin() {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}`;
}

export default {
  domain: generateDoamin(),
  port: window.location.protocol === "https:" ? "" : 8000,
  endpoints: {
    roots: {
      address: "database",
      methods: ["GET"],
    },
  },
};

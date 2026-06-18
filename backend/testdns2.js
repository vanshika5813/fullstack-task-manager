const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv(
  "_mongodb._tcp.cluster0.q8zw1g7.mongodb.net",
  (err, addresses) => {
    console.log("ERR:", err);
    console.log("ADDR:", addresses);
  }
);

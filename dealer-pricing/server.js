"use strict";

const http = require("node:http");

const PORT = Number(process.env.PORT || 3000);
const prices = {
  1: { product_id: 1, dealer_id: 101, dealer_name: "Central Dealer", price: 879.99, currency: "USD" },
  2: { product_id: 2, dealer_id: 101, dealer_name: "Central Dealer", price: 22.49, currency: "USD" },
};

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }
  if (pathname === "/health") {
    return sendJson(res, 200, { status: "ok", service: "dealer-pricing" });
  }
  if (pathname === "/dealer-pricing") {
    return sendJson(res, 200, Object.values(prices));
  }
  const match = /^\/dealer-pricing\/(\d+)$/.exec(pathname);
  if (match) {
    const product = prices[Number(match[1])];
    return product
      ? sendJson(res, 200, product)
      : sendJson(res, 404, { error: "Price not found" });
  }
  return sendJson(res, 404, { error: "Route not found" });
});

if (require.main === module) {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Dealer Pricing Microservice listening on port ${PORT}`);
  });
}

module.exports = server;

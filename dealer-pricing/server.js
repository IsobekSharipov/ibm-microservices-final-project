"use strict";

const http = require("node:http");
const PORT = Number(process.env.PORT || 3000);

const prices = [
  { product_id: 1, dealer_id: 101, dealer_name: "Central Dealer", price: 879.99, currency: "USD" },
  { product_id: 1, dealer_id: 102, dealer_name: "City Electronics", price: 895.00, currency: "USD" },
  { product_id: 1, dealer_id: 103, dealer_name: "Tech Market", price: 865.50, currency: "USD" },
  { product_id: 2, dealer_id: 101, dealer_name: "Central Dealer", price: 22.49, currency: "USD" },
  { product_id: 2, dealer_id: 102, dealer_name: "City Electronics", price: 24.00, currency: "USD" },
  { product_id: 2, dealer_id: 103, dealer_name: "Tech Market", price: 21.95, currency: "USD" },
];

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;
  if (req.method !== "GET") return sendJson(res, 405, { error: "Method not allowed" });
  if (pathname === "/health") return sendJson(res, 200, { status: "ok", service: "dealer-pricing" });
  if (pathname === "/dealer-pricing") return sendJson(res, 200, prices);
  const match = /^\/dealer-pricing\/(\d+)$/.exec(pathname);
  if (match) {
    const productId = Number(match[1]);
    const matchingPrices = prices.filter((entry) => entry.product_id === productId);
    return matchingPrices.length
      ? sendJson(res, 200, matchingPrices)
      : sendJson(res, 404, { error: "No dealer prices found for this product" });
  }
  return sendJson(res, 404, { error: "Route not found" });
});

if (require.main === module) {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Dealer Pricing Microservice listening on port ${PORT}`);
  });
}
module.exports = server;

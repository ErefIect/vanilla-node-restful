const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
} = require("./controllers/productContoller");

const server = http.createServer((req, res) => {
  const method = req.method;
  if (req.url === "/api/products" && method === "GET") {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (req.url === "/api/products" && method === "POST") {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    method === "PUT"
  ) {
    updateProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Router Not Found" }));
  }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`server running on port: ${PORT}`));

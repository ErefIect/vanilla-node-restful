const Product = require("../models/productModel");
const { getPostData } = require("../utils");

// @desc    GET ALL PRODUCT
// @router  GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// @desc    GET single PRODUCT
// @router  GET /api/products/id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a Product
// @route   POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    let product;

    // check if body is empty or cannot parse it to a JavaScript object
    if (!body) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid data" }));
    }

    try {
      console.log("body is ", body);
      product = await JSON.parse(body);
      Product.create(product);
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid data" }));
    }

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc    update a Product
// @router  PUT /api/products/id
async function updateProduct(req, res, id) {
  try {
    const body = await getPostData();

    if (!body) {
      res.writeHead(401, { "Content-Type": "application/json" });
    }

    const { title, description, price } = JSON.parse(body);

    const productData = {
      title: title || product.title,
      description: description || product.description,
      price: price || product.price,
    };

    const updateProduct = await Product.update(id, productData);

    if (!body) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
};

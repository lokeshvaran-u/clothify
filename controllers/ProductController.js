const Product = require("../models/Product");
const ActivityLog = require("../models/ActivityLog");

const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      sort,
      page = 1,
      limit = 10
    } = req.query;

    const filter = {};

    // Search by name, brand, or category
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ];
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Pagination
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    // Sorting
    let sortOption = {};

    if (sort === "price_asc") {
      sortOption.price = 1;
    } else if (sort === "price_desc") {
      sortOption.price = -1;
    } else if (sort === "name_asc") {
      sortOption.name = 1;
    } else if (sort === "name_desc") {
      sortOption.name = -1;
    } else if (sort === "newest") {
      sortOption.createdAt = -1;
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const totalProducts = await Product.countDocuments(filter);

    const totalPages = Math.ceil(totalProducts / limitNumber);

    res.json({
      products,
      currentPage: pageNumber,
      totalPages,
      totalProducts
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      quantity,
      brand,
      image
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !category ||
      !brand ||
      !image ||
      price === undefined ||
      quantity === undefined
    ) {
      return res.status(400).json({
        message: "All product fields are required"
      });
    }

    // Validate price
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        message: "Price must be a number greater than 0"
      });
    }

    // Validate quantity
    if (
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      return res.status(400).json({
        message: "Quantity must be a non-negative integer"
      });
    }

    // Validate image URL
    try {
      new URL(image);
    } catch {
      return res.status(400).json({
        message: "Image must be a valid URL"
      });
    }

    const newProduct = new Product({
      name: name.trim(),
      price,
      category: category.trim(),
      quantity,
      brand: brand.trim(),
      image
    });

    await newProduct.save();

    await ActivityLog.create({
      userId: req.user.id,
      action: "CREATE_PRODUCT",
      details: `Created product ${newProduct.name}`
    });

    res.status(201).json({
      message: "Product Saved To MongoDB",
      product: newProduct
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      quantity,
      brand,
      image
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !category ||
      !brand ||
      !image ||
      price === undefined ||
      quantity === undefined
    ) {
      return res.status(400).json({
        message: "All product fields are required"
      });
    }

    // Validate price
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        message: "Price must be a number greater than 0"
      });
    }

    // Validate quantity
    if (
      typeof quantity !== "number" ||
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      return res.status(400).json({
        message: "Quantity must be a non-negative integer"
      });
    }

    // Validate image URL
    try {
      new URL(image);
    } catch {
      return res.status(400).json({
        message: "Image must be a valid URL"
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        price,
        category: category.trim(),
        quantity,
        brand: brand.trim(),
        image
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await ActivityLog.create({
      userId: req.user.id,
      action: "UPDATE_PRODUCT",
      details: `Updated product ${updatedProduct.name}`
    });

    res.json({
      message: "Product Updated",
      updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    await ActivityLog.create({
      userId: req.user.id,
      action: "DELETE_PRODUCT",
      details: `Deleted product ${deletedProduct.name}`
    });

    res.json({
      message: "Product Deleted",
      deletedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({
      quantity: { $lt: 10 }
    });

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const products = await Product.find();

    const totalStock = products.reduce(
      (total, product) => total + product.quantity,
      0
    );

    const lowStockCount = await Product.countDocuments({
      quantity: { $lt: 10 }
    });

    const brands = await Product.distinct("brand");

    const totalBrands = brands.length;

    res.json({
      totalProducts,
      totalStock,
      lowStockCount,
      totalBrands,
      brands
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  getDashboardStats
};
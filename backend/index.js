const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://sumit:sumit786@cluster0.go6grlb.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define User and Admin schema (you could merge these if they are identical)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  purchase: { type: Array, default: [] },
  complete: { type: Array, default: [] },
});
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  productId: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", userSchema);
const Product = mongoose.model("Product", productSchema);

// User Signup
app.post("/user/signup", (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  user
    .save()
    .then((data) => res.status(200).send({ message: "User created", data }))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).send({ message: "User already exists", error: err });
      } else {
        res.status(500).send({ message: "Internal Server Error", error: err });
      }
    });
});

// User Login
app.post("/userLogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login Successful", email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update User Password
app.put("/user/userUpdate", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/user/purchase", async (req, res) => {
  try {
    const { email, productId } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the productId to the purchase array
    user.purchase.push(productId);

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Product purchased successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.post("/user/complete", async (req, res) => {
  const { email, productId } = req.body;
  const user = await User.findOne({ email });
  user.complete.push(productId);
  await user.save();
  res.status(200).json({ message: "Product completed successfully" });
});

app.post("/products", (req, res) => {
  console.log("Received product data:", req.body); // Add this line for logging

  const { name, price, description, productId } = req.body;

  const product = new Product({ name, price, description, productId });
  console.log(product);
  product
    .save()
    .then((data) =>
      res.status(200).send({ message: "Product is created", data })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Internal Server Error", error: err });
    });
});

app.get("/user/userLogin/allProducts", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

app.post("/purchaseProduct", async (req, res) => {
  console.log("Request received:", req.body); // Add this for logging
  const { email, productId } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.purchase.push(productId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Product purchased successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Fetch purchased products for a specific user
app.get("/user/purchasedProducts", async (req, res) => {
  const { email } = req.query; // Get email from query params
  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Fetch products based on IDs in the user's purchase array
    const purchasedProducts = await Product.find({ _id: { $in: user.purchase } });
    
    if (!purchasedProducts.length) {
      return res.status(404).json({ message: "No purchased products found" });
    }
    
    res.json(purchasedProducts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});



// Admin Signup
app.post("/admin/signup", (req, res) => {
  const { name, email, password } = req.body;
  const admin = new Admin({ name, email, password });

  admin
    .save()
    .then((data) => res.status(200).send({ message: "Admin created", data }))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).send({ message: "Admin already exists", error: err });
      } else {
        res.status(500).send({ message: "Internal Server Error", error: err });
      }
    });
});

// Admin Login
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login Successful", email: admin.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update User Password
app.put("/admin/adminUpdate", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

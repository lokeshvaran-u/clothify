import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ImageUpload from "../components/ImageUpload";
import "./EditProduct.css";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    quantity: "",
    image: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);


  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await api.get(
          `/products/${id}`
        );

        const product = response.data;

        setFormData({
          name: product.name,
          price: product.price,
          brand: product.brand,
          category: product.category,
          quantity: product.quantity,
          image: product.image
        });

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to load product"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

  };


  const handleImageUpload = (imageUrl) => {

    setFormData((previousData) => ({
      ...previousData,
      image: imageUrl
    }));

  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");


    if (!formData.image) {

      setError("Please upload a product image");

      return;
    }


    try {

      setUpdating(true);

      await api.put(`/products/${id}`, {

        name: formData.name,

        price: Number(formData.price),

        brand: formData.brand,

        category: formData.category,

        quantity: Number(formData.quantity),

        image: formData.image

      });


      setSuccess("Product updated successfully");

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to update product"
      );

    } finally {

      setUpdating(false);

    }

  };


  if (loading) {

    return (
      <p>
        Loading product...
      </p>
    );

  }


  return (
    <div className="edit-product-page">

      <main className="edit-product-content">

        <div className="edit-product-card">

          <h1>
            Edit Product
          </h1>

          <p className="edit-product-subtitle">
            Update your clothing product
          </p>


          <form onSubmit={handleSubmit}>

            <div className="image-section">

              <label>
                Product Image
              </label>


              {formData.image && (

                <img
                  src={formData.image}
                  alt={formData.name}
                  className="image-preview"
                />

              )}


              <ImageUpload
                onUpload={handleImageUpload}
              />

            </div>


            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
              />

            </div>


            {error && (

              <p className="form-error">
                {error}
              </p>

            )}


            {success && (

              <p className="form-success">
                {success}
              </p>

            )}


            <button
              type="submit"
              className="update-product-button"
              disabled={updating}
            >
              {updating
                ? "Updating Product..."
                : "Update Product"}
            </button>


            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/products")}
            >
              Cancel
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default EditProduct;
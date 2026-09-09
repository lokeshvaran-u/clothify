import { useEffect, useState } from "react";
import api from "../services/api";
import "./Dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchDashboardStats = async () => {

      try {

        const response = await api.get(
          "/products/dashboard-stats"
        );

        setStats(response.data);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to load dashboard"
        );

      }

    };

    fetchDashboardStats();

  }, []);


  if (error) {

    return (
      <p className="form-error">
        {error}
      </p>
    );

  }


  if (!stats) {

    return (
      <p>
        Loading dashboard...
      </p>
    );

  }


  return (
    <div className="dashboard-page">

      <h1>
        Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Overview of your clothing store
      </p>


      <div className="stats-grid">

        <div className="stat-card">

          <h3>
            Total Products
          </h3>

          <p>
            {stats.totalProducts}
          </p>

        </div>


        <div className="stat-card">

          <h3>
            Total Stock
          </h3>

          <p>
            {stats.totalStock}
          </p>

        </div>


        <div className="stat-card">

          <h3>
            Low Stock
          </h3>

          <p>
            {stats.lowStockCount}
          </p>

        </div>


        <div className="stat-card">

          <h3>
            Total Brands
          </h3>

          <p>
            {stats.totalBrands}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
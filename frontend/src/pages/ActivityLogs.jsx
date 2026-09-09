import { useEffect, useState } from "react";
import api from "../services/api";
import "./ActivityLogs.css";

function ActivityLogs() {

  const [logs, setLogs] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchActivityLogs = async () => {

      try {

        const response = await api.get(
          "/activity-logs"
        );

        setLogs(response.data);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to load activity logs"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchActivityLogs();

  }, []);


  return (
    <div className="activity-page">

      <main className="activity-content">

        <h1>
          Activity Logs
        </h1>

        <p className="activity-subtitle">
          Track product activities performed in the system
        </p>


        {loading && (

          <p className="activity-loading">
            Loading activity logs...
          </p>

        )}


        {error && (

          <p className="activity-error">
            {error}
          </p>

        )}


        {!loading &&
          !error &&
          logs.length === 0 && (

          <div className="no-activity">

            <h2>
              No activity found
            </h2>

            <p>
              Product activities will appear here.
            </p>

          </div>

        )}


        {!loading &&
          !error &&
          logs.length > 0 && (

          <div className="activity-table-container">

            <table className="activity-table">

              <thead>

                <tr>
                  <th>Action</th>
                  <th>Details</th>
                  <th>User</th>
                  <th>Date</th>
                </tr>

              </thead>


              <tbody>

                {logs.map((log) => (

                  <tr key={log._id}>

                    <td>

                      <span
                        className={`action-badge ${log.action.toLowerCase()}`}
                      >
                        {log.action}
                      </span>

                    </td>


                    <td>
                      {log.details}
                    </td>


                    <td>
                      {log.userId?.name || "Unknown"}
                    </td>


                    <td>
                      {new Date(
                        log.createdAt
                      ).toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </main>

    </div>
  );
}

export default ActivityLogs;
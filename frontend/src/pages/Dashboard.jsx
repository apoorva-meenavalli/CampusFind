import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          Campus<span>Find</span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>


      {/* Dashboard Content */}
      <main className="dashboard-main">

        <div className="dashboard-welcome">

          <div>
            <span className="dashboard-label">
              STUDENT DASHBOARD
            </span>

            <h1>
              Welcome, {user?.name || "User"} 👋
            </h1>

            <p>
              What would you like to do today?
            </p>
          </div>

        </div>


        {/* Action Cards */}
        <div className="dashboard-grid">

          <div className="dashboard-card lost-card">

            <div className="dashboard-card-icon">
              🔍
            </div>

            <h2>Lost something?</h2>

            <p>
              Report an item you've lost on campus so others
              can help you find it.
            </p>

            <button
              onClick={() => navigate("/report-lost")}
            >
              Report Lost Item →
            </button>

          </div>


          <div className="dashboard-card found-card">

            <div className="dashboard-card-icon">
              🎒
            </div>

            <h2>Found something?</h2>

            <p>
              Report an item you've found and help return
              it to its owner.
            </p>

            <button
              onClick={() => navigate("/report-found")}
            >
              Report Found Item →
            </button>

          </div>


          <div className="dashboard-card browse-card">

            <div className="dashboard-card-icon">
              📋
            </div>

            <h2>Browse items</h2>

            <p>
              View reported lost and found items and check
              their contact details.
            </p>

            <button
              onClick={() => navigate("/browse-items")}
            >
              Browse Items →
            </button>

          </div>

        </div>


        {/* Info Section */}
        <div className="dashboard-info">

          <div className="info-icon">
            💡
          </div>

          <div>
            <h3>
              How CampusFind works
            </h3>

            <p>
              Report a lost or found item, browse listings,
              and contact the person directly to help return
              belongings to their owner.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
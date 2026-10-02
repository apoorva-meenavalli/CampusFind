import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportLostItem from "./pages/ReportLostItem";
import ReportFoundItem from "./pages/ReportFoundItem";
import BrowseItems from "./pages/BrowseItems";
import ProtectedRoute from "./ProtectedRoute";


function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="home-navbar">

        <Link to="/" className="logo">
          Campus<span>Find</span>
        </Link>

        <div className="nav-links">

          <Link to="/login">
            <button className="nav-login">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="nav-register">
              Get Started
            </button>
          </Link>

        </div>

      </nav>


      {/* Hero Section */}
      <main>

        <section className="hero-section">

          <div className="hero-content">

            <div className="hero-badge">
              🎓 Built for Campus Communities
            </div>

            <h1>
              Lost something?
              <br />
              <span>Let's find it.</span>
            </h1>

            <p>
              CampusFind makes it easier for students to report,
              discover and return lost belongings on campus.
            </p>

            <div className="hero-buttons">

              <Link to="/report-lost">
                <button className="primary-button">
                  Report Lost Item
                </button>
              </Link>

              <Link to="/report-found">
                <button className="secondary-button">
                  Report Found Item
                </button>
              </Link>

            </div>

          </div>


          {/* Hero Visual */}
          <div className="hero-visual">

            <div className="floating-card card-one">

              <span className="card-icon">
                🔑
              </span>

              <div>
                <strong>Keys Found</strong>
                <small>Library Block</small>
              </div>

            </div>


            <div className="main-illustration">

              <div className="illustration-circle">
                🔎
              </div>

              <h3>
                Find. Connect. Return.
              </h3>

              <p>
                Connecting students with their lost belongings.
              </p>

            </div>


            <div className="floating-card card-two">

              <span className="card-icon">
                🎒
              </span>

              <div>
                <strong>Backpack Lost</strong>
                <small>Engineering Block</small>
              </div>

            </div>

          </div>

        </section>


        {/* How It Works */}
        <section className="how-section">

          <div className="section-heading">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              Finding lost items made simple
            </h2>

            <p>
              A simple way for students to help each other.
            </p>

          </div>


          <div className="steps">

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <div className="step-icon">
                📝
              </div>

              <h3>
                Report
              </h3>

              <p>
                Report an item you've lost or found on campus.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <div className="step-icon">
                🔍
              </div>

              <h3>
                Browse
              </h3>

              <p>
                Browse reported items and look for a match.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <div className="step-icon">
                📞
              </div>

              <h3>
                Connect
              </h3>

              <p>
                Contact the person who found or lost the item.
              </p>

            </div>

          </div>

        </section>


        {/* CTA */}
        <section className="cta-section">

          <div>

            <h2>
              Lost something on campus?
            </h2>

            <p>
              Report it now and give it a better chance of
              finding its way home.
            </p>

          </div>

          <Link to="/report-lost">

            <button className="cta-button">
              Report an Item →
            </button>

          </Link>

        </section>

      </main>


      {/* Footer */}
      <footer>

        <div className="footer-logo">
          Campus<span>Find</span>
        </div>

        <p>
          Helping students find what they've lost.
        </p>

        <p className="copyright">
          © 2026 CampusFind. Built for campus communities.
        </p>

      </footer>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report-lost"
          element={
            <ProtectedRoute>
              <ReportLostItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report-found"
          element={
            <ProtectedRoute>
              <ReportFoundItem />
            </ProtectedRoute>
          }
        />


        {/* Public Browse Page */}

        <Route
          path="/browse-items"
          element={<BrowseItems />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BrowseItems() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("Loading items...");

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Unable to load items");
      });
  }, []);

  return (
    <div className="browse-page">

      {/* Navbar */}
      <nav className="browse-navbar">

        <Link to="/" className="logo">
          Campus<span>Find</span>
        </Link>

        <Link to="/dashboard">
          <button className="back-button">
            ← Dashboard
          </button>
        </Link>

      </nav>


      {/* Main */}
      <main className="browse-main">

        <div className="browse-header">

          <div>
            <span className="browse-label">
              CAMPUS LISTINGS
            </span>

            <h1>Lost & Found Items</h1>

            <p>
              Browse items reported by students and help
              belongings find their way home.
            </p>
          </div>

          <div className="item-count">
            <strong>{items.length}</strong>
            <span>Listings</span>
          </div>

        </div>


        {message && (
          <div className="browse-message">
            {message}
          </div>
        )}


        {!message && items.length === 0 ? (
          <div className="empty-state">

            <div className="empty-icon">
              📦
            </div>

            <h2>No items reported yet</h2>

            <p>
              Lost or found something? Be the first to
              report it.
            </p>

            <div className="empty-buttons">

              <Link to="/report-lost">
                <button>
                  Report Lost Item
                </button>
              </Link>

              <Link to="/report-found">
                <button className="empty-secondary">
                  Report Found Item
                </button>
              </Link>

            </div>

          </div>
        ) : (
          <div className="items-grid">

            {items.map((item) => (

              <div
                className="item-card"
                key={item.id}
              >

                {/* Card header */}
                <div className="item-card-header">

                  <span
                    className={
                      item.type === "lost"
                        ? "item-badge lost-badge"
                        : "item-badge found-badge"
                    }
                  >
                    {item.type === "lost"
                      ? "LOST"
                      : "FOUND"}
                  </span>

                  <span className="item-date">
                    {item.date}
                  </span>

                </div>


                {/* Item title */}
                <h2>{item.title}</h2>

                <span className="item-category">
                  {item.category}
                </span>


                {/* Description */}
                <p className="item-description">
                  {item.description}
                </p>


                {/* Details */}
                <div className="item-details">

                  <div className="detail-row">
                    <span className="detail-icon">
                      📍
                    </span>

                    <div>
                      <small>Location</small>
                      <p>{item.location}</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <span className="detail-icon">
                      👤
                    </span>

                    <div>
                      <small>Reported by</small>
                      <p>{item.reporter_name}</p>
                    </div>
                  </div>

                </div>


                {/* Contact */}
                <div className="contact-box">

                  <div className="contact-heading">
                    <span>📞</span>

                    <strong>
                      Contact Details
                    </strong>
                  </div>

                  <div className="contact-info">

                    <p>
                      <strong>Name:</strong>{" "}
                      {item.contact_name}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {item.contact_phone}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default BrowseItems;
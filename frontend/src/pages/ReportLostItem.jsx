import { useState } from "react";
import { Link } from "react-router-dom";

function ReportLostItem() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    date: "",
    contact_name: "",
    contact_phone: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setMessage("Please login first");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/items/lost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            ...formData,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Lost item reported successfully!");

        setFormData({
          title: "",
          category: "",
          description: "",
          location: "",
          date: "",
          contact_name: "",
          contact_phone: "",
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="report-page">

      <nav className="report-navbar">
        <Link to="/" className="logo">
          Campus<span>Find</span>
        </Link>

        <Link to="/dashboard">
          <button className="back-button">
            ← Dashboard
          </button>
        </Link>
      </nav>

      <main className="report-main">

        <div className="report-header">
          <div className="report-icon">
            🔍
          </div>

          <div>
            <span className="report-label">
              LOST ITEM
            </span>

            <h1>Report something you lost</h1>

            <p>
              Provide some details so someone who finds it can
              get in touch with you.
            </p>
          </div>
        </div>

        <div className="report-card">

          <form onSubmit={handleSubmit}>

            <div className="form-section">
              <h2>Item details</h2>

              <div className="form-grid">

                <div className="form-group">
                  <label>Item name</label>

                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Black backpack"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>

                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. Electronics, Books"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  placeholder="Describe the item, color, brand, unique features..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label>Where did you lose it?</label>

                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Library, Block A"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>
            </div>


            <div className="form-divider"></div>


            <div className="form-section">
              <h2>Contact details</h2>

              <p className="form-help">
                This information will be visible to someone
                who finds your item.
              </p>

              <div className="form-grid">

                <div className="form-group">
                  <label>Your name</label>

                  <input
                    type="text"
                    name="contact_name"
                    placeholder="Your name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone number</label>

                  <input
                    type="tel"
                    name="contact_phone"
                    placeholder="Your phone number"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>
            </div>


            <button
              type="submit"
              className="report-submit lost-submit"
            >
              Report Lost Item
            </button>

          </form>

          {message && (
            <div className="report-message">
              {message}
            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default ReportLostItem;
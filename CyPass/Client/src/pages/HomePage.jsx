import "../styles/HomePage.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PageContext from "../contexts/PageContext";
import BusinessContext from "../contexts/BusinessContext";

function HomePage() {
  const { business } = useContext(BusinessContext);
  const { setPage } = useContext(PageContext);

  return (
    <div className="home-page">
      <div className="page-title">
        <h3>Welcome! Let`s get you up and running</h3>
      </div>
      {!business && (
        <div className="section">
          <div>Setup business profile</div>
          <div>
            <Link
              to="/#?page=business_profile"
              onClick={(e) => setPage({ name: "Business profile" })}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
      <div className="section">
        <div>Set up pricing</div>
        <div>
          <Link to="">Get started</Link>
        </div>
      </div>
      <div className="section">
        <div>Build your page on CyPass</div>
        <div>
          <Link to="" onClick={(e) => setPage({ name: "Business profile" })}>
            Get started
          </Link>
        </div>
      </div>
      <div className="section">
        <div>Edit your class information</div>
        <div>
          <Link to="" onClick={(e) => setPage({ name: "Settings" })}>
            Get started
          </Link>
        </div>
      </div>
      <div className="section">
        <div>Add staff to account</div>
        <div>
          <Link to="" onClick={(e) => setPage({ name: "Staff" })}>
            Get started
          </Link>
        </div>
      </div>
      <div className="section">
        <div>Manage your account</div>
        <div>
          <Link to="" onClick={(e) => setPage({ name: "Settings" })}>
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

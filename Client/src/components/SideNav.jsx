import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PageContext from "../contexts/PageContext";
import "../styles/SideNav.css";

function SideNav() {
  const [isBusSubOpen, setIsBusSubOpen] = useState(false);
  const [isSupSubOpen, setIsSupSubOpen] = useState(false);
  const [isAccSubOpen, setIsAccSubOpen] = useState(false);
  const { setPage } = useContext(PageContext);

  return (
    <div className="side-nav">
      <h2 className="logo">CyPass</h2>
      <ul>
        <li>
          <Link to="/?page=home" onClick={() => setPage({ name: "Home" })}>
            <span className="material-icons-round">home</span>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/?page=schedule"
            onClick={() => setPage({ name: "Schedule" })}
          >
            <span className="material-icons-round">calendar_today</span>
            Schedule
          </Link>
        </li>
        <li>
          <Link
            to="/?page=performance"
            onClick={() => setPage({ name: "Performance" })}
          >
            <span className="material-icons-round">equalizer</span>
            Performance
          </Link>
        </li>
        <li>
          <Link
            to="/?page=rat_rev"
            onClick={() => setPage({ name: "Ratings & reviews" })}
          >
            <span className="material-icons-round">star_outline</span>
            Ratings {"&"} reviews
          </Link>
        </li>
        <li>
          <Link
            to="/?page=campaings"
            onClick={() => setPage({ name: "Campaings" })}
          >
            <span className="material-icons-round">campaign</span>
            Campaigns
          </Link>
        </li>
        <li>
          <Link to="" onClick={() => setIsBusSubOpen(!isBusSubOpen)}>
            <span className="material-icons-round">roofing</span>
            Manage
            <span className="material-icons-outlined expand">
              {isBusSubOpen ? "expand_less" : "expand_more"}
            </span>
          </Link>
          {isBusSubOpen && (
            <div className="sub-item">
              <Link
                to="/?page=business_profile"
                onClick={() => setPage({ name: "Business profile" })}
              >
                Business profile
              </Link>
              <Link
                to="/?page=schedule_settings"
                onClick={() => setPage({ name: "Schedule settings" })}
              >
                Schedule settings
              </Link>
              <Link
                to="/?page=staff"
                onClick={() => setPage({ name: "Staff" })}
              >
                Staff
              </Link>
              <Link
                to="/?page=class"
                onClick={() => setPage({ name: "Classes" })}
              >
                Classes
              </Link>
              <Link
                to="/?page=package"
                onClick={() => setPage({ name: "Packages" })}
              >
                Packages
              </Link>
            </div>
          )}
        </li>
        <li>
          <Link to="" onClick={() => setIsSupSubOpen(!isSupSubOpen)}>
            <span className="material-icons-round">help_outline</span>
            Support
            <span className="material-icons-outlined expand">
              {isSupSubOpen ? "expand_less" : "expand_more"}
            </span>
          </Link>
          {isSupSubOpen && (
            <div className="sub-item">
              <Link
                to="/?page=resources"
                onClick={() => setPage({ name: "Resources" })}
              >
                Resources
              </Link>
              <Link
                to="/?page=help"
                onClick={() => setPage({ name: "Help center" })}
              >
                Help center
              </Link>
              <Link
                to="/?page=contact"
                onClick={() => setPage({ name: "Contact us" })}
              >
                Contact us
              </Link>
            </div>
          )}
        </li>
        <li>
          <Link to="" onClick={() => setIsAccSubOpen(!isAccSubOpen)}>
            <span className="material-icons-round">settings</span>
            Account
            <span className="material-icons-outlined expand">
              {isAccSubOpen ? "expand_less" : "expand_more"}
            </span>
          </Link>
          {isAccSubOpen && (
            <div className="sub-item">
              <Link
                to="/?page=settings"
                onClick={() => setPage({ name: "Settings" })}
              >
                Settings
              </Link>
              <Link
                to="/?page=notification"
                onClick={() => setPage({ name: "Notifications" })}
              >
                Notifications
              </Link>
              <Link
                to="/?page=staff"
                onClick={() => setPage({ name: "Staff" })}
              >
                Staff
              </Link>
              <Link to="/logout">Logout</Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default SideNav;

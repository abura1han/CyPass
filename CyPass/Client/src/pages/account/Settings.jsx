import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BusinessContext from "../../contexts/BusinessContext";
import UserContext from "../../contexts/UserContext";
import "../../styles/Settings.css";

function Settings() {
  const { user } = useContext(UserContext);
  const { business } = useContext(BusinessContext);

  return (
    <div className="settings-page">
      <div className="section acc-info">
        <h4>Account information</h4>
        <div>
          <div>Partner since</div>
          <div>{user.createdAt}</div>
        </div>
        <div>
          <div>Name</div>
          <div>{user.Name}</div>
        </div>
        <div>
          <div>Email</div>
          <div>{user.Email}</div>
        </div>
      </div>
      {business && (
        <div className="section">
          <h4>Locations on CyPass</h4>
          <ul>
            <li>
              <Link to={`/page/${business && business.Name}`}>
                {business.Name}
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div className="section">
        <h4>Change password</h4>
        <div>
          <div>
            <input type="password" placeholder="Old password" />
          </div>
          <div>
            <input type="password" placeholder="New password" />
          </div>
          <div>
            <button className="btn">Save password</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import appConfig from "../config";
import CampaingsContext from "../contexts/Campaings";
import NotificationContext from "../contexts/NotificationContext";

function Campaings() {
  const { campaings, setCampaings } = useContext(CampaingsContext);
  const { setNotification } = useContext(NotificationContext);
  const [camp, setCamp] = useState("Get new members with a 50% discount");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get all campaings
  useState(() => {
    fetch(`${appConfig.serverUrl}api/campaings/all_campaings`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCampaings(data.campaings)); // Update campaings store
  }, []);

  // Create campaings
  function createCampaings() {
    fetch(`${appConfig.serverUrl}api/campaings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({
        Campaings: camp,
        Start_date: startDate,
        End_date: endDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // If token expired
        if (data.error === "Token expired") {
          window.location = "/logout";
        }

        // Get and set validation error to notification
        if (!data.success) {
          setNotification({ type: "error", msg: data.error });
          return;
        }

        // Success
        setCampaings([...campaings, data.campaings]);
        setNotification({ type: "success", msg: "Campaing launched" });
      });
  }

  return (
    <div className="campaings-page">
      <div className="section">
        <h2>Chose campaings to grow you business</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCampaings();
        }}
      >
        <div className="section">
          <div>
            <input
              type="radio"
              name="campaings"
              id="1"
              onChange={() => setCamp("Get new members with a 50% discount")}
              checked={camp === "Get new members with a 50% discount"}
            />
            <label htmlFor="1">Get new members with a 50% discount</label>
          </div>
          <div>
            <input
              type="radio"
              name="campaings"
              id="2"
              onChange={() => setCamp("Grow fast with a general 25% discount")}
              checked={camp === "Grow fast with a general 25% discount"}
            />
            <label htmlFor="2">Grow fast with a general 25% discount</label>
          </div>
        </div>
        {camp && (
          <div style={{ marginTop: "20px", display: "flex" }}>
            <label
              style={{ display: "block", fontSize: "16px", fontWeight: "500" }}
              htmlFor="sd"
            >
              Start date
            </label>
            <input
              style={{
                padding: "8px 14px",
                color: "#313131",
                border: "1px solid #D3D3D3",
              }}
              type="date"
              id="ed"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
            />
            <label
              style={{ display: "block", fontSize: "16px", fontWeight: "500" }}
              htmlFor="ed"
            >
              End date
            </label>
            <input
              style={{
                padding: "8px 14px",
                color: "#313131",
                border: "1px solid #D3D3D3",
              }}
              type="date"
              id="ed"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
            />
          </div>
        )}
        <div>
          <button
            style={{
              padding: "8px 12px",
              color: "white",
              background: "#2F4F4F",
              border: "none",
              marginTop: "10px",
            }}
          >
            Launch campaing
          </button>
        </div>
      </form>
      <div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {campaings ? (
            campaings.map(({ Campaings, Start_date, End_date }, index) => (
              <li
                key={index}
                style={{
                  padding: "8px",
                  boxShadow: "0 0 10px #bebebe",
                }}
              >
                <h4>{Campaings}</h4>
                <div>Start date: {Start_date}</div>
                <div>End date: {End_date}</div>
                <div>
                  Status:{" "}
                  {Start_date > End_date ? (
                    <span style={{ color: "red" }}>
                      This campaing has ended.
                    </span>
                  ) : (
                    <span style={{ color: "green" }}>Active</span>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li>Nothing to show</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Campaings;

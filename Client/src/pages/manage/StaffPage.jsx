import "../../styles/StaffPage.css";
import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import appConfig from "../../config";
import AddStaff from "../../components/AddStaff";
import StaffContext from "../../contexts/StaffContext";
import UpdateStaff from "../../components/UpdateStaff";

function StaffPage() {
  const { staffs, setStaffs } = useContext(StaffContext);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [updateStaff, setUpdateStaff] = useState(false);
  const [staff_id, setStaff_id] = useState("");

  // Delete staff
  function deleteStaff(staffId) {
    fetch(`${appConfig.serverUrl}api/staff/delete/${staffId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === "Token expired") {
          window.location = "/logout";
        }

        // Update staff store
        const updatedStaffs = staffs.filter((e) => e.id !== staffId);
        setStaffs(updatedStaffs);
      });
  }

  return (
    <div className="staff-page">
      <div className="section">
        <h2>Add staff to your account</h2>
        <button
          className={isAddStaffOpen ? "cancel-btn" : "primary-btn"}
          onClick={() => setIsAddStaffOpen(!isAddStaffOpen)}
        >
          {isAddStaffOpen ? "Cancel" : "Add staff"}
        </button>
      </div>
      <div className="section">
        {isAddStaffOpen && <AddStaff />}
        {updateStaff && <UpdateStaff staffId={staff_id} />}
        <ul>
          {staffs &&
            staffs.map(
              ({ id, Name, Email, Phone, Bio, Certification }, index) => (
                <li key={index}>
                  <details>
                    <summary>{Name}</summary>
                    <h4>Name: {Name}</h4>
                    <div>Bio: {Bio}</div>
                    <div>Email: {Email}</div>
                    <div>Phone: {Phone}</div>
                    <div>Certification: {Certification}</div>
                    <div>
                      <button
                        className="cancel-btn"
                        onClick={() => deleteStaff(id)}
                      >
                        Delete
                      </button>
                      <button
                        className="primary-btn"
                        onClick={() => {
                          setStaff_id(id);
                          setUpdateStaff(!updateStaff);
                        }}
                      >
                        {updateStaff ? "Close" : "Edit"}
                      </button>
                    </div>
                  </details>
                </li>
              )
            )}
        </ul>
        <div className="staff-info"></div>
      </div>
    </div>
  );
}

export default StaffPage;

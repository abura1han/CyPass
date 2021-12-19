import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import appConfig from "../config";
import NotificationContext from "../contexts/NotificationContext";
import StaffContext from "../contexts/StaffContext";
import "../styles/AddStaff.css";

function AddStaff() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [certification, setCertification] = useState("");
  const [privilege, setPrivilege] = useState("Trainer");

  const { staffs, setStaffs } = useContext(StaffContext);
  const { setNotification } = useContext(NotificationContext);

  // Create staff profile
  function addStaff() {
    if (name && email) {
      fetch(`${appConfig.serverUrl}api/staff/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Phone: phone ? phone : null,
          Bio: bio ? bio : null,
          Certification: certification ? certification : null,
          Previllage: privilege,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error === "Token expired") {
            window.location = "/logout";
            return;
          }

          setStaffs([...staffs, data.data]);
          setNotification({
            type: "success",
            msg: "New staff added to your profile",
          });
        });
    } else {
      setNotification({ type: "error", msg: "Name and email is required" });
    }
  }

  console.log(phone);

  return (
    <div className="add-staff">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addStaff();
        }}
      >
        <div>
          <label htmlFor="Previllage">Privilege</label>
          <select onChange={(e) => setPrivilege(e.target.value)}>
            <option selected={privilege === "Trainer"}>Trainer</option>
            <option selected={privilege === "Account manager"}>
              Account manager
            </option>
            <option selected={privilege === "Owener"}>Owener</option>
          </select>
        </div>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            id="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            id="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="Phone">Phone</label>
          <input
            id="Phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div>
          <label htmlFor="Bio">Bio</label>
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          ></textarea>
        </div>
        <div>
          <label htmlFor="Certification">Certification</label>
          <textarea
            onChange={(e) => setCertification(e.target.value)}
            value={certification}
          ></textarea>
        </div>
        <div>
          <button type="submit" className="primary-btn">
            Create staff profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStaff;

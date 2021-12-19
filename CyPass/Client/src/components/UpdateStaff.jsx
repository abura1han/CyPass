import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import appConfig from "../config";
import NotificationContext from "../contexts/NotificationContext";
import StaffContext from "../contexts/StaffContext";
import "../styles/AddStaff.css";

function UpdateStaff({ staffId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [certification, setCertification] = useState("");
  const [previllage, setPrevillage] = useState("Trainer");

  const { staffs, setStaffs } = useContext(StaffContext);
  const { setNotification } = useContext(NotificationContext);

  // Set previous values
  useEffect(() => {
    const prevStaff = staffs.find((e) => e.id === staffId);

    setName(prevStaff.Name);
    setEmail(prevStaff.Email);
    setPhone(prevStaff.Phone);
    setBio(prevStaff.Bio);
    setCertification(prevStaff.Certification);
  }, [staffs, staffId]);

  // Update staff profile
  function updateStaff() {
    if (name && email) {
      fetch(`${appConfig.serverUrl}api/staff/update/${staffId}`, {
        method: "PUT",
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
          Previllage: previllage,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error === "Token expired") {
            window.location = "/logout";
            return;
          }

          const prevStaff = staffs.filter((e) => e.id !== staffId);
          setStaffs([
            ...prevStaff,
            {
              id: staffId,
              Avatar: "",
              Name: name,
              Email: email,
              Phone: phone,
              Bio: bio,
              Certification: certification,
              Previllage: previllage,
            },
          ]);

          setNotification({ type: "success", msg: "Staff updated" });
        });
    } else {
      setNotification({ type: "error", msg: "Name and email is required" });
    }
  }

  return (
    <div className="add-staff">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateStaff();
        }}
      >
        <div>
          <label htmlFor="Previllage">Previllage</label>
          <select onChange={(e) => setPrevillage(e.target.value)}>
            <option selected={previllage === "Trainer"}>Trainer</option>
            <option selected={previllage === "Account manager"}>
              Account manager
            </option>
            <option selected={previllage === "Owener"}>Owener</option>
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
            onChange={(e) => setBio(e.target.value ? e.target.value : "")}
            defaultValue={bio}
          ></textarea>
        </div>
        <div>
          <label htmlFor="Certification">Certification</label>
          <textarea
            onChange={(e) =>
              setCertification(e.target.value ? e.target.value : "")
            }
            defaultValue={certification}
          ></textarea>
        </div>
        <div>
          <button type="submit" className="primary-btn">
            Update staff profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateStaff;

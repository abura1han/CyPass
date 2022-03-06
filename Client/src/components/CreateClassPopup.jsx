import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import appConfig from "../config";
import ClassContext from "../contexts/ClassContext";
import NotificationContext from "../contexts/NotificationContext";

function CreateClassPopup() {
  const { classes, setClasses } = useContext(ClassContext);
  const { setNotification } = useContext(NotificationContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function createClass() {
    if (name && description) {
      fetch(`${appConfig.serverUrl}api/class/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("access_token")}`,
        },
        body: JSON.stringify({
          Name: name,
          Description: description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error === "Token expired") {
            window.location = "/logout";
          }
          setClasses([...classes, data.data]);
          setNotification({
            type: "success",
            msg: "Class creation successful",
          });
        });
    }
  }

  return (
    <div className="create-class-popup">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createClass();
        }}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>
        <div>
          <button className="primary-btn">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateClassPopup;

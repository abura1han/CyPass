import "../../styles/ClassPage.css";
import Cookies from "js-cookie";
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import appConfig from "../../config";
import ClassContext from "../../contexts/ClassContext";
import CreateClassPopup from "../../components/CreateClassPopup";
import NotificationContext from "../../contexts/NotificationContext";

function ClassPage() {
  const { classes, setClasses } = useContext(ClassContext);
  const { setNotification } = useContext(NotificationContext);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [classLocation, setClassLcation] = useState("At my business address");
  const [categories, setCategories] = useState("Activities");
  const [howtoPrepare, setHowtoPrepare] = useState("You are prepaired.");
  const [isFree, setIsFree] = useState(false);
  const [resirvations, setReservations] = useState(true);
  const [selectedClass, setSelectedClass] = useState({});
  const [isClassOpen, setIsClassOpen] = useState(false);

  useEffect(() => {
    setId(selectedClass.id ? selectedClass.id : "");
    setName(selectedClass.Name ? selectedClass.Name : "");
    setDescription(selectedClass.Description ? selectedClass.Description : "");
    setClassLcation(selectedClass.Location ? selectedClass.Location : "");
    setCategories(selectedClass.Categories ? selectedClass.Categories : "");
    setHowtoPrepare(
      selectedClass.Howto_prepare
        ? selectedClass.Howto_prepare
        : "You are prepaired."
    );
    setIsFree(selectedClass.Is_free);
    setReservations(selectedClass.Reservation);
  }, [selectedClass]);

  // Update class
  function classUpdate() {
    fetch(`${appConfig.serverUrl}api/class/update?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({
        Name: name ? name : classes[id].Name,
        Description: description ? description : classes[id].Description,
        Location: classLocation ? classLocation : classes[id].Location,
        Categories: categories ? categories : classes[id].Categories,
        Howto_prepare: howtoPrepare ? howtoPrepare : classes[id].Howto_prepare,
        Is_free: isFree,
        Reservation: resirvations,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setNotification({
            type: "error",
            msg: data.error,
          });
          return;
        }

        fetch(`${appConfig.serverUrl}api/class/all_classes`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (!data.success) {
              setNotification({
                type: "error",
                msg: "An error occurred please refresh the page",
              });
              return;
            }

            setClasses(data.classes);
            setNotification({
              type: "success",
              msg: "Class updated",
            });
          });
      });
  }

  return (
    <div className="class-page">
      <div className="head">
        <h2>Edit your class information</h2>
        <button
          className={!isClassOpen ? "primary-btn" : "cancel-btn"}
          onClick={() => setIsClassOpen(!isClassOpen)}
        >
          {!isClassOpen ? "Add new class" : "Close"}
        </button>
      </div>
      <p>Add all classes descriptions and tags for each of your classes.</p>
      {isClassOpen && <CreateClassPopup />}
      {!isClassOpen && (
        <div className="class-list">
          <ul>
            {classes.map(
              (
                {
                  id,
                  Name,
                  Description,
                  Categories,
                  Location,
                  Is_enabled,
                  Is_free,
                  Howto_prepare,
                  Reservation,
                },
                index
              ) => (
                <li
                  key={index}
                  data-classid={id}
                  onClick={() =>
                    setSelectedClass({
                      id,
                      Name,
                      Description,
                      Categories,
                      Location,
                      Is_enabled,
                      Is_free,
                      Howto_prepare,
                      Reservation,
                    })
                  }
                >
                  <Link to="/">{Name}</Link>
                  <div>{Description}</div>
                  <div>{Is_enabled ? "Enabled" : "Disabled"}</div>
                  <div>{Is_free ? "free" : "Paid"}</div>
                </li>
              )
            )}
          </ul>
          {selectedClass.Name && (
            <div className="class-info">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  classUpdate();
                }}
              >
                <div className="section">
                  <h4>
                    Class name <span className="marked">Required</span>
                  </h4>
                  <input
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="section">
                  <h4>
                    Description <span className="marked">Required</span>
                  </h4>
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>
                <div className="section">
                  <h4>Class location</h4>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="class-location"
                        onChange={() =>
                          setClassLcation("At my business address")
                        }
                        checked={classLocation === "At my business address"}
                      />
                      <span>At my business address</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="class-location"
                        onChange={() => setClassLcation("Outdoors")}
                        checked={classLocation === "Outdoors"}
                      />
                      <span>Outdoors</span>
                    </label>
                  </div>
                </div>
                <div className="section">
                  <h4>Categories</h4>
                  <div className="info">
                    Adding categories to your class allows users to find you
                    easily. Choose an Activity and Category Tags which best
                    describe the class.
                  </div>
                  <div>
                    <select
                      onChange={(e) => setCategories(e.target.value)}
                      value={categories}
                    >
                      <option>Activities</option>
                      <option>Beauty</option>
                      <option>Culture {"&"} Entertainment</option>
                      <option>Experiences</option>
                      <option>Sports {"&"} Recreation</option>
                    </select>
                  </div>
                </div>
                <div className="section">
                  <h4>How to prepare</h4>
                  <div className="info">
                    Include what to bring, what to wear, and anything else a
                    client should know before coming to class. Members will
                    receive an email with this information after they make a
                    reservation.
                  </div>
                  <div>
                    <textarea
                      onChange={(e) => setHowtoPrepare(e.target.value)}
                      defaultValue={howtoPrepare}
                    ></textarea>
                  </div>
                </div>
                <div className="section">
                  <h4>Free class</h4>
                  <div className="info">
                    ClassPass members will see your class offered for 0 credits
                    and you will receive $0 payout for free class reservations.
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => setIsFree(!isFree)}
                      checked={isFree}
                    />
                    <span>{isFree ? "Free" : "Paid"}</span>
                  </div>
                </div>
                <div className="section">
                  <h4>Reservations</h4>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => setReservations(!resirvations)}
                      checked={resirvations}
                    />
                    <span>{resirvations ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
                <div className="section">
                  <button className="primary-btn" type="submit">
                    Update class
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ClassPage;

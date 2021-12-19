import "../../styles/Schedule.css";
import "../../styles/ScheduleSettings.css";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import appConfig from "../../config";
import CreateSchedulePopup from "../../components/CreateSchedulePopup";
import UpdateSchedulePopup from "../../components/UpdateSchedulePopup";
import ClassContext from "../../contexts/ClassContext";
import NotificationContext from "../../contexts/NotificationContext";
import ScheduleContext from "../../contexts/ScheduleContext";

function ScheduleSettings() {
  const { setNotification } = useContext(NotificationContext);
  const { schedules, setSchedules } = useContext(ScheduleContext);
  const { classes } = useContext(ClassContext);
  const [scheduleId, setScheduleId] = useState("");
  const [newSchedule, setNewSchedule] = useState(false);
  const [updateSchedule, setUpdateSchedule] = useState(false);

  // Delete class schedule
  function deleteClassSchedule(id) {
    fetch(`${appConfig.serverUrl}api/schedule/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === "Token expired") {
          window.location.reload();
        }

        setSchedules(schedules.filter((e) => e.id !== id));
        setNotification({
          type: "success",
          msg: "Schedule removed",
        });
      });
  }

  return (
    <div className="schedule-settings-page schedule-page">
      <div className="head">
        {!newSchedule && (
          <>
            <span>Date</span>
            <span>
              <input type="date" />
            </span>
          </>
        )}
        <span>
          <button
            className={`primary-btn ${newSchedule && "back-btn"}`}
            onClick={() => setNewSchedule(!newSchedule)}
          >
            {newSchedule ? "Back" : "Add class schedule"}
          </button>
          {newSchedule && (
            <button className="primary-btn">Save {"&"} publish</button>
          )}
        </span>
      </div>

      {newSchedule && <CreateSchedulePopup />}
      {updateSchedule && <UpdateSchedulePopup schedule_id={scheduleId} />}
      <div className="class-list">
        <ul>
          {!newSchedule &&
            schedules.map(
              (
                {
                  id,
                  Class_type,
                  Staff,
                  Start_date,
                  End_date,
                  Start_time,
                  Capacity,
                  Duration,
                  Repeat_on,
                  ClassId,
                },
                index
              ) => (
                <li key={index} data-classid={ClassId}>
                  <details>
                    <summary>
                      {classes.map((e) => (e.id === ClassId ? e.Name : ""))}
                    </summary>
                    <h4>
                      Clas name:{" "}
                      {classes.map((e) => (e.id === ClassId ? e.Name : ""))}
                    </h4>
                    <div>Class type: {Class_type}</div>
                    <div>Start date: {Start_date}</div>
                    {End_date && <div>End date: {End_date}</div>}
                    <div>Start time: {Start_time}</div>
                    <div>Duration: {Duration}</div>
                    <div>Repeat on: {Repeat_on}</div>
                    {Start_date > End_date ? (
                      <h4
                        style={{
                          padding: "4px",
                          background: "red",
                          color: "white",
                        }}
                      >
                        This schedule has ended.
                      </h4>
                    ) : (
                      <div
                        style={{
                          background: "green",
                          color: "white",
                          padding: "4px",
                        }}
                      >
                        Active
                      </div>
                    )}
                    <button
                      className="cancel-btn"
                      onClick={() => deleteClassSchedule(id)}
                    >
                      Remove
                    </button>
                    <button
                      className="primary-btn"
                      onClick={() => {
                        setUpdateSchedule(!updateSchedule);
                        setScheduleId(id);
                      }}
                      disabled={Start_date > End_date}
                    >
                      {updateSchedule ? "Close" : "Edit"}
                    </button>
                  </details>
                </li>
              )
            )}
          {schedules.length < 1 && <li>Nothing to show</li>}
        </ul>
      </div>
    </div>
  );
}

export default ScheduleSettings;

// Schedule page

import "../styles/Schedule.css";
import React, { useContext } from "react";
import ClassContext from "../contexts/ClassContext";
import ScheduleContext from "../contexts/ScheduleContext";
import UserContext from "../contexts/UserContext";

function Schedule() {
  const { schedules } = useContext(ScheduleContext);
  const { classes } = useContext(ClassContext);
  const { user } = useContext(UserContext);

  return (
    <div className="schedule-page">
      <div className="head">
        <span>Date</span>
        <span>
          <input type="date" />
        </span>
      </div>
      <div className="class-list">
        <ul>
          {schedules &&
            schedules.map(
              (
                {
                  ClassId,
                  Class_type,
                  Start_date,
                  End_date,
                  Start_time,
                  Repeat_on,
                  Duration,
                  Staff,
                },
                index
              ) => (
                <li key={index}>
                  <div>
                    {classes.map((e, key) =>
                      e.id === ClassId ? (
                        <div className="class-name" key={key}>
                          {e.Name}
                        </div>
                      ) : (
                        ""
                      )
                    )}
                    <div className="start-date">Class type: {Class_type}</div>
                    <div className="start-date">Date: {Start_date}</div>
                    <div className="start-time">Time: {Start_time}</div>
                    <div className="repeat-on">Repeate on: {Repeat_on}</div>
                    <div className="duration">Duration: {Duration}</div>
                    <div className="staff">
                      Staff: {Staff ? Staff : user.Name}
                    </div>
                    <div>
                      Status:{" "}
                      {Start_date > End_date ? (
                        <span style={{ color: "red", fontWeight: "500" }}>
                          This schedule has ended.
                        </span>
                      ) : (
                        <span style={{ color: "green", fontWeight: "500" }}>
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              )
            )}
          {schedules && schedules.length < 1 && <li>Nothing to show</li>}
        </ul>
      </div>
    </div>
  );
}

export default Schedule;

import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import appConfig from "../config";
import ClassContext from "../contexts/ClassContext";
import StaffContext from "../contexts/StaffContext";
import ScheduleContext from "../contexts/ScheduleContext";
import NotificationContext from "../contexts/NotificationContext";
import "../styles/CreateSchedulePopup.css";
import { useEffect } from "react/cjs/react.development";

function UpdateSchedulePopup({ schedule_id }) {
  const { classes } = useContext(ClassContext);
  const { staffs } = useContext(StaffContext);
  const { setNotification } = useContext(NotificationContext);
  const { schedules, setSchedules } = useContext(ScheduleContext);

  const [classType, setClassType] = useState("Recurring");
  const [classId, setClassId] = useState(0);
  const [staff, setStaff] = useState("");
  const [capacity, setCapacity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repeatOn, setRepeatOn] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");

  // Set all default value
  useEffect(() => {
    const schedule = schedules.find((e) => e.id === schedule_id);
    setClassType(schedule.Class_type);
    setClassId(schedule.ClassId);
    setCapacity(schedule.Capacity);
    setStartDate(schedule.Start_date);
    setEndDate(schedule.End_date);
    setRepeatOn(String(schedule.Repeat_on).split(","));
    setStartTime(schedule.Start_time);
    setDuration(schedule.Duration);
  }, [schedule_id, schedules]);

  function updateSchedule() {
    if (!classId) {
      setNotification({ type: "error", msg: "Class name is required" });
      return;
    }
    fetch(`${appConfig.serverUrl}api/schedule/update/${schedule_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
      body: JSON.stringify({
        Class_type: classType,
        ClassId: classId,
        Staff: staff ? staff : null,
        Start_date: startDate,
        End_date: endDate ? endDate : null,
        Start_time: startTime,
        Capacity: capacity ? capacity : null,
        Duration: duration,
        Repeat_on: repeatOn ? repeatOn.toString() : null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // If token expired
        if (data.error === "Token expired") {
          window.location = "/logout";
        }
        if (!data.success) {
          setNotification({ type: "error", msg: data.error[0].msg });
          return;
        }

        // Get all schedles
        fetch(`${appConfig.serverUrl}api/schedule/all_schedules`, {
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
            setSchedules(data.scheduled_items);
          });

        setNotification({ type: "success", msg: "Schedule updated." });
      });
  }

  // Repeat on controller
  const repeatOnController = (value) => {
    if (!repeatOn.includes(value)) {
      setRepeatOn([...repeatOn, value]);
    } else {
      const list = repeatOn.filter((e) => e !== value);
      setRepeatOn(list);
    }
  };

  return (
    <div className="create-new-schedule-popup">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateSchedule();
        }}
      >
        <div className="body">
          <div className="section">
            <h4>Class type</h4>
            <div className="opt">
              <label>
                <input
                  type="radio"
                  name="class-type"
                  onChange={() => setClassType("Recurring")}
                  checked={classType === "Recurring"}
                />
                <span>Recurring</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="class-type"
                  onChange={() => setClassType("On-time")}
                  checked={classType === "On-time"}
                />
                <span>On-time</span>
              </label>
            </div>
          </div>
          <div className="section input-box">
            <h4>Class</h4>
            <div className="opt">
              <select onChange={(e) => setClassId(e.target.value)}>
                {classes &&
                  classes.map(({ id, Name }) => (
                    <option key={id} data-classid={id} value={id}>
                      {Name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="section input-box">
            <h4>Staff</h4>
            <div className="opt">
              <select onSelect={(e) => setStaff(e.currentTarget)}>
                {staffs.map(({ id, Name }, index) => (
                  <option key={index} data-staffid={id}>
                    {Name}
                  </option>
                ))}
                {staffs.length < 1 && <option>No staffs found</option>}
              </select>
            </div>
          </div>
          <div className="section input-box">
            <h4>Capacity</h4>
            <div className="opt">
              <input
                type="text"
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="0-100"
                value={capacity}
              />
            </div>
          </div>
          <div className="section input-box">
            <h4>Start date</h4>
            <div className="opt">
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
            </div>
          </div>
          <div className="section input-box">
            <h4>End date</h4>
            <div className="opt">
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </div>
          </div>
          <div className="section repeat-on">
            <h4>Repeat on</h4>
            <div className="opt">
              <button
                type="button"
                className={repeatOn.includes("Sun") ? "btn selected" : "btn"}
                onClick={(e) => repeatOnController(e.target.innerText)}
              >
                Sun
              </button>
              <button
                type="button"
                className={repeatOn.includes("Mon") ? "btn selected" : "btn"}
                onClick={(e) => repeatOnController(e.target.innerText)}
              >
                Mon
              </button>
              <button
                type="button"
                className={repeatOn.includes("Tue") ? "btn selected" : "btn"}
                onClick={(e) => repeatOnController(e.target.innerText)}
              >
                Tue
              </button>
              <button
                type="button"
                className={repeatOn.includes("Wed") ? "btn selected" : "btn"}
                onClick={(e) => repeatOnController(e.target.innerText)}
              >
                Wed
              </button>
              <button
                type="button"
                className={repeatOn.includes("Thu") ? "btn selected" : "btn"}
                onClick={(e) => repeatOnController(e.target.innerText)}
              >
                Thu
              </button>
              <button
                type="button"
                className={repeatOn.includes("Fri") ? "btn selected" : "btn"}
                onClick={(e) => repeatOnController(e.target.innerText)}
              >
                Fri
              </button>
              <button
                type="button"
                className={repeatOn.includes("Sat") ? "btn selected" : "btn"}
                onClick={(e) => repeatOnController(e.target.innerText)}
              >
                Sat
              </button>
            </div>
          </div>
          <div className="section input-box">
            <h4>Start time</h4>
            <div className="opt">
              <input
                type="time"
                onChange={(e) => setStartTime(e.target.value)}
                value={startTime}
              />
            </div>
          </div>
          <div className="section input-box">
            <h4>Duration</h4>
            <div className="opt duration">
              <input
                type="number"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                placeholder="0m"
              />
            </div>
          </div>
          <div className="section">
            <button className="primary-btn" type="submit">
              Update schedule
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateSchedulePopup;

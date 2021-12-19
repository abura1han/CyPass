import Cookies from "js-cookie";
import React, { useEffect, useContext } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import PageContext from "../contexts/PageContext";
import "../styles/Dashboard.css";
import BusinessProfile from "./manage/BusinessProfile";
import ClassPage from "./manage/ClassPage";
import HomePage from "./HomePage";
import Settings from "./account/Settings";
import Schedule from "./Schedule";
import ScheduleSettings from "./manage/ScheduleSettings";
import ScheduleContext from "../contexts/ScheduleContext";
import appConfig from "../config";
import UserContext from "../contexts/UserContext";
import BusinessContext from "../contexts/BusinessContext";
import NotificationContext from "../contexts/NotificationContext";
import ClassContext from "../contexts/ClassContext";
import StaffPage from "./manage/StaffPage";
import StaffContext from "../contexts/StaffContext";
import Campaings from "./Campaings";

function Dashboard() {
  const { page } = useContext(PageContext);
  const { setSchedules } = useContext(ScheduleContext);
  const { setStaffs } = useContext(StaffContext);
  const { setUser } = useContext(UserContext);
  const { setBusiness } = useContext(BusinessContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const { setClasses } = useContext(ClassContext);

  useEffect(() => {
    //   Check is logged in
    const token = Cookies.get("access_token");
    if (!token) {
      window.location = "/login";
    }
  });

  // Get user info
  useEffect(() => {
    fetch(`${appConfig.serverUrl}api/my_info`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success && data.error === "Token expired") {
          window.location = "/logout";
        }
        console.log(data);
        setUser(data.data);
        setBusiness(data.data.Business_profile);
      });
  }, [setBusiness, setUser]);

  //Get all scheduled classes
  useEffect(() => {
    fetch(`${appConfig.serverUrl}api/schedule/all_schedules`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSchedules(data.scheduled_items);
      });
  }, [setSchedules]);

  // Get all classes
  useEffect(() => {
    fetch(`${appConfig.serverUrl}api/class/all_classes`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClasses(data.classes);
      });
  }, [setClasses]);

  useEffect(() => {
    notification && setTimeout(() => setNotification(null), 5000);
  }, [notification, setNotification]);

  // Get all staffs
  useEffect(() => {
    fetch(`${appConfig.serverUrl}api/staff/all_staffs`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === "Token expired") {
          window.location = "/logout";
          return;
        }

        setStaffs(data.staffs);
      });
  }, [setStaffs]);

  return (
    <div className="dashboard">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.msg}
        </div>
      )}
      <SideNav />
      <div className="dash-area">
        <Header />
        {page.name === "Home" ? <HomePage /> : null}
        {page.name === "Schedule" ? <Schedule /> : null}
        {page.name === "Campaings" ? <Campaings /> : null}
        {page.name === "Business profile" ? <BusinessProfile /> : null}
        {page.name === "Schedule settings" ? <ScheduleSettings /> : null}
        {page.name === "Classes" ? <ClassPage /> : null}
        {page.name === "Staff" ? <StaffPage /> : null}
        {page.name === "Settings" ? <Settings /> : null}
      </div>
    </div>
  );
}

export default Dashboard;

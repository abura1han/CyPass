import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import PageContext from './contexts/PageContext';
import UserContext from './contexts/UserContext';
import BusinessContext from './contexts/BusinessContext';
import ScheduleContext from './contexts/ScheduleContext';
import StaffContext from './contexts/StaffContext';
import NotificationContext from './contexts/NotificationContext';
import ClassContext from './contexts/ClassContext';
import ClientPage from './pages/client/ClientPage';
import CampaingsContext from './contexts/Campaings';

function App() {
  const [page, setPage] = useState({ name: "Home" });
  const [user, setUser] = useState("");
  const [business, setBusiness] = useState("");
  const [classes, setClasses] = useState("");
  const [campaings, setCampaings] = useState([]);
  const [staffs, setStaffs] = useState("");
  const [schedules, setSchedules] = useState("");
  const [notification, setNotification] = useState('');

  return (
    <div className="App">
      <PageContext.Provider value={{ page, setPage }}>
        <UserContext.Provider value={{ user, setUser }}>
          <BusinessContext.Provider value={{ business, setBusiness }}>
            <ClassContext.Provider value={{ classes, setClasses }}>
              <StaffContext.Provider value={{ staffs, setStaffs }}>
                <ScheduleContext.Provider value={{ schedules, setSchedules }}>
                  <CampaingsContext.Provider value={{ campaings, setCampaings }}>
                    <NotificationContext.Provider value={{ notification, setNotification }}>
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/page/:profileName" element={<ClientPage />} />
                          <Route path="/logout" element={<Logout />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          <Route path="*" element={<><h2>404 page not found</h2></>} />
                        </Routes>
                      </BrowserRouter>
                    </NotificationContext.Provider>
                  </CampaingsContext.Provider>
                </ScheduleContext.Provider>
              </StaffContext.Provider>
            </ClassContext.Provider>
          </BusinessContext.Provider>
        </UserContext.Provider>
      </PageContext.Provider>
    </div>
  );
}

export default App;

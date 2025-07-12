import React, { useContext } from "react";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import CalenderView from "./components/CalenderView";
import "react-calendar/dist/Calendar.css";
import AppoimentForm from "./components/AppoimentForm";
import Appoiments from "./components/Appoiments";
import { Context } from "./context/Contex";
import ProtectedRoute from "./components/ProtectedRoute";
const App = () => {
  const { user } = useContext(Context);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute user={user}/>}>
          <Route path="/calendarView" element={<CalenderView />} />
          <Route path="/appointments" element={<Appoiments />} />
          <Route path="/appointments/add" element={<AppoimentForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Contex";
import doctors from "../data/doctors.json";
import { useLocation, useNavigate } from "react-router-dom";

const AppoimentForm = () => {
  const { selectedDate, appointments, setAppointments } = useContext(Context);
  const [patientName, setPatientName] = useState("");
  const [doctorsName, setDoctorsName] = useState("");
  const [time, setTime] = useState("");
  const [editingId, setEditingId] = useState(null);
  const loaction = useLocation();
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
   if (editingId) {
   
    const updatedAppointments = appointments.map(item =>
      item.id === editingId
        ? {
            ...item,
            patientName,
            doctorsName,
            time
          }
        : item
    );
    setAppointments(updatedAppointments);
  } else {

    const newAppoiment = {
      id: Date.now(),
      patientName,
      doctorsName,
      time,
      date: selectedDate
    };
    setAppointments([...appointments, newAppoiment]);
  }
    setPatientName("");
    setDoctorsName("");
    setTime("");
    navigate('/appointments')
  };
  useEffect(() => {
    if (loaction.state) {
      const { getCurrentItem } = loaction.state;
      setPatientName(getCurrentItem.patientName);
      setDoctorsName(getCurrentItem.doctorsName);
      setTime(getCurrentItem.time);
      setEditingId(getCurrentItem.id);
    }
  },[]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Fill The Details</h3>
        <label htmlFor="patientName">Enter patient Name</label>
        <input
          id="patientName"
          type="text"
          placeholder="enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <label htmlFor="doctorName">selectDoctor</label>
        <select
          id="doctorName"
          value={doctorsName}
          onChange={(e) => setDoctorsName(e.target.value)}
        >
          <option value="">Select Doctor</option>
          {doctors.map((dr, index) => (
            <option key={index}>{dr.name}</option>
          ))}
        </select>
        <label htmlFor="time">slect time</label>
        <input
          type="time"
          id="time"
          placeholder="select Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default AppoimentForm;

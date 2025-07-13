import  { useContext, useEffect, useState } from "react";
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedAppointments = appointments.map((item) =>
        item.id === editingId
          ? {
              ...item,
              patientName,
              doctorsName,
              time,
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
        date: selectedDate,
      };
      setAppointments([...appointments, newAppoiment]);
    }
    setPatientName("");
    setDoctorsName("");
    setTime("");
    navigate("/appointments");
  };
  useEffect(() => {
    if (loaction.state) {
      const { getCurrentItem } = loaction.state;
      setPatientName(getCurrentItem.patientName);
      setDoctorsName(getCurrentItem.doctorsName);
      setTime(getCurrentItem.time);
      setEditingId(getCurrentItem.id);
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white p-2 flex items-center justify-center md:p-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-black rounded-xl shadow-md p-2 w-full  flex flex-col gap-4 md:p-2 md:max-w-[500px] md: mx-auto"
      >
        <h3 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">
          Fill The Details
        </h3>

        <div>
          <label
            htmlFor="patientName"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Patient Name
          </label>
          <input
            id="patientName"
            type="text"
            placeholder="Enter patient name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white text-black dark:bg-black dark:text-white focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="doctorName"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Select Doctor
          </label>
          <select
            id="doctorName"
            value={doctorsName}
            onChange={(e) => setDoctorsName(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white text-black dark:bg-black dark:text-white focus:outline-none"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((dr, index) => (
              <option key={index}>{dr.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="time"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Select Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white text-black dark:bg-black dark:text-white focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-md shadow hover:bg-gray-800 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AppoimentForm;

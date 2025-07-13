import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Contex";
import { MdEdit, MdDelete } from "react-icons/md";

const Appoiments = () => {
  const { selectedDate, appointments, setAppointments } = useContext(Context);
  const [currentDateProducts, setCurrenDateProducts] = useState([]);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const updated = appointments.filter((item) => item.id !== id);
    setAppointments(updated);
  };
  const handleEdit = (getCurrentItem) => {
    navigate("/appointments/add", { state: { getCurrentItem } });
  };
  useEffect(() => {
    if (selectedDate) {
      const filtered = appointments.filter(
        (item) => item.date === selectedDate
      );
      setCurrenDateProducts(filtered);
    }
  }, [appointments, selectedDate]);
  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-black">
      <div className="flex justify-between items-center mb-6">
        <Link
          to="/appointments/add"
          className="px-6 py-3 bg-black text-white rounded-md shadow dark:bg-white dark:text-black"
        >
          New
        </Link>
        <Link
          to="/calendarView"
          className="px-6 py-3 bg-black text-white rounded-md shadow dark:bg-white dark:text-black"
        >
          Back
        </Link>
      </div>

      {currentDateProducts?.length === 0 ? (
        <h1 className="text-xl font-semibold text-center text-black dark:text-white">
          No Appointments on {selectedDate}
        </h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
            Appointments on {selectedDate}
          </h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentDateProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-2 justify-between"
              >
                <div>
                  <p className="text-gray-500 text-sm mb-1">Patient</p>
                  <p className="text-lg font-semibold">{item.patientName}</p>

                  <p className="text-gray-500 text-sm mb-1">Doctor</p>
                  <p className="text-base font-medium">{item.doctorsName}</p>

                  <p className="text-gray-500 text-sm mb-1">Time</p>
                  <p className="text-base">{item.time}</p>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 dark:bg-black dark:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-full px-4 py-2 border rounded-md text-sm text-gray-700 dark:bg-black dark:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Appoiments;

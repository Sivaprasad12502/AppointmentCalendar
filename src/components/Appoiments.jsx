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
      const filtered = appointments.filter((item) => item.date === selectedDate);
      setCurrenDateProducts(filtered);
    }
  }, [appointments, selectedDate]);
  return (
    <div>
      <button>
        <Link to={"/appointments/add"}>new</Link>
      </button>
      <button>
        <Link to={"/calendarView"}>back</Link>
      </button>

      <div>
        {currentDateProducts?.length == 0 ? (
          <div>
            <h1>NO Appoiments on {selectedDate}</h1>
          </div>
        ) : (
          <>
            <h1>Appoiments on {selectedDate}</h1>
            {currentDateProducts?.map((item, index) => (
              <div key={item.id}>
                <p>{item.patientName}</p>
                <p>{item.doctorsName}</p>
                <p>{item.time}</p>
                <span>
                  <MdEdit size={30} onClick={() => handleEdit(item)} />
                  <MdDelete size={30} onClick={() => handleDelete(item.id)} />
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Appoiments;

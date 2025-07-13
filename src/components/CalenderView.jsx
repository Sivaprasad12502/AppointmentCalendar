import  { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Contex";
const CalenderView = () => {
  const { selectedDate, setSelectedDate, darkMode, setDarkMode } =
    useContext(Context);
  const [value, setValue] = useState(new Date());
  const [userHasClicked, setUserHasClicked] = useState(false);

  const navigate = useNavigate();
  const handleDayClick = (date) => {
    setSelectedDate(date.toLocaleDateString("en-CA"));
    setUserHasClicked(true);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    if (userHasClicked && selectedDate !== "") navigate("/appointments");
  }, [selectedDate, userHasClicked]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-white p-8">
      <button
        onClick={toggleDarkMode}
        className="mb-8 px-4 py-2 border rounded bg-black text-white dark:bg-white dark:text-black"
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <div className="w-full flex flex-col items-center text-center">
        <h1 className="text-2xl mb-4 font-bold">Select a Date to See Appointments</h1>
        <Calendar
          onChange={setValue}
          value={value}
          minDate={new Date()}
          onClickDay={(date) => {
            handleDayClick(date);
          }}
          
          className="rounded-md shadow-md bg-white text-black dark:bg-blue-950 dark:text-white text-lg"
        />
      </div>
    </div>
  );
};

export default CalenderView;

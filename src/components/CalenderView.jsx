import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Contex";
const CalenderView = () => {
  const { selectedDate, setSelectedDate } = useContext(Context);
  const [value, setValue] = useState(new Date());
  const [userHasClicked, setUserHasClicked] = useState(false);

  const navigate = useNavigate();
  const handleDayClick = (date) => {
    setSelectedDate(date.toLocaleDateString("en-CA"));
    setUserHasClicked(true);
  };
  useEffect(() => {
    if (userHasClicked && selectedDate !== "") navigate("/appointments");
  }, [selectedDate, userHasClicked]);
  return (
    <div>
      <div>
        <h1>Select a Date to See Appoiments</h1>
        <Calendar
          onCahnge={setValue}
          value={value}
          minDate={new Date()}
          onClickDay={(date) => {
            handleDayClick(date);
          }}
        />
      </div>
    </div>
  );
};

export default CalenderView;

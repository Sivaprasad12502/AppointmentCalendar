import { createContext, useEffect, useState } from "react";

export const Context = createContext();
const ContextProvider = (props) => {
  const [appointments, setAppointments] = useState(()=>{
    const saved=localStorage.getItem('appointments');
    return saved?JSON.parse(saved):[];
  });
  const [selectedDate,setSelectedDate]=useState(()=>{
    const saved=localStorage.getItem('selectedDate')
    return saved ? saved:'';
  })
  const [user,setUser]=useState(false)
  useEffect(()=>{
    localStorage.setItem('appointments',JSON.stringify(appointments))
  },[appointments])
  useEffect(()=>{
    localStorage.setItem('selectedDate',selectedDate)
  },[selectedDate])
  const value = {
    appointments,
    setAppointments,
    selectedDate,
    setSelectedDate,
    user,
    setUser
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
export default ContextProvider;

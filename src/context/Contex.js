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
  const [darkMode,setDarkMode]=useState(()=>{
    const saved=localStorage.getItem('theme')
    if(saved) return saved==='dark'
  })
  useEffect(()=>{
    const html=document.documentElement;
    if(darkMode){
      html.classList.add('dark')
      localStorage.setItem('theme','dark')
    }else{
      html.classList.remove('dark');
      localStorage.setItem('theme','light')
    }
  },[darkMode])
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
    setUser,
    darkMode,
    setDarkMode
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
export default ContextProvider;

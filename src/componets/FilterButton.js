// import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../features/todo/todoSlice';
// import  { setIsPressed } from  '../features/todo/todoSlice';
// import { useSelector } from 'react-redux';

const FilterButton = ({name}) => {
  

  const dispatch = useDispatch();
  // console.log(isPressed);
  return (
   
    <button type="button" 
    className="btn toggle-btn" 
    // aria-pressed={handlePress()}
    onClick={() => {
      dispatch(setFilter({name}));
      
    }}>
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>

    </button>

   /* <button type="button" className="btn toggle-btn" aria-pressed="false">
      <span className="visually-hidden">Show </span>
      <span>Active</span>
      <span className="visually-hidden"> tasks</span>
    </button>
    <button type="button" className="btn toggle-btn" aria-pressed="false">
      <span className="visually-hidden">Show </span>
      <span>Completed</span>
      <span className="visually-hidden"> tasks</span>
    </button> */
  
  )
}

export default FilterButton
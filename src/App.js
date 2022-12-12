

import React, { useState, useRef, useEffect } from "react";

import Form from "./componets/Form";
import FilterButton from "./componets/FilterButton";
import Todo from "./componets/todo";

import { useDispatch, useSelector } from "react-redux";
import { getFirebaseDATA } from "./features/todo/todoSlice";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { clouddb } from "./FirebaseConfig";
import { toast, ToastContainer } from "react-toastify";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [filter, setFilter] = useState("All");

  const { DATA } = useSelector((store) => store.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFirebaseDATA());
  }, [dispatch]);

  const updateDocument = async (id, newName, e) => {
    // e.preventDefault();

    try {
      const washingtonRef = doc(clouddb, "Todo", id);

      await updateDoc(washingtonRef, {
        name: newName,
      });
      dispatch(getFirebaseDATA());

      toast("Task Edited Succesfully");

     
    } catch (error) {
      console.log(error);
    }
  };
  const toggleTaskCompleted = async (id, completed) => {
    // e.prevent.default();
    try {
      const washingtonRef = doc(clouddb, "Todo", id);

      await updateDoc(washingtonRef, {
        completed: !completed,
      });
      dispatch(getFirebaseDATA());
    } catch (error) {
      console.log(error);
    }
  };
  
  
const currentDate = () => {
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let todaysDate = `${day}-${month}-${year}`;
return todaysDate;
    
  }
  const goodTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
 
  const date = currentDate();
  

  const deleteTodo = async (id) => {
    if (window.confirm("are you sure you want to delete")) {
   

      try {
        await deleteDoc(doc(clouddb, "Todo", id));

        dispatch(getFirebaseDATA());

        toast("Task Deleted Succesfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

 

  const taskList = DATA.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      time={task.time}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTodo}
      editTask={updateDocument}
    />
  ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(DATA.length);

  useEffect(() => {
    if (DATA.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [DATA.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      {date}
      <ToastContainer />
      {goodTime} 
      <Form />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
       
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;

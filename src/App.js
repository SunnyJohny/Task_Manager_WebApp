//   // async function getAllDocs() {

//   // querySnapshot.forEach((docu) => {
//   // doc.data() is never undefined for query doc snapshots
//   // console.log(doc.id, " => ", doc.data());

//   // for (let doc of querySnapshot.docs) {
//   // ArrayOfDocs.push(docu.data());

//   // const usersCollection = collection(clouddb,"users");
//   //   useEffect(() => {
//   //   // let ArrayOfDocs = [];

//   //  getAllDocs();
//   // },[]);

//   // console.log(ArrayOfDocs);

//   // function addTask(name){
//   //   const newTask = { id: `todo-${nanoid()}`, name, completed: false };
//   //  setTasks([...DATA,newTask]);

//   // }

//     const taskList = DATA.filter(FILTER_MAP[FILTER])
//   .map((task) => (
//     <Todo
//       id={task.id}
//       name={task.name}
//       completed={task.completed}
//       key={task.id}
//     />
//   ));

import React, { useState, useRef, useEffect } from "react";

import Form from "./componets/Form";
import FilterButton from "./componets/FilterButton";
import Todo from "./componets/todo";
// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { getFirebaseDATA } from "./features/todo/todoSlice";
import { doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
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
  },[dispatch]);

  const updateDocument = async (id, newName, e) => {
    // e.preventDefault();

    try {
      const washingtonRef = doc(clouddb, "Todo", id);

      await updateDoc(washingtonRef, {
        name: newName,
      });
      dispatch(getFirebaseDATA());

      toast("Task Edited Succesfully");

      // setNewName("");
      // setEditing(false);
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
    // dispatch(getFirebaseDATA());

    } catch (error) {
      console.log(error);
    }
  };

  // function deleteTask(id) {
  //   const remainingTasks = tasks.filter(task => id !== task.id);
  //   setTasks(remainingTasks);
  // }
  const deleteTodo = async (id) => {
    if (window.confirm("are you sure you want to delete")) {
      //   console.log("delete")
      // console.log(id,deleteData );

      // dispatch(deleteData(id));

      try {
        await deleteDoc(doc(clouddb, "Todo", id));
       

        dispatch(getFirebaseDATA());

        toast("Task Deleted Succesfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // function editTask(id, newName) {
  //   const editedTaskList = tasks.map(task => {
  //   // if this task has the same ID as the edited task
  //     if (id === task.id) {
  //       //
  //       return {...task, name: newName}
  //     }
  //     return task;
  //   });
  //   setTasks(editedTaskList);
  // }

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

  // function addTask(name) {
  //   const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
  //   setTasks([...tasks, newTask]);
  // }

  const submitTask = async (id, name, e) => {
    console.log("loged");
    console.log(name);

    //  e.preventDefault();
    //   if(name===('') ){
    //  toast.warning('pls enter the task name')

    // } else{
    // const  id = 'todo-' + 0;

    let TimeStamp = new Date().toLocaleString();

    let ref = doc(clouddb, "Todo/" + name);

    await setDoc(ref, {
      //  ImageName:(name+ext),
      // id: id+1,
      name: name,

      completed: false,
      time: TimeStamp,
    });
    // setName('');

    toast("Tasks Added");
    // }
    dispatch(getFirebaseDATA());
  };

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
      <ToastContainer />

      <Form addTask={submitTask} />
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

// import { useSelector } from 'react-redux';
import Todo from "./componets/todo";
import Form from "./componets/Form";
// import FilterButton from "./componets/FilterButton";
import { useEffect, useRef } from "react";
import Todotasks from "./componets/Todotasks";
import FilterButtonContainer from "./componets/FilterButtonContainer";
import { clouddb } from "./FirebaseConfig";

import { collection, getDocs } from "firebase/firestore";
// import { ViewProducts } from "./componets/Products";
import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { getFirebaseDATA } from "./features/todo/todoSlice";
// import { getData } from "./features/todo/todoSlice";

// import { useEffect } from 'react';

// import { isLoading } from './features/todo/todoSlice';
// import { nanoid } from "nanoid";
// import { FILTER_MAP } from './componets/FILTERmap';
// import { FILTER_NAMES } from './componets/FILTERmap';

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

// console.log(FILTER_NAMES);

console.log(clouddb)
// const { FILTER } = useSelector((store) => store.todo);


function App() {
  const { DATA, isLoading,FILTER } = useSelector((store) => store.todo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFirebaseDATA());
  }, []);

  if (isLoading) {
    toast(<h1>Loading...</h1>);
  }

  // async function getAllDocs() {

  // querySnapshot.forEach((docu) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());

  // for (let doc of querySnapshot.docs) {
  // ArrayOfDocs.push(docu.data());

  // const usersCollection = collection(clouddb,"users");
  //   useEffect(() => {
  //   // let ArrayOfDocs = [];

  //  getAllDocs();
  // },[]);

  // console.log(ArrayOfDocs);

  // const { id,name,completed } = useSelector((store) => store.todo.DATA);
  // const { FILTER } = useSelector((store) => store.todo);
  // console.log(filter);

  // console.log({ DATA,FILTER_MAP,FILTER_NAMES })
  // const [filter, setFilter] = useState('All');
  // const [tasks, setTasks] = useState(DATA);

  // function addTask(name){
  //   const newTask = { id: `todo-${nanoid()}`, name, completed: false };
  //  setTasks([...DATA,newTask]);

  // }

    const taskList = DATA.filter(FILTER_MAP[FILTER])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
    />
  ));

//commit
//Another commit

  const taskListNoun = DATA.length <= 1 ? "Task" : "Tasks";

  const headingText = `${DATA.length}  ${taskListNoun} remaining`;
 
  // const prevTaskLength = usePrevious(DATA.length);
  // const listHeadingRef = useRef(null);
 

  return (
    <div className="todoapp stack-large">
      <ToastContainer />
      {/* < ViewProducts/> */}

      <h1>Simple Task Manager</h1>
      <Form /*addTask={addTask}*/ />
      <div className="filters btn-group stack-exception">
        <FilterButtonContainer />
      </div>
      <h2 id="list-heading" tabIndex="-1">
        {headingText}
      </h2>
      <ul
        // role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <Todotasks />
      </ul>
    </div>
  );
}

export default App;

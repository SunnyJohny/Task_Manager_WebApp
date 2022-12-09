import React from 'react'
import Todo from './todo'
import { useSelector } from 'react-redux';
// import { selectData } from '../features/todo/todoSlice';
import { clouddb } from "../FirebaseConfig";
import { doc,deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { deleteData } from '../features/todo/todoSlice';




export default function Todotasks() {

  // const deleteTodo = async (id) => {
  //   try {
  //   await deleteDoc(doc(clouddb, 'Todo', id));
  //  toast("Task Deleted Succesfully")

      
  //   } catch (error) {
  //     console.log(error)
      
  //   }
  // };
    // const { DATA,FILTER_MAP } = useSelector((store) => store.todo.DATA);
    // const  DATA = useSelector(selectData);
  const { DATA,FILTER_MAP  } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  // const deleteTask = dispatch(deleteData())


    // console.log(DATA)
    // const { id,name,completed } = useSelector((store) => store.todo.DATA);
    const { FILTER } = useSelector((store) => store.todo);

 const taskList = DATA.filter(FILTER_MAP[FILTER])
.map((task,id) => (
  <Todo
    id={task.id}
    task={task}
   name={task.name}
    completed={task.completed}
    key={task.id}
    //  deleteTodo={deleteTodo}
  />
));
return (
    <>{taskList}</>
   
)

  
}

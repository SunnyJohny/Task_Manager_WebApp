import { useState, useRef, useEffect } from "react";
import { usePrevious } from "./usePrevious";
import { useSelector } from "react-redux";
// import { DATA } from "./DATA";

import { useDispatch } from "react-redux";
// import { deleteData, deleteTask } from "../features/todo/todoSlice";
import { editTask, toggleTaskCompleted } from "../features/todo/todoSlice";
import { clouddb } from "../FirebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { deleteData } from "../features/todo/todoSlice";

export default function Todo({ id, task, name, completed }) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const DATA = useSelector((store) => store.todo.DATA);
  // const id = DATA.id;

  const dispatch = useDispatch();

  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(editTask({ id: task.id, name: newName }));
    setNewName("");
    setEditing(false);
    // console.log(id, newName)
  }

  //   const deleteDocument =  async (id,e)  =>{
  //     // e.preventDefault();

  // if(window.confirm("are you sure you want to delete")){
  //   dispatch(deleteData({id:task.id}));

  //   }
  //   }
  const deleteTodo = async (id) => {
    if (window.confirm("are you sure you want to delete")) {
      //   console.log("delete")
      // console.log(id,deleteData );

      // dispatch(deleteData(id));

      try {
        await deleteDoc(doc(clouddb, "Todo", id));
        toast("Task Deleted Succesfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateDocument = async (id, name, e) => {
    // e.prevent.default();

    try {
      const washingtonRef = doc(clouddb, "Todo", id);

      await updateDoc(washingtonRef, {
        name: newName,
      });
      toast("Task Edited Succesfully");
      setNewName("");
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleCompleted = async (id) => {
    // e.prevent.default();

    try {
      const washingtonRef = doc(clouddb, "Todo", id);

      await updateDoc(washingtonRef, {
        completed : !completed,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const editingTemplate = (
    <div className="stack-small">
      <div className="form-group">
        <label className="todo-label" htmlFor={task.id}>
          New name for {name}
        </label>
        <input
          id={task.id}
          className="todo-text"
          type="text"
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button
          id={task.id}
          type="submit"
          className="btn btn__primary todo-edit"
          onClick={() => updateDocument(id, name)}
        >
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </div>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={task.id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() =>
         toggleCompleted (id)
          }
        />
        <label className="todo-label" htmlFor={task.id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          // id={task.id}

          // onClick={()=>deleteTodo}

          onClick={() => deleteTodo(id)}
          // onClick={() => deleteDocument()}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

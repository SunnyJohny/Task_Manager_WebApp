import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { getFirebaseDATA } from "../features/todo/todoSlice";
import { clouddb } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  function handleChange(e) {
    setName(e.target.value);
  }

  async function submitTask(e) {
    e.preventDefault();
    if (name === "") {
      toast.warning("pls enter the task name");
    } else {
      // const  id = 'todo-' + 0;

      let TimeStamp = new Date().toLocaleString();

      let ref = doc(clouddb, "Todo/" + name);

      await setDoc(ref, {
        //  ImageName:(name+ext),
        // id: id+1,
        name,
        completed: false,
        time: TimeStamp,
      });
      setName("");
      dispatch(getFirebaseDATA());
      toast("Tasks Added");
    }
  }

  return (
    <form>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        // setName={"off"}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="btn btn__primary btn__lg"
        // onClick ={handleSubmit}
        onClick={submitTask}
      >
        Add
      </button>
    </form>
  );
}

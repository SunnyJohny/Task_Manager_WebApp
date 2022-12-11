import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import { clouddb } from '../../FirebaseConfig';

// import { getDocs,collection,doc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { collection,getDocs }  from 'firebase/firestore';


// import { createAsyncThunk } from '@reduxjs/toolkit';
// let ArrayOfDocs = []
const initialState = {
  DATA: [],
 
  numberOfTasks: 0,
  tasksNoun: 'Tasks',
  isLoading: true,
  isPressed: false,
  FILTER:"All",

};

export const getFirebaseDATA = createAsyncThunk(
  'Data/getFirebaseDATA',
  async ( thunkAPI) => {

    try {
      const querySnapshot = await getDocs(collection(clouddb, "Todo"));
      const allProducts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
    

     
      return allProducts;


    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });



const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
  
    // addTask: (state, action) => {
    //   const taskName = action.payload;
    //   state.cartItems = state.cartItems.filter((item) => item.id !== itemId);


    //   function addTask(name){
    //     const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    //    return ([...DATA,newTask]);
    
    //   }
    // },
    
    // setIsPressed: (state,action) => {
    //   state.FILTER_NAMES.map((filter) => {
    //     if (filter=== action.payload.name) {
    //       state.isPressed= action.payload.name
         
          
    //     // console.log(action.payload.name);
         
    //     }
    //     return console.log("state.DATA")
    //   });
    //   },
    
    
    setFilter: (state, action) => {
      state.FILTER_NAMES.map((filter) => {
        if (filter=== action.payload.name) {
          state.FILTER= action.payload.name
        // console.log(action.payload.name);
         
        }
        return null;
      });
    },

    addTask: (state, action) => {
      state.DATA.push(action.payload);
    },
    // STORE_PRODUCTS: (state, action) => {
    // console.log(action.payload)
      // state.DATA = action.payload.tasks
    // },
   
    // deleteTask: (state, action) => {
      
    //     const itemId = action.payload;
    //     state.DATA = state.DATA.filter((item) => item.id !== itemId);
    //   },
      // editTask: (state, action) => {
      //   state.DATA.map((task) => {
      //     if (task.id === action.payload.id) {
      //       task.name = action.payload.name;
      //     }
      //     return null;
      //   });
      // },
      // return {...task, completed: !task.completed}
 
      
},



extraReducers: {
  [getFirebaseDATA.pending]: (state) => {
    state.isLoading = true;
   
  },
  [getFirebaseDATA.fulfilled]: (state, action) => {
    
    state.isLoading = false;
    state.DATA = action.payload;
  },

  [getFirebaseDATA.rejected]: (state, action) => {
    console.log("error");
    state.isLoading = false;
  },

},
});

export const { deleteTask,STORE_PRODUCTS,editTask,addTask,toggleTaskCompleted,setFilter,setIsPressed } =
todoSlice.actions;

export const selectData = (state) => state.todo;
export default todoSlice.reducer;
// import {  collection, getDocs } from "firebase/firestore";

// // import Loader from "../../loader/Loader";
// // import { deleteObject, ref } from "firebase/storage";
// // import Notiflix from "notiflix";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";



// import { STORE_PRODUCTS } from "../features/todo/todoSlice";
// import { clouddb } from "../FirebaseConfig";

// export const ViewProducts = () => {
// //   const [isLoading, setIsLoading] = useState(false);


// // let ArrayOfDocs = [];

// async function getAllDocs() {
//     try {
//         const querySnapshot = await getDocs(collection(clouddb, "Todo"));


//         const Todos = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           // console.log(Todos);
         
//           dispatch(
//             STORE_PRODUCTS({
//               tasks: Todos,
//             })
//           );
//         // doc.data() is never undefined for query doc snapshots
//         // console.log(doc.id, " => ", doc.data());
    
//         // for (let doc of querySnapshot.docs) {
//         // console.log(docu.data());
//         // ArrayOfDocs.push(docu.data());
    
      
//       // console.log(ArrayOfDocs);
//     //   return ArrayOfDocs;
        
//     } catch (error) {
        
//         console.log(error)
//     }
 
  
 
// };



//  const dispatch = useDispatch();

//   useEffect(() => {
// getAllDocs();

//   }, [null]);

 
// }

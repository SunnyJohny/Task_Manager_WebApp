import { useRef, useEffect} from "react"




export const usePrevious = (value) => {
    const ref = useRef();
  return (
    <>
    useEffect(() => {
      ref.current = value
    });
    return ref.current;
    </>
  )
}

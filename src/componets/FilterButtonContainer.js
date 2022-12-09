import React from 'react'
import { useSelector } from 'react-redux';
import FilterButton from './FilterButton';

export default function FilterButtonContainer() {
  const { FILTER_NAMES } = useSelector((store) => store.todo);

    const filterList = FILTER_NAMES.map((name) => (
      
        <FilterButton
          key={name}
          name={name}
        //   isPressed={name === filter}
          // setFilter={setFilter}
        />
      ));

  return (
   <>{filterList}</>
  )
}

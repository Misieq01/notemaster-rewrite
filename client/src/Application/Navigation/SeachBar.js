import React from "react";
import {useDispatch} from 'react-redux'
import {updateSearchValue} from '../Store/Actions/othersActions'

const SearchBar = ({GetSearchValue,...props}) => {
  const dispatch = useDispatch()


  return (
    <input
      className="search-bar"
      placeholder="Search"
      onChange={event => dispatch(updateSearchValue(event.target.value))}
    />
  );
};

export default SearchBar;

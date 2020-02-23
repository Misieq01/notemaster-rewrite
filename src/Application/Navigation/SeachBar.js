import React from "react";

const SearchBar = ({GetSearchValue,...props}) => {


  return <input className='search-bar' placeholder='Search for notes' onChange={event=>GetSearchValue(event)}/>;
};

export default SearchBar;

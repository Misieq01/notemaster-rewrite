import React from "react";

const SearchBar = ({GetSearchValue,...props}) => {


  return <input className='searchBar' placeholder='Search for notes' onChange={event=>GetSearchValue(event)}/>;
};

export default SearchBar;

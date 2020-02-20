import React from 'react';
import './SearchBar.css';


const SearchBarComponent = (props) =>
{
  const options = props.searchOptions.map((searchOption, index) =>
  {
    return (
      <option
        key={index}
        value={searchOption.operationInfoId}
      >
        {searchOption.title}
      </option>
    );
  });

  return (
    <div className="searchbar flexItemsCol">
      <form
        onSubmit={props.handleSubmit}
        className="flexItemsCol"
      >
        <label>Search:</label>
        <input
          type="text"
          name="searchData"
          value={props.searchData ? props.searchData : ''}
          onChange={props.handleChange}
          className="itTalentTextField"
        />
        <div className="flexItemsCol">
          <select
            name="operationInfoId"
            value={props.operationInfoId}
            onChange={props.handleChange}
            className="itTalentComboBox"
          >
            {options}
          </select>
          <button className="itTalentButton">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}


export default SearchBarComponent;
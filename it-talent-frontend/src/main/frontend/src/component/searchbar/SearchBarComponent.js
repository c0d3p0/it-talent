import React from 'react';
import './SearchBar.css';


const SearchBarComponent = (props) =>
{
  const options = props.searchOptions.map((searchOption, index) =>
  {
    return (
      <option key={index} value={searchOption.operationInfoId}>
        {searchOption.title}
      </option>
    );
  });

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>Search</label>
        <select
          name="operationInfoId"
          value={props.operationInfoId}
          onChange={props.handleChange}
          className="itTalentComboBox searchMarginLeft"
        >
          {options}
        </select>
        <input
          type="text"
          name="searchData"
          value={props.searchData ? props.searchData : ''}
          onChange={props.handleChange}
          className="itTalentTextField
                      searchMarginLeft
                      searchTextField"
        />
        <button
          className="itTalentButton searchMarginLeft"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}


export default SearchBarComponent;
import React, {Component} from 'react';
import SearchBarComponent from './SearchBarComponent';

import itTalentService from '../../service/ItTalentService';


class SearchBar extends Component
{
  handleChange = (event) =>
  {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = (event) =>
  {
    event.preventDefault();
    const oiId = parseInt(event.target.operationInfoId.value);
    const sd = event.target.searchData.value;
    this.props.setSectionState(null, oiId, sd);
  }

  updateSectionStateFromProps = () =>
  {
    const s = {};
    s.operationInfoId = this.props.sectionState.operationInfoId;
    s.searchData = this.props.sectionState.searchData;
    this.setState(s);
  }

  componentDidMount()
  {
    this.updateSectionStateFromProps();
  }

  componentDidUpdate(prevProps, prevState)
  {
    if(this.props !== prevProps)
      this.updateSectionStateFromProps();
  }

  constructor(props)
  {
    super();
    this.state =
    {
      operationInfoId: 0,
      searchData: ""
    };
  }
  
  render()
  {
    return (
      <SearchBarComponent
        searchOptions={itTalentService.getSearchOptions()}
        operationInfoId={this.state.operationInfoId}
        searchData={this.state.searchData}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}


export default SearchBar;
import React, {Component} from 'react';
import NavBarComponent from './NavBarComponent';
import itTalentService from '../../service/ItTalentService';

class NavBar extends Component
{
  handleClick = (event) =>
  {
    const siId = event.target.getAttribute("section-info-id");
    this.props.setSectionState(parseInt(siId, 10), 0, "");
  }

  render()
  {
    return (
      <NavBarComponent
        sectionInfo={itTalentService.getSectionInfo()}
        handleClick={this.handleClick}
      />
    );
  }
}


export default NavBar;
import React, {Component} from 'react'
import ListViewComponent from './ListViewComponent';


class ListView extends Component
{
  hasData = () =>
  {
    const d = this.props.data;

    if(d && Array.isArray(d) && d.length > 0)
      return true;

    return false;
  }

  render()
  {
    return (
      <ListViewComponent
        listName={this.props.listName}
        listItem={this.props.listItem}
        actionMap={this.props.actionMap}
        data={this.props.data}
        hasData={this.hasData}
      />
    )
  }
}


export default ListView;
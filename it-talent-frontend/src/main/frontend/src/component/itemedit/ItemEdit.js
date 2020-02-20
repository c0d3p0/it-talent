import React, {Component} from 'react';
import ItemEditComponent from './ItemEditComponent';
import jsUtil from '../../util/JSUtil';


class ItemEdit extends Component
{
  handleClick = (event) =>
  {
    let elem = event.target;
    elem = elem.tagName === "LABEL" ? elem.parentNode : elem;
    const action = elem.getAttribute("item-action");
    const id = elem.getAttribute("item-id");

    if(action && !jsUtil.isNumber(id))
      this.props.handleAction(id, action, this.handleChangeItem);
  }

  handleChangeItem = (id, action) =>
  {
    const state = this.state;

    if(action === 'add')
    {
      state.addedItemMap[id] = state.availableItemMap[id];
      state.availableItemMap[id] = undefined;
      this.setState(state);
    }
    else if(action === 'remove')
    {
      state.availableItemMap[id] = state.addedItemMap[id];
      state.addedItemMap[id] = undefined;
      this.setState(state);
    }
  }

  updateStateItemMaps = () =>
  {
    const addedItemMap = {};
    const availableItemMap = {};

    this.props.addedItemList.forEach(
      (item) => addedItemMap[item.id] = item);

    this.props.allItemList.forEach((item) =>
    {
      if(addedItemMap[item.id] === undefined)
        availableItemMap[item.id] = item;
    });

    const state = {};
    state.addedItemMap = addedItemMap;
    state.availableItemMap = availableItemMap;
    this.setState(state);
  }

  componentDidMount()
  {
    this.updateStateItemMaps();
  }

  componentDidUpdate(prevProps, prevState)
  {
    if(this.props !== prevProps)
      this.updateStateItemMaps();
  }

  constructor(props)
  {
    super();
    this.state = 
    {
      addedItemMap: {},
      availableItemMap: {}
    }
  }

  render()
  {
    return (
      <ItemEditComponent
        addedItemMap={this.state.addedItemMap}
        availableItemMap={this.state.availableItemMap}
        handleClick={this.handleClick}
      />
    );
  }
}



export default ItemEdit;
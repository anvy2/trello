import React from "react";
import Dialog from "./Dialog";
import ListItem from "./ListItem";

import StorageUtils from "../libs/storageUtils";
import { listCount } from "../constant";

class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { list: this.getInitialData(listCount, {}), open: false };
    this.i = Object.keys(this.state.list).length;
    this.dragState = {
      start: null,
      current: null,
    };

    this.cursorPosition = null;
  }

  updateCursorPosition = (position) => {
    this.cursorPosition = position;
  };

  updateDragStart = (start) => {
    this.dragState = {
      start,
      current: start.parent,
    };
  };

  updateDragCurrent = (current) => {
    this.dragState.current = current;
  };

  deleteEntry = (key, index) => {
    console.log(key, index);
    const modifiedParentList = { ...this.state.list }[key];
    modifiedParentList.splice(index, 1);
    const newList = { ...this.state.list, [key]: modifiedParentList };
    this.setState({ list: newList }, () => {
      StorageUtils.setItem(listCount, newList);
      console.log(this.state.list);
    });
  };

  handleDragEnd = () => {
    console.log(this.dragState);
    if (!this.dragState.current) {
      return;
    }
    const parentKey = this.dragState.start.parent;
    const targetKey = this.dragState.current;
    const removedIndex = this.dragState.start.index;
    let updatedList = { ...this.state.list };
    const targetList = updatedList[targetKey];
    const modifiedParentList = updatedList[parentKey];
    const removedEntry = modifiedParentList.splice(removedIndex, 1)[0];

    const newList = {
      ...updatedList,
      [parentKey]: modifiedParentList,
      [targetKey]: [...targetList, removedEntry],
    };
    this.setState({ list: newList }, () => {
      StorageUtils.setItem(listCount, newList);
    });
  };

  getInitialData = (key, defaultValue) => {
    const data = StorageUtils.getItem(key);

    if (data) {
      return JSON.parse(data);
    }
    StorageUtils.setItem(key, defaultValue);
    return defaultValue;
  };

  deleteList = (key) => {
    console.log(newList, key);
    const newList = { ...this.state.list };
    delete newList[key];
    this.setState({ list: newList }, () => {
      StorageUtils.setItem(listCount, newList);
    });
  };

  addList = (key) => {
    const newList = { ...this.state.list, [key]: [] };

    this.setState({ list: newList }, () => {
      StorageUtils.setItem(listCount, newList);
    });
  };

  addDataItem = (data, parentKey) => {
    const newList = {
      ...this.state.list,
      [parentKey]: [...this.state.list[parentKey], data],
    };

    this.setState({ list: newList }, () => {
      StorageUtils.setItem(listCount, newList);
    });
  };

  renderList = () => {
    const dataArray = Object.entries(this.state.list);
    console.log(dataArray);
    return dataArray.map(([title, data]) => {
      return (
        <ListItem
          title={title}
          data={[...data]}
          dragState={this.dragState}
          updateDragStart={this.updateDragStart}
          handleDragEnd={this.handleDragEnd}
          updateDragCurrent={this.updateDragCurrent}
          addDataItem={this.addDataItem}
          deleteList={this.deleteList}
          deleteEntry={this.deleteEntry}
        />
      );
    });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  handleSubmit = (e) => {
    const title = e.target.heading.value;
    this.addList(title);
    this.handleDialogClose();
  };

  render() {
    console.log("render parent");
    return (
      <div className="list__wrapper" onDragOver={(e) => e.preventDefault()}>
        <div className="button__container">
          <button type="button" className="button" onClick={this.openDialog}>
            Add list
          </button>
        </div>
        <div className="list__container">{this.renderList()}</div>
        <Dialog
          open={this.state.open}
          close={this.handleDialogClose}
          handleSubmit={this.handleSubmit}
        >
          <label>Enter a unique list title: </label>
          <input name="heading" />
          <br />
          <button type="submit" className="button">
            Submit
          </button>
        </Dialog>
      </div>
    );
  }
}

export default List;

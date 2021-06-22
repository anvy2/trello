import React from "react";
import Dialog from "./Dialog";

class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleDragStart = (e, index) => {
    e.persist();
    e.target.style.opacity = "0.4";
    this.props.updateDragStart({ parent: this.props.title, index });
  };

  handleDragEnter = (e) => {
    this.props.updateDragCurrent(this.props.title);
  };

  handleDragLeave = (e) => {
    this.props.updateDragCurrent(null);
  };

  handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    this.props.handleDragEnd();
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      heading: e.target.heading.value,
      text: e.target.text.value,
    };
    this.props.addDataItem(data, this.props.title);
    this.setState({ open: false });
  };

  renderDataItems = () => {
    return this.props.data.map((item, idx) => {
      return (
        <div
          style={{
            padding: "20px",
            border: "1px solid",
            position: "relative",
            margin: "8px",
          }}
          draggable
          onDragStart={(e) => this.handleDragStart(e, idx)}
          onDragEnd={this.handleDragEnd}
        >
          <div style={{ fontSize: "20px" }}>{item.heading}</div>
          <div>{item.text}</div>
          <button
            type="button"
            className="add__button delete__button"
            onClick={() => {
              this.props.deleteEntry(this.props.title, idx);
              this.setState({ open: false });
            }}
          >
            <div className="one" />
            <div className="two" />
          </button>
        </div>
      );
    });
  };

  render() {
    console.log(this.props.title, " render");
    return (
      <div className="listItem__container">
        <div className="heading">
          <span className="title">{this.props.title}</span>
          <button
            type="button"
            className="add__button delete__button"
            onClick={() => this.props.deleteList(this.props.title)}
          >
            <div className="one" />
            <div className="two" />
          </button>
        </div>
        <div
          className="data__container"
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
        >
          {this.renderDataItems()}
        </div>
        <div className="bottom__section">
          <button
            type="button"
            className="add__button"
            onClick={this.openDialog}
          >
            <div className="one" />
            <div className="two" />
          </button>
        </div>
        <Dialog
          open={this.state.open}
          close={this.handleDialogClose}
          handleSubmit={this.handleSubmit}
        >
          <label>Enter heading: </label>
          <input name="heading" />
          <br />
          <label>Enter some text</label>
          <textarea name="text" />
          <br />
          <button type="submit" className="button">
            Submit
          </button>
        </Dialog>
      </div>
    );
  }
}

export default ListItem;

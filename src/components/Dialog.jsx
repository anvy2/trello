import React from "react";

class Dialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.dialogRef = React.createRef();
  }

  handleDialogClose = (e) => {
    if (!this.dialogRef.current.parentNode.matches(":hover")) {
      this.props.close();
      return;
    }
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  render() {
    return this.props.open ? (
      <div className="dialog__wrapper" onClick={this.handleDialogClose}>
        <div className="dialog">
          <form
            className="form"
            ref={this.dialogRef}
            onSubmit={this.props.handleSubmit}
          >
            {this.props.children}
          </form>
        </div>
      </div>
    ) : null;
  }
}

export default Dialog;

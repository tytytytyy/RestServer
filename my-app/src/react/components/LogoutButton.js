import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import { connect } from "react-redux";
import { getLogOutAction } from "../../modules/actions/AuthenticationActions";

class LogOutButton extends Component {
  constructor(props) {
    super(props);
    this.showLogOutDialog = this.showLogOutDialog.bind(this);
  }

  showLogOutDialog() {
    const dispatch = this.props.dispatch;
    dispatch(getLogOutAction());
  }

  render() {
    return (
      <div>
        <Button
          id="LogoutButton"
          variant="light"
          onClick={this.showLogOutDialog}
        >
          LogOut
        </Button>
      </div>
    );
  }
}

export default connect()(LogOutButton);

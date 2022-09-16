import React, { Component } from "react";

class AuthenticationPage extends Component {

  render() {
    return (
      <div
        className="page-content"
        style={{ background: "white" }}
      >
        <section className="portfolio-block block-intro">
          <div className="container">
            <div className="about-me">
              <h1>Bitte Anmelden!</h1>
              <p>Sie müssen sich einloggen, um zugriff auf diesen Bereich zu haben.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AuthenticationPage;
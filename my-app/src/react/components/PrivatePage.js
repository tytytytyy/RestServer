import React, { Component } from "react";

class PrivatePage extends Component {

  render() {
    return (
      <div
        className="page-content"
        id="PrivatePage"
        style={{ background: "white" }}
      >
        <section className="portfolio-block block-intro">
          <div className="container">
            <div className="about-me">
              <h1>Private Page</h1>
              <p>Das ist dein privater Bereich.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default PrivatePage;

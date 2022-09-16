import React, { Component } from "react";

class PublicPage extends Component {
  render() {
    return (
      <div>
        <section className="portfolio-block block-intro">
          <div className="container">
            <div className="about-me">
              <h1>Public Page</h1>
              <p>
                Rund ums Studieren bietet Studis-Online-Forum noch allerlei
                Interessantes für Neulinge und Studierende: Studienführer,
                Lerntipps, Empfehlungen zum wissenschaftlichen Schreiben,
                Neuigkeiten und mehr.
              </p>
            </div>
          </div>
        </section>

        <section className="portfolio-block photography">
          <div className="container">
            <div className="row g-0">
              <div className="col-md-6 col-lg-4 item zoom-on-hover">
                <a href="#">
                  <img
                    className="img-fluid image"
                    src="https://images.pexels.com/photos/12079516/pexels-photo-12079516.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  />
                </a>
              </div>
              <div className="col-md-6 col-lg-4 item zoom-on-hover">
                <a href="#">
                  <img
                    className="img-fluid image"
                    src="https://images.pexels.com/photos/8106773/pexels-photo-8106773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  />
                </a>
              </div>
              <div className="col-md-6 col-lg-4 item zoom-on-hover">
                <a href="#">
                  <img
                    className="img-fluid image"
                    src="https://images.pexels.com/photos/12166061/pexels-photo-12166061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="portfolio-block call-to-action border-bottom"></section>
      </div>
    );
  }
}

export default PublicPage;

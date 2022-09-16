import React, { Component } from 'react';
import LoginButton from './LoginButton';

class LandingPage extends Component {

    render() {
        return ( <div className="page-content" id="LandingPage" style={{background: 'white'}}>
             <section className="portfolio-block block-intro">
            <div className="container">
                <div className="about-me">
                    <h1>Landing Page</h1>
                    <p>Rund ums Studieren bietet Studis-Online-Forum noch allerlei Interessantes für Neulinge und Studierende: Studienführer, 
                        Lerntipps, Empfehlungen zum wissenschaftlichen Schreiben, Neuigkeiten und mehr.
                    </p>
                </div>
                
            </div>
        </section>

               <section className="portfolio-block photography">
            <div className="container">
                <div className="row g-0">
                    <div className="col-md-6 col-lg-4 item zoom-on-hover"><a href="#"><img className="img-fluid image" src="https://www.bht-berlin.de/fileadmin/oe/pressestelle/bild/galerie/campus/Campus__64_.jpg"/></a></div>
                    <div className="col-md-6 col-lg-4 item zoom-on-hover"><a href="#"><img className="img-fluid image" src="https://www.bht-berlin.de/fileadmin/oe/pressestelle/bild/galerie/campus/Aussenansicht_Haus_Gauss__35_.jpg"/></a></div>
                    <div className="col-md-6 col-lg-4 item zoom-on-hover"><a href="#"><img className="img-fluid image" src="https://www.bht-berlin.de/fileadmin/oe/pressestelle/bild/galerie/campus/Campus__22_.jpg"/></a></div>
                </div>

           
            </div>
        </section>
        <section className="portfolio-block call-to-action border-bottom"></section> 
 </div>
        );
    }
}

export default LandingPage;
import React from "react";
import './landingPage.css';
import {Link} from 'react-router-dom';





export default function LandingPage(){

    return (
        <>
        <body className="landing-page-body">
        
        <div className="navbar navbar-landing-page">
          <li className="navbar__link"><a href="#" className="navbar__link--item"><img src="https://i.postimg.cc/13zXthLX/logo.png" width="130" height="80" alt="astronut"/></a></li>
          <li className="navbar__link"><a href="#" className="navbar__link--item navbar__link--item--left">Home</a></li>
          <li className="navbar__link"><a href="#" className="navbar__link--item navbar__link--item--left">About</a></li>
          <li className="navbar__link"><a href="#" className="navbar__link--item navbar__link--item--left">Contact</a></li>
          <li className="navbar__link"><a href="#" className="navbar__link--item navbar__link--item--left">More</a></li>
        </div>
    
        <div className="hero">
        <div className="hero__content">
          <h1>Ceylon Food Company (Pvt) Ltd</h1>
          <h3>Warehouse Management System</h3>
          <hr />
        
            <p className ="description-landing-page">Ceylon Foods company Pvt limited is a company that manufactures food items. The company manufactures food items by using raw materials. After manufacturing food products, the company sends them to the warehouse to store. Then, the warehouse dispatches products when sales agents order products.</p>
        
          
        <br/>
          
        <Link to="/supplier/login" ><button className="btn btn--resume btn-getstarted">GET STARTED</button></Link>
      
        <div className="social">
            <i className='bx bxl-facebook'></i>
            <i className='bx bxl-instagram'></i>
            <i className='bx bxl-linkedin-square'></i>
            <i className='bx bxl-twitter'></i>
        </div>
        </div>
        <div className="hero__img hero__img-main">
          <img src="https://i.ibb.co/6R10B7H/main-01.png" alt="astronut"/>
        </div>
      </div>
        </body>
        </>
    )
}
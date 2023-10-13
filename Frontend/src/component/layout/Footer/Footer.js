import React from "react";
import { Link } from "react-router-dom";
import Appstore from '../../../images/Appstore.png'
import playstore from '../../../images/playstore.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./Footer.css";
import logo from '../../../images/logo.png'

const Footer = () => {

  const Linkedin = "https://www.linkedin.com/in/atul-verma-9645b217b/"
  return <div className="developedwrap">
    <h3 className="developer_info">Developed By -- ATUL VERMA --</h3> 
  
    <footer id="footer">
     
      <div className="leftFooter">
         <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android ans ISO mobile phone</p>
        <img src={Appstore} alt="playstore" />
        <img src={playstore} alt="playStore" />
      </div>
      <div className="midFooter">
        <img  style={{width:'16rem'}}src={logo}/>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Atul Verma</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <div className="mediaqueary">
        <a href={Linkedin} target='_blank'><LinkedInIcon style={{color:'#0A66C2',width:'35px',height:'35px'}}/><span>Linkedin</span></a>
        <a href={Linkedin}target='_blank'>< YouTubeIcon style={{color:'	#FF0000',width:'40px',height:'40px'}}/><span>Youtube</span></a>
        <a href={Linkedin} target='_blank'><FacebookIcon style={{color:'#3b5998',width:'40px',height:'40px'}}/><span>Facebook</span></a>
        <a href={Linkedin} target='_blank'><InstagramIcon style={{color:'#bc2a8d',width:'40px',height:'40px'}}/><span>Instagram</span></a>
       </div>
      </div>
    </footer>
    </div>
  
};

export default Footer;

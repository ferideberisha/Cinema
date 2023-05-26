import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content" style={{ marginBottom: 0 }}>
        <div className="footer_content_menus">
          <div className="footer_content_menu">
            <Link to="/">
              <span>Home</span>
            </Link>
            <Link to="/movies">
              <span>Movies</span>
            </Link>
            <Link to="/events">
              <span>Events</span>
            </Link>
            <Link to="/theaters">
              <span>Theaters</span>
            </Link>
          </div>
        </div>

        <div className="footer__social-media">
          <a href="https://facebook.com">
            <FacebookIcon className="icon" />
          </a>
          <a href="https://twitter.com">
            <TwitterIcon className="icon" />
          </a>
          <a href="https://instagram.com">
            <InstagramIcon className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
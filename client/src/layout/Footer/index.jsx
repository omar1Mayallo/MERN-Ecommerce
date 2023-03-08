import React from "react";
import {Col, Container, Row} from "reactstrap";
import {AiTwotoneHeart} from "react-icons/ai";
import logo from "../../assets/imgs/dark-logo.png";
import paymentLogo from "../../assets/imgs/payment-method.png";
import {NavLink} from "react-router-dom";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import {MdKeyboardArrowRight} from "react-icons/md";
import {AiFillHome} from "react-icons/ai";
import SocialIcon from "../../common/components/Icons/SocialIcon";

const Footer = () => {
  return (
    <footer className="bg-light pt-4">
      {/* FooterInfo */}
      <Container>
        <Row>
          <Col lg={6}>
            <img src={logo} alt="logo" />
            <p className="my-3">
              We dress a generation of urban professionals, creatives and
              innovators that need functional yet modern products for their
              everyday lives. Our HQ is in Madrid, but we also have offices with
              contributors in Lisbon, Berlin, Barcelona, London, Warsaw,
              Stockholm, Amsterdam, Toronto, New York and Tokyo.
            </p>
            <div className="d-flex align-items-center">
              {[
                {Icon: FaFacebookF, bgColor: "#3b5998"},
                {Icon: FaInstagram, bgColor: "#ac2bac"},
                {Icon: FaTiktok, bgColor: "#000"},
                {Icon: FaTwitter, bgColor: "#55acee"},
              ].map((item, idx) => (
                <SocialIcon key={idx} {...item} />
              ))}
            </div>
          </Col>
          <Col lg={6}>
            <Row>
              <Col md={6}>
                <h5 className="mt-3">Information</h5>
                <ul>
                  {[
                    "About us",
                    "FAQ",
                    "Terms & Conditions",
                    "Contact Us",
                    "Help",
                  ].map((item) => (
                    <li key={item} className="mb-2 d-flex align-items-center">
                      <MdKeyboardArrowRight />
                      <NavLink to="/" className={"nav-link"}>
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col md={6}>
                <h5 className="mt-3">Contact</h5>
                <ul>
                  {[
                    {Icon: AiFillHome, text: "New York, NY 10012, US"},
                    {Icon: FaEnvelope, text: "info@example.com"},
                    {Icon: FaPhoneAlt, text: "+ 01 234 567 88"},
                  ].map(({Icon, text}) => (
                    <li className="mb-3" key={text}>
                      <Icon size={20} className="me-2" /> {text}
                    </li>
                  ))}
                </ul>
                <div>
                  <img
                    src={paymentLogo}
                    alt="stripe-logo"
                    width={"170px"}
                    height={"24px"}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* MadeText */}
      <div className="text-center p-3 bg-light mt-3">
        Made with <AiTwotoneHeart color="red" />{" "}
        <a
          className="text-decoration-none fw-bolder"
          href="https:github.com/omar1Mayallo"
          target={"_blank"}
          rel="noreferrer"
        >
          OTM
        </a>
      </div>
    </footer>
  );
};

export default Footer;

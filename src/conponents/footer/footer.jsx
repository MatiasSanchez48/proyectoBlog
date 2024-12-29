import { useContext } from "react";
import { AuthContext } from "../../context/auth_context";
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaLinkedin,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const { isLogger } = useContext(AuthContext);

  return (
    <>
      {isLogger && (
        <footer className="custom-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <h2>Matias Sanchez</h2>
              <p>Desarrollador Web & Móvil</p>
            </div>
            <div className="footer-socials">
              <div>
                Instagram
                <a
                  href="https://www.instagram.com/matiassanchez120/?next=%2F"
                  target="_blank"
                  aria-label="Instagram"
                  className="red-social"
                >
                  <FaInstagram className="social-icon" />
                </a>
              </div>
              <div>
                Facebook
                <a
                  href="https://www.facebook.com/Matias7.7I2003/"
                  target="_blank"
                  aria-label="Facebook"
                  className="red-social"
                >
                  <FaFacebook className="social-icon" />
                </a>
              </div>
              <div>
                GitHub
                <a
                  href="https://github.com/MatiasSanchez48"
                  target="_blank"
                  aria-label="GitHub"
                  className="red-social"
                >
                  <FaGithub className="social-icon" />
                </a>
              </div>
              <div>
                Gmail
                <a
                  href="mailto:sanchezmati48@gmail.com"
                  aria-label="Gmail"
                  target="_blank"
                  className="red-social"
                >
                  <FaGoogle className="social-icon" />
                </a>
              </div>
              <div className="red-social">
                LinkedIn
                <a
                  href="https://www.linkedin.com/in/matias-sanchez-8a5219252/"
                  target="_blank"
                  aria-label="LinkedIn"
                  className="red-social"
                >
                  <FaLinkedin className="social-icon" />
                </a>
              </div>
            </div>
            <div className="footer-rights">
              <p>© 2024 Matias Sanchez. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;

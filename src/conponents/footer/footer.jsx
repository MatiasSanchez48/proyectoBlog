import { useContext } from "react";
import { AuthContext } from "../../context/auth_context";

const Footer = () => {
  const { isLogger } = useContext(AuthContext);

  return (
    <>
      {isLogger ? (
        <footer>
          <h1>Footer</h1>
        </footer>
      ) : null}
    </>
  );
};

export default Footer;

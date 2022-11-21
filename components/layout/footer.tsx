import styled from "styled-components";
import { Colors } from "../../styles/Colors";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="text-column">
        <h4>Follow Us</h4>
        <h6>Follow For More Content</h6>

        <div className="social-row">
          <span>Insta</span>
          <span>FB</span>
          <span>Twitter</span>
        </div>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  background-color: ${Colors.PrimaryButtonBackground};
  color: white;
  padding: 2rem 2rem;
  margin-top: 4rem;
  border-top: 2px solid gray;

  .text-column {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .social-row {
    padding-top: 2rem;
    display: flex;
    flex-direction: row;
    gap: 3rem;
  }
`;

export default Footer;

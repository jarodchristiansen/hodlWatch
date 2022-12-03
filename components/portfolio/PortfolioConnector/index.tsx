import styled from "styled-components";

const PortfolioConnector = () => {
  return (
    <FormContainer>
      <h4>Connect Your Portfolio</h4>

      <select name="exchanges">Exchanges</select>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid lightgray;
  border-radius: 9px;
  padding: 1rem 2rem;
  box-shadow: 2px 4px 8px lightgray;
`;

export default PortfolioConnector;

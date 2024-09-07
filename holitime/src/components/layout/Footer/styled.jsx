import styled from "styled-components";

export const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  img {
    width: 180px;
    height: 50px;
  }
  h4 {
    font-size: 16px;
    font-weight: 300;
  }

  p {
    font-size: 12px;
  }

  a {
    text-decoration: none;
    
    margin: 5px;
    font-weight: 500;
  }

  .socialsContainer {
    display: flex;
    justify-content: center;
  }
`;

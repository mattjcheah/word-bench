import styled from "styled-components";

const LandingButton = styled.button`
  padding: 10px 25px;
  margin: 5px;
  font-size: calc(14px + 0.3vw);
  text-decoration: none;
  border-radius: 4px;
  background: transparent;
  color: var(--blackboard);
  border: 1px solid var(--blackboard);

  &:hover {
    color: white;
    background: var(--oxblood);
    border: 1px solid var(--oxblood);
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export default LandingButton;

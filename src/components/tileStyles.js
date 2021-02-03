import { css } from "styled-components";

const tileStyles = css`
  background-color: lightgoldenrodyellow;
  color: var(--blackboard);
  height: 3.5rem;
  width: 3.5rem;
  font-size: 2.5rem;
  margin: 0.5rem;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export default tileStyles;

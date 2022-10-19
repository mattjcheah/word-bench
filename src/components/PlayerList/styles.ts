import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem;
`;

export const ListItem = styled.li`
  margin-bottom: 1rem;
`;

export const Progress = styled.div<{ colour: string; percentage: number }>`
  background: ${({ colour, percentage }) =>
    `linear-gradient(to right, ${colour} ${percentage}%, #888 ${percentage}% 100%)`};
  color: white;
  padding: 0.5rem 1rem;
`;

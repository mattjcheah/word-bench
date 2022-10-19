import Head from "../Head";
import { Container, Main, Sidebar, Bottom } from "./styles";

type Props = {
  main: JSX.Element;
  sidebar: JSX.Element;
  bottom: JSX.Element;
};

const GameLayout = ({ main, sidebar, bottom }: Props) => {
  return (
    <Container>
      <Head />
      <Main>{main}</Main>
      <Sidebar>{sidebar}</Sidebar>
      <Bottom>{bottom}</Bottom>
    </Container>
  );
};

export default GameLayout;

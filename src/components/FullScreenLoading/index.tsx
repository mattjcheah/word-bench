import PulseLoader from "react-spinners/PulseLoader";
import { Container } from "./styles";

const FullScreenLoading = () => {
  return (
    <Container>
      <PulseLoader loading={true} size={"2rem"} color={"var(--blackboard)"} />
    </Container>
  );
};

export default FullScreenLoading;

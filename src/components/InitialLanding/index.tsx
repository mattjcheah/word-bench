import LandingButton from "../LandingButton";

type Props = {
  setStage: (stage: string) => void;
};

function InitialLanding({ setStage }: Props) {
  return (
    <div>
      <LandingButton onClick={() => setStage("newGame")}>CREATE</LandingButton>
      <LandingButton onClick={() => setStage("joinGame")}>JOIN</LandingButton>
    </div>
  );
}

export default InitialLanding;

import Terminal from "../assets/Terminal/Terminal";

const SimulationView = ({ id }) => {
  console.log({ id });
  return (
    <div>
      <Terminal id={id} />
    </div>
  );
};

export default SimulationView;

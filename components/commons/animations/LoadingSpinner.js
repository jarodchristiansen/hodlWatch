// import Lottie from "lottie-react";
// // import animationData from "../../public/lotties/spiral-loading.json";
// import animationData from "../../../public/lotties/spiral-loading.json";
import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  return (
    <div>
      <h1>Hello There</h1>
      {/*<Lottie*/}
      {/*  options={defaultOptions}*/}
      {/*  height={400}*/}
      {/*  width={400}*/}
      {/*  // style={{*/}
      {/*  //   cursor: "default",*/}
      {/*  //   position: "absolute",*/}
      {/*  //   marginLeft: "auto",*/}
      {/*  //   marginRight: "auto",*/}
      {/*  //   left: 0,*/}
      {/*  //   right: 0,*/}
      {/*  //   top: 200,*/}
      {/*  //   textAlign: "center",*/}
      {/*  // }}*/}
      {/*  // isClickToPauseDisabled={true}*/}
      {/*/>*/}
      <Spinner animation="grow" size={"sm"} />
      <Spinner animation="grow" />
      <Spinner animation="grow" size={"sm"} />
    </div>
  );
};

export default LoadingSpinner;

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Toast } from "react-bootstrap";

const ToastHolder = ({ toggleShowA, showA, setShowA, toastText }) => {
  // const [showA, setShowA] = useState(false);

  // const toggleShowA = () => setShowA(!showA);

  return (
    <Row>
      <Col md={12} className="mb-2">
        {/*<Button onClick={toggleShowA} className="mb-2">*/}
        {/*  Toggle Toast <strong>with</strong> Animation*/}
        {/*</Button>*/}
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <Image
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>
            Woohoo, you&apos;re reading this text in a Toast!
          </Toast.Body>
        </Toast>
      </Col>
      {/*<Col md={6} className="mb-2">*/}
      {/*  <Button onClick={toggleShowB} className="mb-2">*/}
      {/*    Toggle Toast <strong>without</strong> Animation*/}
      {/*  </Button>*/}
      {/*  <Toast onClose={toggleShowB} show={showB} animation={false}>*/}
      {/*    <Toast.Header>*/}
      {/*      <img*/}
      {/*        src="holder.js/20x20?text=%20"*/}
      {/*        className="rounded me-2"*/}
      {/*        alt=""*/}
      {/*      />*/}
      {/*      <strong className="me-auto">Bootstrap</strong>*/}
      {/*      <small>11 mins ago</small>*/}
      {/*    </Toast.Header>*/}
      {/*    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>*/}
      {/*  </Toast>*/}
      {/*</Col>*/}
    </Row>
  );
};

export default ToastHolder;

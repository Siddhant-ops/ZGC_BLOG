import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";

function PrivateRoute(props) {
  const [isAllowed, setIsAllowed] = useState(null);
  const [render, setRender] = useState(<div />);

  const condition = props.condition;
  let response = condition.response;

  useEffect(() => {
    condition.handler(props.computedMatch.params);
    response = null;
  }, []);

  useEffect(() => {
    setIsAllowed(response);
  }, [condition]);

  useEffect(() => {
    if (isAllowed !== null) {
      let render = isAllowed ? (
        <Route path={props.path} children={props.children} />
      ) : (
        <Redirect to="/" />
      );
      setRender(render);
    }
  }, [isAllowed]);

  return <div>{render}</div>;
}

export default PrivateRoute;

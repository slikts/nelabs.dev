import Wrapper from "./app/Wrapper";
import React from "react";
import ReactDOMServer from "react-dom/server";

exports.prerender = () => ReactDOMServer.renderToString(<Wrapper />);

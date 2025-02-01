import React from "react";
import ReactDOM from "react-dom";
import ChatWidget from "./ChatWidget";

function initChatWidget() {
  const container = document.createElement("div");
  container.id = "chat-widget-container";
  document.body.appendChild(container);

  ReactDOM.render(<ChatWidget />, container);
}

window.initChatWidget = initChatWidget;

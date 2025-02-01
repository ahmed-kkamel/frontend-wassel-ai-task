import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./ChatWidget";

export default function initChatWidget() {
  let container = document.getElementById("chat-widget-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "chat-widget-container";
    document.body.appendChild(container);
  }

  const root = ReactDOM.createRoot(container);
  root.render(<ChatWidget />);
}

window.initChatWidget = initChatWidget;

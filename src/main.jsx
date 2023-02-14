import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <ConfigProvider
        theme={{
          components: {
            Form: {
              marginLG: 12,
            },
            DatePicker: {
              controlHeight: 40,
            },
            Input: {
              controlHeight: 40,
            },
            InputNumber: {
              controlHeight: 40,
            },
            Select: {
              controlHeight: 40,
            },
          },
          token: {
            colorPrimary: "#0049FF",
            colorText: "#666",
            fontFamily: "Roboto, sans-serif",
          },
        }}
      >
        <StyleProvider hashPriority="high">
          <App />
        </StyleProvider>
      </ConfigProvider>
    </Router>
  </Provider>
);

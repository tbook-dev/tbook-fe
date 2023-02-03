import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { WagmiConfig } from "wagmi";
import { Web3Modal } from "@web3modal/react";
import { wagmiClient, ethereumClient } from "./utils/web3";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#6366F1",
          },
        }}
      >
        <StyleProvider hashPriority="high">
          <WagmiConfig client={wagmiClient}>
            <App />
          </WagmiConfig>
          <Web3Modal
            projectId={import.meta.env.VITE_WC_PROJECT_ID}
            ethereumClient={ethereumClient}
          />
        </StyleProvider>
      </ConfigProvider>
    </Router>
  </Provider>
);

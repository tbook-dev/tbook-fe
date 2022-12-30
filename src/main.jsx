import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import {ConfigProvider} from "antd";
import {StyleProvider} from "@ant-design/cssinjs";
import {store} from "./store/store";
import {Provider} from "react-redux";

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
                    <App/>
                </StyleProvider>
            </ConfigProvider>
        </Router>
    </Provider>
);

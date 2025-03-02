import BasicRouter from "./router/BasicRouter";
import { Button, ConfigProvider, Space } from "antd";
import React from "react";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: "#ec222c",
        borderRadius: 2,

        // Alias Token
        // colorBgContainer: "#f6ffed",
      },
    }}
  >
    <BasicRouter />
  </ConfigProvider>
);

export default App;

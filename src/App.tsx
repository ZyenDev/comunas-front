import BasicRouter from "./router/BasicRouter";
import { Button, ConfigProvider, Space } from "antd";
import React from "react";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        //colorPrimary: "#",
        colorPrimary: "#ec222c",
        colorInfo: "#ec222c",
        colorBgBase: "#f5f5f5",

        // Alias Token
        // colorBgContainer: "#f6ffed",
      },
      components: {
        Layout: {
          siderBg: "#5c0011",
          triggerBg: "#5c0011",
          headerBg: "#5c0011",
        },
        Menu: {
          colorText: "#fff",
          fontSize: 14,
          darkItemBg: "#5c0011",
        },
      },
    }}
  >
    <BasicRouter />
  </ConfigProvider>
);

export default App;

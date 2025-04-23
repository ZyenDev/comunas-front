import BasicRouter from "./router/BasicRouter";
import { ConfigProvider } from "antd";
import React from "react";

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        //colorPrimary: "#",
        colorPrimary: "#ad1a14",
        colorInfo: "#ad1a14",
        // colorBgBase: "#f5f5f5",

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
          //dark
          colorText: "#fff",
          fontSize: 14,
          darkItemBg: "#5c0011",
          //light
          itemBg: "#5c0011",
          itemHoverBg: "rgba(0, 0, 0, 0.23)",
          itemSelectedColor: "#fff", // text color
          itemSelectedBg: "#ad1a14",
        },
      },
    }}
  >
    <BasicRouter />
  </ConfigProvider>
);

export default App;

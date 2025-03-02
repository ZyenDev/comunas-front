import { Modal, Flex, Input, Divider, Button } from "antd";
import React from "react";

//UNUSED

interface CustomModalProps {
  open: boolean;
  handleOk: any;
  handleCancel: any;
  title: string;
  okText: string;
  cancelText: string;
  children: React.ReactNode;
}

const ModalForm: React.FC<CustomModalProps> = ({
  open,
  handleOk,
  handleCancel,
  title,
  okText,
  cancelText,
  children,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          {cancelText}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {okText}
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default ModalForm;

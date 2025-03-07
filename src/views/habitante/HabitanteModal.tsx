//habitante
import React, { useEffect, useState } from "react";
import {
  Flex,
  Button,
  Divider,
  Form,
  Modal,
  Select,
  Input,
  notification,
  Checkbox,
} from "antd";
import {
  createHabitante,
  getHabitanteByID,
  updateHabitante,
} from "../../controllers/ControllerHabitantes";
import { HabitanteInterface } from "../../models/HabitanteModel";
import { useParams } from "react-router";
import { getAllPaisOrigen } from "../../controllers/PaisOrigenController";
import { useAuth } from "../../components/AuthContext";

const HabitanteContent: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdated: boolean;
  id_habitante?: number;
}> = ({ open, setOpen, isUpdated, id_habitante }) => {
  const [form] = Form.useForm<HabitanteInterface>();
  const [api, contextHolder] = notification.useNotification();
  const [error, setError] = useState(false);
  const [paisOrigen, setPaisOrigen] = useState<any>();
  const { token } = useAuth();
  const [vene, setNAd] = useState<boolean>(false);
  const { id_habitantes } = useParams();

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (id_habitante !== undefined) {
        values.id_vivienda = id_habitante;
      }
      values.edad =
        new Date().getFullYear() -
        new Date(values.fecha_nacimiento).getFullYear();
      try {
        if (!isUpdated) {
          values.id_vivienda = Number(id_habitantes);
          const data = await createHabitante(values, token ? token : "");
        } else if (id_habitante != null) {
          values.id_vivienda = Number(id_habitantes);
          const data = await updateHabitante(
            id_habitante,
            values,
            token ? token : ""
          );
        } else {
          //este error en teoria es imposible
          throw new Error("fallo a optener un id");
        }
        form.resetFields();
        setOpen(false);
        setError(false);
      } catch (error: any) {
        let responceArray = error?.response.data;
        for (const key in responceArray) {
          if (responceArray.hasOwnProperty(key)) {
            openNotificationError(responceArray[key][0]);
            setError(true);
          }
        }
      }
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const getPaises = async () => {
        try {
          const paises = await getAllPaisOrigen(token ? token : "");
          const parsedPaises = paises.map((pais) => ({
            label: pais.nombre,
            value: pais.id_pais_origen,
          }));
          setPaisOrigen(parsedPaises);
        } catch (error) {
          openNotificationError("fallo al buscar paises origen");
        }
      };
      const getHabitanteById = async () => {
        if (isUpdated && id_habitante != null && open) {
          try {
            const data = await getHabitanteByID(
              id_habitante,
              token ? token : ""
            );
            form.setFieldsValue(data);
          } catch (error) {
            openNotificationError("fallo al buscar habitantes");
          }
        } else {
          form.resetFields();
        }
      };
      getPaises();
      getHabitanteById();
      setError(false);
    }
  }, [open]);

  const openNotificationError = (msg: string) => {
    api.error({
      message: msg,
    });
  };

  const customFooter = [
    <Button key="back" onClick={handleCancel}>
      Cancelar
    </Button>,
    <Button key="submit" type="primary" onClick={handleOk}>
      Entregar
    </Button>,
  ];

  return (
    <>
      <Flex vertical>
        {contextHolder}
        <Divider />
        <Modal
          title="Habitante: "
          open={open}
          onCancel={handleCancel}
          footer={customFooter}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ cantidad_habitante: 1 }}
            style={{ display: "flex", gap: "20px" }}
          >
            <Flex vertical>
              <Flex align="center">
                <Form.Item name="id_nacionalidad" label=" " initialValue={2}>
                  <Select
                    style={{ width: "50px" }}
                    defaultValue={2}
                    onChange={(value) => {
                      if (value === 2) {
                        setNAd(false);
                      } else {
                        setNAd(true);
                      }
                    }}
                  >
                    <Select.Option value={1}>E</Select.Option>
                    <Select.Option value={2}>V</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="cedula"
                  label="Cédula"
                  rules={[
                    { required: true, message: "Por favor ingrese la cédula" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Flex>
              <Form.Item
                name="primer_nombre"
                label="Primer Nombre"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el primer nombre",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="segundo_nombre" label="Segundo Nombre">
                <Input />
              </Form.Item>
              <Form.Item
                name="primer_apellido"
                label="Primer Apellido"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el primer apellido",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="segundo_apellido" label="Segundo Apellido">
                <Input />
              </Form.Item>
              <Form.Item
                name="fecha_nacimiento"
                label="Fecha de Nacimiento"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la fecha de nacimiento",
                  },
                ]}
              >
                <Input type="date" />
              </Form.Item>
            </Flex>
            <Flex vertical>
              <Form.Item
                name="sexo"
                label="Sexo"
                rules={[
                  { required: true, message: "Por favor seleccione el sexo" },
                ]}
              >
                <Select>
                  <Select.Option value={1}>Masculino</Select.Option>
                  <Select.Option value={2}>Femenino</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="discapacidad"
                label="Discapacidad"
                valuePropName="checked"
                initialValue={false}
              >
                <Checkbox />
              </Form.Item>
              <Form.Item
                name="pertenece_etnia"
                label="Pertenece a Etnia"
                valuePropName="checked"
                initialValue={false}
              >
                <Checkbox />
              </Form.Item>

              {vene && (
                <Form.Item name="id_pais_origen" label="País de Origen">
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={paisOrigen}
                  />
                </Form.Item>
              )}
            </Flex>
          </Form>
        </Modal>
      </Flex>
    </>
  );
};

export default HabitanteContent;

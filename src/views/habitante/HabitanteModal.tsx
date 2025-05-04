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
  Row,
} from "antd";
import {
  createHabitante,
  getHabitanteByID,
  updateHabitante,
} from "../../controllers/HabitantesController";
import { useParams } from "react-router";
import { getAllPaisOrigen } from "../../controllers/PaisOrigenController";
import { getAllVivienda } from "../../controllers/ViviendaController";
import { useAuth } from "../../components/AuthContext";
import { Register } from "../../controllers/SessionsController";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { RegisterLoginInterface } from "../../models/SessionsModel";
//getAllVivienda
const HabitanteContent: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdated: boolean;
  id_habitante?: number;
}> = ({ open, setOpen, isUpdated, id_habitante }) => {
  const [form] = Form.useForm<any>();
  const [api, contextHolder] = notification.useNotification();
  const [error, setError] = useState(false);
  const [paisOrigen, setPaisOrigen] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [vivienda, setVivienda] = useState<any>();
  const { role, token } = useAuth();
  const [vene, setNAd] = useState<boolean>(false);
  const { id_habitantes } = useParams();
  const [id_vivienda_local, setVin] = useState<number>();
  const [showPassword, setShowPassword] = useState(true);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setLoading(true);
      if (id_habitante !== undefined) {
        values.id_vivienda = id_habitante;
      }
      values.edad =
        new Date().getFullYear() -
        new Date(values.fecha_nacimiento).getFullYear();
      try {
        if (!isUpdated) {
          //create
          values.id_vivienda = Number(
            id_habitantes ? id_habitantes : id_vivienda_local
          );
          await createHabitante(values, token ? token : "");
        } else if (id_habitante != null) {
          //update
          console.log(values);
          values.id_vivienda = Number(id_vivienda_local);
          await updateHabitante(id_habitante, values, token ? token : "");
        } else {
          console.log(error);
          //este error en teoria es imposible
          throw new Error("¡Fallo al obtener el ID!");
        }

        var userData: RegisterLoginInterface = {
          email: values.email,
          username: values.username,
          password: values.password,
        };

        Register(userData, role ? role : "", token ? token : "");

        form.resetFields();
        setOpen(false);
        setError(false);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
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
      console.log(id_habitantes);
      const getPaises = async () => {
        setLoading(true);
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
        setLoading(true);
        if (isUpdated && id_habitante != null && open) {
          try {
            const data = await getHabitanteByID(
              id_habitante,
              token ? token : ""
            );
            form.setFieldsValue(data);
          } catch (error) {
            openNotificationError("¡Fallo al obtener Habitantes!");
          }
        } else {
          form.resetFields();
        }
        setLoading(false);
      };
      const getAllViviendasss = async () => {
        setLoading(true);
        if (id_habitante == undefined) {
          try {
            const data = await getAllVivienda(token ? token : "");
            const viviendasParse = data.map((pais) => ({
              value: pais.id_vivienda,
              label: pais.numero_vivienda,
            }));
            setVivienda(viviendasParse);
          } catch (error) {
            openNotificationError("¡Fallo al obtener Viviendas!");
          }
        }
        setLoading(false);
      };
      getAllViviendasss();
      getPaises();
      getHabitanteById();
      setError(false);
      console.log(id_habitante);
    }
  }, [open]);

  const openNotificationError = (msg: string) => {
    api.error({
      message: msg,
    });
  };

  //codigo repetitivo
  const customFooter = [
    <Button key="back" onClick={handleCancel}>
      Cancelar
    </Button>,
    <Button key="submit" type="primary" onClick={handleOk}>
      Registrar
    </Button>,
  ];

  return (
    <>
      <Flex vertical>
        {contextHolder}
        <Divider />
        <Modal
          title="Añadir Habitante: "
          open={open}
          onCancel={handleCancel}
          footer={customFooter}
          width={600} // Adjust the width as needed
          loading={loading}
        >
          <Row>
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
                      // loading={loading}
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
                      {
                        required: true,
                        message: "¡Por favor, ingrese la Cédula!",
                      },
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
                      message: "¡Por favor, ingrese el Primer Nombre!",
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
                      message: "¡Por favor, ingrese el Primer Apellido!",
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
                      message: "¡Por favor, ingrese la Fecha de Nacimiento!",
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
                    {
                      required: true,
                      message: "¡Por favor, seleccione el Sexo!",
                    },
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
                  label="¿Pertenece a una Etnia?"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Checkbox />
                </Form.Item>

                {vene && (
                  <Form.Item name="id_pais_origen" label="País de Origen">
                    <Select
                      showSearch
                      filterOption={(
                        input: string,
                        option?: { label?: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={paisOrigen}
                    />
                  </Form.Item>
                )}

                {id_habitantes === undefined && !isUpdated && (
                  <Form.Item name="vivenda" label="Vivienda">
                    <Select
                      options={vivienda}
                      value={form.getFieldValue("vivenda")}
                      onChange={(value) => {
                        setVin(value);
                        form.setFieldsValue({ vivenda: value });
                      }}
                    />
                  </Form.Item>
                )}

                <Form.Item
                  name="grado_intrusion"
                  label="Grado de Instrucción"
                  rules={[
                    {
                      required: true,
                      message:
                        "¡Por favor, seleccione el Grado de Instrucción!",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value={1}>Ninguno</Select.Option>
                    <Select.Option value={2}>Preescolar</Select.Option>
                    <Select.Option value={3}>Primaria</Select.Option>
                    <Select.Option value={4}>Secundaria</Select.Option>
                    <Select.Option value={5}>
                      Formación profesional
                    </Select.Option>
                    <Select.Option value={6}>
                      Educación universitaria (diplomatura, grado, licenciatura)
                    </Select.Option>
                    <Select.Option value={7}>
                      Post grado (Maestría, doctorado)
                    </Select.Option>
                    <Select.Option value={8}>Otro</Select.Option>
                    <Select.Option value={9}>No sabe/No contesta</Select.Option>
                  </Select>
                </Form.Item>

                <Divider />

                {!isUpdated && (
                  <>
                    <Typography.Title level={5}>
                      Datos de Usuario
                    </Typography.Title>
                    <Flex vertical style={{ width: "80%" }}>
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "¡Por favor, ingrese su Usuario!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Usuario"
                          suffix={<UserOutlined />}
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message:
                              "¡Por favor, ingrese su Correo Electrónico!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Correo Electrónico"
                          suffix={<MailOutlined />}
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "¡Por favor, ingrese su Contraseña!",
                          },
                        ]}
                      >
                        <div style={{ position: "relative" }}>
                          <Input
                            type={showPassword ? "password" : "text"}
                            placeholder="Ingresa tu Contraseña"
                          />
                          <Button
                            type="text"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{
                              position: "absolute",
                              right: 10,
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                            icon={
                              showPassword ? (
                                <EyeInvisibleOutlined />
                              ) : (
                                <EyeOutlined />
                              )
                            }
                          />
                        </div>
                      </Form.Item>
                    </Flex>
                  </>
                )}
              </Flex>
            </Form>
          </Row>
        </Modal>
      </Flex>
    </>
  );
};

export default HabitanteContent;

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
  InputNumber,
  Checkbox,
} from "antd";

import {
  createVivienda,
  getViviendaById,
  updateVivienda,
} from "../../controllers/ViviendaController";
import { ViviendaInterface } from "../../models/ViviendaModel";
import { UbicacionInterface } from "../../models/UbicacionModel";
import { getAllUbicaciones } from "../../controllers/UbicacionController";
import { getAllConsejoComunal } from "../../controllers/ConsejoComunalController";
import { DefaultOptionType } from "antd/es/select";
import { getAllTipoVivienda } from "../../controllers/TipoViviendaController";
import { TipoViviendaInterface } from "../../models/TipoViviendaModel";
import { getAllTipoTecho } from "../../controllers/TipoTechoController";
import { TipoTechoInterface } from "../../models/TipoTechoModel";
import { getAllTipoPared } from "../../controllers/TipoParedController";
import { getAllTipoPiso } from "../../controllers/TipoPisoController";
import { getAllSituacionVivienda } from "../../controllers/SituacionViviendaController";
import { TipoOcupacionViviendaInterface } from "../../models/TipoOcupacionViviendaModel";
import {
  createTipoOcupacionVivienda,
  updateTipoOcupacionVivienda,
} from "../../controllers/TipoOcupacionVivienda";
import { useAuth } from "../../components/AuthContext";

const ViviendasContent: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdated: boolean;
  idVivienda?: number;
}> = ({ open, setOpen, isUpdated, idVivienda: idVivienda }) => {
  const [form] = Form.useForm<ViviendaInterface>();
  const [ubicacion, setUbicacion] = useState<DefaultOptionType[]>();
  const [Comuna, setComunas] = useState<DefaultOptionType[]>();
  const [tipoVivienda, setTipoVivienda] = useState<DefaultOptionType[]>();
  const [tipoTecho, setTipoTecho] = useState<DefaultOptionType[]>();
  const [tipoPared, setTipoPared] = useState<DefaultOptionType[]>();
  const [tipoPiso, setTipoPiso] = useState<DefaultOptionType[]>();
  const [situacionVivienda, setSituacionVivienta] =
    useState<DefaultOptionType[]>();
  const [api, contextHolder] = notification.useNotification();
  const [check, setCheckBox] = useState(true);
  const [checkboxint, setCheckBoxint] = useState(0);
  const [error, setError] = useState(false);
  const { token } = useAuth();

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      let tipoOcupacionVivienda: TipoOcupacionViviendaInterface = {
        id_tipo_ocupacion: values.id_tipo_ocupacion,
        subtipo_ocupacion: values.subtipo_ocupacion,
        vivienda_ocupada: values.vivienda_ocupada,
        tiene_documentacion: values.tiene_documentacion,
        respuesta_otro: values.respuesta_otro,
      };
      if (!isUpdated) {
        //TODO:finish
        try {
          if (tipoOcupacionVivienda.respuesta_otro !== null) {
            tipoOcupacionVivienda.respuesta_otro = "a";
          }

          const data = await createTipoOcupacionVivienda(
            tipoOcupacionVivienda,
            token ? token : ""
          );
          console.log(data.id_tipo_ocupacion);

          if (data.id_tipo_ocupacion !== undefined) {
            values.id_tipo_ocupacion_vivienda = data.id_tipo_ocupacion;
          }

          const datav = await createVivienda(values, token ? token : "");
        } catch (error) {
          console.log(error);
        }
        setOpen(false);
        openNotificationSuccess("se creo la vivienda");
      } else {
        try {
          if (
            idVivienda != null &&
            tipoOcupacionVivienda.id_tipo_ocupacion != null
          ) {
            const datavivienda = await updateTipoOcupacionVivienda(
              tipoOcupacionVivienda.id_tipo_ocupacion,
              tipoOcupacionVivienda,
              token ? token : ""
            );

            const data = await updateVivienda(
              idVivienda,
              values,
              token ? token : ""
            );
          }
        } catch (error) {
          console.log(error);
          return;
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
      const getUbicaciones = async () => {
        try {
          const data = await getAllUbicaciones(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element: UbicacionInterface) => {
            opt.push({
              value: element.id_ubicacion,
              label: element.direccion,
            });
          });
          setUbicacion(opt);
        } catch (error) {
          openNotificationError("Error");
        }
      };
      const getTipoVivienda = async () => {
        try {
          const data = await getAllTipoVivienda(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element: TipoViviendaInterface) => {
            opt.push({
              value: element.id_tipo_vivienda,
              label: element.descripcion,
            });
          });
          setTipoVivienda(opt);
        } catch (error) {
          openNotificationError("Error");
        }
      };
      const getTipoTecho = async () => {
        try {
          const data = await getAllTipoTecho(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element: TipoTechoInterface) => {
            opt.push({
              value: element.id_tipo_techo,
              label: element.descripcion,
            });
          });
          setTipoTecho(opt);
        } catch (error) {
          openNotificationError("Error");
        }
      };
      const getTipoPiso = async () => {
        try {
          const data = await getAllTipoPiso(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_tipo_piso,
              label: element.descripcion,
            });
          });
          setTipoPiso(opt);
        } catch (error) {
          openNotificationError("Error");
        }
      };
      const getSituacionVivienda = async () => {
        try {
          const data = await getAllSituacionVivienda(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_situacion_vivienda,
              label: element.descripcion,
            });
          });
          setSituacionVivienta(opt);
        } catch (error) {
          openNotificationError("Error");
        }
      };
      const getConsejo = async () => {
        try {
          const data = await getAllConsejoComunal(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_consejo_comunal,
              label: element.nombre,
            });
          });
          setComunas(opt);
        } catch (error) {
          openNotificationError("Error");
        }
      };
      const getTipoPared = async () => {
        try {
          const data = await getAllTipoPared(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_tipo_pared,
              label: element.descripcion,
            });
          });
          setTipoPared(opt);
        } catch (error) {
          openNotificationError("Error");
        }
      };
      const getViviendabyId = async () => {
        if (isUpdated && idVivienda != null && open) {
          try {
            const data = await getViviendaById(idVivienda, token ? token : "");
            form.setFieldsValue(data);
          } catch (error) {
            openNotificationError("error");
          }
        } else {
          form.resetFields();
        }
      };
      //llamar par el edit
      getViviendabyId();

      //selects
      getSituacionVivienda();
      getTipoPiso();
      getTipoPared();
      getTipoTecho();
      getTipoVivienda();
      getConsejo();
      getUbicaciones();
      //errors
      setError(false);
    }
  }, [open]);

  const openNotificationError = (msg: string) => {
    api.error({
      message: msg,
    });
  };
  const openNotificationSuccess = (msg: string) => {
    api.success({
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

  function haddleCheckId_tipo_ocupacion_vivienda() {
    console.log(check);
    setCheckBox(!check);
  }

  const optOcupada = [
    {
      value: 1,
      label: "En propiedad",
    }, //1
    {
      value: 2,
      label: "Alquilada",
    }, //2
    {
      value: 3,
      label: "Cedida",
    }, //3
    { value: 4, label: "Ocupada sin título" }, //4
    { value: 5, label: "Otra. Indicar:" }, //5
  ];

  const optDesocupada = [
    { value: 1, label: "Residencia secundaria" },
    { value: 2, label: "En alquiler" },
    { value: 3, label: "En venta" },
    { value: 4, label: "Destinada a demolición" },
    { value: 5, label: "Otras. Indicar:" },
  ];

  return (
    <>
      <Flex vertical>
        {contextHolder}
        <Divider />
        <Modal
          title="Consejo Comunal: "
          open={open}
          onCancel={handleCancel}
          footer={customFooter}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ cantidad_consejo_comunal: 1 }}
          >
            <Flex gap="small">
              <Flex vertical>
                <Form.Item
                  label="Número de Vivienda"
                  name="numero_vivienda"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese el Número de Vivienda!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                {/* Cantidad de Habitantes */}
                <Form.Item
                  label="Cantidad de Habitantes"
                  name="cantidad_habitantes"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese la Cantidad de Habitantes!",
                    },
                  ]}
                >
                  <InputNumber min={0} />
                </Form.Item>

                {/* Cantidad de Familias */}
                <Form.Item
                  label="Cantidad de Familias"
                  name="cantidad_familias"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese la Cantidad de Familias!",
                    },
                  ]}
                >
                  <InputNumber min={0} />
                </Form.Item>

                {/* Cantidad de Baños */}
                <Form.Item
                  label="Cantidad de Baños"
                  name="cantidad_banos"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese la Cantidad de Baños!",
                    },
                  ]}
                >
                  <InputNumber min={0} />
                </Form.Item>

                {/* Cantidad de Cuartos */}
                <Form.Item
                  label="Cantidad de Cuartos"
                  name="cantidad_cuartos"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese la Cantidad de Cuartos!",
                    },
                  ]}
                >
                  <InputNumber min={0} />
                </Form.Item>
                {/* ID Ubicación */}
                <Form.Item
                  label="Ubicación"
                  name="id_ubicacion"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese la Ubicación!",
                    },
                  ]}
                >
                  <Select options={ubicacion} />
                </Form.Item>

                {/* ID Consejo Comunal */}
                <Form.Item
                  label="Consejo Comunal"
                  name="id_consejo_comunal"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese el Consejo Comunal!",
                    },
                  ]}
                >
                  <Select options={Comuna} />
                </Form.Item>
              </Flex>
              <Flex vertical style={{ width: "50%" }}>
                {/* ID Tipo de Vivienda */}
                <Form.Item
                  label="Tipo de Vivienda"
                  name="id_tipo_vivienda"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese el Tipo de Vivienda!",
                    },
                  ]}
                >
                  <Select options={tipoVivienda} />
                </Form.Item>

                {/* ID Tipo de Techo */}
                <Form.Item
                  label="Tipo de Techo"
                  name="id_tipo_techo"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese el Tipo de Techo!",
                    },
                  ]}
                >
                  <Select options={tipoTecho} />
                </Form.Item>

                {/* ID Tipo de Pared */}
                <Form.Item
                  label="Tipo de Pared"
                  name="id_tipo_pared"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese el Tipo de Pared!",
                    },
                  ]}
                >
                  <Select options={tipoPared} />
                </Form.Item>

                {/* ID Tipo de Piso */}
                <Form.Item
                  label="Tipo de Piso"
                  name="id_tipo_piso"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese el Tipo de Piso!",
                    },
                  ]}
                >
                  <Select options={tipoPiso} />
                </Form.Item>

                {/* ID Situación de Vivienda */}
                <Form.Item
                  label="Situación de Vivienda"
                  name="id_situacion_vivienda"
                  rules={[
                    {
                      required: true,
                      message:
                        "¡Por favor, ingrese la Situación de la Vivienda!",
                    },
                  ]}
                >
                  <Select options={situacionVivienda} />
                </Form.Item>

                <Flex vertical gap="small">
                  {/* vivienda opcupada */}
                  <Form.Item name="vivienda_ocupada" valuePropName="checked">
                    <Checkbox onChange={haddleCheckId_tipo_ocupacion_vivienda}>
                      ¿Vivienda ocupada?
                    </Checkbox>
                  </Form.Item>
                  <Flex>
                    <Form.Item name="subtipo_ocupacion">
                      <Select
                        defaultValue={
                          check ? optOcupada[0].value : optDesocupada[0].value
                        }
                        options={check ? optOcupada : optDesocupada}
                        onChange={(value) => setCheckBoxint(value)}
                      />
                    </Form.Item>
                    {checkboxint != 5 && (
                      <Form.Item
                        name="tiene_documentacion"
                        valuePropName="checked"
                      >
                        <Checkbox />
                      </Form.Item>
                    )}
                  </Flex>
                  <Form.Item name="respuesta_otro">
                    {checkboxint == 5 && <Input placeholder="Otra. Indicar:" />}
                  </Form.Item>
                </Flex>
              </Flex>
            </Flex>
          </Form>
        </Modal>
      </Flex>
    </>
  );
};

export default ViviendasContent;

//habitante
import React, { useEffect, useState } from "react";
import {
  Table,
  Layout,
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
import { getAllComunas, getComunaByID } from "../controllers/ComunaController";
import {
  createVivienda,
  updateVivienda,
} from "../controllers/ViviendaController";
import { ViviendaInterface } from "../models/ViviendaModel";
import {
  getAllAmbitos,
  getAmbito,
} from "../controllers/AmbitoTerritorialController";
import { UbicacionInterface } from "../models/UbicacionModel";
import { getAllUbicaciones } from "../controllers/UbicacionController";
import { getConsejoComunalById } from "../controllers/ConsejoComunalController";
import { DefaultOptionType } from "antd/es/select";
import { getAllTipoVivienda } from "../controllers/TipoViviendaController";
import { TipoViviendaInterface } from "../models/TipoViviendaModel";
import { getAllTipoTecho } from "../controllers/TipoTechoController";
import { TipoTechoInterface } from "../models/TipoTechoModel";
import { getAllTipoPared } from "../controllers/TipoParedController";
import { getAllTipoPiso } from "../controllers/TipoPisoController";
import { getAllSituacionVivienda } from "../controllers/SituacionViviendaController";

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

  const handleOk = () => {
    console.log(form.getFieldsValue());
    // form.validateFields().then(async (values) => {
    //   try {
    //     if (!isUpdated) {
    //       const data = await createVivienda(values);
    //     } else if (idVivienda != null) {
    //       const data = await updateVivienda(idVivienda, values);
    //     } else {
    //       //este error en teoria es imposible
    //       throw new Error("¡Fallo al obtener ID!");
    //     }
    //     form.resetFields();
    //     setOpen(false);
    //     setError(false);
    //   } catch (error: any) {
    //     let responceArray = error?.response.data;
    //     for (const key in responceArray) {
    //       if (responceArray.hasOwnProperty(key)) {
    //         openNotificationError(responceArray[key][0]);
    //         setError(true);
    //       }
    //     }
    //   }
    // });
  };
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const getUbicaciones = async () => {
        try {
          const data = await getAllUbicaciones();
          let opt: DefaultOptionType[] = [];
          data.forEach((element: UbicacionInterface) => {
            opt.push({
              value: element.id_ubicacion,
              label: element.direccion,
            });
          });
          setUbicacion(opt);
        } catch (error) {
          console.error("Fallo al encontrar Ámbitos Territoriales:", error);
        }
      };
      const getTipoVivienda = async () => {
        try {
          const data = await getAllTipoVivienda();
          let opt: DefaultOptionType[] = [];
          data.forEach((element: TipoViviendaInterface) => {
            opt.push({
              value: element.id_tipo_vivienda,
              label: element.descripcion,
            });
          });
          setTipoVivienda(opt);
        } catch (error) {
          console.error("Fallo al encontrar Ámbitos Territoriales:", error);
        }
      };
      const getTipoTecho = async () => {
        try {
          const data = await getAllTipoTecho();
          let opt: DefaultOptionType[] = [];
          data.forEach((element: TipoTechoInterface) => {
            opt.push({
              value: element.id_tipo_techo,
              label: element.descripcion,
            });
          });
          setTipoTecho(opt);
        } catch (error) {
          console.error("Fallo al encontrar Ámbitos Territoriales:", error);
        }
      };
      const getTipoPiso = async () => {
        try {
          const data = await getAllTipoPiso();
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_tipo_piso,
              label: element.descripcion,
            });
          });
          setTipoPiso(opt);
        } catch (error) {
          console.error("Fallo al encontrar Tipos de Piso:", error);
        }
      };
      const getSituacionVivienda = async () => {
        try {
          const data = await getAllSituacionVivienda();
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_situacion_vivienda,
              label: element.descripcion,
            });
          });
          setSituacionVivienta(opt);
        } catch (error) {
          console.error("Fallo al encontrar Situaciones de Vivienda:", error);
        }
      };
      const getComunas = async () => {
        try {
          const data = await getAllComunas();
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_comuna,
              label: element.nombre,
            });
          });
          setComunas(opt);
        } catch (error) {
          console.error("Fallo al encontrar Comunas:", error);
        }
      };
      const getTipoPared = async () => {
        try {
          const data = await getAllTipoPared();
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_tipo_pared,
              label: element.descripcion,
            });
          });
          setTipoPared(opt);
        } catch (error) {
          console.error("Fallo al encontrar Comunas:", error);
        }
      };
      const getConsejoComunalbyid = async () => {
        if (isUpdated && idVivienda != null && open) {
          try {
            const data = await getConsejoComunalById(idVivienda);
            form.setFieldsValue(data);
          } catch (error) {
            console.log(error);
          }
        } else {
          form.resetFields();
        }
      };
      getSituacionVivienda();
      getTipoPiso();
      getTipoPared();
      getTipoTecho();
      getTipoVivienda();
      getConsejoComunalbyid();
      getComunas();
      getUbicaciones();
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

  /*
  
  En propiedad 3A. 
  ¿Tiene título de propiedad? Sí No
  Alquilada 3B. 
  ¿Tiene contrato de alquiler? Sí No
  Cedida  3C.
  ¿Tiene documentación que lo acredite? Sí No

  Ocupada sin título de ocupación

  Otra. Indicar:_______________________

   */
  function haddleCheckId_tipo_ocupacion_vivienda() {
    console.log(check);
    setCheckBox(!check);
  }

  // const optOcupada = [
  //   {
  //     value: "propiedad_titulo",
  //     label: "En propiedad 3A. ¿Tiene título de propiedad? Sí No",
  //   }, //1
  //   {
  //     value: "alquilada_contrato",
  //     label: "Alquilada 3B. ¿Tiene contrato de alquiler? Sí No",
  //   }, //2
  //   {
  //     value: "cedida_documentacion",
  //     label: "Cedida 3C. ¿Tiene documentación que lo acredite? Sí No",
  //   }, //3
  //   { value: "ocupada_sin_titulo", label: "Ocupada sin título de ocupación" }, //4
  //   { value: "otra", label: "Otra. Indicar:" }, //5
  // ];

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
              <Flex vertical>
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

                {/* ID Tipo de Ocupación de Vivienda */}
                <Form.Item
                  label="Tipo de Ocupación de Vivienda"
                  name="id_tipo_ocupacion_vivienda"
                  rules={[
                    {
                      required: true,
                      message:
                        "¡Por favor, ingrese el Tipo de Ocupación de la Vivienda!",
                    },
                  ]}
                >
                  <Flex vertical gap="small">
                    <Checkbox onChange={haddleCheckId_tipo_ocupacion_vivienda}>
                      vivenda ocupada
                    </Checkbox>
                    <Flex gap="small">
                      <Select
                        options={check ? optOcupada : optDesocupada}
                        onChange={(value) => setCheckBoxint(value)}
                      />
                      {checkboxint == 0 ||
                        (checkboxint != 5 && (
                          <Checkbox style={{ transform: "scale(1.5)" }} />
                        ))}
                    </Flex>
                    {checkboxint == 5 && <Input placeholder="Otra. Indicar:" />}
                  </Flex>
                </Form.Item>
              </Flex>
            </Flex>
          </Form>
        </Modal>
      </Flex>
    </>
  );
};

export default ViviendasContent;

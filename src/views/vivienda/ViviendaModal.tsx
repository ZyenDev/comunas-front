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
import { createUbicacion } from "../../controllers/UbicacionController";
import { getAllConsejoComunal } from "../../controllers/ConsejoComunalController";
import { DefaultOptionType } from "antd/es/select";
import { getAllTipoVivienda } from "../../controllers/TipoViviendaController";
import { TipoViviendaInterface } from "../../models/TipoViviendaModel";
import { getAllTipoTecho } from "../../controllers/TipoTechoController";
import { TipoTechoInterface } from "../../models/TipoTechoModel";
import { getAllTipoPared } from "../../controllers/TipoParedController";
import { getAllTipoPiso } from "../../controllers/TipoPisoController";
// import { getAllSituacionVivienda } from "../../controllers/SituacionViviendaController";
import { TipoOcupacionViviendaInterface } from "../../models/TipoOcupacionViviendaModel";
import {
  createTipoOcupacionVivienda,
  updateTipoOcupacionVivienda,
} from "../../controllers/TipoOcupacionVivienda";
import { useAuth } from "../../components/AuthContext";
// import { getAllEstados } from "../../controllers/EstadoController";
import { getMunicipioByEstadosID } from "../../controllers/MunicipioController";
import { getParroquiaByMunicipio } from "../../controllers/ParroquiaController";
import { getSectorByParroquia } from "../../controllers/SectorController";

const ViviendasContent: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdated: boolean;
  idVivienda?: number;
}> = ({ open, setOpen, isUpdated, idVivienda: idVivienda }) => {
  const [form] = Form.useForm<ViviendaInterface>();
  const [Comuna, setComunas] = useState<DefaultOptionType[]>();
  const [loading, setLoading] = useState(false);

  const [tipoVivienda, setTipoVivienda] = useState<DefaultOptionType[]>();
  const [tipoTecho, setTipoTecho] = useState<DefaultOptionType[]>();
  const [tipoPared, setTipoPared] = useState<DefaultOptionType[]>();
  const [tipoPiso, setTipoPiso] = useState<DefaultOptionType[]>();
  // const [situacionVivienda, setSituacionVivienta] =
  useState<DefaultOptionType[]>();
  const [api, contextHolder] = notification.useNotification();
  const [check, setCheckBox] = useState(true);
  const [checkboxint, setCheckBoxint] = useState(0);
  const [error, setError] = useState(false);
  const { token } = useAuth();

  //ubicacion
  // const [estadosOpt, setEstadosOpt] = useState<DefaultOptionType[]>();
  // const [estadoSelect, setEstadoSelect] = useState<number>();

  const [municipioOpt, setMunicipioOpt] = useState<DefaultOptionType[]>();
  const [municipioSelect, setMunicipioSelect] = useState<number>();

  const [parroquiaOpt, setparroquiaOpt] = useState<DefaultOptionType[]>();
  const [parroquiaSelect, setParroquiaSelect] = useState<number>();

  const [sectorOpt, setSectorOpt] = useState<DefaultOptionType[]>();
  const [sectorSelect, setSectorSelect] = useState<number>();

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      setLoading(true);
      let tipoOcupacionVivienda: TipoOcupacionViviendaInterface = {
        id_tipo_ocupacion: values.id_tipo_ocupacion,
        subtipo_ocupacion: values.subtipo_ocupacion,
        vivienda_ocupada: values.vivienda_ocupada,
        tiene_documentacion: values.tiene_documentacion,
        respuesta_otro: values.respuesta_otro,
      };
      let ubicacion: UbicacionInterface = {
        id_ubicacion: values.id_ubicacion,
        id_parroquia: parroquiaSelect ? parroquiaSelect : 0,
        id_sector: sectorSelect ? sectorSelect : 0,
        direccion: values.direccion,
      };
      if (!isUpdated) {
        try {
          if (tipoOcupacionVivienda.respuesta_otro !== null) {
            tipoOcupacionVivienda.respuesta_otro = "a";
          }

          const ubica = await createUbicacion(ubicacion, token ? token : "");

          values.id_ubicacion = ubica.id_ubicacion;
          const data = await createTipoOcupacionVivienda(
            tipoOcupacionVivienda,
            token ? token : ""
          );

          if (data.id_tipo_ocupacion !== undefined) {
            values.id_tipo_ocupacion_vivienda = data.id_tipo_ocupacion;
          }

          await createVivienda(values, token ? token : "");
          console.log(error);
        } catch (error) {
          setLoading(false);
          openNotificationError("¡Error al crear la Vivienda!");
        }
        setOpen(false);

        openNotificationSuccess("¡Vivienda creada con exito!");
      } else {
        try {
          if (
            idVivienda != null &&
            tipoOcupacionVivienda.id_tipo_ocupacion != null
          ) {
            await updateTipoOcupacionVivienda(
              tipoOcupacionVivienda.id_tipo_ocupacion,
              tipoOcupacionVivienda,
              token ? token : ""
            );

            await updateVivienda(idVivienda, values, token ? token : "");
          }
        } catch (error) {
          setLoading(false);
          openNotificationError("¡Error al actualizar la Vivienda!");
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
      const getTipoVivienda = async () => {
        setLoading(true);
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
          openNotificationError("Error.");
        }
        setLoading(false);
      };
      const getTipoTecho = async () => {
        setLoading(true);
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
          openNotificationError("Error.");
        }
        setLoading(false);
      };
      const getTipoPiso = async () => {
        setLoading(true);
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
          openNotificationError("Error.");
        }
        setLoading(false);
      };
      // const getSituacionVivienda = async () => {
      //   setLoading(true);
      //   try {
      //     const data = await getAllSituacionVivienda(token ? token : "");
      //     let opt: DefaultOptionType[] = [];
      //     data.forEach((element) => {
      //       opt.push({
      //         value: element.id_situacion_vivienda,
      //         label: element.descripcion,
      //       });
      //     });
      //     setSituacionVivienta(opt);
      //   } catch (error) {
      //     openNotificationError("Error.");
      //   }
      //   setLoading(false);
      // };
      const getConsejo = async () => {
        setLoading(true);
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
          openNotificationError("Error.");
        }
        setLoading(false);
      };
      const getTipoPared = async () => {
        setLoading(true);
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
          openNotificationError("Error.");
        }
        setLoading(false);
      };
      const getViviendabyId = async () => {
        if (isUpdated && idVivienda != null && open) {
          setLoading(true);
          try {
            const data = await getViviendaById(idVivienda, token ? token : "");
            form.setFieldsValue(data);
          } catch (error) {
            openNotificationError("Error.");
          }
        } else {
          form.resetFields();
        }
        setLoading(false);
      };
      const getMunicipio = async () => {
        setLoading(true);
        try {
          const data = await getMunicipioByEstadosID(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_municipio,
              label: element.nombre,
            });
          });
          setMunicipioOpt(opt);
        } catch (error) {
          openNotificationError("Error.");
        }
        setLoading(false);
      };

      getMunicipio();

      /* para empeazar por estado
      const getEstados = async () => {
        try {
          const data = await getAllEstados(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_estado,
              label: element.nombre,
            });
          });
          setEstadosOpt(opt);
        } catch (error) {
          openNotificationError("Error");
        }
      };
      */
      //llamar par el edit
      getViviendabyId();

      //selects
      // getEstados(); //para tener el estado
      // getSituacionVivienda();
      getTipoPiso();
      getTipoPared();
      getTipoTecho();
      getTipoVivienda();
      getConsejo();
      //errors
      setError(false);
    }
  }, [open]);

  useEffect(() => {
    const getParroquia = async () => {
      try {
        if (municipioSelect === undefined) {
          return;
        }
        const data = await getParroquiaByMunicipio(
          municipioSelect,
          token ? token : ""
        );
        let opt: DefaultOptionType[] = [];
        data.forEach((element) => {
          opt.push({
            value: element.id_municipio,
            label: element.nombre,
          });
        });
        setparroquiaOpt(opt);
      } catch (error) {
        openNotificationError("Error.");
      }
    };
    getParroquia();
  }, [municipioSelect]);

  useEffect(() => {
    const getSector = async () => {
      try {
        if (parroquiaSelect === undefined) {
          return;
        }
        const data = await getSectorByParroquia(
          parroquiaSelect,
          token ? token : ""
        );
        let opt: DefaultOptionType[] = [];
        data.forEach((element) => {
          opt.push({
            value: element.id_parroquia,
            label: element.nombre,
          });
        });
        setSectorOpt(opt);
      } catch (error) {
        openNotificationError("Error.");
      }
    };
    getSector();
  }, [parroquiaSelect]);

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
      Registrar
    </Button>,
  ];

  function haddleCheckId_tipo_ocupacion_vivienda() {
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

  /*
  - REMODELACION DE MODAL VIVIENDA (ANADIR CHECKS DE SERVICIOS BASICOS) []

  - ANADIR EN EL LISTADO LOS CAMPOS RESTANTES (TODOS LOS SERVICIOS BASICOS DISPONIBLES, TIPO DE OCUPACION) []
  */

  return (
    <>
      <Flex vertical>
        {contextHolder}
        <Divider />
        <Modal
          title="Vivienda:"
          open={open}
          onCancel={handleCancel}
          footer={customFooter}
          loading={loading}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ cantidad_consejo_comunal: 1 }}
          >
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

            <Form.Item
              label="Municipio"
              name="id_municipio"
              rules={[
                {
                  required: true,
                  message: "¡Por favor, ingrese el Consejo Comunal!",
                },
              ]}
            >
              <Select
                options={municipioOpt}
                value={municipioSelect}
                onChange={(values) => {
                  setMunicipioSelect(values);
                }}
              />
            </Form.Item>

            <Form.Item
              label="Parroquia"
              name="id_parroquia"
              rules={[
                {
                  required: true,
                  message: "¡Por favor, ingrese el Consejo Comunal!",
                },
              ]}
            >
              <Select
                options={parroquiaOpt}
                value={parroquiaSelect}
                onChange={(values) => {
                  setParroquiaSelect(values);
                }}
              />
            </Form.Item>

            <Form.Item label="Sector" name="id_sector">
              <Select
                options={sectorOpt}
                value={sectorSelect}
                onChange={(values) => {
                  setSectorSelect(values);
                }}
              />
            </Form.Item>

            {/* Direccion */}
            <Form.Item
              label="Dirección"
              name="direccion"
              rules={[
                {
                  required: true,
                  message: "¡Por favor, ingrese el Consejo Comunal!",
                },
              ]}
            >
              <Input placeholder="Dirección" />
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
            {/* Servicios Básicos */}
            <Form.Item label="Servicios Básicos">
              <Flex>
                <Form.Item
                  name="agua"
                  valuePropName="checked"
                  initialValue={false}
                  style={{ marginRight: "10px" }}
                >
                  <Checkbox defaultChecked={false}>Agua</Checkbox>
                </Form.Item>
                <Form.Item
                  name="electricidad"
                  valuePropName="checked"
                  initialValue={false}
                  style={{ marginRight: "10px" }}
                >
                  <Checkbox defaultChecked={false}>Electricidad</Checkbox>
                </Form.Item>
                <Form.Item
                  name="gas"
                  valuePropName="checked"
                  initialValue={false}
                  style={{ marginRight: "10px" }}
                >
                  <Checkbox defaultChecked={false}>Gas</Checkbox>
                </Form.Item>
                <Form.Item
                  name="internet"
                  valuePropName="checked"
                  initialValue={false}
                  style={{ marginRight: "10px" }}
                >
                  <Checkbox defaultChecked={false}>Internet</Checkbox>
                </Form.Item>
                <Form.Item
                  name="aseo"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Checkbox defaultChecked={false}>aseo</Checkbox>
                </Form.Item>
                <Form.Item
                  name="cloaca"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Checkbox defaultChecked={false}>cloaca</Checkbox>
                </Form.Item>
              </Flex>
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

            {/* Tipo de Ocupación */}
            <Form.Item
              label="Tipo de Ocupación"
              name="subtipo_ocupacion"
              rules={[
                {
                  required: true,
                  message: "¡Por favor, seleccione el Tipo de Ocupación!",
                },
              ]}
            >
              <Select
                options={[
                  { value: 1, label: "Propia" },
                  { value: 2, label: "Alquilada" },
                  { value: 3, label: "Cedida" },
                  { value: 4, label: "Ocupada sin título" },
                  { value: 5, label: "Otra" },
                ]}
                placeholder="Seleccione el Tipo de Ocupación"
              />
            </Form.Item>

            {/* ID Situación de Vivienda */}
            <Form.Item
              label="Situación de Vivienda"
              name="id_situacion_vivienda"
              rules={[
                {
                  required: true,
                  message: "¡Por favor, ingrese la Situación de la Vivienda!",
                },
              ]}
            >
              <Select
                options={[
                  {
                    value: 1,
                    label: "Construida terminada",
                  },
                  {
                    value: 2,
                    label: "En construcción activa",
                  },
                  {
                    value: 3,
                    label: "En construcción paralizada",
                  },
                  {
                    value: 4,
                    label: "En estado de ruina/abandono",
                  },
                  {
                    value: 5,
                    label: "Otra",
                  },
                ]}
              />
            </Form.Item>

            {/* vivienda opcupada */}
            <Form.Item name="vivienda_ocupada" valuePropName="checked">
              <Checkbox onChange={haddleCheckId_tipo_ocupacion_vivienda}>
                Desocupada con carácter no estacional
              </Checkbox>
            </Form.Item>

            <Form.Item name="subtipo_ocupacion" label="Tipo de ocupacion">
              <Select
                defaultValue={
                  check ? optDesocupada[0].value : optOcupada[0].value
                }
                options={check ? optDesocupada : optOcupada}
                onChange={(value) => setCheckBoxint(value)}
              />
            </Form.Item>
            {checkboxint != 5 && (
              <Form.Item
                label="Tiene documentacion?"
                name="tiene_documentacion"
                valuePropName="checked"
                initialValue={false}
              >
                <Checkbox />
              </Form.Item>
            )}
            <Form.Item name="respuesta_otro">
              {checkboxint == 5 && <Input placeholder="Otra. Indicar:" />}
            </Form.Item>
          </Form>
        </Modal>
      </Flex>
    </>
  );
};

export default ViviendasContent;

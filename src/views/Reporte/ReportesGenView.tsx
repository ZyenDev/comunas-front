import { Card, Col, Divider, Progress, Row, Statistic, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const ReporteView: React.FC = () => {
  return (
    <>
      <Card>
        <Title level={3}>Reporte General</Title>
        <Paragraph>
          Este reporte muestra los datos totales y un gráfico representativo de
          las comunas.
        </Paragraph>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Total Comunas" value={1128} />
          </Col>
          <Col span={12}>
            <Statistic title="Porcentaje de Cobertura" value={93} suffix="%" />
          </Col>
        </Row>
        <Divider />
        <Row justify="center">
          <Col>
            <Progress type="circle" percent={75} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ReporteView;
//TOOD:QUITAR LOS ID DE LAS TABLAS

import { Button, Flex, Typography, Carousel } from "antd"
import { UserOutlined, EyeOutlined } from '@ant-design/icons';
import Checkbox from "antd/es/checkbox/Checkbox";
import Input from "antd/es/input/Input"
import React from "react";

const { Title, Paragraph, Text, Link } = Typography;

const carouselStyle: React.CSSProperties = {
    height: '810px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    borderRadius: '16px',
    margin: '20px'
};


/*
TODO: 
crear cuenta 
recuperar cuenta

rutas
 */
//ESTO ES MAS COMO UN LOGIN
function Login() {
    return (
        <Flex vertical={false} >
            <Flex style={{ width: '50%', height: '100vh' }} vertical={true} justify="center">
                <Carousel dotPosition="bottom" autoplay style={carouselStyle}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                </Carousel>
            </Flex>
            <Flex gap="middle" vertical justify="center" align="center" style={{ width: '50%', height: '100vh' }}>
                <Title>CO-COMUNAL</Title>
                <Flex vertical style={{ width: '80%' }} gap='small'>
                    <Flex gap="small">
                        <Input placeholder="fname" />
                        <Input placeholder="lname" />
                    </Flex>
                    <Input placeholder="user" suffix={<UserOutlined />} />
                    <Input.Password placeholder="input password" />
                </Flex>
                <Flex vertical={false} gap="small" style={{ width: '80%' }}>
                    <Button style={{ width: '80%' }} type="primary">Primary Button</Button>
                    <Button style={{ width: '80%' }}  >Default Button</Button>
                </Flex>
                <Text>no tiene cuenta puede crear uno
                    <Link>  cree una!!</Link>
                </Text>
            </Flex>
        </Flex >
    )
}


export default Login
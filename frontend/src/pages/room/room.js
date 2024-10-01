import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Layout, Table } from 'antd';
import SidebarMenu from '../../components/Sidebar/Sidebar';
import RoomApi from '../../api/room'; // Importando a API de salas

const { Content } = Layout;

function Salas() {
    const api = new RoomApi();
    const [salas, setSalas] = useState([]);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const response = await api.postRoom(values);
        setSalas([...salas, { id: salas.length + 1, name: response[0]?.name }]);
        form.resetFields();
    };

    const fetchRooms = async () => {
        try {
            const response = await api.getRooms();
            setSalas(response);
        } catch (error) {
            console.error('Erro ao buscar salas:', error);
        }
    };

    useEffect(() => {
        const handleRoomsData = async () => {
            await fetchRooms();
        };

        handleRoomsData();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Sala',
            dataIndex: 'name',
            key: 'name',
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SidebarMenu /> {/* Inserindo a sidebar */}
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Form form={form} onFinish={onFinish} layout='vertical'>
                        <Row gutter={16}>
                            <Col xs={24} md={20}>
                                <Form.Item
                                    label='Nome da Sala'
                                    name='name'
                                    rules={[{ required: true, message: 'Por favor, insira o nome da sala!' }]}
                                >
                                    <Input placeholder='Nome da Sala' />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24} md={4}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Alinhamento do botão
                            >
                                <Button type='primary' htmlType='submit'>
                                    Salvar
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    {/* Tabela de Salas */}
                    <Table dataSource={salas} columns={columns} rowKey='id' />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Salas;

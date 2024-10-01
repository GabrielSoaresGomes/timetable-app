import {useEffect, useState} from 'react';
import { Form, Input, Button, Row, Col, Layout, Table } from 'antd';
import SidebarMenu from '../../components/Sidebar/Sidebar';
import TeacherApi from '../../api/teacher'; // Importando a sidebar

const { Content } = Layout;

function Professores() {
    const api = new TeacherApi();
    const [professores, setProfessores] = useState([]);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const response = await api.postTeacher(values);
        setProfessores([...professores, { id: professores.length + 1, name: response[0]?.name }]);
        form.resetFields();
    };

    const fetchRooms = async () => {
        try {
            const response = await api.getTeachers();
            setProfessores(response);
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
            title: 'Professor',
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
                                    label='Nome do Professor'
                                    name='name'
                                    rules={[{ required: true, message: 'Por favor, insira o nome do professor!' }]}
                                >
                                    <Input placeholder='Nome do Professor' />
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

                    <Table dataSource={professores} columns={columns} rowKey='id' />
                </Content>
            </Layout>
        </Layout>
    );
}

export default Professores;

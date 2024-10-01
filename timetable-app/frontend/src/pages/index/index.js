import { useState, useEffect } from 'react';
import { Form, Select, Button, DatePicker, Card, Row, Col, Layout, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'; // Ícone de exclusão
import ScheduleApi from '../../api/schedule-api';
import RoomApi from '../../api/room';
import TeacherApi from '../../api/teacher';
import Sidebar from '../../components/Sidebar/Sidebar';
import moment from 'moment';
import { Typography } from 'antd';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Content } = Layout;
const { Option } = Select;

function Index() {
    const [schedules, setSchedules] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [form] = Form.useForm();
    const scheduleApi = new ScheduleApi();
    const teacherApi = new TeacherApi();
    const roomApi = new RoomApi();

    const fetchRooms = async (dates = null) => {
        try {
            const response = await roomApi.getRooms(dates);
            setRooms(response);
        } catch (error) {
            console.error('Erro ao buscar salas:', error);
        }
    };

    const fetchTeachers = async (dates = null) => {
        try {
            const response = await teacherApi.getTeachers(dates);
            setTeachers(response);
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
        }
    };

    const fetchSchedules = async () => {
        try {
            const api = new ScheduleApi();
            const response = await api.getSchedules();
            setSchedules(response);
        } catch (error) {
            console.error('Erro ao buscar intenções:', error);
        }
    };

    useEffect(() => {
        const handleAllData = async () => {
            await fetchSchedules();
        };

        handleAllData();
    }, []);

    const onFinish = async (values) => {
        values.start_schedule = values?.period?.[0]?.format('YYYY-MM-DD HH:mm');
        values.end_schedule = values?.period?.[1]?.format('YYYY-MM-DD HH:mm');
        console.log(values);
        const response = await scheduleApi.postSchedule(values);
        if (response) {
            form.resetFields();
        }
    };

    const isSelectDisabled = async () => {
        const period = form.getFieldValue('period');

        if (period) {
            const formattedDate =  {
                start_date: period[0].format('YYYY-MM-DD HH:mm'),
                end_date: period[1].format('YYYY-MM-DD HH:mm')
            };
            form.setFieldValue('room', null);
            form.setFieldValue('professor', null);
            setIsDisabled(false);
            await fetchRooms(formattedDate);
            await fetchTeachers(formattedDate);
        }else{
            setIsDisabled(true);
            form.setFieldValue('room', null);
            form.setFieldValue('professor', null);
        }
    };

    const handleDelete = (scheduleId) => {
        // Remove o card do estado
        const updatedSchedules = schedules.filter(schedule => schedule.id !== scheduleId);
        setSchedules(updatedSchedules);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar /> {/* Inserindo a sidebar */}
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <div className='container'>
                        {/* Formulário */}
                        <Form
                            form={form}
                            onFinish={async (values) => await onFinish(values)}
                            layout='vertical'
                            className='my-4'
                        >
                            <Row gutter={16} className='justify-content-between'>
                                <Col xs={24} md={6}>
                                    <Form.Item
                                        label='Período'
                                        name='period'
                                        rules={[{ required: true, message: 'Por favor, selecione o período!' }]}
                                    >
                                        <RangePicker
                                            showTime={{ format: 'HH:mm' }}
                                            format='DD/MM/YYYY HH:mm'
                                            className='w-100'
                                            onChange={async () => {
                                                await isSelectDisabled();
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label='Sala'
                                        name='room'
                                        rules={[{ required: true, message: 'Por favor, selecione a sala!' }]}
                                    >
                                        <Select placeholder='Selecione uma sala' disabled={isDisabled}>
                                            {rooms?.map(room => (
                                                <Option key={room.id} value={room.id}>{room.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label='Professor'
                                        name='teacher'
                                        rules={[{ required: true, message: 'Por favor, selecione o professor!' }]}
                                    >
                                        <Select placeholder='Selecione um professor' disabled={isDisabled}>
                                            {teachers?.map(teacher => (
                                                <Option key={teacher.id} value={teacher.id}>{teacher.name}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={2} className='d-flex align-items-center'>
                                    <Button type='primary' htmlType='submit' className='w-100'>
                                        Enviar
                                    </Button>
                                </Col>
                            </Row>
                        </Form>

                        <Row gutter={16}>
                            {schedules?.map((schedule) => (
                                <Col xs={24} md={6} key={schedule.id}>
                                    <Card
                                        className='mb-4'
                                        title={(
                                            <Title level={4} className={'d-flex justify-content-between w-100'}>
                                                {`${schedule.room_name}`}
                                                <Popconfirm
                                                    title='Tem certeza que deseja excluir?'
                                                    onConfirm={() => handleDelete(schedule.id)}
                                                    okText='Sim'
                                                    cancelText='Não'
                                                >
                                                    <DeleteOutlined style={{ color: 'red', marginRight: 10 }} />
                                                </Popconfirm>
                                            </Title>
                                        )}
                                        bordered={false}
                                    >
                                        <p>Professor: {schedule.teacher_name}</p>
                                        <p>Data: {moment(schedule.time_start).format('DD/MM/YYYY')} - {moment(schedule.time_end).format('DD/MM/YYYY')}</p>
                                        <p>Horário: {moment(schedule.time_start).utcOffset(0).format('HH:mm')} - {moment(schedule.time_end).utcOffset(0).format('HH:mm')}</p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Index;

import { Layout, Menu } from 'antd';
import { UserOutlined, BookOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

function Sidebar() {
    const location = useLocation();

    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="/" icon={<ScheduleOutlined />}>
                    <Link to="/" style={{ textDecoration: 'none' }}>Agendamentos</Link>
                </Menu.Item>
                <Menu.Item key="/teacher" icon={<UserOutlined />}>
                    <Link to="/teacher" style={{ textDecoration: 'none' }}>Professores</Link>
                </Menu.Item>
                <Menu.Item key="/room" icon={<BookOutlined />}>
                    <Link to="/room" style={{ textDecoration: 'none' }}>Salas</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default Sidebar;

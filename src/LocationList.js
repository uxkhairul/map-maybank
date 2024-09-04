import { useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu } from 'antd';

function LocationList({ updateMapCenter }) {
    const locations = useSelector((state) => state.locations);

    const handleClick = (lat, lng) => {
        updateMapCenter(lat, lng);
    };

    const menu = (
        <Menu>
            {locations.map((loc, index) => (
                <Menu.Item
                    key={index}
                    onClick={() => handleClick(loc.lat, loc.lng)}
                >
                    {loc.address}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <>
            {locations.length > 0 && (
                <div className='recent-place-dropdown'>
                    <Dropdown overlay={menu} placement='bottomRight'>
                        <a href={(e) => e.preventDefault()}>
                            <Space>
                                Recent Places
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            )}
        </>
    );
}

export default LocationList;

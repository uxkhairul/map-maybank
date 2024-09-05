import { useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Badge } from 'antd';

function LocationList({ updateMapCenter, setInputValue }) {
    const locations = useSelector((state) => state.locations.locations);

    const handleClick = (lat, lng, address) => {
        updateMapCenter(lat, lng);
        setInputValue(address);
    };

    // Set the last search to show on the top of the list
    const locationsList = [...locations].reverse();

    const menu = (
        <Menu>
            {locationsList.length > 0 ? (
                locationsList.map((loc, index) => (
                    <Menu.Item
                        key={index}
                        onClick={() =>
                            handleClick(loc.lat, loc.lng, loc.address)
                        }
                    >
                        {loc.address}
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item disabled>No recent searches</Menu.Item>
            )}
        </Menu>
    );

    return (
        <div className='recent-place-dropdown'>
            <Dropdown
                overlay={menu}
                placement='bottomRight'
                trigger={['click']}
            >
                <a href={(e) => e.preventDefault()}>
                    <Space>
                        <Badge count={locations.length} offset={[35, -10]}>
                            <span>Recent Places</span>
                        </Badge>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
}

export default LocationList;

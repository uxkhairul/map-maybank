import { Spin } from 'antd';

function LoadingAnimation({ loadingCaption }) {
    return (
        <div className='loading-container'>
            <Spin size='large' />
            <p>Loading map...</p>
        </div>
    );
}

export default LoadingAnimation;

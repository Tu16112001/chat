import React, { useEffect } from "react";
import { Result, Button } from 'antd';
import { SmileOutlined, CheckCircleTwoTone } from '@ant-design/icons';

const ThankYou = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/Profile';
        }, 10000); // 30 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return (
        <Result
            style={{marginTop:"100px"}}
            icon={<SmileOutlined />}
            title={<span><CheckCircleTwoTone twoToneColor="#52c41a" /> Giao dịch thành công!</span>}
            subTitle="Cảm ơn bạn đã hoàn tất giao dịch"
            extra={[
                <Button type="primary" key="home" onClick={() => window.location.href = '/Profile'}>
                    Quay lại trang chủ
                </Button>,
                <Button key="support" onClick={() => window.location.href = '/support'}>
                    Liên hệ hỗ trợ
                </Button>
            ]}
        />
    );
}

export default ThankYou;

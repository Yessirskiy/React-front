import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

function UserSidbar() {
    return (
        <div className='flex items-center gap-2.5 px-6'>
            <Avatar icon={<UserOutlined />} />
            <span>Nikolai</span>
        </div>
    )
  }
  
  export default UserSidbar
  
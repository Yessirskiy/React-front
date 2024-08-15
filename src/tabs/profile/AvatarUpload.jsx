import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Flex, message, Upload, Button } from 'antd';
import useAxios from '../../utils/UseAxios';

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const avatarChangeURL = 'api/users/profile/picture/'

const AvatarUploader = ({profileImg, borderRadius}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(profileImg);
  const api = useAxios()

  const handleChange = ({ file, fileList }) => {
    if (file.status === 'uploading') {
        setImageUrl(null);
        setLoading(true);
        return;
    }
    if (file.status === 'done') {
        setLoading(false);
    }
  };

  const updateAvatar = async ({ file, onSuccess, onError }) => {
    try {
        const response = await api.put(
            avatarChangeURL,
            { avatar: file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        if (response.status === 200) {
            setImageUrl(response.data.avatar);
            onSuccess(response.data, file);
        } else {
            onError(response.statusText);
        }
    } catch (error) {
        onError(error);
    }
  };

  const removeAvatar = async (e) => {
    console.log(e);
    try {
        const response = await api.delete(
            avatarChangeURL,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        
        if (response.status === 200) {
            setImageUrl(null);
        } 
    } catch (error) {
        console.log(error);
    }
  }

  const uploadButton = (
    <button
      style={{
        border: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        background: 'none',
      }}
      className='w-full'
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        {loading ? "Загружаем..." : "Добавьте фотографию профиля"}
      </div>
    </button>
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: borderRadius,
      }}
    >
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader  "
            showUploadList={false}
            customRequest={updateAvatar}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
        {imageUrl ? (
            <img
            src={imageUrl}
            alt="avatar"
            style={{
                width: '100%',
                height: '100%',
                borderRadius: borderRadius,
                objectFit: 'cover',
            }}
            />
        ) : (
            uploadButton
        )}
        </Upload>
        {imageUrl && (
            <Button className='mt-6' danger size='middle' onClick={removeAvatar}>Удалить</Button>
        )}
    </div>
  );
};

export default AvatarUploader;
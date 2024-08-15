import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image, Flex, message, Upload } from 'antd';
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

const profileChangeURL = 'api/users/profile/picture/'

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
            profileChangeURL,
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

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
        width: '100%',
        height: '100%',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Загружаем...
      </div>
    </button>
  );
  return (
    <div
      style={{
        width: '100%',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: borderRadius,
      }}
    >
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader fullSizedUpload"
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
    </div>
  );
};

export default AvatarUploader;
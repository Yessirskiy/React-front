import React, { useState, useContext } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import useAxios from '../../utils/UseAxios';
import { updateProfileAvatar, removeProfileAvatar } from '../../api/user';
import NotificationContext from '../../context/NotificationContext';
import { useProfile } from '../../hooks/useProfile';

const AvatarUploader = ({ borderRadius }) => {
  const api = useAxios()
  const [loading, setLoading] = useState(false);
  const {profile, setProfile} = useProfile();
  const { setNotification } = useContext(NotificationContext);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      setNotification({
        type: 'error',
        content: 'Возможно загрузка только JPG или PNG файлов.',
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setNotification({
        type: 'error',
        content: 'Размер изображения не может превышать 2МБ.',
      });
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = ({ file, fileList }) => {
    if (file.status === 'uploading') {
        setProfile({...profile, avatar: null});
        setLoading(true);
        return;
    }
    if (file.status === 'done') {
        setLoading(false);
    }
  };

  const updateAvatar = async ({ file, onSuccess, onError }) => {
    try {
        const data = await updateProfileAvatar(api, file);
        setProfile({...profile, avatar: data.avatar});
        onSuccess(data, file);
        setNotification({
          type: 'success',
          content: 'Фотография профиля успешно добавлена.',
        });
    } catch (error) {
        onError(error);
        setNotification({
          type: 'error',
          content: 'Ошибка обновления фотографии профиля.',
        });
    }
  };

  const removeAvatar = async () => {
    setLoading(true);
    try {
      await removeProfileAvatar(api);
      setProfile({...profile, avatar: null});
      setNotification({
        type: 'success',
        content: 'Фотография профиля успешно удалена.',
      });
    } catch (error) {
      setNotification({
        type: 'error',
        content: 'Ошибка удаления фотографии профиля.',
      });
    } finally {
      setLoading(false);
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
            className="avatar-uploader"
            showUploadList={false}
            customRequest={updateAvatar}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
        {profile?.avatar ? (
            <img
            src={profile.avatar}
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
        {profile?.avatar && (
            <Button loading={loading} className='mt-6' danger size='middle' onClick={removeAvatar}>Удалить</Button>
        )}
    </div>
  );
};

export default AvatarUploader;
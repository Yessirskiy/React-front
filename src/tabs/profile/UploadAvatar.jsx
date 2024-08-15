import React, { useState } from 'react';
import { Upload, Button, Image, Form } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const AvatarUploader = ({ profileImg, onUpload, onRemove }) => {
    const [imageUrl, setImageUrl] = useState(profileImg);
    const [fileList, setFileList] = useState([]);

    const handleChange = ({ fileList }) => {
        // Update the file list and preview image URL
        setFileList(fileList);
        if (fileList.length > 0 && fileList[0].originFileObj) {
            const reader = new FileReader();
            reader.onload = e => setImageUrl(e.target.result);
            reader.readAsDataURL(fileList[0].originFileObj);
        }
    };

    const handleRemove = () => {
        // Remove the image preview and reset fileList
        setImageUrl(null);
        setFileList([]);
        onRemove(); // Trigger the onRemove callback if provided
    };

    return (
        <div>
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    style={{ borderRadius: '8px', marginBottom: '10px' }} // Adjust the border radius if needed
                />
            ) : (
                <p>No image selected</p>
            )}
            <Form.Item name="avatar" valuePropName="fileList">
                <Upload
                    listType="picture"
                    maxCount={1}
                    fileList={fileList}
                    beforeUpload={() => false} // Prevent automatic upload
                    onChange={handleChange}
                    onRemove={handleRemove} // Handle image removal
                >
                    <Button icon={<UploadOutlined />} className="mt-5 h-10">
                        Choose file...
                    </Button>
                </Upload>
            </Form.Item>
            {imageUrl && (
                <Button
                    icon={<DeleteOutlined />}
                    onClick={handleRemove}
                    danger
                    style={{ marginTop: '10px' }}
                >
                    Remove Image
                </Button>
            )}
        </div>
    );
};

export default AvatarUploader;

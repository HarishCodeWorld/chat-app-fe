import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  SendOutlined,
  PictureOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { useSocket } from "../../socket-connection-hook";

const InputContainer = styled.div`
  padding: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border-top: 2px solid #aaaaaa;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  padding: 5px;
  font-size: 20px;
  color: #525cb1;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #525cb1;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const InputBar = ({
  sendMessage,
  handleImageUpload,
  handleCameraCapture,
  handleTyping,
}) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const triggerCameraCapture = () => {
    cameraInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(e);
    }
  };

  return (
    <InputContainer>
      <IconButton onClick={triggerFileUpload}>
        <PictureOutlined />
      </IconButton>
      <HiddenFileInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <HiddenFileInput
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
      />

      <Input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping(e.target.value);
        }}
      />
      <SendButton onClick={handleSend}>
        <SendOutlined />
      </SendButton>
    </InputContainer>
  );
};

export default InputBar;

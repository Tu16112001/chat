import React, { useState } from "react";  
import styled from 'styled-components';  
import { Button, Input } from 'antd';  
import { SendOutlined } from "@ant-design/icons";  
import { firebase } from '../../FireBase/config';  
import 'firebase/firestore';  
import { useParams } from "react-router-dom";  
import { BsEmojiSmile } from "react-icons/bs";  

const FormContainer = styled.div`  
  display: flex;  
  align-items: center;  
  padding: 10px;  
  background-color: white;  
  position: relative;  
`;  

const InputStyled = styled(Input)`  
  flex: 1;  
  padding-right: 40px;  
  border-radius: 20px;  
  border: 1px solid #ff4458;  
  margin: 0 10px;  
`;  

const ButtonStyled = styled(Button)`  
  border-radius: 20px !important;  
  border-color: #ff4458;  
  color: #ff4458;  
  transition: background-color 0.3s;  

  &:hover {  
    color: #ff4458;  
    background: #ff4458;  
    border-color: #ff4458;  
  }  
`;  

const EmojiButton = styled.button`  
  position: absolute;  
  right: 68px;  
  bottom: 9px;  
  background: transparent;  
  border: none;  
  cursor: pointer;  
  font-size: 20px;  
  z-index: 3;  
`;  

const EmojiPicker = styled.div`  
  display: flex;  
  flex-wrap: wrap;  
  margin: 10px 0;  
  position: absolute;  
  bottom: 50px;  
  background-color: white;  
  border: 1px solid #d9d9d9;  
  border-radius: 10px;  
  padding: 15px;  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  z-index: 1000;  
`;  

const EmojiOption = styled.button`  
  background: transparent;  
  border: none;  
  cursor: pointer;  
  font-size: 24px;  
  margin: 5px;  
`;  

const StickerPicker = styled.div`  
  display: flex;  
  flex-wrap: wrap;  
  position: absolute;  
  bottom: 50px;  
  background-color: white;  
  border: 1px solid #d9d9d9;  
  border-radius: 10px;  
  padding: 15px;  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  z-index: 1000;  
`;  

const StickerOption = styled.button`  
  background: transparent;  
  border: none;  
  cursor: pointer;  
  margin: 5px;  
`;  

const Messenge = () => {  
  const [messageInput, setMessageInput] = useState("");  
  const [showEmojis, setShowEmojis] = useState(false);  
  const [showStickers, setShowStickers] = useState(false);  
  const userId = localStorage.getItem("userId");  
  const { id: chatRoomId } = useParams();  

  const handleSendMessage = async () => {  
    if (messageInput.trim() !== '') {  
      const timestamp = new Date();  
      const Message = {  
        senderID: userId,  
        content: messageInput,  
        sentAt: timestamp,  
        seen: false  
      };  

      try {  
        const chatRef = firebase.firestore().collection('chats').doc(chatRoomId);  
        const chatDoc = await chatRef.get();  
        const chatData = chatDoc.data();  
        let messages = chatData.messages || [];  
        let newMessage = [Message];  

        messages.push(Message);  
        await chatRef.update({  
          messages: messages,  
          newMessage: newMessage  
        });  

        setMessageInput("");  
      } catch (error) {  
        console.error("Lỗi khi gửi tin nhắn:", error);  
      }  
    }  
  };  

  const addEmoji = (emoji) => {  
    setMessageInput((prev) => prev + emoji);  
  };  

  const addSticker = (sticker) => {  
    setMessageInput((prev) => prev + sticker);  
  };  

  const emojis = ['😊', '😂', '😍', '😎', '😢', '😡', '👍', '🎉'];  
  const stickers = ['😜', '😇', '🤩', '🥳', '🤔']; 

  return (  
    <FormContainer>  
      <EmojiButton onClick={() => setShowEmojis(!showEmojis)}>  
        <BsEmojiSmile size={23} color="red" />  
      </EmojiButton>  
      {showEmojis && (  
        <EmojiPicker>  
          {emojis.map((emoji, index) => (  
            <EmojiOption key={index} onClick={() => addEmoji(emoji)}>  
              {emoji}  
            </EmojiOption>  
          ))}  
        </EmojiPicker>  
      )}  
      <ButtonStyled onClick={() => setShowStickers(!showStickers)}>  
        Stickers  
      </ButtonStyled>  
      {showStickers && (  
        <StickerPicker>  
          {stickers.map((sticker, index) => (  
            <StickerOption key={index} onClick={() => addSticker(sticker)}>  
              {sticker}  
            </StickerOption>  
          ))}  
        </StickerPicker>  
      )}  
      <InputStyled  
        placeholder='Nhập tin nhắn...'  
        autoComplete='off'  
        value={messageInput}  
        onChange={(e) => setMessageInput(e.target.value)}  
        maxLength={500}  
      />  
      <ButtonStyled onClick={handleSendMessage} htmlType="submit">  
        <SendOutlined />  
      </ButtonStyled>  
    </FormContainer>  
  );  
}  

export default Messenge;
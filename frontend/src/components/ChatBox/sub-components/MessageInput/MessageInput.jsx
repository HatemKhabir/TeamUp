import { useState } from "react";
import MoodIcon from '@mui/icons-material/Mood';
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import styles from "./MessageInput.module.css";
import { sendMessageApi } from "../../services/messages";

export default function MessageInput({ chatId }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    if (chatId) setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject, event) => {
    let message = msg;
    console.log(emojiObject);
    message += emojiObject.emoji;
    if (chatId) setMsg(message);
  };

  const sendChat = async (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      try {
        const response = await sendMessageApi(chatId, msg);
        console.log(response);
        setMsg("");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className={styles.container}>
      {chatId ? (
        <>
          <div className={styles.buttonContainer}>
            <div className={styles.emoji}>
              <MoodIcon onClick={handleEmojiPickerhideShow} />
              {showEmojiPicker && (
                <div className={styles.emojiModal}>
                  <div className={styles.pickerWrapper}>
                    <Picker onEmojiClick={handleEmojiClick} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <form className={styles.inputContainer} onSubmit={sendChat}>
            <input
              type="text"
              placeholder="Type your message here"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <button type="submit">
              <IoMdSend />
            </button>
          </form>
        </>
      ) : (
        <div className={styles.noChatSelected}>
          <p>Please select a chat to view.</p>
        </div>
      )}
    </div>
  );
}

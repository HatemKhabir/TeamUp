import { useState } from "react";
import MoodIcon from '@mui/icons-material/Mood';
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import styles from "./MessageInput.module.css";

export default function MessageInput({}) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject,event) => {
    let message = msg;
    console.log(emojiObject)
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      setMsg("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <div className={styles.emoji}>
          <MoodIcon onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker &&    <div className={styles.emojiModal}>
        <div className={styles.pickerWrapper}>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      </div>}
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
    </div>
  );
}

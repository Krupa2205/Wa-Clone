import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MessageSquareText, PlusIcon, SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "./AuthContext";

function ChatWindow() {
  const params = useParams();
  const [secondUser, setSecondUser] = useState();
  const [msg, setMsg] = useState("");
  const receiverId = params.chatid;
  const [msgList, setMsgList] = useState([]);
  const { userData } = useAuth();

  const storage = getStorage(); // Initialize Firebase Storage

  /**
   * Generate a unique chat ID based on user IDs.
   */
  const chatId =
    userData?.id > receiverId
      ? `${userData.id}-${receiverId}`
      : `${receiverId}-${userData?.id}`;

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, "users", receiverId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSecondUser(docSnap.data());
      }
    };

    const msgUnsubscribe = onSnapshot(doc(db, "user-chats", chatId), (doc) => {
      setMsgList(doc.data()?.messages || []);
    });

    getUser();

    return () => {
      msgUnsubscribe();
    };
  }, [receiverId]);

  const sendMsg = async () => {
    if (msg) {
      const date = new Date();
      const timeStamp = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      if (msgList?.length === 0) {
        await setDoc(doc(db, "user-chats", chatId), {
          chatId: chatId,
          messages: [
            {
              text: msg,
              time: timeStamp,
              sender: userData.id,
              receiver: receiverId,
            },
          ],
        });
      } else {
        await updateDoc(doc(db, "user-chats", chatId), {
          chatId: chatId,
          messages: arrayUnion({
            text: msg,
            time: timeStamp,
            sender: userData.id,
            receiver: receiverId,
          }),
        });
      }
      setMsg("");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileRef = ref(storage, `chat-files/${chatId}/${file.name}`);
    try {
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      const date = new Date();
      const timeStamp = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      await updateDoc(doc(db, "user-chats", chatId), {
        chatId: chatId,
        messages: arrayUnion({
          fileUrl,
          fileName: file.name,
          fileType: file.type,
          time: timeStamp,
          sender: userData.id,
          receiver: receiverId,
        }),
      });
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  if (!receiverId)
    return (
      <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
        <MessageSquareText
          className="w-28 h-28 text-gray-400"
          strokeWidth={1.2}
        />
        <p className="text-sm text-center text-gray-400">
          Select any contact to
          <br />
          start a chat with.
        </p>
      </section>
    );

  return (
    <section className="w-[70%] h-full flex flex-col gap-4 items-center justify-center">
      <div className="h-full w-full bg-chat-bg flex flex-col">
        {/* Top Bar */}
        <div className="bg-background py-2 px-4 flex items-center gap-2 shadow-sm">
          <img
            src={secondUser?.profile_pic || "/default-user.png"}
            alt="profile picture"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <h3>{secondUser?.name}</h3>
            {secondUser?.lastSeen && (
              <p className="text-xs text-neutral-400">
                Last seen at {secondUser?.lastSeen}
              </p>
            )}
          </div>
        </div>
        <div className="flex-grow flex flex-col gap-12 p-6 overflow-y-scroll">
          {/* Chat Messages */}
          {msgList?.map((m, index) => (
  <div
    key={index}
    data-sender={m.sender === userData.id}
    className={`bg-white w-fit rounded-md p-2 shadow-sm max-w-[400px] break-words data-[sender=true]:ml-auto data-[sender=true]:bg-primary-light`}
  >
    {m.fileUrl ? (
      m.fileType && m.fileType.startsWith("image/") ? (
        <img
          src={m.fileUrl}
          alt={m.fileName}
          className="w-full max-h-[300px] object-contain"
        />
      ) : m.fileType && m.fileType.startsWith("video/") ? (
        <video
          src={m.fileUrl}
          controls
          className="w-full max-h-[300px] object-contain"
        />
      ) : (
        <a
          href={m.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {m.fileName || "Download File"}
        </a>
      )
    ) : (
      <p>{m.text}</p>
    )}
    <p className="text-xs text-neutral-500 text-end">{m.time}</p>
  </div>
))}

        </div>
        <div className="bg-background py-3 px-6 shadow flex items-center gap-6">
          <label htmlFor="file-upload" className="cursor-pointer">
            <PlusIcon />
          </label>
          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileUpload}
            accept="image/*,video/*,.pdf"
          />
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMsg();
            }}
            className="w-full py-2 px-4 rounded focus:outline-none"
            placeholder="Type a message..."
          />
          <button onClick={sendMsg}>
            <SendIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ChatWindow;

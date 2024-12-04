import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import React from "react";
import { db } from "../../firebase";
import {
  CircleFadingPlusIcon,
  Loader2Icon,
  MessageSquare,
  SearchIcon,
  UserRoundIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import Profile from "./Profile";
import UserCard from "./UserCard";
import { useAuth } from "./AuthContext";

function ChatPanel() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOptions, setShowOptions] = useState({});
  const [activeChat, setActiveChat] = useState(null); // Tracks the currently open chat
  const { userData } = useAuth();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      const arrayOfUser = data.docs.map((doc) => ({
        userData: doc.data(),
        id: doc.id,
      }));
      setUsers(arrayOfUser);
      setLoading(false);
    };

    getUsers();
  }, []);

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.userData.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )
    : users;

  const onBack = () => setShowProfile(false);

  const toggleOptions = (userId) => {
    setShowOptions((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));

    // Auto-hide options after 3 seconds
    setTimeout(() => {
      setShowOptions((prev) => ({
        ...prev,
        [userId]: false,
      }));
    }, 3000);
  };

  const removeUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setShowOptions((prev) => ({
      ...prev,
      [userId]: false,
    }));
    if (activeChat === userId) {
      setActiveChat(null); // Close the chat if the removed user was active
    }
  };

  if (showProfile) {
    return <Profile onBack={onBack} />;
  }

  return (
    <div className="bg-white w-full md:w-[30vw] min-w-[350px] flex flex-col h-full">
      {/* Top Bar */}
      <div className="bg-background py-2 px-4 border-b flex justify-between items-center gap-2">
        <button onClick={() => setShowProfile(true)}>
          <img
            src={userData.profile_pic || "/default-user.png"}
            alt="profile picture"
            className="w-10 h-10 rounded-full object-cover"
          />
        </button>

        <div className="flex items-end justify-center gap-4">
          <CircleFadingPlusIcon className="w-6 h-6" />
          <MessageSquare className="w-6 h-6" />
          <UserRoundIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Chat List */}
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loader2Icon className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <div className="flex-1 bg-white flex flex-col h-full">
          {/* Search Bar */}
          <div className="bg-background flex items-center gap-4 px-3 py-2 rounded-lg mx-4 my-2">
            <SearchIcon className="w-4 h-4" />
            <input
              className="bg-background focus-within:outline-none w-full"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* User List */}
          <div className="flex-1 py-2 divide-y overflow-y-auto h-full px-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((userObject) => (
                <div
                  key={userObject.id}
                  className="relative flex items-center justify-between py-3"
                >
                  <div
                    className="w-full"
                    onClick={() => setActiveChat(userObject.id)}
                  >
                    <UserCard userObject={userObject} />
                  </div>
                  <button
                    className="ml-2"
                    onClick={() => toggleOptions(userObject.id)}
                  >
                    <MoreHorizontalIcon className="w-6 h-6" />
                  </button>
                  {showOptions[userObject.id] && (
                    <div className="absolute top-10 right-0 bg-white border rounded shadow-md z-10 w-32">
                      <button
                        className="px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                        onClick={() => removeUser(userObject.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center text-gray-500 h-full">
                No users found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPanel;

import StudentChat from "@/components/StudentChat";
import AdminChatPanel from "@/components/AdminChatPanel";

// Define the admin UID as a constant
const adminUID = "H6vcVwln6Ba3xj4fQOajIVXb00g2"; 

const ChatPage = () => {
    return (
        <div>
            <h1>Chat Page</h1>
            {/* Admin chat panel to list students */}
            <AdminChatPanel />
            {/* Pass the adminUID as a prop to StudentChat */}
            <StudentChat adminUID={adminUID} />
        </div>
    );
};

export default ChatPage;

import { useChatStore } from "../store/"

import Sidebar from "../components/Seidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
    const { selecteduser } = useChatStore();

    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar />
                        {!selecteduser ? <NoChatSelected /> : < ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
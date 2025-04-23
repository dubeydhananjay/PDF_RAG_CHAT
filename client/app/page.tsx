import ChatComponent from "./components/chat";
import FileUploadComponent from "./components/file_upload";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen w-screen flex">
        <div className="min-h-screen w-[30vw] p-4 flex items-center justify-center">
          <FileUploadComponent />
        </div>
        <div className="min-h-screen w-[70vw] border-l-2">
          <div className="fixed bottom-4 w-[70vw]">
           <ChatComponent />
           </div>
        </div>
      </div>
    </div>
  );
}

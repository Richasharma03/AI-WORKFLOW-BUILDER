
<div className="h-14 bg-gray-900 text-white flex items-center px-4 border-b border-gray-700">
  <h1 className="text-lg font-semibold">⚡ AI Flow Builder</h1>
</div>
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import Canvas from "../components/Canvas";

export default function Home() {
  return (
    <div className="flex h-screen">
      <SidebarLeft />
      <Canvas />
      <SidebarRight />
    </div>
  );
}
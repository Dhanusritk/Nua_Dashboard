import { MoreVertical } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import logo from "../../assets/booklogo.jpg";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="h-screen fixed top-0 left-0">
      <nav
        className={`h-full flex flex-col bg-white border-r shadow-sm transition-width ${
          isMobile ? "w-17" : "w-44"
        }`}
      >
        {/* Header */}
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* Logo */}
          <img
            src={logo}
            className={`${isMobile ? "w-12" : "w-32"} h-auto`} // Adjust width and maintain aspect ratio
            alt="Logo"
          />
        </div>

        {/* Sidebar Content */}
        <SidebarContext.Provider value={{ isMobile }}>
          <ul className="flex-1 px-3 space-y-2">{children}</ul>
          {/* Profile Section */}
          <div
            className={`border-t flex p-3 transition-all ${
              isMobile ? "w-full justify-center" : "w-full"
            }`}
          >
            {/* Profile Image */}
            <img
              src="https://ui-avatars.com/api/?background=BDFCC9&color=808080&bold=true"
              alt="Profile"
              className={`w-8 h-8 rounded-md ${
                isMobile ? "block" : "hidden md:block"
              }`}
            />
            {/* Profile Details */}
            <div
              className={`flex justify-between items-center ml-2 ${
                isMobile ? "hidden" : "w-33"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-sm">John Doe</h4>
                <span className="text-xs text-gray-600">john@gmail.com</span>
              </div>
              <MoreVertical size="20px" /> {/* Adjusted icon size */}
            </div>
          </div>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { isMobile } = useContext(SidebarContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) {
      setIsHovered(false);
    }
  };

  return (
    <li
      className={`
          relative flex items-center py-3 px-4 my-2
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
              : "hover:bg-green-50 text-gray-600"
          }
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      <span
        className={`overflow-hidden ${
          isMobile ? "hidden" : "transition-all"
        } w-52 ml-3`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-green-400 ${
            isMobile ? "" : "top-2"
          }`}
        />
      )}

      {/* Adjusted rendering for the hover tag */}
      {isMobile && isHovered && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-green-100 text-green-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

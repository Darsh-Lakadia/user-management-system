import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../providers/ThemeProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { queryClient } from "../lib/queryClient";
import toast from "react-hot-toast";
import { useIsAuthenticated } from "../hooks/useAuth";

type NavbarProps = {
  className?: string;
};

const Navbar = ({ className }: NavbarProps) => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useIsAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    queryClient.clear();
    toast.success('Logged out successfully!');
    navigate("/login");
  };

  return (
    <nav
      className={`w-full bg-card text-foreground border border-line px-4 py-3 ${
        className ?? ""
      }`}
    >
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <div className="text-lg font-semibold tracking-wide text-primary">
            UMS
          </div>
          {isAuthenticated && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm hover:no-underline ${
                    isActive
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'text-primary/70'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm hover:no-underline ${
                    isActive
                      ? 'text-primary font-semibold border-b-2 border-primary'
                      : 'text-primary/70'
                  }`
                }
              >
                Users
              </NavLink>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border cursor-pointer border-line bg-card px-3 py-1.5 text-sm hover:opacity-90 focus:outline-none ring-primary focus:ring-2 flex items-center justify-center"
          >
            {isDark ? (
              <FiSun size={18} aria-hidden="true" />
            ) : (
              <FiMoon size={18} aria-hidden="true" />
            )}
          </button>
          {!isAuthenticated && (
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-md border cursor-pointer border-line bg-background px-3 py-1.5 text-sm hover:opacity-90 focus:outline-none ring-primary focus:ring-2"
            >
              Login
            </button>
          )}
          {isAuthenticated && (
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border cursor-pointer border-line bg-background px-3 py-1.5 text-sm hover:opacity-90 focus:outline-none ring-primary focus:ring-2"
          >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

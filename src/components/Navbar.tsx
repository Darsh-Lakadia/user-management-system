import { useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../providers/ThemeProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { queryClient } from "../lib/queryClient";
import toast from "react-hot-toast";
import { useIsAuthenticated } from "../hooks/useAuth";
import { Button } from "./ui";

type NavbarProps = {
  className?: string;
};

const Navbar = ({ className }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useIsAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    queryClient.clear();
    toast.success("Logged out successfully!");
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
          <NavLink to="#" className="text-lg font-semibold tracking-wide text-primary">
            UMS
          </NavLink>
          {isAuthenticated && (
            <div className="hidden md:flex items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm hover:no-underline ${
                    isActive
                      ? "text-primary font-semibold border-b-2 border-primary"
                      : "text-primary/70"
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
                      ? "text-primary font-semibold border-b-2 border-primary"
                      : "text-primary/70"
                  }`
                }
              >
                Users
              </NavLink>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button
            type="button"
            onClick={toggleTheme}
            variant="outline"
            size="sm"
          >
            {isDark ? (
              <FiSun size={18} aria-hidden="true" />
            ) : (
              <FiMoon size={18} aria-hidden="true" />
            )}
          </Button>
          {!isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
        {/* Mobile menu */}
        <div className="flex md:hidden items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {isDark ? (
              <FiSun size={18} aria-hidden="true" />
            ) : (
              <FiMoon size={18} aria-hidden="true" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FiX size={18} aria-hidden="true" />
            ) : (
              <FiMenu size={18} aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>
      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 border-t border-line pt-3">
          {isAuthenticated && (
            <div className="flex flex-col">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-1.5 py-2 text-sm hover:no-underline ${
                    isActive ? "text-primary font-semibold" : "text-primary/70"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `px-1.5 py-2 text-sm hover:no-underline ${
                    isActive ? "text-primary font-semibold" : "text-primary/70"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Users
              </NavLink>
            </div>
          )}
          <div className="mt-2 flex flex-col gap-2">
            {!isAuthenticated && (
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </Button>
            )}
            {isAuthenticated && (
              <Button
                variant="outline"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// react redux
import { useSelector } from "react-redux";

// components
import NavLinks from "./NavLinks";

function Navbar() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="navbar bg-base-100 site-container">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">OCM</a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </div>
      <div className="flex-none gap-2">
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-16 rounded-full">
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : `https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`
                }
                alt={`${user.displayName ?? "user"} image`}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

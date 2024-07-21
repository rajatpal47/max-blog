import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { singoutSucess } from "../redux/user/userslice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(singoutSucess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`, { replace: true });
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className=" self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className=" px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Max's
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Serach..."
          rightIcon={IoSearch}
          className=" hidden md:inline lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className=" w-12 h-10 md:hidden lg:hidden cursor-pointer"
        color="gray"
        pill
      >
        <IoSearch />
      </Button>
      <div className=" flex gap-2 md:order-2">
        <Button
          className=" w-10 h-10 rounded-full flex items-center"
          color="gray"
          
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className=" block text-sm">
                <span className=" font-medium">User Name : </span>
                {currentUser.username}
              </span>
              <span className=" block text-sm  truncate">
                <span className=" font-medium">Email : </span>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>
                <FaUserCircle className="text-xl pr-1" />
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>
              <MdOutlineLogout className="text-xl pr-1" />
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button outline gradientDuoTone="purpleToBlue">
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

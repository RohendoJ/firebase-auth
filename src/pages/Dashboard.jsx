import auth from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  document.title = "Dashboard";

  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/Login");
      }
    });
  }, []);

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <div className="flex bg-black h-[10vh] items-center pl-5 justify-between">
        <h1 className="text-white text-lg">Dashboard</h1>
        {isLoggedIn ? (
          <Link className="text-white mr-10" onClick={logOut} to="/Login">
            Logout
          </Link>
        ) : (
          <Link to="/Login" className="text-white mr-10">
            Login
          </Link>
        )}
      </div>
      <div className="flex flex-col h-[80vh] justify-center items-center">
        <h1>you are logged in as</h1>
        <h1>{user?.email}</h1>
      </div>
    </div>
  );
};

export default Dashboard;

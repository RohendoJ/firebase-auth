import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase";
import Form from "../components/Form";
import Logo from "../assets/logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const Login = () => {
  document.title = "Sign in";
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const isValidEmail = loginEmail.includes("@");
  const isValidPassword = loginPassword.length >= 6;

  const login = async () => {
    try {
      setIsProcessing(true);
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
    } catch (err) {
      console.error(err.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "It looks like your email or password is invalid",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 min-[350px]:mt-32 md:mt-32 lg:mt-32 xl:mt-32 2xl:mt-32">
      <div className="grid place-items-center">
        <img
          src={Logo}
          alt="Logo"
          className="w-[30vw] h-[4rem] object-cover md:w-[20vw] md:h-[5rem] lg:w-[15vw] xl:w-[15vw]"
        />
        <Form
          title="Sign in"
          clickEmail={(event) => {
            setLoginEmail(event.target.value);
          }}
          clickPassword={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button
          className={`bg-black w-[60vw] md:w-[40vw] lg:w-[25vw] h-[2rem] rounded-md mt-5 text-white hover:bg-white hover:text-black hover:border hover:border-black duration-500 ${
            (isProcessing || !isValidEmail || !isValidPassword) &&
            "cursor-not-allowed hover:bg-black hover:text-black opacity-50"
          }`}
          disabled={isProcessing || !isValidEmail || !isValidPassword}
          onClick={login}
        >
          {isProcessing ? (
            <div className="flex justify-center">
              <svg
                version="1.1"
                id="L9"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enable-background="new 0 0 0 0"
                xml:space="preserve"
                className="w-7"
              >
                <path
                  fill="#fff"
                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    dur="1s"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
              <p className="ml-2 mt-[0.05rem]">Processing...</p>
            </div>
          ) : (
            "Sign in"
          )}
        </button>
        <div className="flex">
          <p className="mt-3">Don't have an account?</p>
          <Link
            to="/Register"
            className="mt-3 ml-1 font-bold hover:text-slate-700"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

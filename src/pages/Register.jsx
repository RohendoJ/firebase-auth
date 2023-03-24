import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
import Form from "../components/Form";
import Logo from "../assets/logo.png";
import Swal from "sweetalert2";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register = () => {
  document.title = "Sign Up";
  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = registerEmail.includes("@");
  const isValidPassword =
    registerPassword.length >= 6 && confirmPassword.length >= 6;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const register = async () => {
    if (registerPassword !== confirmPassword) {
      console.error("Passwords do not match");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match",
      });
      return;
    }
    try {
      setIsProcessing(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      navigate("/");
      console.log(user);
    } catch (err) {
      console.error(err.message);
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
          className="w-[30vw] h-[4rem] object-cover md:w-[20vw] md:h-[5rem] lg:w-[15vw] xl:w-[];"
        />
        <Form
          title="Sign up"
          clickEmail={(event) => {
            setRegisterEmail(event.target.value);
          }}
          clickPassword={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="bg-gray-300 w-[60vw] md:w-[40vw] lg:w-[25vw] h-[2rem] rounded-md mt-5 pl-5 focus:outline-black duration-500 outline-none"
            placeholder="Confirm Password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
          <button
            className="absolute right-3 top-6"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>

        <button
          className={`bg-black w-[60vw] md:w-[40vw] lg:w-[25vw] h-[2rem] rounded-md mt-5 text-white hover:bg-white hover:text-black hover:border hover:border-black duration-500 ${
            (isProcessing || !isValidEmail || !isValidPassword) &&
            "cursor-not-allowed hover:bg-black hover:text-white opacity-50"
          }`}
          disabled={isProcessing || !isValidEmail || !isValidPassword}
          onClick={register}
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
            "Sign up"
          )}
        </button>
        <div className="flex">
          <p className="mt-3">Already have an account?</p>
          <Link to="/" className="mt-3 ml-1 font-bold hover:text-slate-700">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-semibold text-[1.5rem]">{props.title}</h1>
      <input
        type="text"
        className="bg-gray-300 w-[60vw] md:w-[40vw] lg:w-[25vw] h-[2rem] rounded-md mt-5 pl-5 focus:outline-black duration-500 outline-none"
        placeholder="Email"
        onChange={props.clickEmail}
        required
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className="bg-gray-300 w-[60vw] md:w-[40vw] lg:w-[25vw] h-[2rem] rounded-md mt-5 pl-5 focus:outline-black duration-500 outline-none"
          placeholder="Password"
          onChange={props.clickPassword}
          required
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
    </div>
  );
};

export default Form;

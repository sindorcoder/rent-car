/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, Input, message } from "antd";
import { useSignUpMutation, useVerifyOtpMutation } from "../../redux/api/userApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [signUp, {isSuccess: restartSuccess}] = useSignUpMutation();
  const [verifyOtp, { data, isSuccess, isError }] = useVerifyOtpMutation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState({
    email: atob(searchParams.get("email")),
    password: atob(searchParams.get("password").split("==")[0]),
    first_name: atob(searchParams.get("first_name")),
  });
  const onChange = (text) => {
    verifyOtp({ email: user?.email, otp: text });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success(data.message);
      navigate("/auth");
    }
    if(isError) {
      message.error(data?.message)
    }
    if(restartSuccess) {
      message.success("User AllReady Exist Verify Code Sent Again");
    }
  }, [data, isSuccess, isError, restartSuccess]);

  const handleRestart = () => {
    setIsButtonDisabled(true);
    setCounter(60);
    signUp({email: user?.email, password: user?.password, first_name: user?.first_name})
    const countdown = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(countdown);
          setIsButtonDisabled(false);
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-[40px]">Verify Your Email</h2>
      <Input.OTP onChange={onChange} />

      <Button
        type="primary"
        className="mt-[20px] px-10 py-3"
        onClick={handleRestart}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? `00:${counter}s` : "Restart"}
      </Button>
    </div>
  );
};

export default Verify;

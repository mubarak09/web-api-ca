import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from '../contexts/authContext';

const SignUpPage = () => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
const register = async () => {
  setErrorMsg("");

  let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const validPassword = passwordRegEx.test(password);

  if (!validPassword) {
    setErrorMsg("Password must be at least 8 characters and include a letter, number, and symbol.");
    return;
  }

  if (password !== passwordAgain) {
    setErrorMsg("Passwords do not match.");
    return;
  }

  const ok = await context.register(userName, password);
  if (!ok) {
    setErrorMsg(context.authError || "Signup failed");
  } else {
    setRegistered(true);
  }
};

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>SignUp page</h2>
      <p>You must register a username and password to log in. Usernames must be unique and passwords must contain a minimum of 8 characters (with at least one uppercase letter, one lowercase letter, and one symbol). </p>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <input value={userName} placeholder="user name" onChange={e => {
        setUserName(e.target.value);
      }}></input><br />
      <input value={password} type="password" placeholder="password" onChange={e => {
        setPassword(e.target.value);
      }}></input><br />
      <input value={passwordAgain} type="password" placeholder="password again" onChange={e => {
        setPasswordAgain(e.target.value);
      }}></input><br />
      {/* Login web form  */}
      <button onClick={register}>Register</button>
    </>
  );
};

export default SignUpPage;

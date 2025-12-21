import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";

const LoginPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const login = async () => {
        setErrorMsg("");
        const ok = await context.authenticate(userName, password);
        if (!ok) setErrorMsg(context.authError || "Login failed");
    };

    let location = useLocation();

    // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <>
            <h2>Login page</h2>
            <p>You must log in to view the protected pages </p>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            <input
              //id="username"
              placeholder="user name"
              onChange={e => setUserName(e.target.value)}
            /><br />
            <input
              //id="password"
              type="password"
              placeholder="password"
              onChange={e => setPassword(e.target.value)}
            /><br />
            {/* Login web form  */}
            <button onClick={login}>Log in</button>
            <p>Not Registered?
                <Link to="/signup">Sign Up!</Link></p>
        </>
    );
};

export default LoginPage;

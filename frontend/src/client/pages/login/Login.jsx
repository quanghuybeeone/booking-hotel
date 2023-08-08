import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <>
      <div className="container col-xl-10 col-xxl-8 px-4 py-3">
        <div className="row align-items-center g-lg-5 py-3">
          <div className="col-lg-6 text-center text-lg-start">
            <h3 className="fw-bold lh-1 text-body-emphasis mb-3">
              Vertically centered hero sign-up form
            </h3>
            <p className="col-lg-10 fs-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, omnis
              commodi impedit rerum nihil quia tenetur earum unde tempore,
              reprehenderit molestias aliquam mollitia sint in. Nisi exercitationem
              minus nesciunt molestias?
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-6">
            <form className="p-4 p-md-5 border rounded-3 bg-light">
              <div className="form-floating mb-3">
                <h1>Đăng nhập</h1>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  placeholder="username"
                  id="username"
                  onChange={handleChange}
                  className="form-control"
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  placeholder="password"
                  id="password"
                  onChange={handleChange}
                  className="form-control"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="checkbox">
                <label>
                  <input type="checkbox" defaultValue="remember-me" /> Remember me
                </label>
              </div>
              {error && <div className="mb-1" style={{ color: "red" }}><b>{error.message}</b></div>}
              <button disabled={loading} onClick={handleClick} className="w-100 btn btn-lg btn-dark btn-login" type="button">
                Đăng nhập
              </button>
              <hr className="my-4" />
              <small className="text-body-secondary">
                By clicking Sign up, you agree to the terms of use.
              </small>
            </form>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;
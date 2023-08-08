import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { AuthContext } from '../../../client/context/AuthContext';

const LoginAdmin = () => {
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
        console.log('ok');
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            if(res.data.details.isAdmin){
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
                navigate("/admin/")
            }else{
                dispatch({ type: "LOGIN_FAILURE", payload: {message: "Bạn không đủ quyền hạn"} });
            }
            
        } catch (err) {
            console.log(err.response.data);
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };
    
    return (
        <>
            {/*  Body Wrapper */}
            <div
                className="page-wrapper"
                id="main-wrapper"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype="full"
                data-sidebar-position="fixed"
                data-header-position="fixed"
            >
                <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        {/* <Link
                                            to={"/"}
                                            className="text-nowrap logo-img text-center d-block py-3 w-100"
                                        >
                                            <img
                                                src="../assets/images/logos/dark-logo.svg"
                                                width={180}
                                                alt=""
                                            />
                                        </Link> */}
                                        <h2 className="text-center">Login Admin</h2>
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="username"
                                                    id="username"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleInputPassword1"
                                                    className="form-label"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    placeholder="password"
                                                    id="password"
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            {/* <div className="d-flex align-items-center justify-content-between mb-4">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input primary"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckChecked"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        className="form-check-label text-dark"
                                                        htmlFor="flexCheckChecked"
                                                    >
                                                        Remeber this Device
                                                    </label>
                                                </div>
                                                <a className="text-primary fw-bold" href="./index.html">
                                                    Forgot Password ?
                                                </a>
                                            </div> */}
                                            {error && <div className="mb-2" style={{ color: "red" }}><b>{error.message}</b></div>}
                                            <button disabled={loading} onClick={handleClick} className="w-100 btn btn-lg btn-primary btn-login mb-2" type="button">
                                                Đăng nhập
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginAdmin
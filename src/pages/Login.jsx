import { Link } from "react-router-dom"


const Login = () => {
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        {/* <span className="link-primary" onClick={changeAuthMode}>
                            Sign Up
                        </span> */}

                        <Link to='/guest/signup' style={{ color: "#a391fc", fontSize: "14px" }}> Sign Up</Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <Link to='/' style={{ color: "#a391fc", fontSize: "14px" }}>Forgot Password</Link>
                    <div className="d-grid gap-2 mt-5 mb-5">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Login
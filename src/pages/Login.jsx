import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Alert } from "react-bootstrap";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();


    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }



        console.log(payload);

        axiosClient.post('/login', payload)

            /* `.then(({data})=>{})` is a promise method that is called after the `axiosClient.post()`
            method is executed successfully. It receives a callback function that takes an object as
            its parameter. The object has a `data` property that contains the response data from the
            server. This allows us to handle the response data and perform any necessary actions
            after the request has been completed. */

            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })

            .catch(err => {
                const response = err.response;
                console.log(err);
                if (response && response.status == 422) { //unprocessable entity
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            })
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={onSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Log In</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        {/* <span className="link-primary" onClick={changeAuthMode}>
                            Sign Up
                        </span> */}

                        <Link to='/guest/signup' style={{ color: "#a391fc", fontSize: "14px" }}> Sign Up</Link>
                    </div>

                    { /** if errors exist */}
                    {errors && <Alert variant='danger' className="my-3 mt-4">
                        {Object.keys(errors).map(key => (
                            <p key={key} className="m-1" style={{ fontSize: '12px' }}>{errors[key][0]}</p>
                        ))}
                    </Alert>}

                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            ref={emailRef}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            ref={passwordRef}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    {/* <Link to='/' style={{ color: "#a391fc", fontSize: "14px" }}>Forgot Password</Link> */}
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
import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Alert } from "react-bootstrap";
import Loader from "../components/Loader";
import axios from 'axios';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const { setUser, setToken } = useStateContext();


    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
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
                setIsLoading(false)
            })

            .catch(err => {
                setIsLoading(false)
                const response = err.response;
                console.log(err);
                if (response && response.status == 422) { //unprocessable entity
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            })
    }

    async function handleSSO() {

        await axiosClient.get('/auth/github/redirect')

            /* `.then(({data})=>{})` is a promise method that is called after the `axiosClient.post()`
            method is executed successfully. It receives a callback function that takes an object as
            its parameter. The object has a `data` property that contains the response data from the
            server. This allows us to handle the response data and perform any necessary actions
            after the request has been completed. */

            .then(({ data }) => {
                console.log("processing")
                // setIsLoading(false)


            })

            .catch(err => {
                setIsLoading(false)
                const response = err.response;
                console.log(err);
                if (response && response.status == 422) { //unprocessable entity
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            })
    }

    // const axioslient = axios.create({
    //     baseURL: 'http://openchatbot.test/api',
    //     headers: {
    //         common: {
    //             'Access-Control-Allow-Origin': '*',
    //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    //             'Access-Control-Allow-Headers': 'Content-Type'
    //         }
    //     }
    // });

    // const handleSSO = async () => {
    //     try {
    //         const response = await axiosClient.get('/auth/github/redirect');
    //         console.log("Processing");

    //         // If you need to access the response data, you can do so here
    //         const { data } = response;
    //         // Handle the response data as needed
    //     } catch (error) {
    //         // Handle any errors that occur during the request
    //         console.error(error);
    //     }
    // };
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
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (<Loader />) : "Submit"}

                        </button>


                        {/* <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#55acee", important: "true" }} href="#!" role="button">
                            <i className="fab fa-twitter me-2"></i>Continue with Twitter
                        </a> */}

                    </div>

                </div>
            </form>
            {/* <button className="btn btn-primary btn-lg btn-block mt-5" onClick={signonGitHub} style={{ backgroundColor: "#3b5998", important: "true" }}>
                <i className="fab fa-facebook-f me-2"></i>Continue with GitHub
            </button> */}

            <button onClick={handleSSO}>
                click here
            </button >
        </div>
    )
}

export default Login
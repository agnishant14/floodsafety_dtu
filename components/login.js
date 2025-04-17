import React, { useState } from "react";
import styles from "@/styles/login.module.css";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { setCookie } from 'nookies';
import { BASE_API_URL } from "@/utils/constants";
import Loader from "./Loader";
import { ToastContainer, toast } from 'react-toastify';
const LoginComp = ({ type }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (type) => {
    setLoading(true);
    try {
      if (type === 'register') {
        const response = await axios.post(`https://hydro-predict.onrender.com/auth/register/`, formData);
        const authToken = response.data.token;

        setCookie(null, 'authToken', authToken, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        });

        toast.success("Registered Successfully !!")
        router.push("/map")
      } else if (type === 'login') {
        const response = await axios.post(`https://hydro-predict.onrender.com/auth/api-token-auth/`, {
          username: formData['username'],
          password: formData['password']
        });
        const authToken = response.data.token;

        setCookie(null, 'authToken', authToken, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        });
        toast.success("Logged In Successfully !!")
        if (formData['username'] === 'admin' && formData['password'] === 'SIH') {
          router.push("/admin/dashboard")
        } else {
          router.push("/map")
        }
      }

    } catch (error) {
      toast.error("Something went wrong!!")
      console.error("Something went wrong", error);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? <Loader /> :
        < div className={styles.loginContainer} >
          {type === "login" ? <h2> Welcome Back!</h2> : <h2>Create Account</h2>
          }
          <div className={styles.inputList}>
            {type === "register" && (
              <>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </>
            )}
            <input
              type="text"
              placeholder="Enter a username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.checkboxAndForgetPass}>
            <div className={styles.checkbox}>
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            {type === "login" && (
              <div
                className={styles.forgotPass}
                onClick={() => router.push("/forgotPassword")}
              >
                Forgot Password?
              </div>
            )}
          </div>
          <div className={styles.continueBtn} onClick={() => (handleSubmit(type))}>
            <Button text={"Continue"} alignment="center" />
          </div>
          <div className={styles.switchDialog}>
            {type === "login" ? (
              <p>
                Don&apos;t have an account?{" "}
                <span>
                  <Link href={"/register"}>Sign Up</Link>
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span>
                  <Link href={"/login"}>Log In</Link>
                </span>
              </p>
            )}
          </div>
        </div >
      }
    </>
  );
};

export default LoginComp;

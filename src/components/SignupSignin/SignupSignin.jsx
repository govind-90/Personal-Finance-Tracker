import React, { useState } from "react";
import "./style.css";
import Input from "../../input/Input";
import Button from "../Button/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc,getDoc } from "firebase/firestore"; 
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../Firebase";


const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate=useNavigate();
  function signupWithEmail() {
    setLoading(true);
    if (name != "" && email != "" && password != "" && confPassword != "") {
      if (password == confPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user", user);
            toast.success("User Created");
            setLoading(false);
            setConfPassword("");
            setName("");
            setName("");
            setEmail("");
            createDoc(user);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password not match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }
  function googleAuth(){
    setLoading(true);
    try{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("given by google is ",user);
    createDoc(user);
    navigate("/dashboard")
    toast.success("user authenticated")
    setLoading(false);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
    // The email of the user's account used.
    
    // ...
  });

  }catch(e){
toast.error(e.message);
  }
  }
  async function createDoc(user) {
    //make sure doc with uid does not exist if the uid is not exist then create a doc with that id
    setLoading(true);
    const userReference=doc(db,"users",user.uid);
    const userData=await getDoc(userReference);
    if(!userData.exists()){
    try{await setDoc(doc(db, "users", user.uid), {name:user.displayName?user.displayName:name,
      email:user.email,photoURL:user.photoURL?user.photoURL:"",
      createdAt:new Date()
    })
   toast.success("Doc created")
   setLoading(false);

    }catch(e){
toast.error(e.message);
    }
  }else{
   // toast.error("Doc already exists")
    setLoading(false);
  }
  }
  function logingUsingEmail(){
    setLoading(true);
    if(email!="" && password!=""){signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Logged In!")
        console.log("user Loggied in ",user);
        setLoading(false);
        navigate("/dashborad");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        setLoading(false);
      })}
      else{
    toast.error("All Field are mandatory")
   setLoading(false);
    
      }
    console.log("you are inside login by Email")
    

  }

  return (
    <>
      {loginForm ? (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
            Login on
              <span style={{ color: "var(--theme)" }}>Financely</span>
            </h2>
            <form>
              
              <Input
                type={"email"}
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"ayush848209@gmail.com"}
              />
              <Input
                type={"password"}
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"abc@123"}
              />
              
              <Button
                disabled={loading}
                text={
                  loading ? "Loading..." : "Login Using Email and Password"
                }
                onClick={logingUsingEmail}
              />
              <p className="p-login">Or</p>
              <Button onClick={()=>googleAuth()}
                disabled={loading}
                text={loading ? "Loading..." : "Login Using google"}
                blue={true}
              />
              <p className="p-login" style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Don't Have An Account Already?Click Here</p> 
            </form>
          </div>
        </>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Ayush Kumar"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"ayush848209@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"abc@123"}
            />
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confPassword}
              setState={setConfPassword}
              placeholder={"abc@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">Or</p>
            <Button onClick={()=>googleAuth()}
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using google"}
              blue={true}
            />
            <p className="p-login"  style={{cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Have An Account Already?Click Here</p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSignin;

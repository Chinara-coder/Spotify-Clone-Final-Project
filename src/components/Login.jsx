import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

emailjs.init("pmByNIJ7REF1BBARs");

const Login = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [codeSent, setCodeSent] = useState(false); // 🔥 YENİ – mərhələ idarəsi

  const [formData, setFormData] = useState({
    loginName: "",
    loginPass: "",
    name: "",
    email: "",
    pass: "",
  });

  const [resetData, setResetData] = useState({
    username: "",
    code: "",
    newPass: "",
    confirmPass: "",
  });

  useEffect(() => {
    localStorage.removeItem("spotifyUser");
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= REGISTER =================
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          pass: formData.pass,
        }),
      });

      alert("Registration successful! Please login.");
      setIsActive(false);
      setFormData({
        loginName: "",
        loginPass: "",
        name: "",
        email: "",
        pass: "",
      });
    } catch {
      alert("Server error!");
    }
  };

  // ================= LOGIN =================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/users");
    const users = await res.json();

    const user = users.find(
      (u) =>
        u.name === formData.loginName.trim() &&
        String(u.pass) === String(formData.loginPass).trim()
    );

    if (!user) {
      alert("Username or password is incorrect!");
      return;
    }

    localStorage.setItem(
      "spotifyUser",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );

    navigate("/");
  };

  // ================= FORGOT PASSWORD (2 MƏRHƏLƏ) =================
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/users");
    const users = await res.json();

    const user = users.find(
      (u) =>
        u.name.toLowerCase() === resetData.username.toLowerCase().trim()
    );

    if (!user) {
      alert("User not found!");
      return;
    }

    // 🔹 1-ci mərhələ: CODE GÖNDƏR
    if (!codeSent) {
      const resetCode = Math.floor(100000 + Math.random() * 900000);

      try {
        await emailjs.send(
          "service_ik689sv",
          "template_18th3q5",
          {
            to_email: user.email,
            reset_code: resetCode,
          }
        );

        localStorage.setItem("resetCode", resetCode);
        localStorage.setItem("resetUserId", user.id);

        setCodeSent(true);
        alert("Reset code sent to your email!");
      } catch (err) {
        console.log(err);
        alert("Email sending failed!");
      }
      return;
    }

    // 🔹 2-ci mərhələ: YENİ ŞİFRƏ
    if (resetData.code !== localStorage.getItem("resetCode")) {
      alert("Wrong reset code!");
      return;
    }

    if (resetData.newPass !== resetData.confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    await fetch(
      `http://localhost:3001/users/${localStorage.getItem("resetUserId")}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pass: resetData.newPass,
        }),
      }
    );

    alert("Password updated!");

    localStorage.removeItem("resetCode");
    localStorage.removeItem("resetUserId");

    setCodeSent(false);
    setShowForgot(false);
    setResetData({
      username: "",
      code: "",
      newPass: "",
      confirmPass: "",
    });
  };

  return (
    <div className="login-page">
      <div className={`wrapper ${isActive ? "active" : ""} ${showForgot ? "forgot" : ""}`}>
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>

        {/* ================= LOGIN ================= */}
        <div className={`form-box login ${showForgot ? "hidden" : ""}`}>
          <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>
            Login to Spotify
          </h2>

          <form onSubmit={handleLoginSubmit}>
            <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
              <input name="loginName" value={formData.loginName} onChange={handleInputChange} required />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box animation" style={{ "--i": 2, "--j": 23 }}>
              <input type="password" name="loginPass" value={formData.loginPass} onChange={handleInputChange} required />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn animation" style={{ "--i": 3, "--j": 24 }}>
              Login
            </button>

            <div className="logreg-link animation" style={{ "--i": 4, "--j": 25 }}>
              <p>
                Forgot password?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); setShowForgot(true); }}>
                  Reset
                </a>
              </p>

              <p>
                Don't have an account?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsActive(true); }}>
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* ================= REGISTER ================= */}
        <div className="form-box register">
          <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
            Sign Up for Spotify
          </h2>

          <form onSubmit={handleRegisterSubmit}>
            <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
              <input name="name" value={formData.name} onChange={handleInputChange} required />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
              <input name="email" value={formData.email} onChange={handleInputChange} required />
              <label>Email</label>
              <i className="bx bxs-envelope"></i>
            </div>

            <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
              <input type="password" name="pass" value={formData.pass} onChange={handleInputChange} required />
              <label>Password</label>
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="btn animation" style={{ "--i": 21, "--j": 4 }}>
              Sign Up
            </button>

            <div className="logreg-link animation" style={{ "--i": 22, "--j": 5 }}>
              <p>
                Already have an account?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsActive(false); }}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* ================= FORGOT ================= */}
        <div className={`form-box forgot-password ${showForgot ? "" : "hidden"}`}>
          <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>
            Reset Password
          </h2>

          <form onSubmit={handleResetSubmit}>
            <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
              <input
                value={resetData.username}
                onChange={(e) => setResetData({ ...resetData, username: e.target.value })}
                required
              />
              <label>Username</label>
              <i className="bx bxs-user"></i>
            </div>

            {codeSent && (
              <>
                <div className="input-box animation" style={{ "--i": 2, "--j": 23 }}>
                  <input
                    value={resetData.code}
                    onChange={(e) => setResetData({ ...resetData, code: e.target.value })}
                  />
                  <label>Reset Code</label>
                </div>

                <div className="input-box animation" style={{ "--i": 3, "--j": 24 }}>
                  <input
                    type="password"
                    value={resetData.newPass}
                    onChange={(e) => setResetData({ ...resetData, newPass: e.target.value })}
                  />
                  <label>New Password</label>
                </div>

                <div className="input-box animation" style={{ "--i": 4, "--j": 25 }}>
                  <input
                    type="password"
                    value={resetData.confirmPass}
                    onChange={(e) => setResetData({ ...resetData, confirmPass: e.target.value })}
                  />
                  <label>Confirm Password</label>
                </div>
              </>
            )}

            <button type="submit" className="btn animation" style={{ "--i": 5, "--j": 26 }}>
              {codeSent ? "Reset Password" : "Send Code"}
            </button>

            <div className="logreg-link animation" style={{ "--i": 6, "--j": 27 }}>
              <p>
                Remembered?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); setShowForgot(false); }}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;

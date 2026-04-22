import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

function Login() {
    const { login, signup, error, setError } = useGlobalContext()
    const [isRegister, setIsRegister] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [inputState, setInputState] = useState({
        username: '',
        email: '',
        password: ''
    })

    const { username, email, password } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
        setError(null)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (isRegister) {
            await signup(inputState)
            if (!error) {
                setSuccessMsg("Registration Successful! Welcome.")
                setTimeout(() => setSuccessMsg(''), 4000)
            }
        } else {
            login(inputState)
        }
    }

    return (
        <LoginStyled>
            { }
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <div className="login-con">
                {successMsg && (
                    <div className="glass-popup">
                        <i className="fa-solid fa-circle-check"></i>
                        <span>{successMsg}</span>
                    </div>
                )}

                { }
                <h1 style={{ color: '#fff', textShadow: '0 0 10px rgba(0,208,255,0.5)' }}>
                    {isRegister ? 'Create Account' : 'Sign In'}
                </h1>
                <p style={{ color: 'rgba(255,255,255, 0.7)' }}>
                    {isRegister ? 'Get started with your free account' : 'Please log in to manage your finance'}
                </p>

                {error && <p className="error-msg">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {isRegister &&
                        <div className="input-control">
                            <input type="text" value={username} name={'username'} placeholder="Username" onChange={handleInput('username')} />
                        </div>
                    }
                    <div className="input-control">
                        <input type="email" value={email} name={'email'} placeholder="Email" onChange={handleInput('email')} />
                    </div>

                    <div className="input-control">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            name={'password'}
                            placeholder="Password"
                            onChange={handleInput('password')}
                        />
                        <i
                            className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} password-icon`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    </div>

                    <div className="submit-btn">
                        <button>{isRegister ? 'Register' : 'Login Now'}</button>
                    </div>
                </form>
                <p className='toggle-text'>
                    {isRegister ? "Already have an account? " : "Don't have an account? "}
                    <span onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'Login Here' : 'Register Here'}
                    </span>
                </p>
            </div>
        </LoginStyled>
    )
}

const float = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(100px, 50px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
`;

const LoginStyled = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* 👇 UPDATED: Dark Navy Background (Matches Dashboard) */
    background: #0f172a; 
    position: relative;
    overflow: hidden;

    .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        z-index: 1;
        opacity: 0.6;
        animation: ${float} 15s infinite alternate;
    }
    
    /* 👇 UPDATED: Frozen Ice Colors for Blobs */
    .blob-1 { top: -10%; left: -10%; width: 500px; height: 500px; background: #00d0ff; } /* Neon Cyan */
    .blob-2 { bottom: -10%; right: -10%; width: 600px; height: 600px; background: #222260; } /* Dark Blue */
    .blob-3 { top: 20%; right: 30%; width: 400px; height: 400px; background: #00ffaa; } /* Neon Green */

    .login-con {
        position: relative;
        z-index: 5;
        /* 👇 UPDATED: Glass Effect for Dark Mode */
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        
        border-radius: 32px;
        padding: 3rem;
        width: 450px;
        text-align: center;
        box-shadow: 0px 15px 25px rgba(0,0,0,0.2);

        .glass-popup {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            background: rgba(0, 255, 170, 0.2);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(0, 255, 170, 0.4);
            padding: 0.8rem;
            border-radius: 12px;
            color: #fff;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            z-index: 10;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
            i { color: #00ffaa; }
        }

        .error-msg { color: #ff4d4d; background: rgba(255, 77, 77, 0.1); padding: 0.5rem; border-radius: 5px; margin-bottom: 1rem; border: 1px solid rgba(255,77,77,0.3); }

        form {
            display: flex; flex-direction: column; gap: 1.5rem;
            
            .input-control {
                position: relative; 
                input {
                    width: 100%; 
                    padding: .8rem 1rem; 
                    padding-right: 40px; 
                    border-radius: 10px; 
                    /* 👇 UPDATED: Inputs fit dark theme */
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    background: rgba(0, 0, 0, 0.2); 
                    color: #fff; 
                    outline: none;
                    &::placeholder { color: rgba(255, 255, 255, 0.5); }
                    &:focus { 
                        background: rgba(0, 0, 0, 0.4); 
                        border-color: #00d0ff; 
                        box-shadow: 0 0 10px rgba(0, 208, 255, 0.2);
                    }
                }

                .password-icon {
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1rem;
                    z-index: 10;
                    &:hover { color: #00d0ff; }
                }
            }

            button {
                /* 👇 UPDATED: Neon Blue Button */
                background: linear-gradient(135deg, #00d0ff 0%, #007bff 100%);
                color: #fff; 
                padding: 1rem; 
                border-radius: 10px; 
                border: none;
                font-size: 1.2rem; 
                font-weight: 600;
                cursor: pointer; 
                transition: all .4s ease;
                box-shadow: 0px 5px 15px rgba(0, 208, 255, 0.3);
                
                &:hover { 
                    transform: translateY(-2px);
                    box-shadow: 0px 8px 20px rgba(0, 208, 255, 0.5);
                }
            }
        }
        .toggle-text { 
            margin-top: 1.5rem; 
            font-size: 0.9rem; 
            color: rgba(255, 255, 255, 0.7);
            span { 
                color: #00d0ff; 
                font-weight: 700; 
                cursor: pointer; 
                text-decoration: none; 
                margin-left: 5px;
                &:hover { text-decoration: underline; text-shadow: 0 0 5px rgba(0, 208, 255, 0.5); }
            } 
        }
    }
`;

export default Login;
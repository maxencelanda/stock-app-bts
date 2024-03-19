import React, { useState } from 'react';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f2f2f2'
        }}>
            <div style={{
                textAlign: 'center',
                fontSize: '24px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '600',
                color: 'black',
                marginBottom: '10px'
            }}>Register now</div>
            <div style={{
                textAlign: 'center',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                color: '#808080',
                marginBottom: '30px'
            }}>Enter your credentials</div>
            <form onSubmit={handleSubmit} style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email address" 
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            width: '50%',
                            padding: '11px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#FFFFF',
                            color: 'black',
                            fontSize: '17px',
                            fontFamily: 'Inter, sans-serif',
                            boxSizing: 'border-box'
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '23px', width: '100%' }}>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        value={formData.password}
                        onChange={handleChange}
                        style={{
                            width: '50%',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#FFFFF',
                            color: 'black',
                            fontSize: '16px',
                            fontFamily: 'Inter, sans-serif',
                            boxSizing: 'border-box'
                        }}
                        required
                    />
                </div>
                <input 
                    type="submit" 
                    value="Login" 
                    style={{
                        width: '50%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '15px',
                        backgroundColor: '#31065c',
                        color: 'white',
                        fontSize: '16px',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif'
                    }} 
                />
            </form>
            <p style={{ marginTop: '15px', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
            If you don't have an account,<span style={{ fontWeight: 'bold', color: 'blue', cursor: 'pointer' }}>Register</span>
            </p>
        </div>
    );
}

export default LoginForm;

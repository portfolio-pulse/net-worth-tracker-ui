import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const Login = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook to navigate between routes

    useEffect(() => {
        localStorage.removeItem('loginToken');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://networthtrackerapi20240213185304.azurewebsites.net/api/Auth/getToken?email=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                //body: JSON.stringify({ userName, password }), // Send credentials as JSON
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result);

                // Assuming a token or some success indicator is returned
                localStorage.setItem('loginToken', result.token); // Save token to localStorage if required
                navigate('/home'); // Redirect to dashboard after successful login
            } else {
                localStorage.removeItem('loginToken');
                setErrorMessage('Invalid username or password');
            }
        }
        catch (error) {
            setErrorMessage('Error logging in. Please try again.');
            console.log("Login error: ", error);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f4f4f4',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errorMessage && (
                    <Typography color="error" variant="body2">
                        {errorMessage}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Login;
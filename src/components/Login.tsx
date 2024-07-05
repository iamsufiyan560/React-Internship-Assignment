import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Typography, Paper, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const UserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.error) {
      setError(true);
      setErrorMessage("You must enter your details before accessing the data page.");
      navigate(location.pathname, { replace: true, state: {} });
    }
  
  }, [location,navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !phone || !email) {
      setError(true);
      setErrorMessage("All field is required");
      return;
    }

    const userData = { name, phone, email };
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);

    try {
  
      navigate('/data');
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Failed to save user data.");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setError(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(false);
  };

  return (
    <Grid container justifyContent="center" className="pt-24 ">
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" align="center" gutterBottom>
            User Information
          </Typography>
          {error && (
            <Alert className="w-auto h-12 my-4" color="error">
              {errorMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={error && !name}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error && !phone}
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={error && !email}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid className="items-center justify-center flex" item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserForm;

import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { z } from "zod";
import axios from "axios";

// Define the Zod schema for form validation
const registrationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
    location: z.string().min(1, "Location is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
    role: z.enum(["Owner", "Admin"], "Role is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phoneNumber: "",
    termsAccepted: false,
    role: "Owner", // Default role is Owner
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form data using Zod
      registrationSchema.parse(formData);

      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        formData
      );

      if (response.status === 201) {
        // Navigate to login page after successful registration
        navigate("/login");
      }
    } catch (err) {
      // Handle validation or API errors
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        alert(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <Container component="main" maxWidth="500px">
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#0a1929",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" color="white">
            📚
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ padding: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Book Rent</Typography>
            <Typography variant="h6" gutterBottom>
              Signup as {formData.role}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="location"
                label="Location"
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                select
                name="role"
                label="Role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                error={!!errors.role}
                helperText={errors.role}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="Owner">Owner</option>
                <option value="Admin">Admin</option>
              </TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    value="termsAccepted"
                    color="primary"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                  />
                }
                label="I accept the Terms and Conditions"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item sx={{ display: "flex", gap: "3px" }}>
                  <Typography>Already have an account?</Typography>
                  <Typography sx={{ color: "blueviolet" }}>
                    <Link to="/login">Login</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;

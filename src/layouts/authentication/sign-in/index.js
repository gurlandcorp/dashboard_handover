import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import Switch from "@mui/material/Switch";
// Soft UI Dashboard React components
import CircularProgress from '@mui/material/CircularProgress';
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import api from "../../../services/api";

function SignIn() {
	const [rememberMe, setRememberMe] = useState(true);
	// const handleSetRememberMe = () => setRememberMe(!rememberMe);
	const initialState = {
		email: "",
		password: "",
	};
	const [user, setUser] = useState(initialState);
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("")
	const [submiting, setSubmiting] = useState(false)
	// const [notVerifed, setnotVerifed] = useState("");

	const handleInputs = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	let history = useHistory()
	const handleSubmit = async (e) => {
		e.preventDefault()
		setSubmiting(true)

		setEmailError("")
		setPasswordError("")
		const { email, password } = user;
		if (email == "admin@gmail.com") {
			try {
				const res = await api.post("/signin/admin", {
					email: email,
					password: password,
				});
				if (res.status == 200) {
					localStorage.setItem("adminAuth", email);
					localStorage.setItem("token", JSON.stringify(res.data.token));
					// window.location = "/admin/allProperties";
					history.push('/admin/allProperties')
				}
			} catch (error) {}
		} else {
			try {
				const res = await api.post("/signin", {
					email: email,
					password: password,
				});
				if (res.status == 200) {
					localStorage.setItem("token", JSON.stringify(res.data.token));
					localStorage.setItem("userData", JSON.stringify(res.data.payload));
					// window.location = "/profile";
					
					let redirect_link = localStorage.getItem('redirect_link')
					if(redirect_link!=null && res.data.payload.userType=='Buyer')
					{
						history.push(redirect_link)
					}
					else
					{
						history.push('/profile')
					}
				}
			} catch (error) {
				if (error?.response?.data?.message == "No User Exist With This Email") {
					setEmailError("No User Exist With This Email");
				}
				if (error?.response?.data?.message == "Invalid Password") {
					setPasswordError("Invalid Password");
				}
			}
		}
		setSubmiting(false)
	};
	return (
		<CoverLayout
			size="0.5rem"
			title="Welcome back"
			description="Enter your email and password to sign in"
			image={curved9}
		>
			<SuiBox component="form" role="form" onSubmit={(e)=>handleSubmit(e)}>
				<SuiBox mb={2}>
					<SuiBox mb={1} ml={0.5}>
						<SuiTypography
							component="label"
							variant="caption"
							fontWeight="bold"
						>
							Email
						</SuiTypography>
					</SuiBox>
					<SuiInput
						type="email"
						placeholder="Email"
						id="email"
						name="email"
						value={user.email}
						onChange={handleInputs}
					/>
					{emailError ? <small style={{ color: "red", fontSize: '11px' }}>{emailError}</small> : ""}
				</SuiBox>
				<SuiBox mb={2}>
					<SuiBox mb={1} ml={0.5}>
						<SuiTypography
							component="label"
							variant="caption"
							fontWeight="bold"
						>
							Password
						</SuiTypography>
					</SuiBox>
					<SuiInput
						type="password"
						placeholder="Password"
						id="password"
						name="password"
						onChange={handleInputs}
						value={user.password}
						autoComplete="off"
					/>
					{passwordError ? <small style={{ color: "red", fontSize: '11px' }}>{passwordError}</small> : ""}
				</SuiBox>
				<SuiBox mt={4} mb={1}>
					<SuiButton
						type={submiting == true ? "button" : "submit"}
						variant="gradient"
						color="info"
						fullWidth
					>sign in 
					{ submiting == true && <CircularProgress color="inherit" size="1rem" style={{marginLeft: '0.5rem'}} />  }
					</SuiButton>
				</SuiBox>
				<SuiBox mt={3} textAlign="center">
					<SuiTypography variant="button" color="text" fontWeight="regular">
						Don&apos;t have an account?{" "}
						<SuiTypography
							component={Link}
							to="/authentication/sign-up"
							variant="button"
							color="info"
							fontWeight="medium"
							textGradient
						>
							Sign up
						</SuiTypography>
					</SuiTypography>
				</SuiBox>
			</SuiBox>
		</CoverLayout>
	);
}

export default SignIn;

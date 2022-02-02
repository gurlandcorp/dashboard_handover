import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";

function SignUp() {
	const history = useHistory();
	const [agreement, setAgremment] = useState(true);
	const handleSetAgremment = () => setAgremment(!agreement);
	const initialState = {
		name: "",
		email: "",
		password: "",
		phone: "",
	};
	const [buyer, setBuyer] = useState(false);
	const [saller, setSaller] = useState(false);
	const [user, setUser] = useState(initialState);
	const [email, setEmail] = useState("");

	//   const history = useHistory();
	const handleInputs = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const handleBuyerAccount = () => {
		setBuyer(true);
		setSaller(false);
	};

	const handleSallerAccount = () => {
		setBuyer(false);
		setSaller(true);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setEmail("");
		let userType = "";
		if (buyer) userType = "Buyer";
		else if (saller) userType = "Saller";
		else alert("Please select userType");
		const { phone, name, email, password } = user;
		try {
			const res = await api.post("/signup", {
				email: email,
				password: password,
				phone: phone,
				name: name,
				userType: userType,
			});
			if (res.status == 200) {
				localStorage.setItem("payload", JSON.stringify(res?.data?.SavedUser));
				const res2 = await api.post("/signup/verifyemail", {
					code: res?.data?.SavedUser?.code,
				});
				localStorage.setItem(
					"code",
					JSON.stringify(res?.data?.SavedUser?.code)
				);
        history.push('/authentication/sign-in')
			}

		} catch (error) {
			if (error?.response?.data?.message === "Email Already Taken.") {
				setEmail("Email Already Taken");
			}
		}

		// .then(function (response) {
		// localStorage.setItem("userRegister", JSON.stringify(response?.data));

		// history.push("/emailVerification");
		// toast("Verification Email has been sent successfully", {
		// 	position: "top-left",
		// 	autoClose: 5000,
		// 	hideProgressBar: false,
		// 	closeOnClick: true,
		// 	pauseOnHover: true,
		// 	draggable: true,
		// 	progress: undefined,
		// });
		// history.push({
		// 	pathname: "/user/verification/",
		// 	search: `?code=${response?.data?.SavedUser?.code}`,
		// 	state: { detail: response?.data?.SavedUser?.code },
		// });
	};
	return (
		<BasicLayout
			title="Welcome!"
			description="Use these awesome forms to login or create new account in your project for free."
			image={curved6}
		>
			<Card>
				<SuiBox p={3} mb={1} textAlign="center">
					<SuiTypography variant="h5" fontWeight="medium">
						Register with
					</SuiTypography>
				</SuiBox>
				<SuiBox mb={2}>
					<Socials />
				</SuiBox>
				<Separator />
				<SuiBox pt={2} pb={3} px={3}>
					<SuiBox component="form" role="form">
						<SuiBox mb={2}>
							<SuiInput
								placeholder="Name"
								id="name"
								name="name"
								value={user.name}
								onChange={handleInputs}
							/>
						</SuiBox>
						<SuiBox mb={2}>
							<SuiInput
								type="email"
								placeholder="Email"
								id="email"
								name="email"
								value={user.email}
								onChange={handleInputs}
							/>
						</SuiBox>
						<SuiBox mb={2}>
							<SuiInput
								type="password"
								placeholder="Password"
								id="password"
								name="password"
								value={user.password}
								onChange={handleInputs}
							/>
						</SuiBox>
						<SuiBox mb={2}>
							<SuiInput
								type="tel"
								placeholder="Phone"
								id="phone"
								name="phone"
								value={user.phone}
								onChange={handleInputs}
							/>
						</SuiBox>
						<SuiTypography
							variant="button"
							fontWeight="regular"
							sx={{ cursor: "poiner", userSelect: "none" }}
						>
							User Type
						</SuiTypography>
						<SuiBox display="flex" alignItems="center">
							<Checkbox
								// checked={agreement}
								// onChange={handleSetAgremment}
								onClick={handleBuyerAccount}
							/>
							<SuiTypography
								variant="button"
								fontWeight="regular"
								// onClick={handleSetAgremment}
								sx={{ cursor: "poiner", userSelect: "none" }}
							>
								Buyer{" "}
							</SuiTypography>
							<Checkbox
								// checked={agreement}
								// onChange={handleSetAgremment}
								onClick={handleSallerAccount}
								sx={{ marginLeft: "70px" }}
							/>
							<SuiTypography
								variant="button"
								fontWeight="regular"
								// onClick={handleSetAgremment}
								sx={{ cursor: "poiner", userSelect: "none" }}
							>
								Seller{" "}
							</SuiTypography>
						</SuiBox>
						<SuiBox
							display="flex"
							alignItems="center"
							sx={{ marginTop: "10px" }}
						>
							<Checkbox
							// checked={agreement}
							// onChange={handleSetAgremment}
							/>
							<SuiTypography
								variant="button"
								fontWeight="regular"
								// onClick={handleSetAgremment}
								sx={{ cursor: "poiner", userSelect: "none" }}
							>
								&nbsp;&nbsp;I agree the&nbsp;
							</SuiTypography>
							<SuiTypography
								component="a"
								href="#"
								variant="button"
								fontWeight="bold"
								textGradient
							>
								Terms and Conditions
							</SuiTypography>
						</SuiBox>
						<SuiBox mt={4} mb={1}>
							<SuiButton
								variant="gradient"
								color="dark"
								fullWidth
								onClick={(e) => handleSubmit(e)}
							>
								sign up
							</SuiButton>
						</SuiBox>
						<SuiBox mt={3} textAlign="center">
							<SuiTypography variant="button" color="text" fontWeight="regular">
								Already have an account?&nbsp;
								<SuiTypography
									component={Link}
									to="/authentication/sign-in"
									variant="button"
									color="dark"
									fontWeight="bold"
									textGradient
								>
									Sign in
								</SuiTypography>
							</SuiTypography>
						</SuiBox>
					</SuiBox>
				</SuiBox>
			</Card>
		</BasicLayout>
	);
}

export default SignUp;

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import axios from "axios";
import SuiButton from "components/SuiButton";
import { useHistory } from "react-router-dom";
var isAdmin = localStorage.getItem("adminAuth");

function Overview() {
	const history = useHistory();
	const [propertiesData, setProperties] = useState([]);

	const renderNewProperty = () => {
		window.location = "/editproperty";
	};
	var isAdmin = localStorage.getItem("adminAuth");
	const getData = async () => {
		try {
			var res;
			isAdmin != null
				? (res = await api.get(`/admin/properties/all`))
				: (res = await api.get(`/property/userproperties`));
			if (res.status == 200) {
				setProperties(res.data);
				// toast("Your Profile has been updated", {
				//   position: "top-right",
				//   autoClose: 5000,
				//   hideProgressBar: false,
				//   closeOnClick: true,
				//   pauseOnHover: true,
				//   draggable: true,
				//   progress: undefined,
				// });
			}
		} catch (error) {
			if(error?.response?.data.loggedIn == false)
			{
				history.push('/authentication/sign-in')
			}
			console.log(error?.response?.data)
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<DashboardLayout>
			<Header />

			<SuiBox mt={5} mb={3}>
				<Card>
					<SuiBox pt={2} px={2}>
						<SuiBox mb={0.5}>
							<SuiTypography variant="h6" fontWeight="medium">
								Properties
							</SuiTypography>
						</SuiBox>
						{/* <SuiBox mb={1}>
							<SuiTypography variant="button" fontWeight="regular" color="text">
								Architects design houses
							</SuiTypography>
						</SuiBox> */}
					</SuiBox>
					<SuiBox p={2}>
						
						{isAdmin ? (
							""
						) : (
							<Grid
								container 
								onClick={() => {
									renderNewProperty();
								}}
							>
								<Grid
									item
									xs={12}
									md={6}
									xl={3}
									onClick={() => {
										renderNewProperty();
									}}
								>
									<PlaceholderCard
										title={{ variant: "p", text: "New Property" }}
										outlined
									/>
								</Grid>
							</Grid>
						)}

						{propertiesData.length == 0 && (
							<Grid item xs={12} my={2} className="text-center">
								<small style={{fontSize: '1rem'}}> No Property found! </small>
							</Grid>
						)}

						<Grid container spacing={3}>
							{propertiesData &&
								propertiesData?.map((item) => {
									return (
										<Grid item xs={12} md={6} xl={3}>
											<DefaultProjectCard
												image={item.images[0]}
												label={item.propertyType}
												title={item.propertyTitle}
												description={item.description}
												action={{
													type: "internal",
													route: "/detailpage",
													color: "info",
													label: "view projects",
												}}
												authors={[
													{ image: team1, name: "Elena Morison" },
													{ image: team2, name: "Ryan Milly" },
													{ image: team3, name: "Nick Daniel" },
													{ image: team4, name: "Peterson" },
												]}
											/>
											<SuiButton
												// component="a"
												// href={action.route}
												target="_blank"
												rel="noreferrer"
												variant="outlined"
												size="small"
												color="info"
												onClick={() => {
													history.push({
														pathname: "/detailpage",
														// search: "?update=true", // query string
														state: {
															// location state
															data: { propertiesData },
														},
													});
												}}
											>
												View Detail
												{/* {action.label} */}
											</SuiButton>
											{/* <button onClick={() => (window.location = "/detailpage")}>
												Detail
											</button> */}
										</Grid>
									);
								})}
						</Grid>
					</SuiBox>
				</Card>
			</SuiBox>
			{/* <Footer /> */}
		</DashboardLayout>
	);
}

export default Overview;

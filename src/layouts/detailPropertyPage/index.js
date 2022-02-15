// import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import Footer from "examples/Footer";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import React from "react";
// import api from "../../services/api";
// import axios from "axios";
import Bed from "./bed.png";
import Shower from "./shower.png";
import Area from "./area.png";
import Parking from "./parking.png";
import Type from "./type.png";
import Bid from "./bid.png";
import { useLocation } from "react-router-dom";

function Overview() {
	const location = useLocation();
	return (
		<DashboardLayout>
			<Header />

			<SuiBox mt={5} mb={3}>
				<Card>
					<SuiBox pt={2} px={2}>
						<SuiBox mb={0.5}>
							<SuiTypography variant="h6" fontWeight="medium">
								Property Detail
							</SuiTypography>
						</SuiBox>
					</SuiBox>
					<SuiBox p={2}>
						{/* start............. */}
						{/* {data.propertiesData[0].propertyTitle} */}
						<div class="row">
							<div class="col-lg-8 ms-5">
								<div class="" data-wow-delay=".4s">
									<img
										src={location.state.data.propertiesData[0].images[0]}
										// src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250"
										alt="feature"
										style={{
											widht: "798px",
											height: "420px",
											minWidth: "798px",
											minHeight: "420px",
										}}
									/>
								</div>
								<div class="mt-5">
									<h3 class="">Features & Amenities</h3>
									<div class="row">
										<div class="col-lg-4 ">
											<ul class="" style={{ listStyleType: "none" }}>
												<li className="mb-3">
													<img
														src={Bed}
														style={{ width: "30px", marginRight: "10px" }}
														alt={'Bed Room'}
													/>
													Bed Room:
													{location.state.data.propertiesData[0].bedrooms}
												</li>
												<li className="mb-3">
													<img
														src={Parking}
														style={{ width: "30px", marginRight: "10px" }}
														alt={'Parking'}
													/>
													Parking:Yes
												</li>
												{/* <li>Barbeque</li>
												<li>Gym</li> */}
											</ul>
										</div>
										<div class="col-lg-4">
											<ul style={{ listStyleType: "none" }}>
												<li className="mb-3">
													<img
														src={Shower}
														style={{ width: "30px", marginRight: "15px" }}
														alt="Bath Room"
													/>
													Bath Room:
													{location.state.data.propertiesData[0].bathrooms}
												</li>
												<li>
													{/* <i class="fas fa-check-circle"></i>Laundry */}
													<li className="mb-3">
														<img
															src={Type}
															style={{
																width: "30px",
																marginRight: "10px",
																opacity: "0.6",
															}}
															alt="Type"
														/>
														Type:{" "}
														{location.state.data.propertiesData[0].propertyType}
													</li>
												</li>
												{/* <li>
													<i class="fas fa-check-circle"></i>Microwave
												</li>
												<li>
													<i class="fas fa-check-circle"></i>Lawn
												</li> */}
											</ul>
										</div>
										<div class="col-lg-4">
											<ul style={{ listStyleType: "none" }}>
												<li className="mb-3">
													<img
														src={Area}
														style={{ width: "30px", marginRight: "10px" }}
														alt="Area"
													/>
													Area:{location.state.data.propertiesData[0].area}{" "}
													Sq.ft
												</li>
												<li className="mb-3">
													<img
														src={Bid}
														style={{
															width: "30px",
															marginRight: "10px",
														}}
														alt="Top Bid"
													/>
													Top Bid:
													{location.state.data.propertiesData[0].topBid == null
														? " Not Yet"
														: location.state.data.propertiesData[0].topBid}
												</li>
												{/* <li>
													<i class="fas fa-check-circle"></i>CC Camera
												</li> */}
											</ul>
										</div>
									</div>
								</div>
								<div class="mt-3">
									<h3 class="item-title">Desription</h3>
									<p>
										{/* {individualPropertyData.description} */}
										{location.state.data.propertiesData[0].description}
										{/* Praesent eros turpis, commodo vel justo at, pulvinar mollis
										eros. Mauris aliquet eu quam id ornareor bi ac quam enim.
										Cras vitae nulla condimentum, semper dolor non, faucibus
										dolor. Vivamus adip iscing eros quis orci fringilla, sed
										pretium lectus viverra. Pellentesque habitant morbi
										tristique senectus et netus et malesuada fames ac turpis
										egestas. */}
									</p>
									{/* <p>
										Praesent eros turpis, commodo vel justo at, pulvinar mollis
										eros. Mauris aliquet eu quam id ornareor bi ac quam enim.
										Cras vitae nulla condimentum, semper dolor non, faucibus
										dolor. Vivamus adip iscing eros quis orci fringilla, sed
										pretium lectus viverra.
									</p> */}
								</div>
							</div>
						</div>
					</SuiBox>
				</Card>
			</SuiBox>
			{/* <Footer /> */}
		</DashboardLayout>
	);
}

export default Overview;

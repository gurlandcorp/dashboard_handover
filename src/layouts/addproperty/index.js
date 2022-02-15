import React, { useState, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import { Grid, MenuItem } from "@mui/material";

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
// import { alpha, styled } from '@mui/material/styles';
import SuiButton from "components/SuiButton";
import api from "../../services/api";
import "./style.css";

function AddProperty() {
	const initialState = {
		propertyTitle: "",
		area: "",
		bedrooms: "",
		floors: "",
		propertyType: "",
		bathrooms: "",
		priceDemand: "",
		biddingEnd: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		description: "",
	};

	const [user, setUser] = useState(initialState);
	const [propertyType, setpropertyType] = useState("");
	const [countrySate, setCountrySate] = useState("");
	const [multiImages, setMultiImages] = useState("");

	const handleInputs = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const multiImagesChange = (e) => {
		setMultiImages(e.target.files);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		const {
			propertyTitle,
			area,
			bedrooms,
			floors,
			//propertyType,
			bathrooms,
			priceDemand,
			biddingEnd,
			address,
			city,
			//state,
			zip,
			description,
		} = user;
		var myHeaders = new Headers();
		myHeaders.append(
			"Authorization",
			`Bearer ${JSON.parse(localStorage.getItem("token"))}`
		);

		var formdata = new FormData();
		formdata.append("propertyTitle", propertyTitle);
		formdata.append("description", description);
		formdata.append("area", area);
		formdata.append("propertyType", "Constructed");
		formdata.append("address", address);
		formdata.append("bedrooms", bedrooms);
		formdata.append("bathrooms", bathrooms);
		formdata.append("floors", floors);
		formdata.append("priceDemand", priceDemand);
		formdata.append("biddingEnd", biddingEnd);
		formdata.append("images", multiImages[0]);
		formdata.append("city", city);
		formdata.append("state", countrySate);
		formdata.append("zip", zip);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: formdata,
			redirect: "follow",
		};
		await fetch(
			"https://handoverapi.herokuapp.com/property/add",
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	};

	const property_types = [
		{
		  value: 'Constructed',
		  label: 'Constructed',
		},
		{
		  value: 'Non Constructed',
		  label: 'Non Constructed',
		}
	];

	const states = [
		{
		  value: 'Sharjah',
		  label: 'Sharjah',
		},
		{
		  value: 'Ajman',
		  label: 'Ajman',
		},
		{
			value: 'Fujairah',
			label: 'Fujairah',
		},
		{
			value: 'Umm Al Quwain',
			label: 'Umm Al Quwain',
		}
	];
	  
	return (
		<DashboardLayout>
			<Header />
			<Card sx={{ mt: 5 }}>
				
				<Grid container style={{padding: '2rem'}}>
					<Grid item xs={12}>
						<span className="" style={{ fontSize: "20px", fontWeight: "bold" }}>
							Property Description
						</span>
					</Grid>

					<Grid container spacing={4} columns={12}>
						<Grid item xs={6}>
							<TextField fullWidth id="propertyTitle" size="small" name="propertyTitle" label="Property Title" color="info" variant="standard" value={user.propertyTitle} onChange={(e)=>handleInputs(e)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth type="number" id="area" size="small" name="area" label="Area" color="info" variant="standard" value={user.area} onChange={(e)=>handleInputs(e)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth type="number" id="bedrooms" size="small" name="bedrooms" label="Bed Rooms" color="info" variant="standard" value={user.bedrooms} onChange={(e)=>handleInputs(e)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth type="number" id="floors" size="small" name="floors" label="Floors" color="info" variant="standard" value={user.floors} onChange={(e)=>handleInputs(e)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth
							id="standard-select-property-type"
							select
							label="Select"
							value={propertyType}
							onChange={(e) => setpropertyType(e.target.value)}
							helperText="Please select property type"
							variant="standard"
							color="info"
							>
							{property_types.map((option) => (
								<MenuItem key={option.value} value={option.value}>
								{option.label}
								</MenuItem>
							))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth type="number" id="bathrooms" size="small" name="bathrooms" label="Bathrooms" color="info" variant="standard" value={user.bathrooms} onChange={(e)=>handleInputs(e)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth type="number" id="priceDemand" size="small" name="priceDemand" label="Demand Price" color="info" variant="standard" value={user.priceDemand} onChange={(e)=>handleInputs(e)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth type="date" id="biddingEnd" size="small" name="biddingEnd" label="Bidding End" color="info" variant="standard" value={user.biddingEnd} onChange={(e)=>handleInputs(e)} InputLabelProps={{ shrink: true, }} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth id="address" size="small" name="address" label="Address" color="info" variant="standard" value={user.address} onChange={(e)=>handleInputs(e)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth id="city" size="small" name="city" label="City" color="info" variant="standard" value={user.city} onChange={(e)=>handleInputs(e)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth
							id="state"
							name="state"
							select
							label="Select State"
							value={countrySate}
							onChange={(e) => setCountrySate(e.target.value)}
							helperText="Please select state"
							variant="standard"
							color="info"
							>
							{states.map((option) => (
								<MenuItem key={option.value} value={option.value}>
								{option.label}
								</MenuItem>
							))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth id="zip" size="small" name="zip" label="Zip" color="info" variant="standard" value={user.zip} onChange={(e)=>handleInputs(e)} />
						</Grid>
						<Grid item xs={12}>
							<TextField fullWidth multiline rows={4} id="description" size="small" name="description" label="Description" color="info" variant="standard" value={user.description} onChange={(e)=>handleInputs(e)} />
						</Grid>
						
						<Grid item xs={12}>
							<input
								type="file"
								className="custom-style"
								name="images"
								id="images"
								accept="image/*"
								multiple
								onChange={(e) => multiImagesChange(e)}
								style={{ marginLeft: "0px" }}
								// hidden
							/>
						</Grid>
						<Grid item xs={12}>
							<SuiButton
								variant="gradient"
								color="dark"
								size="medium"
								onClick={(e) => handleSubmit(e)}
							>
								Add Property
							</SuiButton>
						</Grid>
					</Grid>
				</Grid>
				<div className="m-5">
					
					<form>
						{/* <div class="form row">
							<div class="form-group col-md-4">
								<label for="state">State</label>
								<select
									id="state"
									class="form-control "
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="state"
									value={countrySate}
									onChange={(e) => setCountrySate(e.target.value)}
								>
									<option>Sharjah</option>
									<option>Sharjah</option>
									<option>Ajman</option>
									<option>Fujairah</option>
									<option>Umm Al Quwain</option>
								</select>
							</div>
							<div class="form-group col-md-2">
								<label for="zip">Zip</label>
								<input
									type="text"
									class="form-control "
									id="zip"
									placeholder="Zip"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="zip"
									value={user.zip}
									onChange={handleInputs}
								/>
							</div>
						</div>
						<div class="form-group mb-3">
							<label for="description">Description</label>
							<textarea
								class="form-control "
								id="description"
								rows="7"
								style={{ borderRadius: "8px", fontSize: "15px" }}
								name="description"
								value={user.description}
								onChange={handleInputs}
							></textarea>
						</div> */}
						{/* <button
							type="button"
							class="btn custom-style mt-3"
							//   onClick={(e) => handleSubmit(e)}
						>
						</button> */}
					</form>
				</div>
			</Card>
		</DashboardLayout>
	);
}

export default AddProperty;

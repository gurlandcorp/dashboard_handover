import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import api from "../../services/api";

function Tables() {
	const [users, setUsers] = useState([]);
	const [imgUrl, setImgUrl] = useState(
		"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250"
	);
	const getData = async () => {
		try {
			const res = await api.get(`/admin/users/all`);
			if (res.status == 200) {
				setUsers(res.data);
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
			console.log(JSON.stringify(error?.response?.data));
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<DashboardLayout>
			<DashboardNavbar />
			<SuiBox py={3}>
				<SuiBox mb={3}>
					<Card>
						<SuiBox
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							p={3}
						>
							<SuiTypography variant="h6">Users</SuiTypography>
						</SuiBox>
						<div className="container">
							<table
								class="table table-bordered"
								style={{
									display: "block",
									overflowX: "auto",
									whiteSpace: "nowrap",
								}}
							>
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Avatar</th>
										<th scope="col">Name</th>
										<th scope="col">Email</th>
										<th scope="col">Phone</th>
										<th scope="col">Account Type</th>
										<th scope="col">Verified</th>
										<th scope="col">User Status</th>
										<th scope="col">Stripe Id</th>
									</tr>
								</thead>
								<tbody>
									{users.map((a, i) => {
										return (
											<tr>
												<td style={{ paddingTop: "20px" }}>{i + 1}</td>
												<td>
													<img
														alt="avatar"
														src={a.imageUrla ? a.imageUrl : imgUrl}
														style={{ maxWidth: "100%" }}
													/>
												</td>
												<td style={{ paddingTop: "20px" }}>{a.name}</td>
												<td style={{ paddingTop: "20px" }}>{a.email} </td>
												<td style={{ paddingTop: "20px" }}>{a.phone}</td>
												<td style={{ paddingTop: "20px" }}>{a.userType}</td>
												<td style={{ paddingTop: "20px" }}>
													{a.status == "Verified" ? "Yes" : "No"}
												</td>
												<td style={{ paddingTop: "20px" }}>{a.userStatus}</td>
												<td style={{ paddingTop: "20px" }}>{a.stripeId}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</Card>
				</SuiBox>
			</SuiBox>
		</DashboardLayout>
	);
}

export default Tables;

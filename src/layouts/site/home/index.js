// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";
// // Soft UI Dashboard React components
// import SuiBox from "components/SuiBox";
// import SuiTypography from "components/SuiTypography";
// import SuiInput from "components/SuiInput";
// import SuiButton from "components/SuiButton";
// // Authentication layout components
// import BasicLayout from "layouts/site/components/BasicLayout";
// import Socials from "layouts/authentication/components/Socials";
// import Separator from "layouts/authentication/components/Separator";
// // Images
// import curved6 from "assets/images/curved-images/curved14.jpg";
// import api from "../../../services/api";
// import { useHistory } from "react-router-dom";
// function SignUp() {
// 	const history = useHistory();
// 	return <BasicLayout></BasicLayout>;
// }

// export default SignUp;
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/site/components/Footer";

import { useHistory } from "react-router-dom";
function BasicLayout() {
	const history = useHistory();
	return (
		<PageLayout>
			<div onClick={() => history.push("/dashboard")}>
				GO TO ANOTHER PAGE
			</div>
			lsdhlfhdslhfldshfldsflhldhfhd
			<Footer/>
			<div onClick={() => history.push("/admin/home2")}>
				{/*  */}
				GO TO admin PAGE
			</div>
		</PageLayout>
	);
}

export default BasicLayout;

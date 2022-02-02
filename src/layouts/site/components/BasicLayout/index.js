import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/site/components/Footer";

import { useHistory } from "react-router-dom";
function BasicLayout() {
	const history = useHistory();
	return (
		<PageLayout>
			<div onClick={() => history.push("/authentication/sign-up")}>
				GO TO ANOTHER PAGE
			</div>
			lsdhlfhdslhfldshfldsflhldhfhd
		</PageLayout>
	);
}

export default BasicLayout;

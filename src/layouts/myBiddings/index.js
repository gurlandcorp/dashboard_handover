import Grid from "@mui/material/Grid";
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
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
// import axios from "axios";

function Overview() {
  const [propertiesData, setProperties] = useState([]);

  const renderNewProperty = () => {
    debugger;
    window.location = "/editproperty";
  };

  const getData = async () => {
    try {
      const res = await api.get(`/property/userproperties`);

      if (res.status === 200) {
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
      debugger;
      alert(JSON.stringify(error?.response?.data));
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
                Projects My Biddings
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={1}>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Architects design houses
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2}>
            {propertiesData.length === 0 && (
              <Grid item xs={12} md={6} xl={3}>
                No Property found
              </Grid>
            )}

            <Grid container spacing={3}>
              {propertiesData &&
                propertiesData?.map((item) => {
                  debugger;
                  return (
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                        image={item.images[0]}
                        label={item.propertyType}
                        title={item.propertyTitle}
                        description={item.description}
                        action={{
                          type: "internal",
                          route: "/pages/profile/profile-overview",
                          color: "info",
                          label: "view project",
                        }}
                        authors={[
                          { image: team1, name: "Elena Morison" },
                          { image: team2, name: "Ryan Milly" },
                          { image: team3, name: "Nick Daniel" },
                          { image: team4, name: "Peterson" },
                        ]}
                      />
                    </Grid>
                  );
                })}

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
                  title={{ variant: "h5", text: "New Property" }}
                  outlined
                />
              </Grid>
            </Grid>
          </SuiBox>
        </Card>
      </SuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;

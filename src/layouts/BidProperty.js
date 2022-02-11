import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Header from "layouts/profile/components/Header";
import api from 'services/api';
import SnackBarAlert from 'components/SnackBarAlert';

const BidProperty = () => {

    const [amount, setAmount] = useState();
    const [amountErr, setAmountErr] = useState('');
    const [minAmount, setMinAmount] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');
    const [alert, setAlert] = useState(false);

    let {id} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if( amount > minAmount )
        {
            // store new highest bidding amount
            setAmountErr('')
            var sellerId = JSON.parse(localStorage.getItem("userData"))._id;
            let res = await api.post(`/bidding/bid`, {
                bidAmount: amount,
                propertyId: id,
                sellerId: sellerId,
            })
            setAmount('')
            setAlertMessage(res.data.Message)
            setAlert(true)

            // fetching new highest bidding amount
            res = await api.post(`/bidding/highest`, {
                propertyId: id,
            })
            await setMinAmount(res.data[0].bidAmount)
        }
        else
        {
            setAmountErr(`Biding ammount will be grater than ${minAmount}!`)
        }
	};

    let history = useHistory()

    useEffect(()=> {

        const onLoad = async () => {
            try {
                let res = await api.post(`/bidding/highest`, {
                    propertyId: id,
                })
                await setAmount(res.data[0].bidAmount)
                await setMinAmount(res.data[0].bidAmount)
                localStorage.getItem('redirect_link') != null && localStorage.removeItem('redirect_link')
            } catch (error) {
                if(error?.response?.data.loggedIn == false)
                {
                    await localStorage.setItem('redirect_link', `/property/bid/${id}`)
                    history.push('/authentication/sign-in')
                }
            }
        }
        onLoad()

    },[])

    return (
        <DashboardLayout>
            <Header />
            <SnackBarAlert open={alert} message={alertMessage} />
            <SuiBox mt={5} mb={3}>
                <Card>
                <SuiBox pt={2} px={2}>
                    <SuiBox mb={0.5}>
                    <SuiTypography variant="h6" fontWeight="medium">
                        Bid a property
                    </SuiTypography>
                    </SuiBox>
                    <SuiBox mb={1}>
                        <SuiBox component="form" role="form" onSubmit={(e)=>handleSubmit(e)}>
                            <SuiBox mb={2}>
                                <SuiBox mb={1} ml={0.5}>
                                    <SuiTypography
                                        component="label"
                                        variant="caption"
                                        fontWeight="bold"
                                    >
                                        Bid Amount
                                    </SuiTypography>
                                </SuiBox>
                                <SuiInput
                                    type="text"
                                    placeholder="Bid Amount"
                                    id="amount"
                                    name="amount"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value)
                                        amount <= minAmount ? setAmountErr(`Biding ammount will be grater than ${minAmount}!`) : setAmountErr('')
                                    }}
                                />
                                {
                                    amountErr!='' && <small className="text-danger" style={{fontSize: '0.8rem'}}>Biding ammount will be grater than {minAmount}!</small>
                                }
                            </SuiBox>
                            <SuiButton
                                type="submit"
                                variant="gradient"
                                color="info"
                            >
                                Bid a property
                            </SuiButton>
                        </SuiBox>
                    </SuiBox>
                </SuiBox>
                <SuiBox p={2}>
                    {/* {propertiesData.length == 0 && (
                    <Grid item xs={12} md={6} xl={3}>
                        No Property found
                    </Grid>
                    )} */}

                    <Grid container spacing={3}>
                    {/* {propertiesData &&
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
                        })} */}

                    {/* <Grid
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
                    </Grid> */}
                    </Grid>
                </SuiBox>
                </Card>
            </SuiBox>
            {/* <Footer /> */}
        </DashboardLayout>
    )
}

export default BidProperty
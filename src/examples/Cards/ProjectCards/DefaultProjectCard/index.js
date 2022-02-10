import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
import SuiAvatar from "components/SuiAvatar";
import { height } from "@mui/material/node_modules/@mui/system";

function DefaultProjectCard({
	image,
	label,
	title,
	description,
	action,
	authors,
}) {
	const renderAuthors = authors.map(({ image: media, name }) => (
		<Tooltip key={name} title={name} placement="bottom">
			<SuiAvatar
				src={media}
				alt={name}
				size="xs"
				sx={({ borders: { borderWidth }, palette: { white } }) => ({
					border: `${borderWidth[2]} solid ${white.main}`,
					cursor: "pointer",
					position: "relative",
					ml: -1.25,

					"&:hover, &:focus": {
						zIndex: "10",
					},
				})}
			/>
		</Tooltip>
	));

	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "transparent",
				boxShadow: "none",
				overflow: "visible",
			}}
		>
			<SuiBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
				<CardMedia
					src={image}
					component="img"
					title={title}
					sx={{
						maxWidth: "100%",
						height:"410px",
						margin: 0,
						boxShadow: ({ boxShadows: { md } }) => md,
						objectFit: "cover",
						objectPosition: "center",
					}}
				/>
			</SuiBox>
			<SuiBox pt={3} px={0.5}>
				<SuiBox mb={1}>
					<SuiTypography
						variant="button"
						fontWeight="regular"
						textTransform="capitalize"
						textGradient
					>
						{label}
					</SuiTypography>
				</SuiBox>
				<SuiBox mb={1}>
					{action.type === "internal" ? (
						<SuiTypography
							component={Link}
							to={action.route}
							variant="h5"
							textTransform="capitalize"
						>
							{title}
						</SuiTypography>
					) : (
						<SuiTypography
							component="a"
							href={action.route}
							target="_blank"
							rel="noreferrer"
							variant="h5"
							textTransform="capitalize"
						>
							{title}
						</SuiTypography>
					)}
				</SuiBox>
				<SuiBox mb={2} lineHeight={0}>
					<div
						// style={{
						// 	overflow: "hidden",
						// 	whiteSpace: "nowrap",
						// 	textOverflow: "ellipsis",
						// 	width: "100rem",
						// }}
					>
						<SuiTypography
							variant="button"
							fontWeight="regular"
							color="text"
							// noWrap
							// style={{
							// overflow: "hidden",
							// backgroundColor:"red"
							//         text-overflow: ellipsis; /* will make [...] at the end */
							// width: 370px; /* change to your preferences */
							// white-space: nowrap; /* paragraph to one line */
							// overflow:hidden;
							// }}
						>
							{/* {description} */}
						</SuiTypography>
					</div>
				</SuiBox>
				{/* <SuiBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <SuiButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </SuiButton>
          ) : (
            <SuiButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </SuiButton>
          )}
          <SuiBox display="flex">{renderAuthors}</SuiBox>
        </SuiBox> */}
			</SuiBox>
		</Card>
	);
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
	authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
	image: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	action: PropTypes.shape({
		type: PropTypes.oneOf(["external", "internal"]),
		route: PropTypes.string.isRequired,
		color: PropTypes.oneOf([
			"primary",
			"secondary",
			"info",
			"success",
			"warning",
			"error",
			"light",
			"dark",
			"white",
		]).isRequired,
		label: PropTypes.string.isRequired,
	}).isRequired,
	authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;

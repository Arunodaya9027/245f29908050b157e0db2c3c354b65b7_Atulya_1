
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ArgonAvatar from "components/ArgonAvatar";

function DefaultProjectCard({ proof, label, title, description, action, authors }) {
  const mediaType = proof.type.split("/")[0];
  console.log(mediaType);

  const renderMedia = () => {
    switch (mediaType) {
      case "image":
        return (
          <CardMedia
            src={URL.createObjectURL(proof)}
            component="img"
            title={title}
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        );
      case "video":
        return (
          <CardMedia
            component="video"
            title={title}
            controls
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src={URL.createObjectURL(proof)} type="video/mp4" />
            Your browser does not support the video tag.
          </CardMedia>
        );
      case "audio":
        return (
          <CardMedia
            component="audio"
            title={title}
            controls
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src={URL.createObjectURL(proof)} type="audio/mp3" />
            Your browser does not support the audio tag.
          </CardMedia>
        );
      case "application":
        return (
          <CardMedia
            component="iframe"
            title={title}
            sx={{
              width: "100%",
              height: "400px", // Set a suitable height for your application iframe
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
            }}
            src={URL.createObjectURL(proof)}
          />
        );
      // Add cases for handling other types like documents and PDFs
      default:
        return null; // Handle other types or provide a default behavior
    }
  };

  const renderAuthors = authors.map(({ proof: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <ArgonAvatar
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
      <ArgonBox position="relative" width="100.25%" shadow="md" borderRadius="xl">
        {renderMedia()}
        {/* <CardMedia
                component="img"
                src=
                style={{ width: "50%", height: "50%", objectFit: "cover" ,justifyContent:'center',alignContent:'center'}}
                alt="Favicon"
              /> */}
      </ArgonBox>
      <ArgonBox pt={2} px={0.5}>
        <ArgonTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          textGradient
        >
          {label}
        </ArgonTypography>
        <ArgonBox mb={1}>
          {action.type === "internal" ? (
            <ArgonTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </ArgonTypography>
          ) : (
            <ArgonTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </ArgonTypography>
          )}
        </ArgonBox>
        <ArgonBox mb={3} lineHeight={0}>
          <ArgonTypography variant="button" fontWeight="regular" color="text">
            {description}
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <ArgonButton
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </ArgonButton>
          ) : (
            <ArgonButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </ArgonButton>
          )}
          <ArgonBox display="flex">{renderAuthors}</ArgonBox>
        </ArgonBox>
      </ArgonBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  proof: PropTypes.string.isRequired,
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
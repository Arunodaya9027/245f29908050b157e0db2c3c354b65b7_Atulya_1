import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
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
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Complaint() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [formData, setFormData] = useState({
  //   complaintName: "",
  //   projectDescription: "",
  // });
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({
    complaintName: "",
    description: "",
    phone: "", // New field for phone number
    favicon: null,
    likes: 0,
    comments: [],
  });

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewComplaint((prevComplaint) => ({ ...prevComplaint, [field]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewComplaint((prevComplaint) => ({ ...prevComplaint, favicon: file }));
  };

  const handleLike = (index) => {
    setComplaints((prevComplaints) => {
      const updatedComplaints = [...prevComplaints];
      updatedComplaints[index].likes += 1;
      return updatedComplaints;
    });
  };

  const handleComment = (index, comment) => {
    setComplaints((prevComplaints) => {
      const updatedComplaints = [...prevComplaints];
      updatedComplaints[index].comments.push(comment);
      return updatedComplaints;
    });
  };

  const handleSubmit = () => {
    setComplaints((prevComplaints) => [...prevComplaints, newComplaint]);
    setNewComplaint({
      complaintName: "",
      description: "",
      favicon: null,
      likes: 0,
      comments: [],
    });
  };

  //const handleSubmit = () => {};


  useEffect(() => {
    const postData = async () => {
      try {
        // Check if favicon is not null or undefined before accessing its properties
        if (newComplaint.favicon && newComplaint.favicon.type) {
          const response = await fetch("http://localhost:3001/api/complaints", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newComplaint),
          });
  
          if (response.ok) {
            console.log("Complaint created successfully");
            // Optionally, you can reset the form or perform other actions upon successful POST
          } else {
            console.error("Error creating complaint");
          }
        } else {
          console.error("Favicon is null or undefined");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    // Check if the newComplaint has values before making the POST request
    if (
      newComplaint.complaintName &&
      newComplaint.description &&
      newComplaint.phone &&
      newComplaint.favicon
    ) {
      postData();
    }
  }, [newComplaint]);
  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <ArgonBox mb={3}>
        <Card>
          <ArgonBox pt={2} px={2}>
            <ArgonBox mb={0.5}>
              <ArgonTypography variant="h6" fontWeight="medium">
                Complaints
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mb={1}>
              <ArgonTypography variant="button" fontWeight="regular" color="text">
                My Complaint
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>

          {/* Modal for creating a new project */}
          <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
            <DialogContent>
              <div>
                <h2>Create a New Complaint</h2>
                <label>Complaint Name</label>
                <TextField
                  fullWidth
                  value={newComplaint.complaintName}
                  onChange={(e) => handleInputChange("complaintName", e.target.value)}
                />
                <br />
                <label>Description</label>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={newComplaint.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
                <br />
                <label>Phone Number</label>
                <TextField
                  fullWidth
                  value={newComplaint.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
                <br />
                {/* <input
                  type="file"
                  accept="*"
                  onChange={handleFileChange}
                  style={{ margin: "5px" }}
                /> */}
                <Input
                  id="file-input"
                  type="file"
                  accept="*"
                  onChange={handleFileChange}
                  style={{ margin: "5px" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <InputLabel htmlFor="file-input">
                        <CloudUploadIcon />
                      </InputLabel>
                    </InputAdornment>
                  }
                />

                <br />
                <br />

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Register Complaint
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <ArgonBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={3}>
                <Button
                  variant="outlined"
                  onClick={handleOpenModal}
                  style={{
                    color: "grey",
                    width: "400%",
                    height: "150px",
                    marginLeft: "15px",
                    borderRadius: "18px",
                  }}
                >
                  + New Complaint
                </Button>
              </Grid>

              {/* <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label="BRIBE"
                  title="Jaipur: A Rajasthan-based young police inspector"
                  description="A Rajasthan-based police inspector has been issued a notice by the Inspector General law and order, emphasising on the conduct and importance on maintaining the decorum of the police uniform.As Uber works through a huge amount of internal management turmoil."
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "View Complaint",
                  }}
                  authors={[
                    { image: team1, name: "Elena Morison" },
                    { image: team2, name: "Ryan Milly" },
                    { image: team3, name: "Nick Daniel" },
                    { image: team4, name: "Peterson" },
                  ]}
                />
              </Grid> */}
            </Grid>

            <br />
            <br />
            <br />

            {complaints.map((complaint, index) => (
              <Grid key={index} container spacing={3}>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultProjectCard
                    proof={complaint.favicon}
                    label={complaint.complaintName}
                    title={complaint.description}
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "info",
                      label: "View Complaint",
                    }}
                    authors={[
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                    ]}
                  />
                </Grid>
              </Grid>
            ))}
          </ArgonBox>
        </Card>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}
export default Complaint;
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import Card from "@mui/material/Card";
import Footer from "examples/Footer";
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";

import {
  Container,
  Typography,
  Button,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Feedback() {
  // const [complaintno, setComplaintno] = useState('');
  // const [name, setName] = useState('');
  // const [address, setAddress] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');
  // const [range, setRange] = useState('');
  // const [district, setDistrict] = useState('');
  // const [station, setStation] = useState('');
  // const [review, setReview] = useState('');
  const [value1, setValue1] = useState(2);
  const [value2, setValue2] = useState(2);
  const [hover1, setHover1] = useState(-1);
  const [hover2, setHover2] = useState(-1);
  const [formData, setFormData] = useState({
    complaintno: '',
    username: '',
    address: '',
    email: '',
    review: '',
    range: '',
    district: '',
    station: '',
    phone: '',
    overallExperienceRating: 0,  // or whatever default value you want
    facilitiesRating: 0,  // or whatever default value you want
    remarks: '',  // New remarks field
});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async () => {
    /*console.log("Form Data:", {
      complaintno,
      name,
      address,
      email,
      review,
      range,
      district,
      station,
      phone,
      overallExperienceRating: value1,
      facilitiesRating: value2,
    });
    const formData = new FormData();
    formData.append('complaintno', complaintno);
    formData.append('name', name);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('review', review);
    formData.append('range', range);
    formData.append('district', district);
    formData.append('station', station);
    formData.append('overallExperienceRating', value1); // Use value1 for overall experience rating
    formData.append('facilitiesRating', value2); // Use value2 for facilities rating
  
    const url =  'http://localhost:3001/submit-feedback';
            axios.post(url, formData)
                .then((res) => {
                  console.log({complaintno, name, address, email, phone, value1, value2, review, range, district, station })
                    if (res.data.message) {
                        alert(res.data.message); 
                    }
                })
                .catch((err) => {
                    alert(err);
                    console.log(err);
                })*/
                try {
                  const response = await fetch('http://127.0.0.1:3001/submit-feedback', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                  });
            
                  if (response.status === 201) {
                    console.log('Case details Saved');
                  } else {
                    console.error('Error adding case:', response.statusText);
                  }
                } catch (error) {
                  console.error('Error adding case:', error);
                }
  };
  

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  };

  const labels2 = {
    0.5: 'Not Satisfied',
    1: 'Not Satisfied+',
    1.5: 'Satisfied',
    2: 'Satisfied+',
    2.5: 'Fully Satisfied',
    3: 'Fully Satisfied+',
    3.5: 'Very Satisfied',
    4: 'Very Satisfied+',
    4.5: 'Extremely Satisfied',
    5: 'Extremely Satisfied+',
  };

  const getLabelText2 = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels2[value]}`;
  };

  
  
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
                Feedback Form
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mb={1}>
              <ArgonTypography variant="button" fontWeight="regular" color="text">
                <Typography variant="h4" gutterBottom>
                  Police Complaint Feedback Form
                </Typography>

                {/* Always render the text fields, adjust styles accordingly */}
                <TextField
                  placeholder="Complaint No"
                  name="complaintno"
                  fullWidth
                  margin="normal"
                  //value={complaintno}
                  //onChange={(e) => setComplaintno(e.target.value)}
                  onChange={handleInputChange}
                  style={{ minWidth: '100%', maxWidth: '180%' }}
                />


                <TextField
                  placeholder="Full Name"
                  fullWidth
                  name="username"
                  margin="normal"
                  //value={name}
                  //onChange={(e) => setName(e.target.value)}
                  onChange={handleInputChange}
                  sx={{ minWidth: 200 }}  // Adjust the value as needed
                />
                <TextField
                  placeholder="Address"
                  fullWidth
                  name="address"
                  margin="normal"
                  //value={address}
                  //onChange={(e) => setAddress(e.target.value)}
                  onChange={handleInputChange}
                  sx={{ minWidth: 200 }}
                />
                <TextField
                  placeholder="Email"
                  fullWidth
                  name="email"
                  margin="normal"
                  //value={email}
                  //onChange={(e) => setEmail(e.target.value)}
                  onChange={handleInputChange}
                  sx={{ minWidth: 200 }}
                />
                <TextField
                  placeholder="Phone Number"
                  fullWidth
                  name="phone"
                  margin="normal"
                  //value={phone}
                  //onChange={(e) => setPhone(e.target.value)}
                  onChange={handleInputChange}
                  sx={{ minWidth: 200 }}
                />
                
                {/* Dropdown for Range */}
                <Box display="flex" flexDirection="row" justifyContent="space-between" gap={2}>
                  
                <FormControl fullWidth sx={{ minWidth: 80 }}>
                  <placeholder id="demo-simple-select-label">Choose Police Range</placeholder>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="range"
                    //value={range}
                    placeholder="Police Range"
                    //onChange={(e)=>setRange(e.target.value)}
                    onChange={handleInputChange}
                    sx={{ minWidth: 80 }}
                  >
                    <MenuItem value="AJMER RANGE">AJMER RANGE</MenuItem>
                    <MenuItem value="ATS & SOG RANGE">ATS & SOG RANGE</MenuItem>
                    <MenuItem value="BANSWARA RANGE">BANSWARA RANGE</MenuItem>
                    <MenuItem value="BHARATPUR RANGE">BHARATPUR RANGE</MenuItem>
                    <MenuItem value="BIKANER RANGE">BIKANER RANGE</MenuItem>
                    <MenuItem value="GRP RANGE">GRP RANGE</MenuItem>
                    <MenuItem value="JAIPUR COMMISSIONERATE">JAIPUR COMMISSIONERATE</MenuItem>
                    <MenuItem value="JAIPUR RANGE">JAIPUR RANGE</MenuItem>
                    <MenuItem value="JODHPUR COMMISSIONERATE">JODHPUR COMMISSIONERATE</MenuItem>
                    <MenuItem value="JODHPUR RANGE">JODHPUR RANGE</MenuItem>
                    <MenuItem value="KOTA RANGE">KOTA RANGE</MenuItem>
                    <MenuItem value="PALI RANGE">PALI RANGE</MenuItem>
                    <MenuItem value="SIKAR RANGE">SIKAR RANGE</MenuItem>
                    <MenuItem value="UDAIPUR RANGE">UDAIPUR RANGE</MenuItem>
                    
                  </Select>
                </FormControl>
              

              
                <FormControl fullWidth sx={{ minWidth: 80 }}>
                  <placeholder id="demo-simple-select-label">Choose Police District</placeholder>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="district"
                    //value={district}
                    placeholder="Police District"
                    //onChange={(e)=>setDistrict(e.target.value)}
                    onChange={handleInputChange}
                    sx={{ minWidth: 80 }}
                  >
                    <MenuItem value="AJMER">AJMER</MenuItem>
                    <MenuItem value="ALWAR">ALWAR</MenuItem>
                    <MenuItem value="ANUPGARH">ANUPGARH</MenuItem>
                    <MenuItem value="ATS & SOG">ATS & SOG</MenuItem>
                    <MenuItem value="BALOTRA">BALOTRA</MenuItem>
                    <MenuItem value="BANSWARA">BANSWARA</MenuItem>
                    <MenuItem value="BARAN">BARAN</MenuItem>
                    <MenuItem value="BARMER">BARMER</MenuItem>
                    <MenuItem value="BEAWAR">BEAWAR</MenuItem>
                    <MenuItem value="BHARATPUR">BHARATPUR</MenuItem>
                    <MenuItem value="BHILWARA">BHILWARA</MenuItem>
                    <MenuItem value="BHIWADI">BHIWADI</MenuItem>
                    <MenuItem value="BIKANER">BIKANER</MenuItem>
                    <MenuItem value="BUNDI">BUNDI</MenuItem>
                    <MenuItem value="CHITTORGARH">CHITTORGARH</MenuItem>
                    <MenuItem value="CHURU">CHURU</MenuItem>
                    <MenuItem value="DAUSA">DAUSA</MenuItem>
                    <MenuItem value="DCP CRIME">DCP CRIME</MenuItem>
                    <MenuItem value="DEEG">DEEG</MenuItem>
                    
                  </Select>
                </FormControl>
              

              
                <FormControl fullWidth sx={{ minWidth: 80 }}>
                  <placeholder id="demo-simple-select-label">Choose Police station</placeholder>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="station"
                    //value={station}
                    placeholder="Police Station"
                    //onChange={(e)=>setStation(e.target.value)}
                    onChange={handleInputChange}
                    sx={{ minWidth: 80 }}
                  >
                    <MenuItem value="ADARSH NAGAR">ADARSH NAGAR</MenuItem>
                    <MenuItem value="ALWAR GATE">ALWAR GATE</MenuItem>
                    <MenuItem value="ARIAN">ARIAN</MenuItem>
                    <MenuItem value="BANDER SINDRI">BANDER SINDRI</MenuItem>
                    <MenuItem value="CHRISTIANGANJ">CHRISTIANGANJ</MenuItem>
                    <MenuItem value="CIVIL LINES">CIVIL LINES</MenuItem>
                    <MenuItem value="CLOCK TOWER">CLOCK TOWER</MenuItem>
                    <MenuItem value="CYBER THANA AJMER">CYBER THANA AJMER</MenuItem>
                    <MenuItem value="DARGAH">DARGAH</MenuItem>
                    <MenuItem value="GANDHI NAGAR">GANDHI NAGAR</MenuItem>
                    <MenuItem value="GANJ">GANJ</MenuItem>
                    <MenuItem value="GEGAL">GEGAL</MenuItem>
                    <MenuItem value="KISHANGARH">KISHANGARH</MenuItem>
                    <MenuItem value="KOTWALI AJMER">KOTWALI AJMER</MenuItem>
                    <MenuItem value="MADANGANJ">MADANGANJ</MenuItem>
                    <MenuItem value="MAHILA PS">MAHILA PS</MenuItem>
                    <MenuItem value="MANGLIYAWAS">MANGLIYAWAS</MenuItem>
                    <MenuItem value="NASIRABAD CITY">NASIRABAD CITY</MenuItem>
                    <MenuItem value="NASIRABAD SADAR">NASIRABAD SADAR</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              
              <FormControl fullWidth sx={{ minWidth: 80 }}>
                  <placeholder id="demo-simple-select-label">whether your complaint was heard or not?</placeholder>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="review"
                    //value={review}
                    placeholder="whether your complaint was heard or not?"
                    //onChange={(e)=>setReview(e.target.value)}
                    onChange={handleInputChange}
                    sx={{ minWidth: 80 }}
                  >
                    <MenuItem value="YES">YES</MenuItem>
                    <MenuItem value="NO">NO</MenuItem>
                    
                  </Select>
                </FormControl>

              <Box display="flex" flexDirection="row"  gap={2} sx={{ minwidth: 700,display: 'flex', alignItems: 'center', }}>
                
              <label>How would you rate your overall experience at the police station?</label><br/>&nbsp;&nbsp;&nbsp;
              <Rating
              
                name="overallExperienceRating"
                //value={value1}
                precision={0.5}
                getLabelText={getLabelText}
                /*onChange={(event, newValue) => {
                  setValue1(newValue);
                }}*/
                onChange={handleInputChange}
                onChangeActive={(event, newHover) => {
                  setHover1(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {value1 !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover1 !== -1 ? hover1 : value1]}</Box>
              )}
            </Box>


            <Box display="flex" flexDirection="row"  gap={2} sx={{ minwidth: 700,display: 'flex', alignItems: 'center', }}>
                
              <label>How satisfied are you with the facilities at the police station?</label><br/>&nbsp;&nbsp;&nbsp;
              <Rating
              
                name="facilitiesRating"
                //value={value2}
                precision={0.5}
                getLabelText2={getLabelText2}
                /*onChange={(event, newValue) => {
                  setValue2(newValue);
                }}*/
                onChange={handleInputChange}
                onChangeActive={(event, newHover) => {
                  setHover2(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {value2 !== null && (
                <Box sx={{ ml: 2 }}>{labels2[hover2 !== -1 ? hover2 : value2]}</Box>
              )}
            </Box>
                {/* New remarks text field */}
                <TextField
                  placeholder="Remarks"
                  fullWidth
                  name="remarks"
                  margin="normal"
                  onChange={handleInputChange}
                  sx={{ minWidth: 200 }}
                />

              <Box display="flex" justifyContent="center" mt={3}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
              </Box>                

                
                
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </Card>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Feedback;

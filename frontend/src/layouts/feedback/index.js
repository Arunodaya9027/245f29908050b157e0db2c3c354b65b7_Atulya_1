import React, { useState } from "react";
import TextField from "@mui/material/TextField";
// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import {
  Container,
  Paper,
  Typography,
  Button,
  MobileStepper,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

const questions = [
  'How would you rate your overall experience at the police station?',
  'How satisfied are you with the facilities at the police station?',
  'Did any police Officer Forced You to Change or Manipulate the Complaint?'
  // Add more questions as needed
];

const Feedback = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ratings, setRatings] = useState([]);
  const [supportingDocument, setSupportingDocument] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     axios.get('/api/get-complaints')
//       .then(response => setComplaints(response.data))
//       .catch(error => console.error('Error fetching complaints:', error));
//   }, []);
const languageOptions = {
    en: 'English',
    hi: 'Hindi',
    raj: 'Rajasthani',
  };
  
  const translations = {
    en: {
      formTitle: 'Police Complaint Feedback Form',
      nameLabel: 'Name',
      emailLabel: 'Email',
      submitComplaint: 'Submit Complaint',
      next: 'Next',
      back: 'Back',
      recentComplaints: 'Recent Complaints',
      darkMode: 'Dark Mode',
      switchLanguage: 'Switch Language',
      // Add more translations as needed
    },
    hi: {
      formTitle: 'पुलिस शिकायत प्रतिसाद फ़ॉर्म',
      nameLabel: 'नाम',
      emailLabel: 'ईमेल',
      submitComplaint: 'शिकायत प्रस्तुत करें',
      next: 'अगला',
      back: 'पीछे',
      recentComplaints: 'हाल की शिकायतें',
      darkMode: 'डार्क मोड',
      switchLanguage: 'भाषा बदलें',
      // Add more translations as needed
    },
    raj: {
      formTitle: 'पुलिस शिकायत प्रतिसाद फ़ॉर्म',
      nameLabel: 'नाम',
      emailLabel: 'ईमेल',
      submitComplaint: 'शिकायत प्रस्तुत करें',
      next: 'अगला',
      back: 'पीछे',
      recentComplaints: 'हाल की शिकायतें',
      darkMode: 'डार्क मोड',
      switchLanguage: 'भाषा बदलें',
      // Add more translations as needed
    },
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSupportingDocument(file);
  };

  const handleRatingChange = (value) => {
    const updatedRatings = [...ratings];
    updatedRatings[activeStep] = value;
    setRatings(updatedRatings);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('ratings', JSON.stringify(ratings));
    formData.append('supportingDocument', supportingDocument);

    axios.post('/api/submit-complaint', formData)
      .then(response => {
        console.log(response.data.message);
        axios.get('/api/get-complaints')
          .then(response => setComplaints(response.data))
          .catch(error => console.error('Error fetching complaints:', error));
      })
      .catch(error => console.error('Error submitting complaint:', error));
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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

    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20, background: darkMode ? theme.palette.background.default : '#fff', color: darkMode ? theme.palette.text.primary : '#000' }}>
        <Typography variant="h4" gutterBottom>
          Police Complaint Feedback Form
        </Typography>

        {!isMobile && (
          <>
          
            <TextField
              placeholder="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              placeholder="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        <Typography variant="h6" style={{ marginTop: 20 }} gutterBottom>
          {questions[activeStep]}
        </Typography>

        <FormControl component="fieldset" fullWidth>
          {activeStep < questions.length - 1 ? (
            <Rating
              value={ratings[activeStep] || 0}
              onChange={(event, value) => handleRatingChange(value)}
            />
          ) : (
            <FormControlLabel
              control={<Switch checked={ratings[activeStep] || false} onChange={(event) => handleRatingChange(event.target.checked)} />}
              label="Yes / No"
            />
          )}
        </FormControl>

        {isMobile && (
          <MobileStepper
            variant="dots"
            steps={questions.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === questions.length - 1}>
                Next
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                Back
              </Button>
            }
          />
        )}

        {!isMobile && (
          <input
            type="file"
            accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={activeStep === questions.length - 1 ? handleSubmit : handleNext}
        >
          {activeStep === questions.length - 1 ? 'Submit Complaint' : 'Next'}
        </Button>

        <Typography variant="h5" style={{ marginTop: 30 }} gutterBottom>
          Recent Complaints
        </Typography>

        {complaints.map((c, index) => (
          <div key={index}>
            <Typography variant="body1">{c.name}: {c.complaint}</Typography>
            <hr />
          </div>
        ))}

        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
          label="Dark Mode"
        />
{/* 
        <FormControlLabel
          control={<Switch checked={language === 'es'} onChange={toggleLanguage} />}
          label="Switch Language"
        /> */}
      </Paper>
    </Container>
    </DashboardLayout>
  );
};

export default Feedback;

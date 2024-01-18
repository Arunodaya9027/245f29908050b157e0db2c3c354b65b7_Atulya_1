import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { useState,useEffect } from "react";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import axios from "axios";
// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";

function Default() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get-feedback");
        setFeedbackData(response.data);
        setLoading(false);
        console.log(response)
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: feedbackData.map((data) => data.complaintno),
    datasets: [
      {
        label: "Overall Experience Rating",
        data: feedbackData.map((data) => data.overallExperienceRating),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
      {
        label: "Facilities Rating",
        data: feedbackData.map((data) => data.facilitiesRating),
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Complaint Number",
        },
      },
      y: {
        title: {
          display: true,
          text: "Rating",
        },
        beginAtZero: true,
      },
    },
  };
  

  const { size } = typography;
  
    return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Emergency Number"
              count="112"
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              // percentage={{ color: "success", count: "+55%", text: "since yesterday" }}
            />
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Child Helpline"
              count="1098"
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              // percentage={{ color: "success", count: "+3%", text: "since last week" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Ambulance number"
              count="108"
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              // percentage={{ color: "error", count: "-2%", text: "since last quarter" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Cyber ​​Crime Helpline"
              count="1930"
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              // percentage={{ color: "success", count: "+5%", text: "than last month" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          {/* <Grid item xs={12} lg={7}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <ArgonTypography variant="h5" color="text" fontWeight="bold" mb={3}>
                  Complaint Overview
                </ArgonTypography>
                <Bar data={chartData} options={chartOptions} />
              </div>
            )}
          </Grid> */}
          <Grid item xs={12} lg={5}>
            {/* <Slider /> */}
          </Grid>
        </Grid><br/><br/>
        <Grid container spacing={3} mb={3}>
          {/* <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="Complaint Overview"
              description={
                <ArgonBox display="flex" alignItems="center">
                  <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                  </ArgonBox>
                  <ArgonTypography variant="button" color="text" fontWeight="medium">
                    4% more{" "}
                    <ArgonTypography variant="button" color="text" fontWeight="regular">
                      in 2022
                    </ArgonTypography>
                  </ArgonTypography>
                </ArgonBox>
              }
              chart={gradientLineChartData}
            />
          </Grid> */}
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={7}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <ArgonTypography variant="h5" color="text" fontWeight="bold" mb={3}>
                  Complaint Overview
                </ArgonTypography>
                <Bar data={chartData} options={chartOptions} />
              </div>
            )}
          </Grid>
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        
        
      </ArgonBox>

      
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
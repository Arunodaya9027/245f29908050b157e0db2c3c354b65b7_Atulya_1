import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/displayfeedback/data/projectsTableData";
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import PropTypes from 'prop-types';
import ArgonInput from 'components/ArgonInput';
import Icon from 'assets/theme/components/icon';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const RatingCharts = ({ feedbackData }) => {
  if (!feedbackData || feedbackData.length === 0) {
    return <div>No data available for chart</div>;
  }

  const overallExperienceData = feedbackData.map((feedback) => feedback.overallExperienceRating);
  const facilitiesRatingData = feedbackData.map((feedback) => feedback.facilitiesRating);

  const chartData = {
    labels: feedbackData.map((feedback) => feedback.complaintno),
    datasets: [
      {
        label: 'Overall Experience Rating',
        data: overallExperienceData,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: 'Facilities Rating',
        data: facilitiesRatingData,
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        max: 5,
      },
    },
    tooltips: {
      callbacks: {
        label: (context) => {
          const dataPoint = context.dataset.data[context.dataIndex];
          return `Complaint No: ${dataPoint.x} | Rating: ${context.parsed.y}`;
        },
      },
    },
  };

  return (
    <div className="rating-charts" style={{ width: '50%', margin: '0 auto', height: '150px' }}>
      <h2>Rating Charts</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

RatingCharts.propTypes = {
  feedbackData: PropTypes.arrayOf(
    PropTypes.shape({
      complaintno: PropTypes.number.isRequired,
      overallExperienceRating: PropTypes.number.isRequired,
      facilitiesRating: PropTypes.number.isRequired,
    })
  ).isRequired,
};
function Alert() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [sortedFeedbackData, setSortedFeedbackData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [selectedStationData, setSelectedStationData] = useState();
  const [selectedStation, setSelectedStation] = useState();
  const [detailsData, setDetailsData] = useState();
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
// New state variables for chart
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  const [selectedPoliceStation, setSelectedPoliceStation] = useState(null);

  const filteredFeedbackChart = feedbackData.filter(feedback => feedback.police_station === selectedPoliceStation);

//   const RatingCharts = (e) => {
//     const overallExperienceData = e.map((feedback) => feedback.overallExperienceRating);
//     const facilitiesRatingData = e.map((feedback) => feedback.facilitiesRating);

//     setChartData({
//       labels: e.map((feedback) => feedback.complaintno),
//     datasets: [
//       {
//         label: "Overall Experience Rating",
//         data: e.map((feedback) => feedback.overallExperienceRating),
//         fill: false,
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 2,
//         pointRadius: 3,
//       },
//       {
//         label: "Facilities Rating",
//         data: e.map((feedback) => feedback.facilitiesRating),
//         fill: false,
//         borderColor: "rgba(255,99,132,1)",
//         borderWidth: 2,
//         pointRadius: 3,
//       },
//     ],
//     });

//     setChartOptions({
//       maintainAspectRatio: false,
//       scales: {
//         y: {
//           // beginAtZero: true,
//           max: 5,
//         },
//       },
//     });

//     console.log('chartData:', chartData);
//     console.log('chartOptions:', chartOptions);

//   }

  //pdf
  const generatePDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();
  
    // Set properties for the PDF
    pdf.setProperties({
      title: 'Station Details',
    });
  
    // Add content to the PDF
    pdf.text('Station Details', 20, 20);
    pdf.autoTable({
      head: [['Username', 'Address', 'Email', 'Phone', 'Experience Rating', 'Facilities Rating', 'Compaint was heard', 'Remarks']],
      body: detailsData.map((stationData) => [
        stationData.username || '',
        stationData.address || '',
        stationData.email || '',
        stationData.phone || '',
        stationData.overallExperienceRating === null ? '' : stationData.overallExperienceRating,
        stationData.facilitiesRating === null ? '' : stationData.facilitiesRating,
        stationData.review || '',
        stationData.remarks || '',
      ]),
    });
  
    // Save the PDF
    pdf.save('station_details.pdf');
  };

  
//   const fetchChartData = async (station) => {
//     try {
//       // Implement your logic to fetch chart data for the selected station
//       const response = await fetch(`http://localhost:3001/get-chart-data?station=${station}`);
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }
//       const chartData = await response.json();

//       // Set the chart data and options
//       setChartData(chartData.data);
//       setChartOptions(chartData.options);
//     } catch (error) {
//       console.error('Error fetching chart data:', error);
//     }
//   };

//     // Add this function somewhere in your code, depending on your project structure
//   const fetchChartDataFromDB = async (station) => {
//     try {
//       // Use Mongoose or your preferred database library to fetch the chart data
//       // Replace Feedback with your actual Mongoose model
//       const chartDataFromDB = await Feedback.find({ station });

//       // Process the data as needed before sending it to the client
//       const processedChartData = chartDataFromDB.map((data) => ({
//         complaintno: data.complaintno,
//         overallExperienceRating: data.overallExperienceRating,
//         facilitiesRating: data.facilitiesRating,
//         // Add other properties as needed
//       }));

//       return processedChartData;
//     } catch (error) {
//       throw new Error(`Error fetching chart data from DB: ${error.message}`);
//     }
//   };

  const handleViewClick = async (rowData) => {
    setSelectedPoliceStation(rowData.station);
    console.log(rowData.station);
    setIsModalOpen(true);
    setSelectedRowData(rowData);
    setSelectedStation(rowData.station);
  
    try {
      const response = await fetch(`http://localhost:3001/get-feedback?station=${rowData.station}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const stationData = await response.json();
  
      // Fetch additional details for the selected station
      const detailsResponse = await fetch(`http://localhost:3001/get-station-details?station=${rowData.station}`);
      if (!detailsResponse.ok) {
        throw new Error(`Error: ${detailsResponse.status} ${detailsResponse.statusText}`);
      }
      setDetailsData(await detailsResponse.json());
  
      // Fetch heard property for the selected station
      const heardResponse = await fetch(`http://localhost:3001/get-heard-status?station=${rowData.station}`);
      if (!heardResponse.ok) {
        throw new Error(`Error: ${heardResponse.status} ${heardResponse.statusText}`);
      }
      const heardData = await heardResponse.json();
  
      // Combine the feedback data, additional details, and heard status
      const combinedData = stationData.map((data, index) => ({
        ...data,
        ...detailsData[index],
        heard: heardData[index].heard,
      }));
      console.log(detailsData);
  
      // Set the chart data and options
      // setChartData(combinedData);
      // setChartOptions(chartOptions);
      RatingCharts(filteredFeedbackChart);
    } catch (error) {
      console.error('Error fetching station data:', error);
    }
  };
    
    
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFeedbackData = sortedFeedbackData.filter((feedback) => {
    const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive search

    return (
      searchRegex.test(feedback.range) ||
      searchRegex.test(feedback.district) ||
      searchRegex.test(feedback.station)
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-feedback');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
  
        // Filter feedback data where the review is "NO"
        const filteredData = data.filter(feedback => feedback.review === 'NO');
  
        // Update state with the filtered data
        setFeedbackData(filteredData);
        setSortedFeedbackData(filteredData); // Initialize sorted data with the processed data
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };
    fetchData();
  }, []);
  const handleSort = (column) => {
    const isAscending = sortOrder.column === column ? !sortOrder.ascending : true;

    const sortedData = [...sortedFeedbackData].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        return isAscending ? valueA - valueB : valueB - valueA;
      }
    });

    setSortedFeedbackData(sortedData);
    setSortOrder({ column, ascending: isAscending });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <ArgonTypography variant="h6">Feedback Info</ArgonTypography>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <ArgonInput
                type="text"
                placeholder="Search station"
                value={searchTerm}
                onChange={handleSearch}
                style={{ margin: '10px', padding: '5px', width: '150px' }}
              />
              <SearchIcon style={{ position: 'absolute', right: '20px', cursor: 'pointer' }} />
            </div>
          </ArgonBox>
          <table className="feedback-table">
            <thead>
              <tr>
              <th className="sortable" onClick={() => handleSort('range')} style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>
                  Name {sortOrder.column === 'range' && (sortOrder.ascending ? '⬆' : '⬇')}
                </th>
                <th className="sortable" onClick={() => handleSort('range')} style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>
                  Range {sortOrder.column === 'range' && (sortOrder.ascending ? '⬆' : '⬇')}
                </th>
                <th className="sortable" onClick={() => handleSort('district')} style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>
                  District {sortOrder.column === 'district' && (sortOrder.ascending ? '⬆' : '⬇')}
                </th>
                <th className="sortable" onClick={() => handleSort('station')} style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>
                  Station {sortOrder.column === 'station' && (sortOrder.ascending ? '⬆' : '⬇')}
                </th>
                <th className="sortable" onClick={() => handleSort('overallExperienceRating')} style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>
                  Overall Experience Rating {sortOrder.column === 'overallExperienceRating' && (sortOrder.ascending ? '⬆' : '⬇')}
                </th>
                <th className="sortable" onClick={() => handleSort('facilitiesRating')} style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>
                  Facilities Rating {sortOrder.column === 'facilitiesRating' && (sortOrder.ascending ? '⬆' : '⬇')}
                </th>
                {/* <th className="sortable" onClick={() => handleSort('review')} style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>
                  Action {sortOrder.column === 'review' && (sortOrder.ascending ? '⬆' : '⬇')}
                </th> */}
              </tr>
            </thead>
            <tbody>
            {filteredFeedbackData.map((feedback, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>{feedback.name}</td>
                  <td style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '15px', paddingBottom: '15px' }}>{feedback.range}</td>
                  <td style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '25px', paddingBottom: '15px' }}>{feedback.district}</td>
                  <td style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '25px', paddingBottom: '15px' }}>{feedback.station}</td>
                  <td style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '25px', paddingBottom: '15px' }}>
                    {feedback.overallExperienceRating === null ? "" : feedback.overallExperienceRating.toFixed(2)}
                    {feedback.overallExperienceRating !== null && feedback.overallExperienceRating < 2.5 ? (
                      <span style={{ color: '#FF6347', fontWeight: 'bold' }}> 🡇 </span>
                    ) : (
                      <span style={{ color: '#008000', fontWeight: 'bold' }}> 🡅 </span>
                    )}
                  </td>
                  <td style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '25px', paddingBottom: '15px' }}>
                    {feedback.facilitiesRating === null ? "" : feedback.facilitiesRating.toFixed(2)}
                    {feedback.facilitiesRating !== null && feedback.facilitiesRating < 2.5 ? (
                      <span style={{ color: '#FF6347', fontWeight: 'bold' }}> 🡇 </span>
                    ) : (
                      <span style={{ color: '#008000', fontWeight: 'bold' }}> 🡅 </span>
                    )}
                  </td>

                  <td style={{ textAlign: 'left', fontSize: '15px', paddingLeft: '25px', paddingBottom: '15px' }}>
                    {/* <Button variant="contained" onClick={() => handleViewClick(feedback)} >View</Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </ArgonBox>
      <Footer />

    </DashboardLayout>
  );
}

  // Define PropTypes for your component
Alert.propTypes = {
  feedbackData: PropTypes.arrayOf(PropTypes.shape({
    complaintno: PropTypes.number.isRequired,
    overallExperienceRating: PropTypes.number.isRequired,
    facilitiesRating: PropTypes.number.isRequired,
    // Add other properties as needed
  })).isRequired,
};

// RatingCharts.propTypes = {
//   feedbackData: PropTypes.arrayOf(PropTypes.shape({
//     complaintno: PropTypes.number.isRequired,
//     overallExperienceRating: PropTypes.number.isRequired,
//     facilitiesRating: PropTypes.number.isRequired,
//     // Add other properties as needed
//   })).isRequired,
// };


// Add 'heard' to the PropTypes
Alert.propTypes = {
  feedbackData: PropTypes.arrayOf(PropTypes.shape({
    complaintno: PropTypes.number.isRequired,
    overallExperienceRating: PropTypes.number.isRequired,
    facilitiesRating: PropTypes.number.isRequired,
    heard: PropTypes.bool.isRequired, // Add 'heard' property
    // Add other properties as needed
  })).isRequired,
};

RatingCharts.propTypes = {
  feedbackData: PropTypes.arrayOf(
    PropTypes.shape({
      complaintno: PropTypes.number.isRequired,
      overallExperienceRating: PropTypes.number.isRequired,
      facilitiesRating: PropTypes.number.isRequired,
      // Add other properties as needed
    })
  ).isRequired,
};
export default Alert;

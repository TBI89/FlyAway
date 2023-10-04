import 'chart.js/auto';
import { ChartOptions } from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../../Redux/AuthState';
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import "./VacationReports.css";
import { NavLink } from 'react-router-dom';

function VacationReports(): JSX.Element {

    // State for the bar chart:
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Followers',
                data: [],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    });

    const navigate = useNavigate(); // Use to redirect unauthorized users.

    useEffect(() => {

        const token = authStore.getState().token;
        if (!token) { // Check if the user has a token.
            notifyService.error('Please login first.');
            navigate('/login'); // if not, redirect him to login component.
            return;
        }

        const role = authStore.getState().user.roleId;
        if (role === 2) { // Check if the user is an admin.
            notifyService.error("You don't have access to that page.");
            navigate('/home'); // If not, redirect him to home component.
            return;
        }

        // Fetch all vacations & and display only destination + followersCount props on the chart:
        vacationsService
            .getAllVacations()
            .then(vacations => {
                const destinationNames = vacations.map(vacation => vacation.destination);
                const followersCounts = vacations.map(vacation => vacation.followersCount);

                // Update the chart data state with fetched data:
                setChartData(prevChartData => ({
                    ...prevChartData,
                    labels: destinationNames,
                    datasets: [
                        {
                            ...prevChartData.datasets[0],
                            data: followersCounts,
                        },
                    ],
                }));
            })
            .catch(err => notifyService.error(err));
    }, []);

    // Handle file download:
    function downloadCsv() {
        const rows = [];
        rows.push('Destination,Followers'); // Headers

        // Iterate through chartData labels and datasets to create CSV rows:
        chartData.labels.forEach((label, index) => {
            const row = `${label},${chartData.datasets[0].data[index]}`;
            rows.push(row);
        });

        const csvContent = rows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' }); // Blob = binary large obj (that contains the csv data).
        const url = window.URL.createObjectURL(blob); // Create url for the blob
        const downloadLink = document.createElement('a');

        // Set download link props:
        downloadLink.href = url;
        downloadLink.download = 'vacation_reports.csv';

        document.body.appendChild(downloadLink); // Append download link to the DOM's body.
        downloadLink.click(); // Trigger the download operation on click.
        window.URL.revokeObjectURL(url); // Revoke blob (free up resources).
        document.body.removeChild(downloadLink); // Remove download link from the DOM's body.
    }

    // Chart options for configuration:
    const options: ChartOptions<'bar'> = {
        scales: {
            x: {
                type: 'category',
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="VacationReports">


            {/* Navigate back to the vacations page: */}
            <NavLink to={'/vacations-admin'}>Back to Vacations</NavLink>

            {/* Download to CSV file: */}
            <button className='DownloadButton' onClick={downloadCsv}>Download CSV</button>

            {/* Bar chart component displaying followers count for each vacation: */}
            <Bar data={chartData} options={options} />

        </div>
    );
}

export default VacationReports;

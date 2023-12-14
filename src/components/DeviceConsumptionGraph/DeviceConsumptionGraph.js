import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class DeviceConsumptionGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const alpha = 0.6;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  render() {
    const { labels, data } = this.props;

    const backgroundColors = Array.from({ length: labels.length }, () =>
      this.generateRandomColor()
    );

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: backgroundColors,
        },
      ],
    };

    return (
      <div>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Energy Consumption Across Enrolled Devices (in kWh)',
                fontSize: 20,
              },
            },
          }}
        />
      </div>
    );
  }
}

export default DeviceConsumptionGraph;
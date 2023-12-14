import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

class HourlyPriceGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {labels, prices} = this.props;

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Hourly Price Change',
          data: prices,
          backgroundColor: 'rgba(300,50,50,0.8)',
          borderWidth: 1,
        },
      ],
    }

    return (
      <div>
        <Line
          data={chartData}
          options={{
            title: {
              display: true,
              text: 'Histogram Chart',
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Hours',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Per kWh Rate ($)',
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = 'Per kWh';
                    const value = context.parsed.y || 0;

                    return `${label}: $${value}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    );
  }
}

export default HourlyPriceGraph;
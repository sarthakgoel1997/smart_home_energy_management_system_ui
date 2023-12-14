import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

class EnergyCostsGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {labels, energyCosts} = this.props;

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Energy Costs Across Service Locations',
          data: energyCosts,
          backgroundColor: 'rgba(260,30,30,0.6)',
          borderWidth: 1,
        },
      ],
    }

    return (
      <div>
        <Bar
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
                  text: 'Service Locations',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Energy Costs ($)',
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = 'Energy Cost';
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

export default EnergyCostsGraph;
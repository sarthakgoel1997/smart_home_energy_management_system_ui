import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

class EnergyConsumptionChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {labels, energyConsumptions, averageConsumptions} = this.props;

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Energy Consumptions Across Service Locations',
          data: energyConsumptions,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderWidth: 1,
        },

        {
          label: 'Average Energy Consumptions Across Similar Locations',
          data: averageConsumptions,
          backgroundColor: 'rgba(10,200,100,0.6)',
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
                  text: 'Energy Consumptions (kWh)',
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = 'Energy Consumption';
                    const value = context.parsed.y || 0;

                    if (context.datasetIndex === 1) {
                      // Information for the second dataset
                      return `Average Consumption: ${value} kWh`;
                    }

                    return `${label}: ${value} kWh`;
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

export default EnergyConsumptionChart;
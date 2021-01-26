import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

class ReferralsReports extends React.Component {
  state = {
    options: {
      chart: {
        stacked: true,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          columnWidth: "10%"
        }
      },
      colors: [this.props.primary, this.props.danger],
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: this.props.labelColor,
        padding: {
          left: 0,
          right: 0
        }
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        offsetX: 0,
        fontSize: "14px",
        markers: {
          radius: 50,
          width: 10,
          height: 10
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: this.props.strokeColor
          }
        },
        axisTicks: {
          show: false
        },
        categories: [
          "Янв",
          "Фев",
          "Мар",
          "Апр",
          "Май",
          "Июн",
          "Июл",
          "Авг",
          "Сен",
          "Окт",
          "Ноя",
          "Дек"
        ],
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            color: this.props.strokeColor
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    },
    series: [
      {
        name: "Доходы",
        data: [10, 14, 23, 12, 4, 6, 3, 8, 11, 31, 4, 5]
      }
    ]
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Количество рефералов</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={290}
            id="client-retention-chart"
          />
        </CardBody>
      </Card>
    )
  }
}
export default ReferralsReports

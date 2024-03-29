import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"
import { MoreVertical } from "react-feather"

class Sales extends React.Component {
  state = {
    options: {
      chart: {
        dropShadow: {
          enabled: true,
          blur: 8,
          left: 1,
          top: 1,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 0
      },
      colors: [this.props.primary, this.props.info],
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: [
              this.props.strokeColor,
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent"
            ],
            connectorColors: "transparent"
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#9f8ed7", this.props.infoLight],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0
      },
      legend: {
        show: false
      },
      labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"],
      dataLabels: {
        style: {
          colors: [
            this.props.strokeColor,
            this.props.strokeColor,
            this.props.strokeColor,
            this.props.strokeColor,
            this.props.strokeColor,
            this.props.strokeColor
          ]
        }
      },
      yaxis: {
        show: false
      },
      grid: {
        show: false
      }
    },
    series: [
      {
        name: "Бонусы за депозит",
        data: [0, 0, 0, 0, 0, 0]
      },
      {
        name: "Бонусы за рефералов",
        data: [0, 0, 0, 0, 0, 0]
      }
    ]
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <div className="title">
            <CardTitle>Бонусы</CardTitle>
            <p className="text-muted mb-0">За полгода</p>
          </div>
          <MoreVertical className="cursor-pointer" size={20} />
        </CardHeader>
        <CardBody>
          <div className="item-info d-inline-block mr-2">
            <div
              className="bg-primary"
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "5px"
              }}
            />
            <span>Бонусы за депозит</span>
          </div>
          <div className="item-info d-inline-block">
            <div
              className="bg-info"
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "5px"
              }}
            />
            <span>Бонусы за рефералов</span>
          </div>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="radar"
            height={400}
          />
        </CardBody>
      </Card>
    )
  }
}
export default Sales

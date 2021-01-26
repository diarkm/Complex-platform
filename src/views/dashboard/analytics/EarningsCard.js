import React from "react"
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap"

import Chart from "react-apexcharts"

class EarningsCard extends React.Component{
    state = {
        options: {
          chart: {
           
          },
          plotOptions: {
            radialBar: {
              size: 150,
              offsetY: 20,
              startAngle: -150,
              endAngle: 150,
              hollow: {
                size: "65%"
              },
              track: {
                background: this.props.white,
                strokeWidth: "100%"
              },
              dataLabels: {
                value: {
                  offsetY: 30,
                  color: "#99a2ac",
                  fontSize: "2rem"
                }
              }
            }
          },
          colors: [this.props.danger],
          fill: {
            type: "gradient",
            gradient: {
              // enabled: true,
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: [this.props.primary],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            dashArray: 8
          },
          labels: ["В этом месяце больше продаж на:"]
        },
        series: [83]
    }

    render(){
      return (
        <Card>
            <CardHeader>
                <CardTitle>Доходы</CardTitle>
            </CardHeader>
            <CardBody className="text-left">
                <Row>
                    <Col lg="4" md="3" sm="12">
                        <div className="font-small-2">В этом месяце</div>
                        <h5 className="mb-1">$4055.56</h5>
                        <p className="card-text text-muted font-small-2">
                            <span className="font-weight-bolder">68.2%</span><span> больше чем в прошлом месяце.</span>
                        </p>
                    </Col>
                    <Col lg="8" md="9" sm="12">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="radialBar"
                            height={350}
                            className="support-tracker-card"
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
      );
    }
  };

  export default EarningsCard;
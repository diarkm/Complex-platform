import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"

import { FormattedMessage, useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}

class Revenue extends React.Component {
  constructor(props){
    super(props);
    this._isMounted = false;
  }
  state = {
    options: {
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        }
      },
      stroke: {
        curve: "smooth",
        dashArray: [0, 8],
        width: [4, 2]
      },
      grid: {
        borderColor: this.props.labelColor
      },
      legend: {
        show: false
      },
      colors: [this.props.dangerLight, this.props.strokeColor],

      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          inverseColors: false,
          gradientToColors: [this.props.primary, this.props.strokeColor],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 5
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
        categories: ["01", "05", "09", "13", "17", "21", "26", "31"],
        axisBorder: {
          show: false
        },
        tickPlacement: "on"
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            color: this.props.strokeColor
          },
          formatter: val => {
            return val > 999 ? (val / 1000).toFixed(1) + "k" : val
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    },
    series: [
      {
        name: "В этом месяце",
        data: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: "В прошлом месяце",
        data: [0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  }

  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted) {
      this.setState((state) => {
        state.series[0].name = this.props.intl.formatMessage({ id: "В этом месяце" });
        state.series[1].name = this.props.intl.formatMessage({ id: "В прошлом месяце" });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle><FormattedMessage id="Заработано"/></CardTitle>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-start mb-1">
            <div className="mr-2">
              <p className="mb-50 text-bold-600"><FormattedMessage id="В этом месяце"/></p>
              <h2 className="text-bold-400">
                <span className="text-success">0$</span>
              </h2>
            </div>
            <div>
              <p className="mb-50 text-bold-600"><FormattedMessage id="В прошлом месяце"/></p>
              <h2 className="text-bold-400">
                <span>0$</span>
              </h2>
            </div>
          </div>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={260}
          />
        </CardBody>
      </Card>
    )
  }
}
export default withLocale(Revenue)

import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import Chart from "react-apexcharts";
import { FormattedMessage, useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}

class ClientRetention extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options: {
        chart: {
          stacked: true,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: "10%",
          },
        },
        colors: [this.props.primary, this.props.danger],
        dataLabels: {
          enabled: false,
        },
        grid: {
          borderColor: this.props.labelColor,
          padding: {
            left: 0,
            right: 0,
          },
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
            height: 10,
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: this.props.strokeColor,
            },
          },
          axisTicks: {
            show: false,
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
            "Дек",
          ],
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          tickAmount: 5,
          labels: {
            style: {
              color: this.props.strokeColor,
            },
          },
        },
        tooltip: {
          x: { show: false },
        },
      },
      series: [
        {
          name: "Доходы",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Расходы",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };
    this.state.series[0].name = this.props.intl.formatMessage({ id: "Доходы" });
    this.state.series[1].name = this.props.intl.formatMessage({id: 'Расходы'});
    this.state.options.xaxis.categories[1] = this.props.intl.formatMessage({id: 'Фев'});
    this.state.options.xaxis.categories[2] = this.props.intl.formatMessage({id: 'Мар'});
    this.state.options.xaxis.categories[3] = this.props.intl.formatMessage({id: 'Апр'});
    this.state.options.xaxis.categories[4] = this.props.intl.formatMessage({id: 'Май'});
    this.state.options.xaxis.categories[5] = this.props.intl.formatMessage({id: 'Июн'});
    this.state.options.xaxis.categories[6] = this.props.intl.formatMessage({id: 'Июл'});
    this.state.options.xaxis.categories[7] = this.props.intl.formatMessage({id: 'Авг'});
    this.state.options.xaxis.categories[8] = this.props.intl.formatMessage({id: 'Сен'});
    this.state.options.xaxis.categories[9] = this.props.intl.formatMessage({id: 'Окт'});
    this.state.options.xaxis.categories[10] = this.props.intl.formatMessage({id: 'Ноя'});
    this.state.options.xaxis.categories[11] = this.props.intl.formatMessage({id: 'Дек'});
    this.state.options.xaxis.categories[0] = this.props.intl.formatMessage({id: 'Янв'});
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <FormattedMessage id="Отчеты за год" />
          </CardTitle>
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
    );
  }
}

export default withLocale(ClientRetention);

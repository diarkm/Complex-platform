import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
} from "reactstrap";
import DataTable, { createTheme } from "react-data-table-component";
import { Search } from "react-feather";
import UserDataService from "../../../api/user-data-service";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FormattedMessage, useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}
createTheme("dark-giq", {
  background: {
    default: "transparent",
  },
});

const CustomHeader = (props) => {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={(e) => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  );
};

function getColor(stat) {
  if (stat.status === "пополнение") {
    return "success";
  } else if (stat.status === "в обработке") {
    return "warning";
  } else {
    return "primary";
  }
}
class DataTableOrders extends React.Component {
  state = {
    columns: [
      {
        name: "ID транзакции",
        selector: "id",
        sortable: true,
        sortFunction: (a, b) => {
          return b.id - a.id;
        },
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.id}</p>
        ),
      },
      {
        name: "Дата",
        selector: "created_at",
        sortable: true,
        sortFunction: (a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        },
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">
            {row.created_at.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
          </p>
        ),
      },
      {
        name: "Сумма",
        selector: "value",
        sortFunction: (a, b) => {
          return b.value - a.value;
        },
        sortable: true,
        cell: (row) => <p className="text-bold-500 mb-0">{row.value}</p>,
      },
      {
        name: "Статус ID",
        selector: "status",
        sortable: true,
        sortFunction: (a, b) => {
          return a.status.id - b.status.id;
        },
        cell: (row) => (
          <Badge color={getColor(row)} pill>
            {row.status.name}
          </Badge>
        ),
      },
    ],
    data: null,
    filteredData: [],
    value: "",
    page: 1,
    pages: 0,
  };

  constructor(props) {
    super(props);
    this.userDataService = new UserDataService();
    this._isMounted = false;
  }

  componentDidMount() {
    this.getTransactions();
    this._isMounted = true;
    if (this._isMounted) {
      this.setState((state) => {
        state.columns[0].name = this.props.intl.formatMessage({
          id: "ID транзакции",
        });
        state.columns[1].name = this.props.intl.formatMessage({ id: "Дата" });
        state.columns[2].name = this.props.intl.formatMessage({ id: "Сумма" });
        state.columns[3].name = this.props.intl.formatMessage({
          id: "Статус ID",
        });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getTransactions() {
    this.userDataService
      .getTransactions()
      .then((res) => {
        this.setState({ data: res.data.collection });
        this.setState({ pages: res.data.pages });
      })
      .catch((err) => console.log(err));
  }

  handleFilter = (e) => {
    let value = e.target.value;
    let data = this.state.data;
    let filteredData = this.state.filteredData;
    this.setState({ value });

    if (value.length && data) {
      filteredData = data.filter((item) => {
        let startsWithCondition =
          item.value.toLowerCase().startsWith(value.toLowerCase()) ||
          item.created_at
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.id.toString().toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.name.toLowerCase().startsWith(value.toLowerCase());
        let includesCondition =
          item.value.toLowerCase().includes(value.toLowerCase()) ||
          item.created_at
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.id.toString().toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.name.toLowerCase().startsWith(value.toLowerCase());

        if (startsWithCondition) {
          return startsWithCondition;
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition;
        } else return null;
      });
      this.setState({ filteredData });
    }
  };

  render() {
    let { data, columns, value, filteredData } = this.state;
    return (
      <Card>
        <SkeletonTheme color="#283046" highlightColor="#3F4860">
          <CardHeader>
            <CardTitle>
              <FormattedMessage id="История транзакций" />
            </CardTitle>
          </CardHeader>
          <CardBody className="rdt_Wrapper">
            {data ? (
              <DataTable
                className="dataTable-custom"
                data={value.length ? filteredData : data}
                columns={columns}
                noHeader
                pagination
                noDataComponent={
                  <h4>
                    <FormattedMessage id="У вас нет заказов" />
                  </h4>
                }
                onChangePage={() => {}}
                paginationComponentOptions={{
                  rowsPerPageText: this.props.intl.formatMessage({
                    id: "Строк на странице:",
                  }),
                  rangeSeparatorText: this.props.intl.formatMessage({
                    id: "из",
                  }),
                }}
                subHeader
                theme="dark-giq"
                onSort={(c, dir) => console.log(c + " " + dir)}
                subHeaderComponent={
                  <CustomHeader
                    value={value}
                    handleFilter={(e) => this.handleFilter(e)}
                  />
                }
              />
            ) : (
              <Skeleton height={35} count={10} />
            )}
          </CardBody>
        </SkeletonTheme>
      </Card>
    );
  }
}

export default withLocale(DataTableOrders);

import React from "react"
import { Card, CardBody, Progress, Button } from "reactstrap"
import { ChevronsRight } from "react-feather"
import { history } from "../../../../history"

class Funds extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <h1 className="mb-0">
            <sup className="font-medium-3 mr-50">$</sup>
            23,597
          </h1>
          <small>
            <span className="text-muted">Мой кошелек: </span>$20,065
          </small>
          <h5 className="mt-1">
            <span className="text-success">+5.2% ($956)</span>
          </h5>
          <Button.Ripple
            block
            color="primary"
            className="w-100 box-shadow-1 mt-2"
            onClick={() => history.push("/buyPackages")}
          >
            Пополнить счет <ChevronsRight size={15} />
          </Button.Ripple>
          <hr className="my-2" />
          <small>Заработано: $56,156</small>
          <Progress className="mt-1 mb-2" color="success" value="100" />

          <small>В заморозке: $16,156</small>
          <Progress className="mt-1" color="warning" value="25" />
        </CardBody>
      </Card>
    )
  }
}
export default Funds

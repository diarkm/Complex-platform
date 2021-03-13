import React from "react"
import { Card, CardBody } from "reactstrap"
import { Award } from "react-feather"

import decorLeft from "../../../assets/img/elements/decore-left.png"
import decorRight from "../../../assets/img/elements/decore-right.png"

class SalesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }
  render() {
    return (
      <Card className="bg-analytics text-white sales-card">
        <CardBody className="text-center">
          <img src={decorLeft} alt="card-img-left" className="img-left" />
          <img src={decorRight} alt="card-img-right" className="img-right" />
          <div className="avatar avatar-xl bg-primary shadow avatar-dashboard mt-0">
            <div className="avatar-content">
              <Award className="text-white" size={28} />
            </div>
          </div>
          <div className="award-info text-center">
            <h1 className="mb-2 text-white">Привет, 🎉 {this.props.name}</h1>
            <p className="m-auto mb-0 w-75">
              Добро пожаловать в систему GIQ GROUP!
            </p>
          </div>
        </CardBody>
      </Card>
    )
  }
}
export default SalesCard

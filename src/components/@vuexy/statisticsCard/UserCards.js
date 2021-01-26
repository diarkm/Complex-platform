import React from "react"
import { Card, CardBody } from "reactstrap"

class UserCards extends React.Component {
  render() {
    return (
      <Card>
        <CardBody
          className={`${this.props.className ? this.props.className : "stats-card-body"} d-flex justify-content-left align-items-center
           ${!this.props.hideChart ? "pb-0" : "pb-2"} pt-2`}
        >
        <div
            className={`avatar mr-2`}
        >
            <img width='45' height='45' src={this.props.icon} />
        </div>
        <div className="title-section">
            <h4 className="text-bold-600 mb-25">{this.props.stat}</h4>
            <p className="mb-0">{this.props.statTitle}</p>
        </div>
        </CardBody>
      </Card>
    )
  }
}
export default UserCards

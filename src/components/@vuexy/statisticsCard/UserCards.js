import React from "react"
import { Card, CardBody } from "reactstrap"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

class UserCards extends React.Component {
  render() {
    return (
      <Card>
        <CardBody
          className={`${this.props.className ? this.props.className : "stats-card-body"} d-flex justify-content-left align-items-center
           ${!this.props.hideChart ? "pb-0" : "pb-2"} pt-2`}
        >
        <div className={`avatar mr-2`} style={{height:45,width:45,overflow:"hidden"}}>
          {this.props.icon ? <img style={{borderRadius:0}} src={this.props.icon} /> : <Skeleton circle={true} width={45} height={45}/>}
            
        </div>
        <div className="title-section">
            <h4 className="text-bold-600 mb-25">{this.props.stat ? this.props.stat : <Skeleton/>}</h4>
            <p className="mb-0">{this.props.statTitle ? this.props.statTitle : <Skeleton/>}</p>
        </div>
        </CardBody>
      </Card>
    )
  }
}
export default UserCards

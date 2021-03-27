import React from "react"
import {Button, Card, CardBody, Col, Input, Row} from "reactstrap"
import UserDataService from "../../../api/user-data-service"
import img from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


function onCopyRef(login) {
  navigator.clipboard.writeText(`https://cabinet.giq-group.com/register/${login}` );
}

class ReferralLink extends React.Component {

  state = {
    referral: {
      id: 0
    }
  }

  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    this.userDataService.getUserData()
      .then(res => {
        console.log('res.user', res.user);
        this.setState({user: res.user})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Card>
        <SkeletonTheme color="#283046" highlightColor="#3F4860">
          <CardBody className="m-3">
            <div className="text-center">
              <h4>Ваша ссылка для приглашения</h4>
              <p>Скопируйте ссылку и получайте бонусы за приглашенных рефералов!</p>
              <Row className="justify-align-center">
                <Col lg="10" md="10" sm="12">
                  {this.state.user ? <Input type="text"
                        id="basicInput"
                        value={this.state.user ? `https://cabinet.giq-group.com/register/${this.state.user.login}` : ''}
                        disabled /> : <Skeleton height={35}/>}

                </Col>
                <Col lg="2" md="2" sm="12">
                  <Button.Ripple color="primary" onClick={onCopyRef(this.state?.user?.login)}>Скопировать</Button.Ripple>
                </Col>
              </Row>
            </div>
          </CardBody>
        </SkeletonTheme>
      </Card>
    )
  }
}

export default ReferralLink

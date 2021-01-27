import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import ReferralLink from "../../ui-elements/cards/ReferralLink"
import BuyPack from "../../ui-elements/cards/buyPack"

class ReferralsPage extends React.Component {

    render(){
        return (
        <React.Fragment>
            <Row>
                <Col>
                    <BuyPack />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ReferralLink />
                </Col>
            </Row>
        </React.Fragment>
    )}
}

export default ReferralsPage
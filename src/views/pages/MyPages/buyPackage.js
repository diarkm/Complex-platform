import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import ReferralLink from "../../ui-elements/cards/ReferralLink"
import BuyPack from "../../ui-elements/cards/buyPack"
import { ContextLayout } from "../../../utility/context/Layout"
import "rc-slider/assets/index.css"

class ReferralsPage extends React.Component {

    render(){
        return (
        <React.Fragment>
            <ContextLayout.Consumer>
            {context => (
                <Row>
                    <Col lg="12" md="12" sm="12">
                        <BuyPack rtl={context.state.direction}/>
                    </Col>
                    <Col lg="12" md="12" sm="12">
                        <ReferralLink />
                    </Col>
                </Row>
            )}
            </ContextLayout.Consumer>
        </React.Fragment>
    )}
}

export default ReferralsPage
import React, { useState } from "react"
import { Card, CardBody, Progress, Button } from "reactstrap"
import { ChevronsRight } from "react-feather"
import { history } from "../../../../history"
import UserDataService from "../../../../api/user-data-service";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FormattedMessage } from "react-intl";

const Funds = () => {
  const [balance, setbalance] = useState(0);
  const [isResp, setResp] = useState(0);

  let UserAPI = new UserDataService()

  // Баланс
  if (balance === 0) {
    UserAPI.getUserData()
      .then(response => {
        setbalance(response.balance)
        setResp(true)
      })
  }

  return (
      <Card>
        <CardBody>
          <SkeletonTheme color="#283046" highlightColor="#3F4860">
            <h1 className="mb-0">
              {isResp ? balance : <Skeleton width={100}/>}$
            </h1>
            <small>
              <span className="text-muted"><FormattedMessage id="Мой кошелек"/>: </span>{isResp ? balance + "$" : <Skeleton width={60}/>}
            </small>
            <h5 className="mt-1">
              <span className="text-success">+0% (0$)</span>
            </h5>
            <Button.Ripple
              block
              color="primary"
              className="w-100 box-shadow-1 mt-2"
              onClick={() => history.push("/buyPackages")}
            >
              <FormattedMessage id="Пополнить счет"/> <ChevronsRight size={15} />
            </Button.Ripple>
            <hr className="my-2" />
            <small><FormattedMessage id="Заработано"/>: {isResp ? balance + "$" : <Skeleton width={60}/>}</small>
            <Progress className="mt-1 mb-2" color="success" value="100" />

            <small><FormattedMessage id="В заморозке"/>: 0$</small>
            <Progress className="mt-1" color="warning" value="0" />
          </SkeletonTheme>
        </CardBody>
      </Card>
  )
}

export default Funds

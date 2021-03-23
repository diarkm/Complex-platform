import React, { useState } from "react"
import { Card, CardBody, Progress, Button } from "reactstrap"
import { ChevronsRight } from "react-feather"
import { history } from "../../../../history"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import UserDataService from "../../../../api/user-data-service";

const FundsWallet = () => {
  const [balance, setbalance] = useState(0)
  const [isResp, setResp] = useState(0);
  const [deposits, setdeposits] = useState([])
  const [depositsloaded, setdepositsloaded] = useState(false)

  let UserAPI = new UserDataService()

  // Баланс
  if (balance === 0) {
    UserAPI.getUserData()
      .then(response => {
        setbalance(response.balance)
        setResp(true)
      })
  }

  // Депозиты
  if(!deposits.length && !depositsloaded) {
    UserAPI.getDeposits()
      .then(response => {
        setdeposits(response.deposits.collection)
        setdepositsloaded(true)
      })
  }

  return (
    <Card>
      <SkeletonTheme color="#283046" highlightColor="#3F4860">
        <CardBody>
          <h1 className="mb-0">
            {isResp ? balance : <Skeleton width={100}/>}$
          </h1>
          <small>
            <span className="text-muted">Мой кошелек: </span>{isResp ? balance + "$" : <Skeleton width={60}/>}
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
            Пополнить счет <ChevronsRight size={15} />
          </Button.Ripple>
          <hr className="my-2" />
          <small>Заработано: {isResp ? balance + "$" : <Skeleton width={60}/>}</small>
          <Progress className="mt-1 mb-2" color="success" value="100" />

          <small>В заморозке: 0$</small>
          <Progress className="mt-1" color="warning" value="0" />
          <hr className="my-2" />
          <h2>Мои депозиты</h2>
          <div>
            <hr className="my-1" />
            <div className="d-flex justify-content-between">
              <small>Сумма</small>
              <small>Срок депозита</small>
            </div>
            <hr className="my-1" />
            {deposits.length ? deposits.map((deposit, i) => {

              if(parseInt(deposit.value) <= 0)
                return ''

              let $date = new Date(deposit.created_at).setYear(
                new Date().getFullYear()+1
              )
              // Deposit Founds Wallet
              $date = new Date($date).toLocaleDateString()

              return (
                <React.Fragment key={i}>
                  <div className="d-flex justify-content-between">
                    <p className="text-success">{deposit.value}$</p>
                    <p>{$date}</p>
                  </div>
                  <hr className=" mt-0 mb-1" />
                </React.Fragment>
              )
            }) : <Skeleton count={3}/>}
          </div>
        </CardBody>
      </SkeletonTheme>
    </Card>
  )
}

export default FundsWallet

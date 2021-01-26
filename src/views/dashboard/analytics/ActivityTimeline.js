import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import { Plus, AlertCircle, Check, UserCheck, DollarSign } from "react-feather"

class ActivityTimeline extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Уведомления</CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="activity-timeline timeline-left list-unstyled">
            <li>
              <div className="timeline-icon bg-primary">
                <Plus size={16} />
              </div>
              <div className="timeline-info">
                <p className="font-weight-bold mb-0">Вы достигли нового статуса!</p>
                <span className="font-small-3">
                Ваш текущий статус: INVESTOR GIQ-S
                </span>
              </div>
              <small className="text-muted">25 минут назад</small>
            </li>
            <li>
              <div className="timeline-icon bg-warning">
                <UserCheck size={16} />
              </div>
              <div className="timeline-info">
                <p className="font-weight-bold mb-0">Ваш реферал пригласил нового пользователя</p>
                <span className="font-small-3">
                  Adam Jackson
                </span>
              </div>
              <small className="text-muted">15 дней назад</small>
            </li>
            <li>
              <div className="timeline-icon bg-success">
                <DollarSign size={16} />
              </div>
              <div className="timeline-info">
                <p className="font-weight-bold mb-0">Ваш реферал (Adam) внес 200$</p>
                <span className="font-small-3">
                  Вы получили бонус: 16$
                </span>
              </div>
              <small className="text-muted">20 days ago</small>
            </li>
            <li>
              <div className="timeline-icon bg-warning">
                <DollarSign size={16} />
              </div>
              <div className="timeline-info">
                <p className="font-weight-bold mb-0">Вы пополнили свой депозит</p>
                <span className="font-small-3">Сумма взноса: 5000$ </span>
              </div>
              <small className="text-muted">25 days ago</small>
            </li>
            <li>
              <div className="timeline-icon bg-primary">
                <Check size={16} />
              </div>
              <div className="timeline-info">
                <p className="font-weight-bold mb-0">Вы создали аккаунт</p>
                <span className="font-small-3">
                  Добро пожаловать в систему, John!
                </span>
              </div>
              <small className="text-muted">28 дней назад</small>
            </li>
          </ul>
        </CardBody>
      </Card>
    )
  }
}
export default ActivityTimeline

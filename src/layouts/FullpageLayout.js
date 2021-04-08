import React from "react"
import themeConfig from "../configs/themeConfig"
import classnames from "classnames"

const FullPageLayout = ({ children, ...rest }) => {

  return (
    <div
      className={classnames(
        "full-layout wrapper bg-full-screen-image blank-page dark-layout",
        {
          "layout-dark": themeConfig.layoutDark
        }
      )}
    >
      <div className="app-content">
        <div className="content-wrapper">
          <div className={window.location.href == 'https://cabinet.giq-group.com/register' ? "content-body pt-2 regist" : "content-body"}>
            <div className={window.location.href == 'https://cabinet.giq-group.com/register' ? "flexbox-container regist" : "flexbox-container"}>
              <main className="main w-100">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPageLayout

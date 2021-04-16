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
        {window.location.pathname.includes('en') ? 
          (
            
          <div className="p-2" style={{right: '0', position: 'absolute'}}>
            <a href={window.location.href.replace('/en', '')} className="mr-1">RU</a>
            <a href={window.location.pathname}>EN</a>
          </div>
          ) : (
          <div className="p-2" style={{right: '0', position: 'absolute'}}>
            <a href={window.location.pathname} className="mr-1">RU</a>
            <a href={'/en' + window.location.pathname}>EN</a>
          </div>
          )
        }
        <div className="content-wrapper">
          <div className={window.location.pathname === '/register' ? "content-body pt-2 regist" : "content-body"}>
            <div className={window.location.pathname === '/register' ? "flexbox-container regist" : "flexbox-container"}>
              <main className="main w-100">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPageLayout

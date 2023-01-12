import React from 'react'
import NavBar from './NavBar'

const Layout = ({children}) => { // {children} 하나의 컴포넌트를 또 다른 컴포넌트 안에 넣을 때 사용
  return (
      <>
          <NavBar />
          <div>{children}</div>
      </>
  )
}

export default Layout
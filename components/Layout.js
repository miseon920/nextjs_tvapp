import React from 'react'
import NavBar from './NavBar'

const Layout = ({children}) => { // {children} 하나의 컴포넌트를 또 다른 컴포넌트 안에 넣을 때 사용
  return (
      <>
        <div className='wrap'>
            <NavBar />
            <div>{children}</div>
            </div>
      <style jsx global>{`
        .wrap{
          max-width:720px;
          width:100%;
          margin:0 auto;
          padding:50px 15px;
        }
        img{
          max-height:100%;
          max-width:100%;
        }
        .wrap nav{
          text-align: center;
          margin-bottom:30px;
        }
        .wrap .tv_box{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap:15px
        }
        .tv{
          flex:1 1 40%;
          width:50%;
          cursor: pointer;
        }
        .tv h4{
          width:100%;
          text-align:center;
          font-size:21px;
          font-weight:600;
          padding-top:15px;
          overflow:hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
        }
        
        
        `}</style>
      </>
  )
}

export default Layout
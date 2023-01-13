
import React from 'react'
import NavBar from '../components/NavBar'
import '../styles/globals.css'
import Layout from '../components/Layout' //공통적인 템플릿을 위하여 만듬, _app.js 파일에 너무 많은것을 원하지 않으므로 보통 따로만듬

const App = ({ Component, pageProps }) => { //App이라는 이름은 본인이 이름짓기 마련, 중요한것은 파일이름인 _app.js는 고정된이름!
  return (
    <Layout>
        {/* <NavBar />   공통적인것 적기 - 너무커지므로 템플릿의 경우 레이아웃으로 만듬 */}
         <Component {...pageProps} />  {/* 각종페이지 및 컴포넌트를 랜더링 하는 부분 */}
      </Layout>
  )
}

export default App

/**
 * 모든 컴포넌트들의 청사진(템플릿)을 위해 _app.js를 만듬(파일이름 고정)
 * 다른 컴포넌트가 랜더링되기 전에 먼저 보여줌 = blueprint
 * 
 * app component
 * 
 * 페이지나 컴포넌트 내에 css를 import 하고 싶다면 module.css 이어야함 / 따라서 globals.css는 import가 안됌/ 하지만 _app.js는 됨
 */
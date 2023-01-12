import React from 'react'
import NavBar from '../components/NavBar'
import Head from 'next/head'
import Seo from '../components/Seo'

const About = () => {
  return (
    <div>
      {/* <Head>
          <title>About | Next Movies</title>
      </Head> */}
      <Seo title="About"/>
      <h2>about</h2>
    </div>
    //   <style jsx global>
    //       {`
    //     .nav_box{
    //     background:red; /*styled jsx - .nav_box를 정의해도 navbar에 영향을 주지 않음*/
    //}
    // `}
    // </style>
  )
}

export default About



 
import Head from 'next/head'
import React from 'react'

const Seo = ({title}) => {
  return (
      <Head>
          <title>{title} | Next Movies</title>
      </Head>
  )
}

export default Seo
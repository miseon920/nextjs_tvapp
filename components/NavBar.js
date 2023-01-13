import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/NavBar.module.css' //module.css 패턴 맞춰주고 사용하기!
import Image from 'next/image'

const NavBar = () => {
  const router = useRouter();
  console.log(router)
  //console.log(router); - pathname, route:, query: {…}, asPath, components 등이 들어있음
  return (
    <nav>
      {/* <img src="" alt="" />  */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={170}
          height={20}
        />
      </Link>
      <ul className={`nav_box ${styles.nav}`}>
        <li>
            {/* <a href="/">Home</a> 
             a태그를 쓰면 안돼는 이유 : nextjs 앱 내에서 페이지를 네비게이트할때 사용해야만 하는 특정 컴포넌트가 존재하기 때문 = Link 씀
            */}
           <Link href="/" className={`${styles.link} ${router.pathname === "/"? styles.active:""}`}>Home</Link>
          {/* Link 태그에는 style, class가 전달되지 않음 따라서 스타일시 다른 태그로 감싸주어야함/ 13버전부터는 모두가능 */}
          {/* 
            style={{
              textDecoration: 'none',
              fontSize: 30,
              color:router.pathname === "/"?"red":"black"
            }} 인라인으로 Link안에 쓸수 있지만 module.css로 만들어씀
          
            class를 여러개 쓸때  className={[styles.link,router.pathname === "/"? styles.active:""].join(" ")}
            이런식으로 쓸수도 있음 - 공백을 기준으로 합하는것
          */}
           {/* <Link href="/">Home</Link>           */}
          </li>
        <li>
          <Link href="/about" className={`${styles.link} ${router.pathname === "/about"? styles.active:""}`}>About</Link> 
          {/* <Link href="/about" legacyBehavior><a>About</a></Link>  */}
          {/*13버전부터 legacyBehavior를 쓰면 a를 안에 쓸수 있음, 하지만 13버전부터 위의 사항이 적용되어 그냥씀  */}
          {/* <Link href="/about">About</Link> */}
        </li>
      </ul>
    </nav>
    /* styled jsx - 다른파일에서 .nav_box를 정의해도 현재 컴포넌트에 영향을 주지 않음 */    
    //<style jsx global>{` /*global을 쓰면 전역으로 쓸 수 있음 */
    //  .nav_box{
    //    background:black;
    //    padding: 15px; /*props를 가지고 오고 싶을땐 $ { props.color } 로도 쓸 수 있음 - 자바스크립트 문자열이기 때문 */
    //  }
    //  a{
    //      text-decoration: none; /**13버전에서는 안먹는군요.. */
    //  }
    // `}</style>
  )
}

export default NavBar

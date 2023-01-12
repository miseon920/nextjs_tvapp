import React, { useEffect, useState } from 'react' // 이부분이 없어도 정상적으로 작동하나 리액트 훅 또는 메서드를 사용해야할 경우 필수로 import 해줘야함
import NavBar from '../components/NavBar';
import Head from 'next/head'; //react에서는 react helmaet 을 다운해야하는 번거로움
import Seo from '../components/Seo';
import Image from 'next/image';


//next.js는 api key를 숨길 수 있음 -> next.config.js 에 적음
// const base_url = "https://api.themoviedb.org/3";
// const api_key = "69a4874992de52f7b5e2e351c836a898";

const Home = () => {
    
    const [tvs, setTvs] = useState([]); //tv 담을곳

    console.log(tvs);
    //const [counter, setCounter] = useState(0);

    useEffect(() => { 
        (async () => { 
            const {results} = await (await fetch(`/api/tvs`)).json();
            //const json = await res.json(); await으로 한번더 감싸서 줄이기
            setTvs(results);
        })();
    },[])
  return (
      <div>
          {/* <h1>myCounter {counter}</h1>
          <button onClick={()=>setCounter(prev =>counter+1)}>counter</button> */}
          {/* <Head>
              <title>Home | Next Movies</title>
          </Head> - 매페이지 마다 붙이면 관리하기가 번거로움 = 컴포넌트로 만듬 */}
          <Seo title="Home" />
          {!tvs && <h4>로딩중...</h4>} {/**api를 불러오기 전에 보여줄 로딩 페이지 */ }
          {tvs?.map(tv => ( //tv가 없다면 실행안함
              <div key={tv.id}>
                  <h4>{tv.original_name}</h4>
                  {/* <Image
                      src={`${base_url}${tv.poster_path}`}
                      alt={tv.name}
                      width={100}
                      height={100}
                  ></Image> */}
              </div>
          ))}
      </div>
  )
}

export default Home

/**
 * 라이브러리는 개발자로서 불러와서 개발을 하는것, 사용할 수 있을 때 사용할 수 있음, 어디에 넣을지 어떤구조로 할지 본인 뜻대로
 * 프레임워크는 내가 넣은 코드를 불러와서 동작하게 됨, 프레임워크 사용시 해당 프레임워크의 규칙을 따라줘야 잘 동작함
 * 
 * 예를들어 리액트에서는 app.js와 랜더부분이 있지만 nextjs는 내가 넣은 코드를 프레임워크가 불러주는 형태임
 * 또는 pages안에 만든 about을 홈도메인 뒤에 쓰기만 하면 그페이지로 넘어감
 * 파일 이름을 가지고 주소로 쓴다
 * 
 * pages안에 만들고 컴포넌트를 추가하기만 하면됨
 * 컴포넌트 이름을 파일이름과 맞출필요없음 / 리액트 컴포넌트 규칙인 대문자로 생성 후 export 해주어야함
 * pages안에 파일이 없을경우 404페이지를 자동으로 띄워줌
 * index는 메인이므로 index로 적으면 404 에러가 뜸 '/'로 인식함
 *  앱에 있는 페이지들이 미리 랜더링(프리랜더) 됨 = 정적인 페이지
 * 
 * csr인 리액트는 유저가 다운받았을때 html이 비어있음 / 클라이언트의 자바스크립트와 리액트 소스가 소스를 만들게 됨
 * 느린 환경에서 빈화면을 보게되는 문제가 발생
 * 
 * ssr인 nextjs는 프리랜더를 하므로 html이 나타나있음, 유저가 빈화면이 아니라 프리랜더된 사이트를 볼수 있음
 * 따라서 검색엔진 seo에 좋음
 * 
 * react.js를 프론트엔드 안에서 실행하는 것 = hydration(하이드레이션)
 * next.js를 react.js를 백엔드에서 동작시켜 페이지를 만들어 컴포넌트들을 랜더 시킴, 랜더링이 끝나면 html이 되고
 * 그 html를 페이지의 소스코드로 넣어줌, 따라서 유저가 자바스크립트와 react.js가 로딩되지 않아도 콘텐츠를 보게됨
 * 
 * react.js가 로딩되었을때 기본적으로 이미 존재 리액트 훅 또는 메서드와 연결시켜 일반적인 react.js 앱이 됨
 * 
 */

/*실전 홈페이지 만들기
1.레이아웃 컴포넌트 만들기
2.작업하기
3.api key 숨기기 (리다이렉트 /리롸이트) - 리퀘스트에 마스크를 씌우는것



*/

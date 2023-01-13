import React, { useEffect, useState } from 'react' // 이부분이 없어도 정상적으로 작동하나 리액트 훅 또는 메서드를 사용해야할 경우 필수로 import 해줘야함
import NavBar from '../components/NavBar';
import Head from 'next/head'; //react에서는 react helmaet 을 다운해야하는 번거로움
import Seo from '../components/Seo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

console.log(process.env);

//next.js는 api key를 숨길 수 있음 -> next.config.js 에 적음
// const base_url = "https://api.themoviedb.org/3";
// const api_key = "69a4874992de52f7b5e2e351c836a898";

const Home = ({results}) => {
    const router = useRouter();
    const conClick = (id, title,image) => { 
        //router.push(`/tvs/${id}`); //이렇게 쓸수도 있지만
        // router.push({//객체로 쓸수도 있음 - url로 state를 넘기기 위해 사용
        //     pathname: `/tvs/${id}`,
        //     query: {
        //         title,
        //     }, //url을 설정하는 부분
        // },`/tvs/${id}` // : as옵션으로 숨길 url 적기 - 브라우저에서 보이는 url 마스킹
        // );
        
        //타이틀 표시를 위해 바꿔줌
        router.push(`/tvs/${title}/${id}${image}`);

        //a태그가 div를 싸서 하는것은 보기가 안좋으므로 onClick으로 처리하여 위의 형식으로 네이게이팅함/ 사실 html5부터는 문제없음으로 바뀜
        /*
        router.push(url, as, options)
        클라이언트 측 전환을 처리. 이 방법은 next/link가 충분하지 않은 경우에 유용
        url: UrlObject | String: 탐색할 URL
        as: UrlObject | String: 브라우저 URL 표시줄에 표시될 경로에 대한 선택적 데코레이터
        ```
        router.push({
        pathname: '/post/[pid]',
        query: { pid: post.id },
        })
        ```
        + 외부 URL에 대해서는 router.push()를 사용할 필요가 없다.
        window.location을 사용하는 것이 더 적합
        */
    }

    // const [tvs, setTvs] = useState([]); //tv 담을곳

    // console.log(tvs);
    //const [counter, setCounter] = useState(0);

    // useEffect(() => { 
    //     (async () => { 
    //         const {results} = await (await fetch(`/api/tvs`)).json();
    //         //const json = await res.json(); await으로 한번더 감싸서 줄이기
    //         setTvs(results);
    //     })();
    // },[])
  return (
      <div>
          {/* <h1>myCounter {counter}</h1>
          <button onClick={()=>setCounter(prev =>counter+1)}>counter</button> */}
          {/* <Head>
              <title>Home | Next Movies</title>
          </Head> - 매페이지 마다 붙이면 관리하기가 번거로움 = 컴포넌트로 만듬 */}
          <Seo title="Home" />
          {/* {!tvs && <h4>로딩중...</h4> api를 불러오기 전에 보여줄 로딩 페이지 */ } 
          {results?.map(tv => ( //tv가 없다면 실행안함
              <div  className="tv" key={tv.id} onClick={()=>conClick(tv.id,tv.original_name,tv.poster_path)}>
                  <h4>
                      {/* <Link href={`/tvs/${tv.id}`}> - url을 마스킹하기 위해 아래처럼 바꿔준다*/}
                      {/* <Link href={{
                          pathname: `/tvs/${tv.id}`,
                          query: {
                              title: tv.original_name
                          },
                      }} as={`/tvs/${tv.id}`}> */}
                      {/* <Link href={`/tvs/${tv.original_name}/${tv.id}`}> */}
                     
                    {tv.original_name}</h4>
                    {tv.poster_path &&
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                            alt={tv.name}
                            width={120}
                            height={190}
                        ></Image>
                    }
            </div>
          ))}
      </div>
  )
}

export default Home

export async function getServerSideProps() { 
 //api키를 리롸이트에서 숨겨도 되나 여기서 쓰면 클라이언트에 절대 보이지않음, 백엔드에서 처리하므로
//로딩이라는것이 보기 싫은 사람도 있음, 서버에서 일어나는 일이 모두 끝나구 랜더하길 바랄때
//데이터가 모두 들어오고 랜더 하길 원할때
//이곳코드는 서버에서 돌아감, 서버상황이 끝날때 까지 클라이언트에서 볼수없음
    const { results } = await (await fetch(`http://localhost:3000/api/tvs`)).json();
    return {
         props: {
            results: JSON.parse(JSON.stringify(results)),
        },
        // props: {
        //     results, //리턴값을 받을 페이지에 props로 넣어줌
        // }
    }
    /*
    언제 getServerSideProps를 사용해야 하나요?
    request time에 반드시 데이터를 fetch해와야 하는 페이지를 pre-render해야 하는 경우에만 getServerSideProps를 사용해야 합니다.
    데이터를 pre-render할 필요가 없다면 client side에서 데이터를 가져오는 것을 고려해야 합니다.

    클라이언트 측에서 데이터 가져오는 과정 (Fetching data on the client side)
    페이지에 자주 업데이트되는 데이터가 포함되어 있고 데이터를 pre-render할 필요가 없는 경우 클라이언트 측에서 데이터를 가져올 수 있습니다.
    1. 먼저 데이터가 없는 페이지를 즉시 표시합니다.
    2. 페이지의 일부는 Static Generation을 사용해 pre-render할 수 있습니다.
    3. 없는 데이터를 위해 loading 상태를 표시할 수 있습니다.
    4. 그런 다음 클라이언트 측에서 데이터를 가져와 준비가 되면 표시합니다.

    이 접근 방식은 예를 들어 사용자 대시보드 페이지에 적합합니다.
    왜냐하면 대시보드는 사용자별 비공개 페이지이기 때문에 SEO와는 관련이 없으며 페이지를 미리 렌더링할 필요가 없습니다. 또한 데이터는 자주 업데이트되므로 요청 시 데이터를 가져와야 합니다.

    getServerSideProps가 오류 페이지를 렌더링합니까?
    getServerSideProps 내부에서 오류가 발생하면 pages/500.js 파일이 표시됩니다.
    500 page(서버 렌더링 오류 페이지)는 사용자가 커스터 마이징 할 수 있습니다.
    개발 중에는 이 파일이 사용되지 않고 대신 개발 오버레이가 표시됩니다.

    ssr에서 next.js가 static한 html을 만들기 위해서 props의 results값이 필요할텐데 그러면
    "props값은 서버에서 html을 만들 때 사용되고 나중에 React가 동적으로 상호작용하기위해서 또 사용된다
    */
}


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

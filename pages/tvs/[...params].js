import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Seo from '../../components/Seo';
import Image from 'next/image';
import { useEffect } from 'react';

const Detail = ({params,results}) => {
  const router = useRouter();
    //const { id } = router.query //id를 가져오기 위해 이렇게 쓸 수 있음 -es6문법
  const [title, id] = router.query.params || []; //title과 id를 담은 배열이라는 것을 알기 때문에 2개를 넣어준것
  //const { img } = router.query.image;
  /* 새로고침시 에러가 발생하는 이유는 서버가 프리랜더 되기 때문 router.query.params은 서버에서 배열이므로 || []를 추가해 준다.
    이부분은 csr만 해결되므로 console확인시 html이 비어있는것이 확인 됨/ 데이터빌드시 사용되는 getServerSideProps 를 이용한다.
  */
  console.log(results);
  const image = results.find(result => String(result.id) === id);
  /*
    컴포넌트 내부에 쓰인 router의 경우 클라이언트 사이드에서만 실행된다.
  */ 
  return (
    <div className='detail'>
      <Seo title={title} />
      <ul>
        <li>{title} </li>
        <li>{id}</li>
        { image.poster_path &&
        <li> 
          <Image
                src={`https://image.tmdb.org/t/p/w500/${image.poster_path}`}
                alt={title}
                width={520}
                height={500}
          ></Image>        
          </li>
        }
      </ul>
      {/* 
      <h4>
              {router.query.title || "로딩중..." }   
      </h4>*/}
      <style jsx global>{`
        .detail ul{
          display: flex;
          flex-wrap: wrap;
          gap: 50px;
        }
        .detail ul li{
          flex: 1 1 40%;
          font-size:21px;
          font-weight:600
        }
        .detail ul li:nth-child(2){
          text-align: right;
        }
        .detail ul li:last-child{
          text-align: center;
        }
        `}
        </style>
    </div>
  )
}

export default Detail

export async function getServerSideProps({ params: { params} }) { //server side context를 제공해주므로
  console.log(params); //sevver에 params이 생성됨, 유저에게 로딩을 보여주고 싶지 않고 seo에 친화적으로 만들기 위해 getServerSideProps 사용
  const { results } = await (await fetch(`http://localhost:3000/api/tvs`)).json();
  //const postData = params;
  return {
    props: {
      params,
      results: JSON.parse(JSON.stringify(results)),
    },
  }
}

//변수를 포함하는 다이나믹 url 일때 []안에 변수명을 적어준다.
//query와 파일명은 동일
//query에 여러가지 주소가 추가되어 배열형식으로 나오므로 id라는 같은 맞지않음/ ...을찍어보면 모두 배열로 들어간것이 보임-> 이름또한 params로 바꿔주기
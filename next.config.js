
/** @type {import('next').NextConfig} */

const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

const nextConfig = {
  reactStrictMode: true,
  // async redirects() { //리다이렉션 시키기
  //   return [
  //     {
  //       source: "/contact", //이동시킬곳 경로찾기
  //       destination: "/form", //이동할곳 경로, 영구적인지 아닌지에 따라 검색엔진이 정보를 기억하는지 여부가 결정됨 - 쿠키같은것
  //       permanent:false,
  //     }
  //   ]
  // },
  // async redirects() { //리다이렉션 시키기
  //   return [
  //     {
  //       source: "/contact/:path", //:동적인주소, * 모두가능함
  //       destination: "/form/:path", //:동적인주소, * 모두가능함
  //       permanent:false,
  //     }
  //   ]
  // },
  async rewrites() { //리롸이트 = 리다이렉트는 주소가 바뀔때 보이지만 리롸이트는 보이지않음 유저가 볼 수 없음
    return [
      {
        source: "/api/tvs", //api 주소를 숨김
        destination: `${api_url}/tv/popular?api_key=${api_key}`, //진짜주소
      },
      {
        source: "/api/tvs/:id", //우리가 변수명을 id로 지정해줬기 때문에 맞춰줘야함
        destination: `${api_url}/tv/:id?api_key=${api_key}`, //api 내에서 세부사항을 /tv/{tv_id} 받기 때문에 우리는 id로 지정해줘서 바꿔줌
      }
    ]
  },
//  async rewrites() {
//     return {
//       beforeFiles: [
//         {
//           source: "/api/tvs",
//           destination: `${base_url}/tv/popular?api_key=${api_key}`,
//           basePath: false,
//         },
//       ],
//       afterFiles: [
//         {
//          source: "/api/tvs",
//          destination: `${base_url}/tv/popular?api_key=${api_key}`,
//          basePath: false,
//         },
//       ],
//       fallback: [
//         {
//           source: "/api/tvs",
//           destination: `${base_url}/tv/popular?api_key=${api_key}`,
//           basePath: false,
//         },
//       ],
//     };
//   },
//  async rewrites() {
//     return {
//       beforeFiles: [
//         {
//           source: "/api/tvs/:id",
//           destination: `${base_url}/tv/:id?api_key=${api_key}`,
//           basePath: false,
//         },
//       ],
//       afterFiles: [
//         {
//          source: "/api/tvs/:id",
//          destination: `${base_url}/tv/:id?api_key=${api_key}`,
//          basePath: false,
//         },
//       ],
//       fallback: [
//         {
//           source: "/api/tvs/:id",
//           destination: `${base_url}/tv/:id?api_key=${api_key}`,
//           basePath: false,
//         },
//       ],
//     };
//   },
  //이미지
  images: {
    domains: [
      'image.tmdb.org',
    ] //외부 url 이미지를 사용할 수 있게 추가해준다
  },
}

module.exports = nextConfig

/*
Redirects (URL변경됨)
Redirect을 사용하면 들어오는 request 경로를 다른 destination 경로로 Redirect할 수 있다. 
Redirect을 사용하려면 next.config.js에서 redirects 키를 사용할 수 있다.
redirects은 source, destination 및 permanent 속성이 있는 객체를 포함하는 배열을 반환하는 비동기 함수
source: 들어오는 request 경로 패턴 (request 경로)
destination: 라우팅하려는 경로 (redirect할 경로)
permanent: true인 경우 클라이언트와 search 엔진에 redirect를 영구적으로 cache하도록 지시하는 308 status code를 사용하고,
 false인 경우 일시적이고 cache되지 않은 307 status code를 사용 

Rewrites (URL변경되지 않음)
Rewrites를 사용하면 들어오는 request 경로를 다른 destination 경로에 매핑할 수 있다.
Rewrites은 URL 프록시 역할을 하고 destination 경로를 mask하여 사용자가 사이트에서 위치를 변경하지 않은 것처럼 보이게 합니다.
반대로 redirects은 새 페이지로 reroute되고 URL 변경 사항을 표시.
 */

/*
#api 주소의 경우
주소에 한글이 들어가는 경우 주소 전체를 encodeURI()로 변경
- TypeError: Request path contains unescaped characters
- before : `https://openapi.gg.go.kr/RegionMnyFacltStus?KEY=${API_KEY}&Type=json&pIndex=1&pSize=20&SIGUN_NM=${SIGUN_NM}`
(SIGUN_NM : 지역 시/군 한글입력)
- after : encodeURI(
`https://openapi.gg.go.kr/RegionMnyFacltStus?KEY=${API_KEY}&Type=json&pIndex=1&pSize=20&SIGUN_NM=${SIGUN_NM}`
)

#api에 파라미터가 있는경우
-before
fetch(`/api/foo=bar&key=val`)
{
source: "/api/:params",
destination: `https://some.api/items?key=${API_KEY}&:params`
}

-after
destination:`https://some.api/items?key=${API_KEY}${encodeURIComponent("&")}:params`

문자열이 &와 결합을 한다

*/
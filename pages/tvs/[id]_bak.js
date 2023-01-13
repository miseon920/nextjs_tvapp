import { useRouter } from 'next/router'
import React from 'react'

const Detail = () => {
    const router = useRouter();
    //const { id } = router.query //id를 가져오기 위해 이렇게 쓸 수 있음
    console.log(router);
  return (
      <div>
          <h4>
              {router.query.title || "로딩중..." }
          </h4>
    </div>
  )
}

export default Detail



//변수를 포함하는 다이나믹 url 일때 []안에 변수명을 적어준다.
//query와 파일명은 동일
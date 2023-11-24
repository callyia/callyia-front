import * as D from '../../data'

import React, {useEffect} from 'react'
import axios from 'axios'

const Map: React.FC = () => {
  useEffect(() => {
    // T MAP API 호출
    const apiKey = 'fAVBnOntPm1FUqkPuKQZc31F0pFE3KM41N1UeDkA'
    const apiUrl = 'https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=' + apiKey

    axios
      .get(apiUrl)
      .then(response => {
        // API 호출이 성공한 경우에 수행할 작업
        console.log(response.data)
      })
      .catch(error => {
        // API 호출이 실패한 경우에 수행할 작업
        console.error('Error fetching T MAP API:', error)
      })
  }, [])

  return (
    <div>
      <h2 className="ml-4 text-5xl font-bold">지도</h2>
    </div>
  )
}

export default Map

import {Div} from '../../components'
import * as D from '../../data'

export default function Map() {
  return (
    // 지도
    <section className="w-full h-full mt-4 mr-4">
      <h2 className="ml-4 text-5xl font-bold">지도</h2>
      <Div
        src={D.randomImage(2000, 1800, 100)}
        className="w-full ml-4"
        minHeight="20rem"
        height="85%"
        width="100%"
      />
    </section>
  )
}

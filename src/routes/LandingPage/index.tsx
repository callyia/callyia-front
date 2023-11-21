import Schedule from './Schedule'
import Map from './Map'

export default function LandingPage() {
  return (
    <div style={{display: 'flex', height: '1000px'}}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={{flex: 1}}>
          {/* 왼쪽상단 */}
          <Schedule />
          {/* <Memo /> */}
        </div>
        <div style={{flex: 1}}></div>
      </div>
      <div style={{flex: 1}}>
        <Map /> {/* 오른쪽 상단 */}
      </div>
    </div>
  )
}

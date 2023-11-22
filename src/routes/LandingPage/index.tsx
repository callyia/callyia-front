import Schedule from './Schedule'
import Map from './Map'
import Cart from './Cart'

export default function LandingPage() {
  return (
    <div style={{display: 'flex', height: '1000px'}}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #dddddd',
          borderRadius: '8px',
          padding: '16px',
          margin: '8px'
        }}>
        <div style={{flex: 1}}>
          {/* 왼쪽 상단 */}
          <Schedule />
        </div>
        <div style={{flex: 1}}>{/* 왼쪽 하단 */}</div>
      </div>

      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div
          style={{
            flex: 2,
            border: '2px solid #dddddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '8px'
          }}>
          {/* 오른쪽 상단 */}
          <Map />
        </div>
        <div
          style={{
            flex: 1,
            border: '2px solid #dddddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '8px'
          }}>
          {/* 오른쪽 하단 (장바구니 영역 추가) */}
          <Cart />
        </div>
      </div>
    </div>
  )
}

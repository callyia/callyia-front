import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import SchedulePage from './SchedulePage'
import NoMatch from './NoMatch'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/SchedulePage" element={<Layout />}>
        <Route index element={<SchedulePage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}

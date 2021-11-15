import { SelectedGenreProvider } from './contexts/SelectedGenreContext'

import { SideBar } from './components/SideBar'
import { Content } from './components/Content'

import './styles/global.scss'

export function App() {
  return (
    <SelectedGenreProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </SelectedGenreProvider>
  )
}

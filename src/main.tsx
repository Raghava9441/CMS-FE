import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppContainer from './AppContainer.tsx'
import { Provider } from 'react-redux'
import store from './redux/store/index.ts'
import '~console/theme-detect'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </StrictMode>,
)

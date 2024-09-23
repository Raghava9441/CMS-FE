import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppContainer from './AppContainer.tsx'
import { Provider } from 'react-redux'
import store from './redux/store/index.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </StrictMode>,
)

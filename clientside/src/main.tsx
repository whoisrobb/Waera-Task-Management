import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/themes/theme-provider.tsx';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './providers/user-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UserProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </UserProvider>
  </BrowserRouter>
)

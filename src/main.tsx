import { MainProvider } from './context/Store.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    
    <MainProvider>
        <App />
        <ToastContainer/>
    </MainProvider>
)

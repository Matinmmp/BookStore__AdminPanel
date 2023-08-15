import { RouterProvider } from 'react-router-dom';

import routes from './routes/routes';
import './App.css';


function App() {
    console.log("sdfadsf");
    return (
            <RouterProvider router={routes} />
    )
}

export default App

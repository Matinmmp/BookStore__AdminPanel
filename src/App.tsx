import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import routes from './routes/routes';
import './App.css';

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
        </QueryClientProvider>
    )
}

export default App

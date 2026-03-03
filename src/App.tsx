import './App.css'
import { useQuery } from './hooks/useQuery'

function App() {
  const { data, isLoading, error } = useQuery<unknown>(['liftingcast-data'], 'endpoint');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1>Liftingcast API</h1>
      <div className="card">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  )
}

export default App

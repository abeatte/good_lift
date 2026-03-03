import './App.css'
import { useGetMeet } from './api/hooks/useGetMeet';
import { useQueryMeets } from './api/hooks/useQueryMeets';

function App() {
  const { data: meets, isLoading: meetsLoading, error: meetsError } = useQueryMeets();
  const { data: meet, isLoading: meetLoading, error: meetError } = useGetMeet({ meet_id: 'm08qj6i5tls9' })

  if (meetsLoading || meetLoading) return <div>Loading...</div>;
  if (meetsError || meetError) return <div>Error: {meetsError?.message ?? meetError?.message}</div>;

  return (
    <>
      <h1>Liftingcast API</h1>
      <div className="card">
        <pre>{JSON.stringify(meet, null, 2)}</pre>
      </div>
      <div className="card">
        <pre>{JSON.stringify(meets, null, 2)}</pre>
      </div>
    </>
  )
}

export default App

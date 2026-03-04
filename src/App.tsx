import './App.css'
import { useQueryMeets } from './api/hooks/useQueryMeets';
import Meet from './components/Meet';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  const { data: meets, isLoading, error } = useQueryMeets('past');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1>Liftingcast API</h1>
      <h1>{meets?.length ?? "0"}</h1>
      {meets?.map(meet => <div key={meet._id}><Meet meet={meet} /></div>)}
      <div className="card">
        <pre>{JSON.stringify(meets, null, 2)}</pre>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App

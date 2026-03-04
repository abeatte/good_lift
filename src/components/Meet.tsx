import { useGetMeet } from "../api/hooks/useGetMeet";
import type { Meet } from "../api/types/meet";
import '../css/meet.css';

const Meets = function ({ meet}: { meet: Meet }) {
    const { data: meetData, isLoading, error } = useGetMeet({ meet_id: meet._id })


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="card meet">
            <h1>{meet.name}</h1>
            {/* <h2>{meetData}</h2> */}
            <pre>{JSON.stringify(meet, null, 2)}</pre>
            <br/>
            <h3>{meetData?.total_rows}</h3>
            <h4>{meetData?.update_seq}</h4>
            {/* <pre>{JSON.stringify(meetData, null, 2)}</pre> */}
            {/* <pre>{Object.keys(meetData)}</pre> */}
        </div>
    );
}

export default Meets;
export default function ServerHome({params}: {
    params: {
        id: string;
    }
}) {
    return <p>{params.id}</p>
}
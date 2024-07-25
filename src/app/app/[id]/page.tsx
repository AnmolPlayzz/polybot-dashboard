export default function ServerHome({params}: {
    params: {
        id: string;
    }
}) {
    return <p
        style={{
            color: "white"
        }}
    >
        {params.id}
    </p>
}
import Loader from "@/components/utils/loader";

export default function Loading() {
    return <div style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <Loader>
            Loading server dashboard...
        </Loader>
    </div>

}
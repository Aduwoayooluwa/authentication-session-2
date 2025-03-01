import { useEffect, useState } from "react";
import { useAuth } from "./context/auth-context"
import { dashboardData } from '../config/services'
export default function Dashboard() {

    const { logout } = useAuth();

    const [dashboardDetails, setDasboardDetails] = useState<{message: string }>({
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function fetchDashboardDetails() {
           
            try {
                const res = await dashboardData();
                setDasboardDetails(res)
            }
            catch (error) {
                console.error(error)
                setIsLoading(false)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchDashboardDetails();
    }, [])

    if (isLoading) return <h3>Loading....</h3>

    return (<div>
        <h1>This is the dashboard</h1>

        <p>{dashboardDetails?.message}</p>

        <button style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            transition: "background-color 0.3s ease"
        }} onClick={logout}>Logout</button>
    </div>)
}
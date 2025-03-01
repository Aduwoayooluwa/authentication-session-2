import axios from "axios";

export async function dashboardData() {
        const res = await axios.get('http://localhost:3001/dashboard-data', {
            withCredentials: true
        });
        return res.data
    
}
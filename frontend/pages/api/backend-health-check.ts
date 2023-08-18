import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface HealthCheckResponse {
    status: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<HealthCheckResponse>) {
    const backendHealthCheckUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-check`;
    const { data } = await axios.get<HealthCheckResponse>(backendHealthCheckUrl);
    res.status(200).json(data);
}

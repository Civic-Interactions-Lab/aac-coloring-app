import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getBackendUrl } from "@/util/getBackendUrl";

interface HealthCheckResponse {
    status: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<HealthCheckResponse>) {
    const backendHealthCheckUrl = `${getBackendUrl()}/health-check`;
    const { data } = await axios.get<HealthCheckResponse>(backendHealthCheckUrl);
    res.status(200).json(data);
}

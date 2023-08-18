import React from "react";
import { useFetch } from "use-http";
import SmallLoadingSpinner from "../general/SmallLoadingSpinner";
import RedGreenIndicator from "../general/RedGreenIndicator";
import useTimerIncrement from "@/hooks/useTimerIncrement";

interface BackendHealthEndpointType {
    status: String;
}

export default function BackendHealthCheckComponent() {
    const refresh = useTimerIncrement();
    const { loading, error, data } = useFetch<BackendHealthEndpointType>("/api/backend-health-check", {}, [refresh]);
    const statusIndicator = loading ? <SmallLoadingSpinner /> : <RedGreenIndicator isRed={Boolean(error) || !data} />;

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Health Check
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-lg text-gray-900 whitespace-nowrap dark:text-white">
                            Backend
                        </th>
                        <td className="px-6 py-4">{statusIndicator}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetAllImagesResponse } from "../api/s3/get-all-images";
import Link from "next/link";
import SVGDisplay from "@/components/Coloring-Book/SVGDisplay";
import { getS3ObjectByKey } from "@/util/s3Util";
import axiosWithCaching from "@/util/axiosCache";

export default function ColoringBookHome() {
    const [allImages, setAllImages] = useState<Array<string>>([]);

    useEffect(() => {
        const getAllImagesPromise = axiosWithCaching.get("/api/s3/get-all-images", {
            cache: {
                ttl: 5000 * 60, // 5 minute.
            },
        });

        getAllImagesPromise.then((resp) => {
            const data = resp.data.data;
            if (data) setAllImages(data);
        });

        getAllImagesPromise.catch((err) => console.error(err));
    }, []);

    return (
        <section className="font-inter p-4">
            <h1 className="text-4xl text-bold mb-8 text-center">All Images</h1>

            <div className="grid gap-4 grid-cols-2 place-items-center justify-center content-center">
                {allImages.map((image) => (
                    <Link
                        href={`/coloring-book/${image}`}
                        key={image}
                        className="w-96 h-48 rounded-md shadow-lg p-3 flex flex-col gap-2 hover:shadow-2xl"
                    >
                        <img src={getS3ObjectByKey(image)} alt={`image of ${image}`} className="h-full" />
                        <p className="text-sky-700  font-poppins">{image}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

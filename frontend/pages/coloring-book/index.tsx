import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetAllImagesResponse } from "../api/s3/get-all-images";
import Link from "next/link";

export default function ColoringBookHome() {
    const [allImages, setAllImages] = useState<Array<string>>([]);

    useEffect(() => {
        const getAllImagesPromise = axios.get<GetAllImagesResponse>("/api/s3/get-all-images");

        getAllImagesPromise.then((resp) => {
            const data = resp.data.data;
            if (data) setAllImages(data);
        });

        getAllImagesPromise.catch((err) => console.error(err));
    }, []);

    console.log(allImages);

    return (
        <section className="font-inter p-4">
            <h1 className="text-2xl text-bold ">All Images</h1>

            {allImages.map((image) => (
                <div key={image}>
                    <Link href={`/coloring-book/${image}`} className="text-sky-700  font-poppins">{image}</Link>
                </div>
            ))}
        </section>
    );
}

import { useAPICallerContext } from "@/contexts/APICallerContextProvider";
import { useAudioTranscriptionContext } from "@/contexts/audioTranscriptionContext/audioTranscriptionContext";
import { mod } from "@/util/math";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

function PlacementsFactory() {
    const placements: Placements = {
        left: null,
        right: null,
    };

    return placements;
}

type Placements = {
    left: string | null;
    right: string | null;
};

function getPlacements(imageId?: string | Array<string>, otherImages?: Array<string>) {
    const placements = PlacementsFactory();

    if (!otherImages || !otherImages.length) {
        return placements;
    }

    if (!imageId) {
        return placements;
    }

    if (Array.isArray(imageId)) {
        if (imageId.length > 0) {
            imageId = imageId[0];
        } else return placements;
    }

    const index = otherImages.indexOf(imageId);

    const left = mod(index - 1, otherImages.length);
    const right = mod(index + 1, otherImages.length);

    placements.left = otherImages[left];
    placements.right = otherImages[right];

    return placements;
}

type SlideShowButtonFactoryProps = {
    direction: "left" | "right";
};

export function SlideShowButtonFactory(props: SlideShowButtonFactoryProps) {
    const { data, error } = useAPICallerContext();
    const { query } = useRouter();

    const { resetState } = useAudioTranscriptionContext();

    useEffect(() => {
        resetState();
    }, [query.imageId]);

    let placements = PlacementsFactory();
    if (data && data.data && !error) placements = getPlacements(query.imageId, data.data);

    const Icon = props.direction === "left" ? LiaAngleLeftSolid : LiaAngleRightSolid;

    return (
        <Link
            href={placements[props.direction] ? `/coloring-book/${placements[props.direction]}` : "#"}
            className="prev-img h-full min-h-screen min-w-[128px] flex items-center justify-center bg-sky-400 hover:bg-sky-700 transition duration-300 ease-out hover:ease-in"
        >
            <Icon className="text-7xl text-white" />
        </Link>
    );
}

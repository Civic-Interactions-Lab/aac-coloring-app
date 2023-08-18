import { type } from "os";

export interface AudioState {
    audio: string | null;
}

type AddAction = { type: "add"; payload: string };
type RmAction = { type: "remove" };

type AudioAction = AddAction | RmAction;

const defaultStateFactory: () => AudioState = () => {
    return { audio: null };
};

export function audioReducer(state: AudioState, action: AudioAction) {
    switch (action.type) {
        case "add":
            console.log("adding:", action.payload);
            return {
                audio: action.payload,
            };
        case "remove":
            console.log("removing:", state.audio);
            return defaultStateFactory();
        default:
            return state;
    }
}

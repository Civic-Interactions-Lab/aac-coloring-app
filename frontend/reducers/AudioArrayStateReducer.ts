export interface AudioState {
    audios: Array<string>;
}

// export type AudioAction = {
//     type: "add" | "remove";
//     payload: string;
// };

type AddAction = { type: "add"; payload: string };
type RmAction = { type: "remove"; payload: string };
type RmAllAction = { type: "remove_all" };

type AudioAction = AddAction | RmAction | RmAllAction;

const defaultStateFactory: () => AudioState = () => {
    return { audios: [] };
};

export function audioReducer(state: AudioState, action: AudioAction) {
    switch (action.type) {
        case "add":
            console.log("adding:", action.payload);
            return {
                audios: [...state.audios, action.payload],
            };
        case "remove":
            console.log("removing:", action.payload);
            const index = state.audios.indexOf(action.payload);
            if (index < 0) return state;

            const modified = [...state.audios];
            modified.splice(index, 1);

            return {
                audios: modified,
            };
        case "remove_all":
            return defaultStateFactory();
        default:
            return state;
    }
}

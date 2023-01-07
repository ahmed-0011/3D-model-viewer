import { proxy, useSnapshot } from "valtio";
import { ModelInfo, ModelAnimations, ViewerSettings } from "./types";

let modelRelativePath;

if (process.env.NODE_ENV === "development") {
    modelRelativePath = "/src/assets/RobotExpressive.glb";
} else {
    modelRelativePath = "/assets/RobotExpressive.glb";
}

const defaultModel: ModelInfo = {
    name: "RobotExpressive.glb",
    url: modelRelativePath,
    extension: "glb",
    size: "0.46 MB"
};

const defaultSettings: ViewerSettings = {
    grid: false,
    wireframe: false,
    axes: false,
    autoRotate: false,
    stats: false,
    gridPositionY: -0.1,
    zoom: new String("")
};

const defaultAnimations: ModelAnimations = {
    clips: [],
    currentClip: null
};

export const modelInfo = proxy(defaultModel);

export const useModelInfo = () => useSnapshot(modelInfo);

export const displayDefaultModel = () => {
    modelInfo.extension = defaultModel.extension;
    modelInfo.url = defaultModel.url;
    modelInfo.name = defaultModel.name;
    modelInfo.size = defaultModel.size;
};

export const modelAnimations = proxy<ModelAnimations>(defaultAnimations);

export const useModelAnimations = () => useSnapshot(modelAnimations);

export const resetModelAnimations = () => {
    modelAnimations.clips = [];
    modelAnimations.currentClip = null;
};

export const viewerSettings = proxy(defaultSettings);

export const useSettings = () => useSnapshot(viewerSettings);

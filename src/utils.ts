import { fileOpen } from "browser-fs-access";
import { ModelExtension } from "./types";
import { modelInfo, resetModelAnimations } from "./store";
const BYTES_IN_MEGABYTE = 1000_000;

const revokeOldModel = () => {
    URL.revokeObjectURL(modelInfo.url);
};

export const openFilePicker = async () => {
    try {
        const modelFile: File = await fileOpen({
            description: "3D Models",
            mimeTypes: ["model/*"],
            extensions: [".gltf", ".glb", ".fbx"],
            excludeAcceptAllOption: true,
            multiple: false
        });

        updateModel(modelFile);
    } catch (err) {
        console.log(err);
    }
};

export const updateModel = (modelFile: File) => {
    revokeOldModel();
    resetModelAnimations();

    const extension = modelFile.name.toLowerCase().substring(modelFile.name.lastIndexOf(".") + 1) as ModelExtension;

    const modelURL = URL.createObjectURL(new Blob([modelFile]));
    const modelSize = modelFile.size / BYTES_IN_MEGABYTE;

    modelInfo.name = modelFile.name;
    modelInfo.url = modelURL;
    modelInfo.extension = extension;
    modelInfo.size = new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "megabyte",
        useGrouping: false,
        minimumFractionDigits: 1,
        maximumFractionDigits: 2
    }).format(modelSize);
};

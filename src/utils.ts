import { fileOpen } from "browser-fs-access";
import { ModelExtension } from "./types";
import { modelInfo, resetModelAnimations } from "./store";
const BYTES_IN_MEGABYTE = 1000_000;

const revokeOldModel = () => {
    URL.revokeObjectURL(modelInfo.url);
};

export const uploadModel = async () => {
    revokeOldModel();

    try {
        const modelFile: File = await fileOpen({
            description: "3D Models",
            mimeTypes: ["model/*"],
            extensions: [".gltf", ".glb", ".fbx"],
            excludeAcceptAllOption: true,
            multiple: false
        });

        resetModelAnimations();

        const extension = modelFile.name.substring(modelFile.name.lastIndexOf(".") + 1) as ModelExtension;
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
    } catch (err) {
        console.log(err);
    }
};

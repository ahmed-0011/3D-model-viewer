export type ModelExtension = "glb" | "gltf" | "fbx";

export interface ModelInfo {
    name: string;
    url: string;
    extension: ModelExtension;
    size: string;
}

export interface ViewerSettings {
    grid: boolean;
    wireframe: boolean;
    axes: boolean;
    autoRotate: boolean;
    stats: boolean;
    gridPositionY: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    zoom: String;
}

export interface ModelAnimations {
    clips: string[];
    currentClip: number | null;
}

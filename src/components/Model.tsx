import { FC, useEffect, useMemo } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Group, Box3, Vector3, Mesh, AnimationMixer, Object3D } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelExtension } from "@/types";
import { modelAnimations, useModelAnimations, useModelInfo, useSettings, viewerSettings } from "@/store";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

type ModelLoader = typeof GLTFLoader | typeof FBXLoader;
const DefaultLoader = GLTFLoader;

type ModelProps = {
    wireframe: boolean;
    resetOrbitController: () => void;
};

function getLoader(extension: ModelExtension): ModelLoader {
    switch (extension) {
        case "glb" || "gltf":
            return GLTFLoader;
            break;
        case "fbx":
            return FBXLoader;
            break;
        default:
            return DefaultLoader;
    }
    return DefaultLoader;
}

/*
/ visible property for object3D is set to false
/ when ErrorBoundary component handle the errors and load  
/ the default model.
/ 
/ this doesn't apply on all models some of them don't have this issue.
/ since RobotExpressive.glb have this issue, i wll set visible property to true,
/ also just in case the default model was changed later on
*/
function getObject3D(model: GLTF | Group, extension: ModelExtension): Object3D {
    switch (extension) {
        case "glb" || "glb":
            (model as GLTF).scene.visible = true;
            return (model as GLTF).scene;
        case "fbx":
            (model as Group).visible = true;
            return model as Group;
        default:
            return (model as GLTF).scene;
    }
}

function toggleWireframe(object3D: Object3D, isActive: boolean) {
    object3D.traverse(node => {
        if (!(node as Mesh).isMesh) return;
        node.receiveShadow = true;
        node.castShadow = true;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (node as Mesh).material.wireframe = isActive;
    });
}

const Model: FC<ModelProps> = ({ wireframe, resetOrbitController }) => {
    const camera = useThree(state => state.camera);
    const settingsSnapshot = useSettings();

    const modelInfoSnapshot = useModelInfo();
    const model = useLoader(getLoader(modelInfoSnapshot.extension), modelInfoSnapshot.url, loader => {
        if (loader instanceof FBXLoader) return;

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderConfig({ type: "js" });
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        loader.setDRACOLoader(dracoLoader);
    });
    const object3D: Object3D = getObject3D(model, modelInfoSnapshot.extension);

    const mixer = useMemo(() => {
        return new AnimationMixer(object3D);
    }, [object3D]);
    const daw = useModelAnimations();

    useFrame((state, delta) => mixer.update(delta));

    useEffect(() => {
        (function applyZoom() {
            const cameraPosition = camera.position;
            if (settingsSnapshot.zoom.valueOf() === "In") {
                cameraPosition.x = cameraPosition.x / 1.2;
                cameraPosition.y = cameraPosition.y / 1.2;
                cameraPosition.z = cameraPosition.z / 1.2;
            } else if (settingsSnapshot.zoom.valueOf() === "Out") {
                cameraPosition.x = cameraPosition.x * 1.2;
                cameraPosition.y = cameraPosition.y * 1.2;
                cameraPosition.z = cameraPosition.z * 1.2;
            }
        })();
    }, [camera, settingsSnapshot.zoom]);

    useEffect(() => {
        object3D.position.set(0, 0, 0);
        object3D.scale.set(1.0, 1.0, 1.0);
        let box = new Box3().setFromObject(object3D);
        let size = box.getSize(new Vector3());
        let scale = 1.6 / size.y;
        scale = 2.0 / size.x < scale ? 2.0 / size.x : scale;
        scale = 2.0 / size.z < scale ? 2.0 / size.z : scale;
        scale += scale / 1.5;
        object3D.scale.set(scale, scale, scale);
        object3D.updateMatrixWorld();

        box = new Box3().setFromObject(object3D);
        const center = box.getCenter(new Vector3());
        size = box.getSize(new Vector3());

        viewerSettings.gridPositionY = -size.y / 2;
        object3D.position.x = -center.x;
        object3D.position.y = -center.y;
        object3D.position.z = -center.z;

        return () => {
            resetOrbitController();
        };
    }, [object3D, resetOrbitController]);

    useEffect(() => {
        toggleWireframe(object3D, wireframe);
    }, [object3D, wireframe]);

    useEffect(() => {
        modelAnimations.clips = model.animations.map(e => e.name);
    }, [model]);

    useEffect(() => {
        if (daw.currentClip !== null && daw.currentClip >= 1) {
            void mixer.clipAction(model.animations[daw.currentClip - 1]).play();
        }

        return () => {
            model.animations.forEach(clip => mixer.clipAction(clip).stop());
        };
    }, [daw.currentClip, mixer, model.animations]);

    return <primitive object={object3D} />;
};

export default Model;

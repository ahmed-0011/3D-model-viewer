import { Suspense, FC, useRef, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { PerspectiveCamera } from "three";
import Model from "./Model";
import { useFullscreen } from "@mantine/hooks";
import { displayDefaultModel, useSettings, viewerSettings } from "@/store";
import { MantineTheme, ActionIcon } from "@mantine/core";
import styled from "@emotion/styled";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { IconMaximize, IconMinimize, IconZoomIn, IconZoomOut } from "@tabler/icons";

const CanvasContainer = styled.div`
    display: grid;
    grid-template-columns: auto 8%;
    height: 50vh;
    background-color: ${({ theme }) =>
        (theme as MantineTheme).colorScheme === "light" ? "#fff" : (theme as MantineTheme).colors.gray[9]};

    & > div {
        grid-column: 1/-1;
        grid-row: 1/-1;
    }

    & > .mantine-ActionIcon-root {
        grid-column: 2/-1;
        grid-row: 1/-1;
        margin-top: 1.05em;
        margin-right: 1.05em;
        justify-self: end;
    }

    @media (min-width: 768px) {
        width: 80vw;
        height: 100vh;
    }
`;

const ZoomButtonsContainer = styled.div`
    margin-top: auto;
    grid-column: 2/-1;
    grid-row: 1/-1;
    justify-self: end;
    margin-bottom: 1.05em;
    margin-right: 1.05em;
`;

// function CameraHelper() {
//     const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
//     console.log(camera);
//     return (
//         <group position={[0, 0, 2]}>
//             <cameraHelper args={[camera]} />
//         </group>
//     );
// }

const ErrorFallback = ({ error, resetErrorBoundary }: { error: any; resetErrorBoundary: any }) => {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    resetErrorBoundary();
    return null;
};

const ModelViewer: FC = () => {
    const settingsSnapshot = useSettings();
    const { ref: toggleRef, toggle: toggleFullscreen, fullscreen } = useFullscreen();
    const orbitControllerRef = useRef<OrbitControlsImpl>(null);
    const canvasContainerRef = useRef<HTMLElement | null>(null);

    const resetOrbitController = useCallback(() => {
        orbitControllerRef.current?.reset();
    }, []);

    return (
        <CanvasContainer
            ref={el => {
                toggleRef(el);
                canvasContainerRef.current = el;
            }}
        >
            <Canvas dpr={[1, 2]} shadows camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 3] }}>
                <pointLight position={[-10, -10, -10]} />
                <hemisphereLight intensity={1} />
                <Suspense fallback={null}>
                    <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onReset={() => {
                            displayDefaultModel();
                        }}
                    >
                        <Model wireframe={settingsSnapshot.wireframe} resetOrbitController={resetOrbitController} />
                    </ErrorBoundary>
                </Suspense>
                <OrbitControls ref={orbitControllerRef} autoRotate={settingsSnapshot.autoRotate} enablePan={false} />
                {settingsSnapshot.grid && (
                    <gridHelper args={[15, 15, `white`, `gray`]} position={[0, settingsSnapshot.gridPositionY, 0]} />
                )}
                {settingsSnapshot.axes && <axesHelper position={[0, settingsSnapshot.gridPositionY - 0.01, 0]} />}
                {settingsSnapshot.stats && <Stats showPanel={0} parent={canvasContainerRef} />}
            </Canvas>
            <ActionIcon
                variant="transparent"
                title="toggle fullscreen"
                size={"lg"}
                onClick={() => void toggleFullscreen()}
            >
                {fullscreen ? <IconMinimize size={40} /> : <IconMaximize size={40} />}
            </ActionIcon>

            <ZoomButtonsContainer>
                <ActionIcon title="ZoomIn" size={"lg"} onClick={() => (viewerSettings.zoom = new String("In"))}>
                    <IconZoomIn size={40} />
                </ActionIcon>
                <ActionIcon title="ZoomOut" size={"lg"} onClick={() => (viewerSettings.zoom = new String("Out"))}>
                    <IconZoomOut size={40} />
                </ActionIcon>
            </ZoomButtonsContainer>
        </CanvasContainer>
    );
};

export default ModelViewer;

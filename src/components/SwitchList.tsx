import { useSettings, viewerSettings } from "@/store";
import Switch from "@components/Switch/Switch";

const SwitchList = () => {
    const settings = useSettings();

    return (
        <>
            <Switch
                label="Grid"
                onClick={() => {
                    viewerSettings.grid = !viewerSettings.grid;
                }}
                checked={settings.grid}
            />
            <Switch
                label="Wireframe"
                onClick={() => {
                    viewerSettings.wireframe = !viewerSettings.wireframe;
                }}
                checked={settings.wireframe}
            />
            <Switch
                label="Axes"
                onClick={() => {
                    viewerSettings.axes = !viewerSettings.axes;
                }}
                checked={settings.axes}
            />
            <Switch
                label="Auto rotate"
                onClick={() => {
                    viewerSettings.autoRotate = !viewerSettings.autoRotate;
                }}
                checked={settings.autoRotate}
            />
            <Switch
                label="Stats"
                onClick={() => {
                    viewerSettings.stats = !viewerSettings.stats;
                }}
                checked={settings.stats}
            />
        </>
    );
};

export default SwitchList;

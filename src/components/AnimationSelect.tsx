import { modelAnimations, useModelAnimations } from "@/store";
import { NativeSelect } from "@mantine/core";
import { IconRun } from "@tabler/icons";

const AnimationSelect = () => {
    const modelAnimationsSnapshot = useModelAnimations();

    return (
        <NativeSelect
            my={16}
            data={["None", ...modelAnimationsSnapshot.clips]}
            label="Animation"
            icon={<IconRun size={16} />}
            value={
                !modelAnimationsSnapshot.currentClip
                    ? "None"
                    : modelAnimationsSnapshot.clips[modelAnimationsSnapshot.currentClip - 1]
            }
            onChange={a => {
                modelAnimations.currentClip = a.currentTarget.options.selectedIndex;
            }}
            disabled={modelAnimationsSnapshot.clips.length === 0}
        />
    );
};

export default AnimationSelect;

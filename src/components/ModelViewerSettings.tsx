import { FC } from "react";
import styled from "@emotion/styled";
import { ScrollArea as MantineScrollArea, Group, MantineTheme } from "@mantine/core";
import SwitchList from "@components/SwitchList";
import UploadButton from "@components/Button/UploadButton";
import { openFilePicker } from "@/utils";
import AnimationSelect from "@components/AnimationSelect";
import ModelData from "@components/ModelData";
import ColorsSchemeSwitch from "@components/Switch/ColorsSchemeSwitch";
import { Icon3dCubeSphere } from "@tabler/icons";

const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 50vh;
    overflow: hidden;
    background-color: ${({ theme }) =>
        (theme as MantineTheme).colorScheme === "light"
            ? (theme as MantineTheme).colors.gray[0]
            : (theme as MantineTheme).colors.dark[6]};
    box-shadow: ${({ theme }) =>
        `${(theme as MantineTheme).shadows.xl}, inset 0px 5px 10px -10px ${(theme as MantineTheme).colors.violet[5]}`};

    @media (min-width: 768px) {
        width: 20vw;
        height: 100vh;
        box-shadow: ${({ theme }) =>
            `${(theme as MantineTheme).shadows.xl}, inset 5px 0px 10px -10px ${
                (theme as MantineTheme).colors.violet[5]
            }`};
    }
`;

const SceneSettings = styled.div`
    min-height: 100%;
    padding: 1em;
`;

const ScrollArea = styled(MantineScrollArea)`
    height: 100%;
`;

const ModelUploader: FC = () => {
    const handleClick = () => {
        void openFilePicker();
    };

    return (
        <>
            <SettingsContainer>
                <Group position="center" mt={12}>
                    <ColorsSchemeSwitch />
                </Group>
                <ScrollArea type="auto">
                    <SceneSettings>
                        <SwitchList />
                        <AnimationSelect />
                        <ModelData />
                    </SceneSettings>
                </ScrollArea>
                <UploadButton onClick={handleClick} leftIcon={<Icon3dCubeSphere size={24} />}>
                    Upload Model
                </UploadButton>
            </SettingsContainer>
        </>
    );
};

export default ModelUploader;

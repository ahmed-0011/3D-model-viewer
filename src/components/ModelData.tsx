import { useModelInfo } from "@/store";
import { Text } from "@mantine/core";
const ModelData = () => {
    const modelInfoSnapshot = useModelInfo();

    return (
        <>
            <Text my={16}>{`Model: ${modelInfoSnapshot.name}`}</Text>
            <Text>{`Size: ${modelInfoSnapshot.size}`}</Text>
        </>
    );
};

export default ModelData;

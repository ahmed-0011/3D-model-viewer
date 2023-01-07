import { Button, ButtonProps, createPolymorphicComponent } from "@mantine/core";
import styled from "@emotion/styled";

const _UploadButton = styled(Button)`
    height: 12vh;
    min-height: 50px;
    border-radius: 0;
`;

const UploadButton = createPolymorphicComponent<"button", ButtonProps>(_UploadButton);

export default UploadButton;

import { FC } from "react";
import { Switch as MantineSwitch } from "@mantine/core";

interface SwitchProps {
    label: string;
    color?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    checked: boolean;
}

const Switch: FC<SwitchProps> = ({ label, color, onClick, checked }) => {
    return (
        <MantineSwitch
            mt={16}
            label={label}
            color={color === undefined ? "green" : color}
            onClick={onClick}
            checked={checked}
        ></MantineSwitch>
    );
};

export default Switch;

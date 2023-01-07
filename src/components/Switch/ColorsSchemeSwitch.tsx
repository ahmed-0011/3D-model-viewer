import { Switch, useMantineTheme, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

const ColorsSchemeSwitch = () => {
    const theme = useMantineTheme();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Switch
            size="lg"
            color={colorScheme === "dark" ? "dark" : "gray"}
            onLabel={<IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />}
            offLabel={<IconMoonStars size={16} stroke={2.5} color={theme.colors.blue[6]} />}
            checked={colorScheme === "dark"}
            onClick={() => toggleColorScheme()}
        />
    );
};

export default ColorsSchemeSwitch;

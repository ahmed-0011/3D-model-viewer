import { FC } from "react";
import ModelViewer from "@components/ModelViewer";
import ModelUploader from "@components/ModelViewerSettings";
import { ColorScheme, ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import styled from "@emotion/styled";
import "./App.css";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

// function MyGlobalStyles() {
//     return <Global styles={theme => ({})} />;
// }

const App: FC = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "dark",
        getInitialValueInEffect: true
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{ primaryColor: "violet", colorScheme }}>
                {/* <MyGlobalStyles /> */}
                <div id="app">
                    <Main>
                        <ModelViewer />
                        <ModelUploader />
                    </Main>
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default App;

import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "@/styles/globals.css";

const theme = createTheme({
	/** Put your mantine theme override here */
});

export default function App({ Component, pageProps }) {
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
			<Component {...pageProps} />
		</MantineProvider>
	);
}

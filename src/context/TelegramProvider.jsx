// TelegramProvider.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TelegramContext = createContext({});

const TelegramProvider = ({ children }) => {
	const [webApp, setWebApp] = useState(null);

	useEffect(() => {
		function initWebApp() {
			const app = window.Telegram?.WebApp;
			if (app) {
				app.ready();
				setWebApp(app);
			} else {
				console.log('Telegram WebApp is undefined, retrying…');
				setTimeout(initWebApp, 1000);
			}
		}
		initWebApp();
	}, []);

	const value = useMemo(() => {
		return webApp
			? {
				webApp,
				unsafeData: webApp.initDataUnsafe,
				user: webApp.initDataUnsafe.user,
			}
			: {};
	}, [webApp]);

	return (
		<TelegramContext.Provider value={value}>
			{children}
		</TelegramContext.Provider>
	);
};

export const useTelegram = () => useContext(TelegramContext);
export default TelegramProvider;
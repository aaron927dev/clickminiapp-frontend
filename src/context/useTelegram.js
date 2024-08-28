import { useState, useEffect } from 'react';

const useTelegram = () => {
    const [webApp, setWebApp] = useState(null);

    useEffect(() => {
        setWebApp(window.Telegram.WebApp);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return webApp;
};

export default useTelegram;

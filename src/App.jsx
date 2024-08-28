import { useState, useEffect } from 'react'
import { Howl } from 'howler';
import TelegramProvider, { useTelegram } from './context/TelegramProvider';

const Audio = {
	click: new Howl({ src: './audio/click.wav'}),
	notify: new Howl({ src: './audio/notify.wav'})
};

function App() {
	const webApp = useTelegram();
	const [username, setUsername] = useState("unknown");
	const [count, setCount] = useState(0);
	const [maxCount, setMax] = useState(0);
	const [pushed, setPushed] = useState(false);
	
	useEffect(() => {
	  function initWebApp() {
		  if(webApp.ready) {
			webApp.ready();
			const user = webApp.initDataUnsafe.user;
			if(user) setUsername(user.username);
		  }
			else {
			console.log('Telegram WebApp is undefined, retrying...');
			setTimeout(initWebApp, 500);
			}
		  }
		  initWebApp();
	}, [webApp]);

	const mouseDownHandler = () => {
		let isBreak = (count / 100 >= Math.random());
		if(isBreak) {
			Audio.notify.play();
			setCount(0);
		}
		else {
			Audio.click.play();
			setCount(count + 1);
			if (count + 1 > maxCount) setMax(count + 1);
		}
		setPushed(true);
	}
	const mouseUpHandler = () => setPushed(false);
	const mouseLeaveHandler = () => setPushed(false);

	return (
		<TelegramProvider>
			<div className='w-full min-h-screen bg-blue-300'>
				<div className='container flex justify-center pt-40'>
					<div onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} onMouseLeave={mouseLeaveHandler} className={`w-60 h-60 relative bg-gradient-to-t from-purple-400 to-purple-200 rounded-full border-slate-700 border`} style={{ transform: 'rotateX(30deg)' }}>
						<div className={`w-48 h-48 absolute top-3 left-6 bg-indigo-500 rounded-full shadow-slate-600 border-2 border-slate-700 ${pushed ? 'shadow-md' : 'shadow-lg'}`}></div>
						<div className={`w-48 h-48 select-none absolute -top-1 left-6 bg-gradient-to-t from-indigo-400 to-indigo-300 rounded-full cursor-pointer transition-all duration-200 flex justify-center items-center text-5xl font-bold ${pushed ? 'translate-y-4' : ''}`}>{ count }</div>
					</div>
				</div>
				<p className="text-2xl text-center">{username}</p>
				<p className='text-xl text-center'>Your max point: <span className='font-bold'>{maxCount}</span></p>
			</div>
		</TelegramProvider>
	)
}

export default App;

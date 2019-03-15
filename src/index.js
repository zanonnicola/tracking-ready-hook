import {useState, useEffect} from 'react';

function useTrackingIsLoaded(timeout = 5000) {
	const [status, updateStatus] = useState(false);
	const [error, updateError] = useState(null);

	useEffect(() => {
		let rafId;

		// Set a timeout to stop things when duration time elapses
		const timerStop = setTimeout(() => {
			cancelAnimationFrame(rafId);
			updateError(new Error('Timeout. Google analytics not injected!'));
		}, timeout);
		// Function to be executed on each animation frame
		function check() {
			const ga =
        window.google_tag_manager !== undefined ||
        typeof window.ga !== 'undefined';
			if (ga) {
				updateStatus(true);
				clearTimeout(timerStop);
			} else {
				rafId = requestAnimationFrame(check);
			}
		}

		// Start the loop
		check();

		return () => {
			cancelAnimationFrame(rafId);
			clearTimeout(timerStop);
		};
	}, [timeout]);

	return [status, error];
}

export {useTrackingIsLoaded};

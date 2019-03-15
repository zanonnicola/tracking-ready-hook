function useIsEvilLoaded(timeout = 5000) {
    const [status, updateStatus] = useState(false);
    const [error, updateError] = useState(null);
  
    useEffect(
      () => {
        let rafId, timerStop;
        // Function to be executed on each animation frame
        function check() {
          const ga =
            window.google_tag_manager !== undefined ||
            typeof window.ga !== "undefined";
          if (ga) {
            updateStatus(true);
            clearTimeout(timerStop);
          } else {
            rafId = requestAnimationFrame(check);
          }
        }
  
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(rafId);
          updateError(new Error("Timeout. Google analytics not injected!"));
        }, timeout);
        // Start the loop
        check();
  
        return () => {
          cancelAnimationFrame(rafId);
          clearTimeout(timerStop);
        };
      },
      [timeout]
    );
  
    return [status, error];
  }
  
  export { useIsEvilLoaded };
  
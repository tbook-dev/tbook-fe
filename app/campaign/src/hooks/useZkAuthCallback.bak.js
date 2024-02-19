import { useState, useEffect } from "react";
import { useEnokiFlow } from "@mysten/enoki/react";

export function useZkAuthCallback() {
    const flow = useEnokiFlow();
    const [state, setState] = useState(null);
    const [handled, setHandled] = useState(false);
    const [hash, setHash] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const listener = () => setHash(window.location.hash.slice(1).trim());
        listener();

        window.addEventListener('hashchange', listener);
        return () => window.removeEventListener('hashchange', listener);
    }, []);

    useEffect(() => {
        if (!hash) return;

        (async () => {
            try {
                setState(await flow.handleAuthCallback(hash));

                window.location.hash = '';
            } catch(e) {
                setError(e)
            } finally {
                setHandled(true);
            }
        })();
    }, [hash, flow]);

    return { handled, state, error };
}
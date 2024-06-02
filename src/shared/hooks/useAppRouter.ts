import {NavigateOptions, useNavigate} from 'react-router-dom';

const VITE_BASE = import.meta.env.VITE_BASE || '/';

export default function useAppRouter() {
    const navigate = useNavigate();

    function goTo(path?: string, options?: NavigateOptions) {
        navigate(VITE_BASE + path, options);
    }

    return {
        goTo
    };
}
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export type UrlParams = {
    chat_id: string | undefined;
};

function useRouter(): { navigate: ReturnType<typeof useNavigate>; params: UrlParams } {
    const navigate = useNavigate();
    const params = useParams<keyof UrlParams>();
    return { navigate, params };
}

export default useRouter;

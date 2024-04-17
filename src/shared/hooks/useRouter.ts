import { useParams } from 'react-router';
import { useNavigate, useLocation } from 'react-router-dom';

export type UrlParams = {
    chat_id: string | undefined;
    contact_id: string | undefined;
    user_id: string | undefined;
    employee_id: string | undefined;
    company_id: string | undefined;
    department_id: string | undefined;
    call_data: string | undefined;
};

function useRouter(): { navigate: ReturnType<typeof useNavigate>; params: UrlParams; pathname: string; lastPath?: string } {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const params = useParams<keyof UrlParams>();

    const lastPath = pathname.split('/').pop();

    return { navigate, params, pathname, lastPath };
}

export default useRouter;

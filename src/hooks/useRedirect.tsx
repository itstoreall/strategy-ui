import { useRouter } from 'next/navigation';

const useRedirect = () => {
  const router = useRouter();

  const redirectTo = (path: '/' | '/dashboard' = '/') => {
    router.push(path);
  };

  return redirectTo;
};

export default useRedirect;

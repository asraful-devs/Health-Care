'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const LoginSuccessToast = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasShownToast = useRef(false);

    useEffect(() => {
        const loggedIn = searchParams.get('loggedIn');

        // Only execute once per mount when loggedIn param is present
        if (loggedIn === 'true' && !hasShownToast.current) {
            hasShownToast.current = true;
            toast.success('You have been logged in successfully.');

            // Remove the query param and replace URL
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('loggedIn');
            router.replace(newUrl.pathname + newUrl.search);
        }

        // Reset flag when loggedIn param is removed
        if (loggedIn !== 'true' && hasShownToast.current) {
            hasShownToast.current = false;
        }
    }, [searchParams, router]);

    return null;
};

export default LoginSuccessToast;

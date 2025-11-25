'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const LogoutSuccessToast = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const hasShownToast = useRef(false);

    useEffect(() => {
        const loggedOut = searchParams.get('loggedOut');

        // Only execute once per mount when loggedOut param is present
        if (loggedOut === 'true' && !hasShownToast.current) {
            hasShownToast.current = true;
            toast.success('You have been logged out successfully.');

            // Remove the query param and replace URL
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('loggedOut');
            router.replace(newUrl.pathname + newUrl.search);
        }

        // Reset flag when loggedOut param is removed
        if (loggedOut !== 'true' && hasShownToast.current) {
            hasShownToast.current = false;
        }
    }, [searchParams, router]);

    return null;
};

export default LogoutSuccessToast;

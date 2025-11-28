'use client';

import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SpecialitiesFormDialog from './SpecialitiesFormDialog';

const SpecialitiesManagementHeader = () => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        router.refresh();
    };
    return (
        <>
            <SpecialitiesFormDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={handleSuccess}
            />

            <ManagementPageHeader
                title='Specialties Management'
                description='Manage Specialties information and details'
                action={{
                    label: 'Add Specialty',
                    icon: Plus,
                    onClick: () => setIsDialogOpen(true),
                }}
            />
        </>
    );
};

export default SpecialitiesManagementHeader;

'use client';

import ManagementPageHeader from '@/components/shared/ManagementPageHeader';
import { ISpecialty } from '@/types/specialities.interface';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DoctorFormDialog from './DoctorFormDialog';

interface DoctorsManagementHeaderProps {
    specialities?: ISpecialty[];
}

const DoctorsManagementHeader = ({
    specialities,
}: DoctorsManagementHeaderProps) => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        router.refresh();
    };
    return (
        <>
            <DoctorFormDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={handleSuccess}
                specialities={specialities}
            />

            <ManagementPageHeader
                title='Doctors Management'
                description='Manage Doctors information and details'
                action={{
                    label: 'Add Doctor    ',
                    icon: Plus,
                    onClick: () => setIsDialogOpen(true),
                }}
            />
        </>
    );
};

export default DoctorsManagementHeader;

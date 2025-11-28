import SpecialitiesManagementHeader from '@/components/modules/Admin/SpecialitiesManagement/SpecialitiesManagementHeader';
import SpecialitiesTable from '@/components/modules/Admin/SpecialitiesManagement/SpecialitiesTable';
import RefreshButton from '@/components/shared/RefreshButton';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { getSpecialities } from '@/services/admin/specialitiesManagement';
import { Suspense } from 'react';

const AdminSpecialitiesManagementPage = async () => {
    const result = await getSpecialities();

    // Handle different response structures
    const specialities = Array.isArray(result?.data?.data)
        ? result.data.data
        : Array.isArray(result)
        ? result
        : [];

    return (
        <div className='space-y-6'>
            <SpecialitiesManagementHeader />
            <div className='flex'>
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                <SpecialitiesTable specialities={specialities} />
            </Suspense>
        </div>
    );
};

export default AdminSpecialitiesManagementPage;

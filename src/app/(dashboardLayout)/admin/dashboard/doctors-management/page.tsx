import DoctorsManagementHeader from '@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader';
import DoctorsTable from '@/components/modules/Admin/DoctorsManagement/DoctorsTable';
import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/shared/SelectFilter';
import TablePagination from '@/components/shared/TablePagination';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { getDoctors } from '@/services/admin/doctorManagement';
import { getSpecialities } from '@/services/admin/specialitiesManagement';
import { ISpecialty } from '@/types/specialities.interface';
import { Suspense } from 'react';

const AdminDoctorsManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const specialitiesResult = await getSpecialities();
    const doctorsResult = await getDoctors(queryString);

    // Handle data structure
    const specialitiesData = Array.isArray(specialitiesResult?.data)
        ? specialitiesResult.data
        : Array.isArray(specialitiesResult?.data?.data)
        ? specialitiesResult.data.data
        : [];

    const doctorsData = Array.isArray(doctorsResult?.data)
        ? doctorsResult.data
        : Array.isArray(doctorsResult?.data?.data)
        ? doctorsResult.data.data
        : [];

    const meta = doctorsResult?.data?.meta || {
        page: 1,
        limit: 10,
        total: 0,
    };

    const totalPages = Math.ceil(meta.total / meta.limit);

    return (
        <div className='space-y-6'>
            <DoctorsManagementHeader specialities={specialitiesData} />
            <div className='flex space-x-2'>
                <SearchFilter
                    paramName='searchTerm'
                    placeholder='Search doctors...'
                />
                <SelectFilter
                    paramName='speciality'
                    options={specialitiesData.map((speciality: ISpecialty) => ({
                        label: speciality.title,
                        value: speciality.title,
                    }))}
                    placeholder='Filter by speciality'
                />
                <RefreshButton />
            </div>
            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <DoctorsTable
                    doctors={doctorsData}
                    specialities={specialitiesData}
                />
                <TablePagination
                    currentPage={meta.page}
                    totalPages={totalPages}
                />
            </Suspense>
        </div>
    );
};

export default AdminDoctorsManagementPage;

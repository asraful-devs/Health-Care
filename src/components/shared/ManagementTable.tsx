import React from 'react';

interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
}

interface ManagementTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    getRowKey?: (row: T) => string | number;
    emptyMessage?: string;
    isRefreshing?: boolean;
}

const ManagementTable = <T,>({
    data,
    columns,
    onView,
    onEdit,
    onDelete,
    getRowKey,
    emptyMessage = 'No data available.',
    isRefreshing = false,
}: ManagementTableProps<T>) => {
    return <div></div>;
};

export default ManagementTable;

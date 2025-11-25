import { UserRole } from '@/lib/auth-utils';

export interface UserInfo {
    id: string;
    email: string;
    role: UserRole;
}

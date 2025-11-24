'use server';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserInfo } from '../../types/user.interface';
import { getCookie } from './tokenHandlers';

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const accessToken = await getCookie('accessToken');
        if (!accessToken) {
            return null;
        }

        const verifiedToken = jwt.verify(
            accessToken,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        if (!verifiedToken) {
            return null;
        }

        const userInfo: UserInfo = {
            name: verifiedToken.name,
            email: verifiedToken.email,
            role: verifiedToken.role,
        };

        return userInfo;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return null;
    }
};

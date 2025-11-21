/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { parse } from 'cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDefaultDashboardRoute, UserRole } from '../../lib/auth-utils';
import { loginValidationZodSchema } from './zod';

export const loginUser = async (
    _currentState: any,
    formData: any
): Promise<any> => {
    try {
        const redirectTo = formData.get('redirect') as string | null;
        console.log(redirectTo, 'server Actions');
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const validatedFields = loginValidationZodSchema.safeParse(loginData);

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map((issue) => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    };
                }),
            };
        }

        const res = await fetch('http://localhost:5000/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await res.json();

        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            });
        } else {
            throw new Error('No Set-Cookie header found');
        }

        if (!accessTokenObject) {
            throw new Error('Tokens not found in cookies');
        }

        if (!refreshTokenObject) {
            throw new Error('Tokens not found in cookies');
        }

        const cookieStore = await cookies();

        cookieStore.set('accessToken', accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || '/',
            sameSite: accessTokenObject['SameSite'] || 'none',
        });

        cookieStore.set('refreshToken', refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge:
                parseInt(refreshTokenObject['Max-Age']) ||
                1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || '/',
            sameSite: refreshTokenObject['SameSite'] || 'none',
        });

        if (!res.ok) {
            return { success: false, error: result.message || 'Login failed' };
        }

        const verifiedToken: JwtPayload | string = jwt.verify(
            accessTokenObject.accessToken,
            process.env.JWT_ACCESS_SECRET as string
        );
        if (typeof verifiedToken === 'string') {
            throw new Error('Invalid token');
        }

        const userRole: UserRole = (verifiedToken as JwtPayload).role;

        redirect(
            redirectTo
                ? redirectTo.toString()
                : getDefaultDashboardRoute(userRole)
        );
    } catch (error) {
        if ((error as any)?.digest?.startsWith?.('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { error: 'Login failed' };
    }
};

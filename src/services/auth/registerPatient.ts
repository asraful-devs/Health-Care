/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { loginUser } from './loginUser';
import { registerValidationZodSchema } from './zod';

export const registerPatient = async (
    _currentState: any,
    formData: any
): Promise<any> => {
    try {
        // console.log(formData.get('address'));
        const validationData = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        };

        const validatedFields =
            registerValidationZodSchema.safeParse(validationData);

        console.log(validatedFields, 'val');

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

        const registerData = {
            password: formData.get('password'),
            patient: {
                name: formData.get('name'),
                address: formData.get('address'),
                email: formData.get('email'),
            },
        };

        const newFormData = new FormData();

        newFormData.append('data', JSON.stringify(registerData));

        const res = await fetch(
            'http://localhost:5000/api/v1/user/create-patient',
            {
                method: 'POST',
                body: newFormData,
            }
        );
        const result = await res.json();

        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;
    } catch (error) {
        if ((error as any)?.digest?.startsWith?.('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? (error as Error).message
                    : 'Registration failed. You might have entered incorrect credentials.'
            }`,
        };
    }
};

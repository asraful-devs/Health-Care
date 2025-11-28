/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { serverFetch } from '../../lib/serverFetchHelper';
import { zodValidator } from '../../lib/zodValidator';
import { createSpecialityZodSchema } from '../../zod/createSpecialityZodSchema';

export async function createSpeciality(_prevState: any, formData: FormData) {
    try {
        const payload = {
            title: formData.get('title') as string,
        };

        if (
            zodValidator(payload, createSpecialityZodSchema).success === false
        ) {
            return zodValidator(payload, createSpecialityZodSchema);
        }

        const validatedPayload = zodValidator(
            payload,
            createSpecialityZodSchema
        ).data;

        const newFormData = new FormData();
        newFormData.append('data', JSON.stringify(validatedPayload));

        if (formData.get('file')) {
            newFormData.append('file', formData.get('file') as Blob);
        }

        const response = await serverFetch.post(
            '/specialties/create-specialty',
            {
                body: newFormData,
            }
        );

        const result = await response.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong'
            }`,
        };
    }
}

export async function getSpecialities() {
    try {
        const response = await serverFetch.get(
            '/specialties/get-all-specialties'
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong'
            }`,
        };
    }
}

export async function deleteSpeciality(id: string) {
    try {
        const response = await serverFetch.delete(
            `/specialties/delete-specialty/${id}`
        );
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : 'Something went wrong'
            }`,
        };
    }
}

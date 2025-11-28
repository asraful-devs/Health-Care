'use client';
import InputFieldError from '@/components/shared/InputFieldError';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { createSpeciality } from '@/services/admin/specialitiesManagement';
import { useActionState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface ISpecialitiesFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const SpecialitiesFormDialog = ({
    open,
    onClose,
    onSuccess,
}: ISpecialitiesFormDialogProps) => {
    const [state, formAction, pending] = useActionState(createSpeciality, null);
    const toastShownRef = useRef(false);

    useEffect(() => {
        if (state && !toastShownRef.current) {
            if (state?.success) {
                toast.success(
                    state.message || 'Specialty created successfully'
                );
                toastShownRef.current = true;
                onSuccess();
                onClose();
            } else if (!state.success) {
                toast.error(state.message || 'Failed to create specialty');
                toastShownRef.current = true;
            }
        }
    }, [state, onSuccess, onClose]);

    // Reset toast shown flag when dialog opens/closes
    useEffect(() => {
        if (open) {
            toastShownRef.current = false;
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Specialty</DialogTitle>
                </DialogHeader>

                <form action={formAction} className='space-y-4'>
                    <Field>
                        <FieldLabel htmlFor='title'>Title</FieldLabel>
                        <Input
                            id='title'
                            name='title'
                            placeholder='Cardiology'
                            required
                        />
                        <InputFieldError field='title' state={state} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor='file'>Upload Icon</FieldLabel>

                        <Input
                            id='file'
                            name='file'
                            type='file'
                            accept='image/*'
                        />
                        <InputFieldError field='file' state={state} />
                    </Field>

                    <div className='flex justify-end gap-2'>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={onClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' disabled={pending}>
                            {pending ? 'Saving...' : 'Save Specialty'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SpecialitiesFormDialog;

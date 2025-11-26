'use client';

import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';

interface EyeButtonProps {
    isVisible: boolean;
    onToggle: () => void;
}

const EyeButton = ({ isVisible, onToggle }: EyeButtonProps) => {
    return (
        <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={onToggle}
            className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 p-0 hover:bg-transparent'
            aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
            {isVisible ? (
                <Eye className='h-4 w-4 text-gray-500' />
            ) : (
                <EyeOff className='h-4 w-4 text-gray-500' />
            )}
        </Button>
    );
};

export default EyeButton;

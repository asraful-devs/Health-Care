'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { ModeToggle } from './ModeToggle';

const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Services', link: '/services' },
        { name: 'Contact', link: '/contact' },
    ];

    return (
        <nav className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between md:h-20'>
                    {/* Logo */}
                    <Link
                        href='/'
                        className='group flex items-center space-x-2 transition-all duration-300'
                    >
                        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105'>
                            <span className='text-lg font-bold'>HC</span>
                        </div>
                        <span className='hidden font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 sm:inline-block text-base md:text-lg'>
                            Health Care
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className='hidden items-center space-x-1 md:flex'>
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className='relative px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 group'
                            >
                                <span className='relative'>
                                    {item.name}
                                    <span className='absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full'></span>
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Section - Desktop */}
                    <div className='hidden items-center space-x-3 md:flex'>
                        <ModeToggle />
                        <Link href='/login'>
                            <Button
                                variant='outline'
                                className='transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:bg-gray-800'
                            >
                                Login
                            </Button>
                        </Link>
                        <Link href='/signup'>
                            <Button className='bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 dark:from-blue-600 dark:to-blue-700'>
                                Sign Up
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button & Right Section - Mobile */}
                    <div className='flex items-center space-x-2 md:hidden'>
                        <ModeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                            aria-expanded='false'
                        >
                            <span className='sr-only'>Open main menu</span>
                            {isOpen ? (
                                <X className='h-6 w-6 transition-transform duration-300' />
                            ) : (
                                <Menu className='h-6 w-6 transition-transform duration-300' />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className='animate-in fade-in slide-in-from-top-2 overflow-hidden border-t border-gray-200 bg-white/95 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/95 md:hidden'>
                        <div className='space-y-1 px-2 pb-4 pt-2'>
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.link}
                                    onClick={() => setIsOpen(false)}
                                    className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-all duration-300 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400'
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className='space-y-2 border-t border-gray-200 pt-4 dark:border-gray-800'>
                                <Link
                                    href='/login'
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button
                                        variant='outline'
                                        className='w-full transition-all duration-300 hover:scale-105 dark:hover:bg-gray-800'
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link
                                    href='/signup'
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button className='w-full bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl dark:from-blue-600 dark:to-blue-700'>
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default PublicNavbar;

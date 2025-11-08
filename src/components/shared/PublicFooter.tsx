'use client';

import {
    ArrowUp,
    Facebook,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

// ==================== TYPES ====================
interface FooterLink {
    name: string;
    link: string;
}

interface SocialLink {
    icon: typeof Facebook;
    link: string;
    label: string;
}

interface FooterContent {
    brand: {
        name: string;
        description: string;
        phone: string;
        email: string;
        address: string;
    };
    sections: Record<string, FooterLink[]>;
    social: SocialLink[];
    newsletter: {
        title: string;
        description: string;
        buttonText: string;
        placeholder: string;
    };
    bottom: {
        copyright: string;
        madeWith: string;
    };
}

// ==================== CONSTANTS ====================
const FOOTER_CONTENT: FooterContent = {
    brand: {
        name: 'Health Care',
        description:
            'Providing comprehensive healthcare solutions with excellence',
        phone: '+1 (555) 123-4567',
        email: 'info@healthcare.com',
        address: '123 Medical Center, Healthcare City, HC 12345',
    },
    sections: {
        company: [
            { name: 'About Us', link: '/about' },
            { name: 'Our Team', link: '/team' },
            { name: 'Careers', link: '/careers' },
            { name: 'Blog', link: '/blog' },
        ],
        services: [
            { name: 'Consultation', link: '/services/consultation' },
            { name: 'Diagnosis', link: '/services/diagnosis' },
            { name: 'Treatment', link: '/services/treatment' },
            { name: 'Emergency', link: '/services/emergency' },
        ],
        support: [
            { name: 'Contact Us', link: '/contact' },
            { name: 'FAQ', link: '/faq' },
            { name: 'Support', link: '/support' },
            { name: 'Feedback', link: '/feedback' },
        ],
        legal: [
            { name: 'Privacy Policy', link: '/privacy' },
            { name: 'Terms & Conditions', link: '/terms' },
            { name: 'Cookie Policy', link: '/cookies' },
            { name: 'Disclaimer', link: '/disclaimer' },
        ],
    },
    social: [
        { icon: Facebook, link: '#', label: 'Facebook' },
        { icon: Twitter, link: '#', label: 'Twitter' },
        { icon: Instagram, link: '#', label: 'Instagram' },
        { icon: Linkedin, link: '#', label: 'LinkedIn' },
    ],
    newsletter: {
        title: 'Stay Updated',
        description:
            'Subscribe for health tips, updates & exclusive wellness offers',
        buttonText: 'Subscribe',
        placeholder: 'Enter your email address',
    },
    bottom: {
        copyright: '© 2024 Health Care. All rights reserved.',
        madeWith: 'Made with',
    },
};

const PublicFooter = () => {
    const [email, setEmail] = useState<string>('');
    const [scrollTop, setScrollTop] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Scroll to top functionality
    const handleScrollTop = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Show button when page is scrolled down
    useEffect(() => {
        const handleScroll = (): void => {
            setScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNewsletterSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Add your newsletter subscription logic here
            console.log('Newsletter signup:', email);
            setEmail('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Scroll to Top Button */}
            {scrollTop && (
                <button
                    onClick={handleScrollTop}
                    className='fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-110 active:scale-95 dark:shadow-blue-600/20'
                    aria-label='Scroll to top'
                >
                    <ArrowUp className='h-5 w-5' />
                </button>
            )}

            <footer className='relative border-t border-gray-200 bg-white text-gray-900 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300'>
                {/* Newsletter Section */}
                <div className='border-b border-gray-200 dark:border-gray-800'>
                    <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
                        <div className='grid gap-6 md:grid-cols-2 md:items-center'>
                            <div>
                                <h3 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl'>
                                    {FOOTER_CONTENT.newsletter.title}
                                </h3>
                                <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                                    {FOOTER_CONTENT.newsletter.description}
                                </p>
                            </div>
                            <form
                                onSubmit={handleNewsletterSubmit}
                                className='flex flex-col gap-2 sm:flex-row'
                            >
                                <input
                                    type='email'
                                    placeholder={
                                        FOOTER_CONTENT.newsletter.placeholder
                                    }
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                    className='flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-400/20'
                                />
                                <Button
                                    type='submit'
                                    disabled={isSubmitting}
                                    className='whitespace-nowrap bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 dark:from-blue-600 dark:to-blue-700'
                                >
                                    {isSubmitting
                                        ? 'Subscribing...'
                                        : FOOTER_CONTENT.newsletter.buttonText}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8'>
                    <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-6'>
                        {/* Brand Section */}
                        <div className='lg:col-span-2'>
                            <Link
                                href='/'
                                className='group inline-flex items-center space-x-2 transition-all duration-300'
                            >
                                <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110'>
                                    <span className='font-bold'>HC</span>
                                </div>
                                <span className='font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400'>
                                    {FOOTER_CONTENT.brand.name}
                                </span>
                            </Link>
                            <p className='mt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400'>
                                {FOOTER_CONTENT.brand.description}
                            </p>

                            {/* Contact Info */}
                            <div className='mt-4 space-y-2'>
                                <a
                                    href={`tel:${FOOTER_CONTENT.brand.phone}`}
                                    className='flex items-center space-x-2 text-xs text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400'
                                >
                                    <Phone className='h-4 w-4 shrink-0 text-blue-500' />
                                    <span>{FOOTER_CONTENT.brand.phone}</span>
                                </a>
                                <a
                                    href={`mailto:${FOOTER_CONTENT.brand.email}`}
                                    className='flex items-center space-x-2 text-xs text-gray-600 transition-colors duration-300 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400'
                                >
                                    <Mail className='h-4 w-4 shrink-0 text-blue-500' />
                                    <span className='truncate'>
                                        {FOOTER_CONTENT.brand.email}
                                    </span>
                                </a>
                                <div className='flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400'>
                                    <MapPin className='h-4 w-4 shrink-0 text-blue-500 mt-0.5' />
                                    <span>{FOOTER_CONTENT.brand.address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Links Sections */}
                        {Object.entries(FOOTER_CONTENT.sections).map(
                            ([key, links]) => (
                                <div key={key}>
                                    <h4 className='text-xs font-semibold uppercase tracking-widest text-gray-900 dark:text-white'>
                                        {key.charAt(0).toUpperCase() +
                                            key.slice(1)}
                                    </h4>
                                    <ul className='mt-3 space-y-1.5'>
                                        {links.map((item: FooterLink) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.link}
                                                    className='text-xs text-gray-600 transition-all duration-300 hover:text-blue-600 hover:translate-x-0.5 dark:text-gray-400 dark:hover:text-blue-400'
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>

                    {/* Social Media & Divider */}
                    <div className='mt-8 border-t border-gray-200 pt-6 dark:border-gray-800'>
                        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                            <div className='flex gap-3'>
                                {FOOTER_CONTENT.social.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.link}
                                            aria-label={social.label}
                                            className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md hover:scale-110 active:scale-95 dark:border-gray-700 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400'
                                        >
                                            <IconComponent className='h-4 w-4' />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className='border-t border-gray-200 dark:border-gray-800'>
                    <div className='mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8'>
                        <div className='flex flex-col items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400 sm:flex-row'>
                            <p>{FOOTER_CONTENT.bottom.copyright}</p>
                            <div className='flex items-center space-x-1'>
                                <span>{FOOTER_CONTENT.bottom.madeWith}</span>
                                <Heart className='h-3.5 w-3.5 text-red-500 fill-red-500 transition-all duration-300 hover:scale-125' />
                                <span>for better health</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default PublicFooter;

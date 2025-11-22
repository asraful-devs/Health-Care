import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from '../components/providers/theme-provider';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const suseMono = {
    variable: '--font-suse-mono',
    subsets: ['latin'],
};

export const metadata: Metadata = {
    title: 'Health Care App',
    description:
        'A modern health care application built with Next.js and TypeScript.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning={true}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${suseMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster position='top-right' richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}

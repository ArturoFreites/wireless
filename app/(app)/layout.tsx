export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen bg-gray-50">
            {children}
        </main>
    );
}

// app/(public)/layout.tsx
import Footer from "@/components/footer";
import NavBar from "@/components/navbar/navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <main className="pt-22 bg-white">{children}</main>
            <Footer />
        </>
    );
}

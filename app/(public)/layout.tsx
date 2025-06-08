// app/(public)/layout.tsx
import NavBar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <main className="pt-22 bg-white">{children}</main>
            <Footer />
        </>
    );
}

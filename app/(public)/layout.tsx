// app/(public)/layout.tsx
import FloatingCartButton from "@/components/FloatingCartButton";
import FloatWhatsappButton from "@/components/FloatWhatsappButton";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <FloatWhatsappButton/>
            <FloatingCartButton/>
            <main className="pt-22 bg-white">{children}</main>
            <Footer />
        </>
    );
}

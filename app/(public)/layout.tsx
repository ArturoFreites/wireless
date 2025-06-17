// app/(public)/layout.tsx
import FloatWhatsappButton from "@/components/FloatWhatsappButton";
import Footer from "@/components/Footer";
import NavBar from "@/components/navbar/navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <FloatWhatsappButton/>
            <main className="pt-22 bg-white">{children}</main>
            <Footer />
        </>
    );
}

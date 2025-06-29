import { Suspense } from "react";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
    return (
        <Suspense fallback={<p>Cargando productos...</p>}>
            <DashboardClient />
        </Suspense>
    );
}

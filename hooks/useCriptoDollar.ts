import { useEffect, useState } from 'react';

export type CriptoDollar = {
    moneda: string;
    casa: string;
    nombre: string;
    compra: number;
    venta: number;
    fechaActualizacion: string; // ISO string
};

export function useCriptoDollar() {
    const [data, setData] = useState<CriptoDollar | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCriptoDollar = async () => {
            try {
                const response = await fetch('https://dolarapi.com/v1/dolares/cripto');
                if (!response.ok) throw new Error('Error al obtener el dólar cripto');

                const json: CriptoDollar = await response.json();
                setData(json);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchCriptoDollar();
    }, []);

    return { data, loading, error };
}

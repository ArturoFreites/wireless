
'use client';

import { useCriptoDollar } from "@/hooks/useCriptoDollar";
import Skeleton from "./Skeleton";
type Props = {
    amount: number | null;
}

function Price({ amount }: Props) {

    const { data, loading } = useCriptoDollar();

    return (
        <>
            {
                loading ?
                    <Skeleton className="h-24 w-130 my-10 mx-10"
                    />
                    :
                    <div className="my-10">
                        <p className=" text-center font-bold text-3xl text-neutral-900">
                            $ {amount} USD
                        </p>
                        <p className="text-center text-xl mt-1 text-neutral-600">
                            $ {new Intl.NumberFormat('es-AR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }).format((amount == null ? 0 : amount) * (data==null ? 0 : data.venta))} ARS
                        </p>
                        <div className="my-6 flex flex-col justify-center items-center">
                            <p className="text-xs text-neutral-500 px-2 py-1 rounded-md">
                                Cotización dólar del día{' '}
                                {new Date(data == null ? "" : data.fechaActualizacion).toLocaleDateString('es-AR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>

                            <p className="text-center text-sm text-primary font-semibold mt-1">
                                $ {new Intl.NumberFormat('es-AR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }).format(data==null ? 0 : data.venta)}
                            </p>
                        </div>
                    </div>
            }

        </>


    );
}

export default Price

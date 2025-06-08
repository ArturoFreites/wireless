import { DOLAR } from "./services/dolar";

type Props = {
    amount: number
}

function Price({ amount }: Props) {


    return (
        <div className="my-10">
            <p className=" text-center font-bold text-3xl text-neutral-900">
                $ {amount} USD
            </p>
            <p className="text-center text-xl mt-1 text-neutral-600">
                $ {new Intl.NumberFormat('es-AR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(amount * DOLAR.venta)} ARS
            </p>
            <div className="my-6 flex flex-col justify-center items-center">
                <p className="text-xs text-neutral-500 px-2 py-1 rounded-md">
                    Cotización dólar del día{' '}
                    {new Date(DOLAR.fechaActualizacion).toLocaleDateString('es-AR', {
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
                    }).format(DOLAR.venta)}
                </p>
            </div>
        </div>
    );
}

export default Price

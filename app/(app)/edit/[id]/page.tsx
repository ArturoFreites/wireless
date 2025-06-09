import NavDashboard from "@/components/dashboard/navDashboard";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";

function EditPage() {
    return (
        <section className="flex w-full">
            <NavDashboard />
            <article className="w-5/6 flex text-neutral-800">
                <div className="w-1/3 flex items-center justify-center">
                    <p>Imagenes</p>
                </div>
                <div className="w-2/3 flex flex-col justify-center items-center">
                    <div className="grid grid-cols-2">
                        <Input
                            label="Nombre" placeHolder="Ingrese Nombre" type="text"
                        />
                        <Input
                            label="Nombre" placeHolder="Ingrese Nombre" type="text"
                        />
                        <Input
                            label="Precio" placeHolder="Ingrese precio" type="text"
                        />
                        <Input
                            label="Estado de batería" placeHolder="Ingrese estado batería" type="text"
                        />
                        <Input
                            label="Capacidad GB" placeHolder="Ingrese capacidad GB" type="number"
                        />
                        <Input
                            label="Color" placeHolder="Ingrese Color" type="text"
                        />
                        <TextArea label="Descripción" />
                    </div>
                    <button className="w-fit py-2 px-6 my-10
                        rounded-md text-xs font-semibold text-white bg-neutral-700
                    ">
                        Actualizar Producto
                    </button>
                </div>
            </article>
        </section>
    );
}

export default EditPage;
import { ChangeEvent } from "react";

type Props = {
    label: string;
    placeHolder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextArea({ label, placeHolder, value, onChange }: Props) {
    return (
        <div className="my-2 mx-6 xl:m-5">
            <p className="mb-3 text-sm">{label}</p>
            <textarea
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                className="w-full bg-neutral-200 p-2 xl:p-3 rounded-md text-sm resize-none h-36"
            />
        </div>
    );
}

export default TextArea;

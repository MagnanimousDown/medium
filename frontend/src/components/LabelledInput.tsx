interface LabelledInputType {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

export const LabelledInput = ({ id, label, type, placeholder, onChange }: LabelledInputType) => {
    return  <div className="flex flex-col my-4">
                <label className="font-semibold" htmlFor={id} >{label}</label>
                <input className="border rounded-md border-gray-400 bg-gray-50 p-1 mt-2" id={id} type={type} placeholder={placeholder} onChange={onChange} />
            </div>
}
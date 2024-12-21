interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOptional: boolean;
}

export default function RegisterInput({ label, type, placeholder, value, onChange, isOptional }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={label} className="text-secondaryBlue-500 font-medium text-xl">{label}{!isOptional && "*"}</label>
      <input className="border border-[#c2c2c2] rounded-xl w-[412px] h-16 px-4 text-xl" type={type} placeholder={placeholder} value={value} onChange={onChange} required={!isOptional} />
    </div>
  )
}
interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
}

function FormField({ label, type, placeholder }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-zinc-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-lg p-2"
      />
    </div>
  );
}

export default FormField;

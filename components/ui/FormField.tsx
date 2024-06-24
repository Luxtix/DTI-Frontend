interface FormFieldProps {
  label: string;
  type: string;
  placeholder: string;
}

function FormField({ label, type, placeholder }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-luxtix-8">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-lg p-2 focus:border-luxtix-5 focus:outline-none"
      />
    </div>
  );
}

export default FormField;

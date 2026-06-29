export default function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  textArea = false,
  classStyles,
}) {
  return (
    <div>
      <label>{label}</label>
      {textArea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={classStyles}
        />
      )}
    </div>
  );
}

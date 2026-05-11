import { Controller } from 'react-hook-form'

const CustomSelect = ({ name, label, options, control }) => {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <select {...field} className={`input-control ${error ? 'input-error' : ''}`}>
              <option value="">Select {label}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <span className="field-error">{error.message}</span>}
          </>
        )}
      />
    </div>
  )
}

export default CustomSelect
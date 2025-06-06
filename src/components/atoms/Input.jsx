const Input = ({ value, onChange, className = '', type = 'text', maxLength }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-12 h-12 text-center text-xl font-bold bg-surface-50 dark:bg-gray-700 border-2 border-surface-300 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none ${className}`}
      maxLength={maxLength}
    />
  )
}

export default Input
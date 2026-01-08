

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
          bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
}

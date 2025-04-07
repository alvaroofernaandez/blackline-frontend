


const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default function Button({ text, className }) {
  return (
    <button
      className={`group/btn shadow-input relative flex h-10 items-center justify-center space-x-2 rounded-md px-4 font-medium bg-neutral-800 dark:shadow-[0px_0px_1px_1px_#262626] ${className}`}
      type="submit"
    >
      <span className="text-sm text-neutral-700 dark:text-neutral-300">
        {text}
      </span>
      <BottomGradient />
    </button>
  );
}
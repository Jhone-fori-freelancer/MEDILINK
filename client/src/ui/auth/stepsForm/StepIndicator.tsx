export function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={`w-14 h-2 ${index <= step ? 'bg-blue-500' : 'bg-[#D9D9D9]'}`}></div>
      ))}
    </div>
  )
}
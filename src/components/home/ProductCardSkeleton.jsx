export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#ECECEA] overflow-hidden animate-pulse">
      <div className="aspect-4/3 bg-[#FAFAF9]" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-[#ECECEA] rounded-md w-1/3" />
        <div className="h-4 bg-[#ECECEA] rounded-md w-3/4" />
        <div className="h-4 bg-[#ECECEA] rounded-md w-1/2" />
        <div className="pt-2 flex items-center justify-between">
          <div className="h-5 bg-[#ECECEA] rounded-md w-1/3" />
          <div className="h-8 bg-[#ECECEA] rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
}

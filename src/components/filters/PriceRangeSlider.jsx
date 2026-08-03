const PriceRangeSlider = ({
  minPrice,
  maxPrice,
  catalogMinPrice = 0,
  catalogMaxPrice = 5000,
  onChange,
}) => {

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), maxPrice - 50);
    onChange(val, maxPrice);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), minPrice + 50);
    onChange(minPrice, val);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold text-[#1A1A1A]">
        <span>৳{minPrice}</span>
        <span>৳{maxPrice}</span>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-[10px] text-[#6B6B6B] uppercase tracking-wider font-bold block mb-1">
            Minimum Price (৳)
          </label>
          <input
            type="range"
            min={catalogMinPrice}
            max={catalogMaxPrice}
            step={50}
            value={minPrice}
            onChange={handleMinChange}
            className="w-full accent-[#FF6A1A] cursor-pointer"
          />
        </div>

        <div>
          <label className="text-[10px] text-[#6B6B6B] uppercase tracking-wider font-bold block mb-1">
            Maximum Price (৳)
          </label>
          <input
            type="range"
            min={catalogMinPrice}
            max={catalogMaxPrice}
            step={50}
            value={maxPrice}
            onChange={handleMaxChange}
            className="w-full accent-[#FF6A1A] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;

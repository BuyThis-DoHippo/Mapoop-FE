// components/toiletDetail/ToiletLocation.jsx
const ToiletLocation = ({ toilet }) => {
  if (!toilet) return null;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-heading3-bold text-black">화장실 위치</h2>
      <div className="flex gap-10">
        {/* Map */}
        <div className="w-[684px] h-80 relative bg-gray-1 rounded-[10px] border border-gray-2 overflow-hidden flex items-center justify-center">
          <div className="text-heading3-regular text-gray-5">화장실 지도</div>
          {/* Map marker simulation */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-14 h-16 relative">
              <div className="w-12 h-12 bg-amber-500 rounded-full border-4 border-orange-500 flex items-center justify-center">
                <div className="w-5 h-6 bg-white rounded flex items-center justify-center text-amber-500 text-xs font-bold">
                  🚽
                </div>
              </div>
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-body2-bold text-black whitespace-nowrap">
                소코아 홍대점
              </div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="w-64 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-body1-bold text-black">주소</h3>
            <div className="flex flex-col gap-2">
              <p className="text-body1 text-black">{toilet.location.address}</p>
              <p className="text-body1 text-black">
                <span className="text-red-900 font-bold">{toilet.subwayInfo}</span>
                <span className="text-black"> {toilet.distance}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-body1-bold text-black">장소 설명</h3>
            <p className="text-body1 text-black">{toilet.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-body1-bold text-black">화장실 태그</h3>
            <div className="flex gap-4">
              {toilet.tags.map((tag, index) => (
                <div key={index} className="px-6 py-2 bg-gray-0 rounded-[50px] flex items-center">
                  <span className="text-body2 text-gray-8">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToiletLocation;
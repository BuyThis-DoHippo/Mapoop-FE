const ToiletOperationInfo = ({ toilet }) => {
  if (!toilet || !toilet.hours) return null;

  return (
    <div className="flex gap-7">
      <div className="w-[580px] px-10 py-8 bg-white rounded-[10px] border border-gray-3 flex flex-col gap-2">
        <div className="flex flex-col gap-6">
          <h3 className="text-body1-bold text-gray-10">영업시간</h3>
          <div className="flex flex-col gap-4">
            <p className={`text-body1-bold ${toilet.hours.isOpenNow ? 'text-green-500' : 'text-red-500'}`}>
              {toilet.hours.isOpenNow ? '영업중' : '영업종료'}
            </p>
            <p className="text-body1 text-gray-8">
              {toilet.hours.isOpen24h 
                ? '매일 24시간' 
                : `매일 ${toilet.hours.openTime?.slice(0, 5)}~${toilet.hours.closeTime?.slice(0, 5)}`}
            </p>
          </div>
        </div>
      </div>

      <div className="w-[580px] px-10 py-8 bg-white rounded-[10px] border border-gray-3 flex flex-col gap-2">
        <div className="flex flex-col gap-6">
          <h3 className="text-body1-bold text-gray-10">화장실 특수사항</h3>
          <div className="flex flex-col gap-4">
            <p className="text-body1 text-gray-8">{toilet.particulars}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToiletOperationInfo;
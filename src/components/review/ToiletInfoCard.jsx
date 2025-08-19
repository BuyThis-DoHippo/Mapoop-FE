const ToiletInfoCard = ({ name, address }) => {
  return (
    <div className="w-[380px] h-[159px] px-[43px] py-[41px] bg-white rounded-[10px] border border-gray-2 flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <h3 className="text-heading3-bold text-black">{name}</h3>
        <p className="text-body1 text-black">{address}</p>
      </div>
    </div>
  );
};

export default ToiletInfoCard;
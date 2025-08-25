import TagButton from '@/components/common/TagButton';

const FacilitySelector = ({ 
  selectedFacilities = [],
  selectedCondition = [],
  selectedSpecialFacilities = [],
  onFacilityToggle,
  onConditionToggle,
  onSpecialFacilityToggle 
}) => {
  const facilities = [
    "남녀 분리", "가게 안 화장실", "24시간", "비데 있음", "위생용품 제공"
  ];

  const conditions = ["깨끗함", "칸많음"];

  const specialFacilities = ["장애인화장실", "기저귀교환대"];

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-heading3-regular text-gray-5">화장실 시설은 어떠셨나요?</h2>

      <div className="flex flex-col gap-[37px]">
        {/* Basic Facilities */}
        <div className="flex flex-col gap-[19px]">
          <h3 className="text-body1 text-gray-5">기본 시설</h3>
          <div className="flex flex-col gap-[19px]">
            {[0, 1, 2].map(rowIndex => (
              <div key={rowIndex} className="flex gap-2">
                {facilities.slice(rowIndex * 2, rowIndex * 2 + 2).map(facility => (
                  <TagButton
                    key={facility}
                    isSelected={selectedFacilities.includes(facility)}
                    onClick={() => onFacilityToggle(facility)}
                  >
                    {facility}
                  </TagButton>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Condition */}
        <div className="flex flex-col gap-[19px]">
          <h3 className="text-body1 text-gray-5">상태</h3>
          <div className="flex gap-2">
            {conditions.map(condition => (
              <TagButton
                key={condition}
                isSelected={selectedCondition.includes(condition)}
                onClick={() => onConditionToggle(condition)}
              >
                {condition}
              </TagButton>
            ))}
          </div>
        </div>

        {/* Special Facilities */}
        <div className="flex flex-col gap-[19px]">
          <h3 className="text-body1 text-gray-5">특수 시설</h3>
          <div className="flex gap-2">
            {specialFacilities.map(facility => (
              <TagButton
                key={facility}
                isSelected={selectedSpecialFacilities.includes(facility)}
                onClick={() => onSpecialFacilityToggle(facility)}
              >
                {facility}
              </TagButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitySelector;
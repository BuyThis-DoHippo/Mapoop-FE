import { facilities, specialFacilities } from '@/constants/facilityData';

const FacilityTags = ({ formData, onArrayToggle }) => {
  return (
    <div>
      <div className="text-heading3-bold text-gray-10 mb-9">화장실 시설 태그</div>
      
      <div className="space-y-8">
        {/* 기본 시설 */}
        <div>
          <div className="text-body1-bold text-gray-8 mb-4">기본 시설</div>
          <div className="flex flex-wrap gap-3">
            {facilities.map(facility => (
              <button
                key={facility}
                onClick={() => onArrayToggle('facilities', facility)}
                className={`px-4 lg:px-6 py-2 rounded-full border transition-colors whitespace-nowrap ${
                  formData.facilities.includes(facility)
                    ? 'bg-main text-white border-main'
                    : 'bg-white text-gray-5 border-gray-5'
                }`}
              >
                <span className="text-body2">{facility}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 특수 시설 */}
        <div>
          <div className="text-body1-bold text-gray-8 mb-4">특수 시설</div>
          <div className="flex flex-wrap gap-3">
            {specialFacilities.map(facility => (
              <button
                key={facility}
                onClick={() => onArrayToggle('specialFacilities', facility)}
                className={`px-4 lg:px-6 py-2 rounded-full border transition-colors whitespace-nowrap ${
                  formData.specialFacilities.includes(facility)
                    ? 'bg-main text-white border-main'
                    : 'bg-white text-gray-5 border-gray-5'
                }`}
              >
                <span className="text-body2">{facility}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityTags;
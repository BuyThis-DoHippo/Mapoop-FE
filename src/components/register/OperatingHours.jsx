import ArrowUp from '@/assets/svg/register/arrow-up.svg?react';
import ArrowDown from '@/assets/svg/register/arrow-down.svg?react';
import { timeOptions } from '@/constants/facilityData';

const OperatingHours = ({ 
  formData, 
  onTimeChange, 
  dropdownOpen, 
  dropdownRef, 
  onToggleDropdown, 
  onCloseDropdowns 
}) => {
  const handleTimeSelect = (timeType, value) => {
    onTimeChange(timeType, value);
    onCloseDropdowns();
  };

  return (
    <div className="flex items-center gap-2 px-14 py-9 self-stretch rounded-[10px] border border-gray-2 bg-white" ref={dropdownRef}>
      <div className="w-full">
        <div className="text-heading3-bold text-gray-10 mb-6">영업시간</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <div 
              className={`flex justify-between items-center w-full p-4 rounded-[10px] bg-white text-body2 cursor-pointer relative ${
                dropdownOpen.startHour || formData.operatingHours.startHour 
                  ? 'border border-gray-6' 
                  : 'border border-gray-3'
              }`}
              onClick={() => onToggleDropdown('startHour')}
            >
              <span className={formData.operatingHours.startHour ? 'text-gray-10' : 'text-gray-4'}>
                {formData.operatingHours.startHour ? `${formData.operatingHours.startHour}시` : '시작 시'}
              </span>
              {dropdownOpen.startHour ? <ArrowDown className="h-[6px] w-[12px]" /> : <ArrowUp className="h-[6px] w-[12px]" />}
            </div>
            {dropdownOpen.startHour && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-3 rounded-[10px] shadow-lg max-h-48 overflow-y-auto z-10">
                {timeOptions.hours.map((hour, i) => (
                  <div
                    key={hour}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-0 ${
                      i === 0 ? 'bg-gray-0' : ''
                    }`}
                    onClick={() => handleTimeSelect('startHour', hour)}
                  >
                    {`${hour}시`}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <div 
              className={`flex justify-between items-center w-full p-4 rounded-[10px] bg-white text-body2 cursor-pointer ${
                dropdownOpen.startMinute || formData.operatingHours.startMinute
                  ? 'border border-gray-6' 
                  : 'border border-gray-3'
              }`}
              onClick={() => onToggleDropdown('startMinute')}
            >
              <span className={formData.operatingHours.startMinute ? 'text-gray-10' : 'text-gray-4'}>
                {formData.operatingHours.startMinute ? `${formData.operatingHours.startMinute}분` : '시작 분'}
              </span>
              {dropdownOpen.startMinute ? <ArrowDown /> : <ArrowUp />}
            </div>
            {dropdownOpen.startMinute && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-3 rounded-[10px] shadow-lg max-h-48 overflow-y-auto z-10">
                {timeOptions.minutes.map((minute, i) => (
                  <div
                    key={minute}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-0 ${
                      i === 0 ? 'bg-gray-0' : ''
                    }`}
                    onClick={() => handleTimeSelect('startMinute', minute)}
                  >
                    {`${minute}분`}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <div 
              className={`flex justify-between items-center w-full p-4 rounded-[10px] bg-white text-body2 cursor-pointer ${
                dropdownOpen.endHour || formData.operatingHours.endHour
                  ? 'border border-gray-6' 
                  : 'border border-gray-3'
              }`}
              onClick={() => onToggleDropdown('endHour')}
            >
              <span className={formData.operatingHours.endHour ? 'text-gray-10' : 'text-gray-4'}>
                {formData.operatingHours.endHour ? `${formData.operatingHours.endHour}시` : '마감 시'}
              </span>
              {dropdownOpen.endHour ? <ArrowDown /> : <ArrowUp />}
            </div>
            {dropdownOpen.endHour && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-3 rounded-[10px] shadow-lg max-h-48 overflow-y-auto z-10">
                {timeOptions.hours.map((hour, i) => (
                  <div
                    key={hour}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-0 ${
                      i === 0 ? 'bg-gray-0' : ''
                    }`}
                    onClick={() => handleTimeSelect('endHour', hour)}
                  >
                    {`${hour}시`}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <div 
              className={`flex justify-between items-center w-full p-4 rounded-[10px] bg-white text-body2 cursor-pointer ${
                dropdownOpen.endMinute || formData.operatingHours.endMinute
                  ? 'border border-gray-6' 
                  : 'border border-gray-3'
              }`}
              onClick={() => onToggleDropdown('endMinute')}
            >
              <span className={formData.operatingHours.endMinute ? 'text-gray-10' : 'text-gray-4'}>
                {formData.operatingHours.endMinute ? `${formData.operatingHours.endMinute}분` : '마감 분'}
              </span>
              {dropdownOpen.endMinute ? <ArrowDown /> : <ArrowUp />}
            </div>
            {dropdownOpen.endMinute && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-3 rounded-[10px] shadow-lg max-h-48 overflow-y-auto z-10">
                {timeOptions.minutes.map((minute, i) => (
                  <div
                    key={minute}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-0 ${
                      i === 0 ? 'bg-gray-0' : ''
                    }`}
                    onClick={() => handleTimeSelect('endMinute', minute)}
                  >
                    {`${minute}분`}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatingHours;
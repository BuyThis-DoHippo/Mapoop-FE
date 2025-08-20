import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/mypage/profile', label: '프로필 관리' },
    { path: '/mypage/reviews', label: '리뷰 관리' },
    { path: '/mypage/toilets', label: '등록한 화장실 관리' }
  ];

  return (
    <div className="w-[243px] min-w-[243px] flex flex-col flex-shrink-0">
      <h1 className="text-heading1 text-gray-10 mb-16">마이페이지</h1>
      
      <nav className="flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `py-4 text-body1 border-b border-gray-1 transition-colors whitespace-nowrap ${
                isActive 
                  ? 'text-body1-bold' 
                  : 'text-body1'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
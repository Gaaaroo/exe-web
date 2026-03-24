'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const featureCards = [
  { title: 'New Collection', img: '/collection01.png' },
  { title: 'New Map Travel', img: '/tranhkieng.jpg' },
  { title: 'VIP Benefit', img: '/collection03.png' },
];

type Tab = 'Lastest' | 'Info' | 'Event' | 'Update';
const tabs: Tab[] = ['Lastest', 'Info', 'Event', 'Update'];

const newsItems = [
  {
    id: 1,
    badge: 'UPDATE' as const,
    date: 'March 14, 2026',
    category: 'Info',
    title: 'Version " TRANH KIẾNG NAM BỘ "',
    desc: 'Map tranh kiếng là vật liệu kỹ thuật số mô phỏng các họa tiết nghệ thuật trên bề mặt thủy tinh, kết hợp cùng hiệu ứng xuyên sáng và phản chiếu đa sắc để tạo điểm nhấn sang trọng, độc đáo cho không gian nội thất.',
    img: '/tranhkieng.jpg',
    type: 'Update' as Tab,
  },
  {
    id: 2,
    badge: 'EVENT' as const,
    date: 'March 14, 2026',
    category: 'Info',
    title: 'TẾT NGUYÊN ĐÁN',
    desc: 'Tết Nguyên Đán là dịp lễ cổ truyền lớn nhất trong năm của người Việt, biểu tượng cho sự giao thoa giữa đất trời và lòng người, nơi những giá trị gia đình và hy vọng về một năm mới an khang được tôn vinh.',
    img: '/tet.png',
    type: 'Event' as Tab,
  },
  {
    id: 3,
    badge: 'INFO' as const,
    date: 'March 14, 2026',
    category: 'Info',
    title: 'BỘ ĐỒ NGHỀ LÀNG GỐM LÁI THIÊU',
    desc: 'Bộ đồ nghề làng gốm Lái Thiêu là sự kết hợp giữa bàn xoay thủ công, khuôn đúc và bút vẽ màu oxit để tạo nên những sản phẩm gốm gia dụng Nam Bộ mộc mạc với họa tiết con gà, hoa cúc đặc trưng.',
    img: '/gom.png',
    type: 'Info' as Tab,
  },
  {
    id: 4,
    badge: 'UPDATE' as const,
    date: 'March 14, 2026',
    category: 'Info',
    title: 'THỬ THÁCH TÂN THỦ - ĐỜN CA TÀI TỬ',
    desc: 'Đờn ca tài tử là loại hình nghệ thuật dân gian đặc trưng của Nam Bộ, kết hợp giữa tiếng đàn kim, đờn cò, đờn tranh với lời ca mộc mạc, thể hiện tâm hồn phóng khoáng và chiều sâu văn hóa của người dân vùng sông nước.',
    img: '/don.png',
    type: 'Update' as Tab,
  },
  {
    id: 5,
    badge: 'EVENT' as const,
    date: 'March 14, 2026',
    category: 'Info',
    title: 'CỬA HÀNG 3X3 CHALLENGE',
    desc: 'Cửa hàng 3x3 Challenge là không gian trung bày và trải nghiệm các sản phẩm sáng tạo từ dự án khởi nghiệp cùng tên của sinh viên FPTU, nơi kết nối giá trị văn hóa truyền thống Nam Bộ với tư duy thiết kế hiện đại của người trẻ.',
    img: '/cuahang.png',
    type: 'Event' as Tab,
  },
];

const badgeStyle: Record<string, string> = {
  UPDATE: 'text-[#060d1e]',
  EVENT: 'text-[#060d1e]',
  INFO: 'text-[#060d1e]',
};

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState<Tab>('Lastest');

  const filtered =
    activeTab === 'Lastest'
      ? newsItems
      : newsItems.filter((n) => n.type === activeTab);

  return (
    <section
      id='news'
      className='py-16 px-4'
    >
      <div className='max-w-[900px] mx-auto'>
        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12'
        >
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className='relative rounded-lg overflow-hidden border border-white/10 hover:border-green-400/40 transition-colors duration-300 cursor-pointer group'
            >
              <div className='relative h-45 w-full'>
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                />
                <div />
              </div>
              <div className='p-4 pb-25 bg-[#0b1528]'>
                <p className='text-white font-semibold text-base'>
                  {card.title}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className='flex items-center gap-5 mb-6 flex-wrap'>
          {tabs.map((tab, i) => (
            <div
              key={tab}
              className='flex items-center gap-2'
            >
              {i > 0 && <span className='text-white/30 text-sm'>+</span>}
              <button
                type='button'
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium px-1 pb-1 transition-colors duration-200 cursor-pointer ${
                  activeTab === tab
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {tab}
              </button>
              {i === tabs.length - 1 && (
                <span className='text-white/30 text-sm'>+</span>
              )}
            </div>
          ))}
        </div>

        {/* News list */}
        <div className='flex flex-col gap-8 mb-8'>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className='flex gap-6 bg-[#0b1528]/60 border border-white/8 rounded-lg p-3 hover:border-white/20 transition-colors duration-200 cursor-pointer'
            >
              {/* Thumbnail */}
              <div className='relative w-50 h-30 shrink-0 rounded-md overflow-hidden'>
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className='object-cover'
                />
              </div>

              {/* Info */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between gap-3 mb-4'>
                  <span
                    className={`text-sm rounded-sm tracking-wider inline-flex items-center justify-center w-20 h-7 ${badgeStyle[item.badge]}`}
                    style={{
                      backgroundImage: "url('/bg-btn.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {item.badge}
                  </span>
                  <div className='flex items-center gap-5 pr-15'>
                    <span className='text-white/70 text-xs'>{item.date}</span>
                    <span className='text-white/70 text-xs ml-auto shrink-0'>
                      {item.category}
                    </span>
                  </div>
                </div>
                <p className='text-green-400 text-2xl mb-1 truncate'>
                  {item.title}
                </p>
                <p className='text-white/50 text-xs leading-relaxed line-clamp-2'>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          type='button'
          className='w-full bg-green-400 hover:bg-green-300 text-black font-bold py-3.5 rounded-md text-sm tracking-widest transition-colors duration-200 cursor-pointer'
        >
          XEM THÊM
        </button>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center border-y border-border/40 bg-abyss/80"
    >
      <div className="container mx-auto px-6 py-16 md:py-20 grid gap-12 md:grid-cols-[1.2fr,0.8fr] items-start">
        <div>
          <p className="font-body text-xs tracking-[0.3em] text-gold/70 uppercase mb-4">
            Về dự án
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-parchment mb-6">
            Hành trình hồi sinh ký ức
          </h2>
          <p className="font-body text-parchment/70 text-sm md:text-base leading-relaxed mb-4">
            Ký Ức Di Sản (Heritage Echoes) là một dự án game 3D thuộc thể loại nhập vai kết hợp
            phiêu lưu giải đố, được tạo ra với sứ mệnh xóa bỏ khoảng cách giữa thế hệ trẻ và văn
            hóa truyền thống. Thông qua ngôn ngữ của công nghệ và đồ họa hiện đại, chúng tôi tái
            hiện các làng nghề Việt Nam thành một thế giới mở đầy mê hoặc.
          </p>
          <p className="font-body text-parchment/60 text-sm md:text-base leading-relaxed mb-4">
            Chúng mình là 3X3 Challenge – nhóm sinh viên đến từ Đại học FPT, những người trẻ yêu
            di sản và cùng đi tìm lời giải cho câu hỏi: làm sao để những nét đẹp của làng nghề Việt
            không bị lãng quên trong dòng chảy của thời đại số. Người chơi không chỉ là khách tham
            quan, mà là người trực tiếp giữ lửa cho di sản.
          </p>
          <p className="font-body text-parchment/50 text-xs md:text-sm leading-relaxed">
            Tầm nhìn của chúng tôi là trở thành “cầu nối số” cho văn hóa Việt: xây dựng một hệ sinh
            thái game di sản nơi mỗi làng nghề truyền thống đều có một “phiên bản số” sống động, để
            người trẻ vừa am hiểu vừa tự hào lan tỏa giá trị dân tộc ra thế giới.
          </p>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="border border-gold/30 bg-card/60 p-5"
          >
            <p className="font-body text-xs text-gold/70 tracking-[0.25em] uppercase mb-2">
              TẦM NHÌN
            </p>
            <p className="font-body text-parchment/80 text-sm leading-relaxed">
              Trở thành hệ sinh thái game di sản hàng đầu, nơi mỗi làng nghề truyền thống Việt Nam
              đều có một “phiên bản số” sống động. Chúng tôi hướng tới cộng đồng người trẻ hiểu, yêu
              và chủ động lan tỏa văn hóa Việt qua những trải nghiệm giải trí tương tác.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-border bg-card/40 p-5"
          >
            <p className="font-body text-xs text-gold/60 tracking-[0.25em] uppercase mb-2">
              GIÁ TRỊ
            </p>
            <ul className="font-body text-parchment/75 text-sm space-y-1.5 list-disc list-inside">
              <li>Sự Công phu: mô phỏng tỉ mỉ quy trình làm nghề thực tế của các nghệ nhân.</li>
              <li>
                Tính Độc bản: mang đến cơ chế “Nhãn giới ký ức” duy nhất để kể những câu chuyện ẩn giấu.
              </li>
              <li>
                Sự Gắn kết: biến tình yêu trong game thành hành động ủng hộ các làng nghề ngoài đời thực.
              </li>
              <li>
                Tính Sáng tạo: làm mới văn hóa cũ bằng chất liệu hiện đại như kinh dị dân gian và đồ họa 3D stylized.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


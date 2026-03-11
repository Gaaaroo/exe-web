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
            About Us
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-parchment mb-6">
            Giữa di sản và hiện đại
          </h2>
          <p className="font-body text-parchment/70 text-sm md:text-base leading-relaxed mb-4">
            3X3 Challenge là một nhóm nhỏ gồm lập trình viên, nhà thiết kế và storyteller
            cùng chung một câu hỏi: làm sao để người trẻ không còn xa cách với làng nghề
            và văn hóa truyền thống trong một thế giới ngày càng số hóa.
          </p>
          <p className="font-body text-parchment/60 text-sm md:text-base leading-relaxed mb-4">
            Dự án game 3D của chúng tôi lấy cảm hứng từ các làng nghề thật như tranh kính,
            nón lá, nhang… và được xây dựng trên những chuyến khảo sát, phỏng vấn chuyên gia
            cũng như dữ liệu nghiên cứu thị trường. Game không chỉ là giải trí, mà là một
            “cầu nối” giúp người chơi bước vào ký ức di sản bằng ngôn ngữ RPG quen thuộc.
          </p>
          <p className="font-body text-parchment/50 text-xs md:text-sm leading-relaxed">
            Chúng tôi tin rằng di sản chỉ thật sự sống khi có người chạm vào. Mỗi lượt chơi,
            mỗi góp ý và mỗi lần bạn chia sẻ game là một bước nhỏ giúp giữ lại những làng nghề
            đang dần biến mất ngoài đời thực.
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
              Xây dựng một vũ trụ game nơi người chơi có thể “du hành” qua các làng nghề Việt Nam,
              trực tiếp làm nghề, khám phá ký ức và điều chỉnh mức độ kinh dị dân gian theo cách
              mà họ thấy thoải mái.
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
              <li>Tôn trọng độ chính xác của di sản và tiếng nói cộng đồng làng nghề</li>
              <li>Kết hợp giải trí, folk horror và giáo dục văn hóa trong một trải nghiệm liền mạch</li>
              <li>Ưu tiên mô phỏng “sự công phu” của nghề thay vì chỉ tái hiện bề mặt</li>
              <li>Cởi mở với góp ý từ cộng đồng để game trở thành một kho ký ức sống</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


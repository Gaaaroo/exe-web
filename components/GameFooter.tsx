import { motion } from "framer-motion";

const links = [
  { label: "Discord", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Youtube", href: "#" },
  { label: "Twitter", href: "#" },
] as const;

const GameFooter = () => {
  return (
    <footer className="border-t border-parchment/10 py-8 px-4 text-sm">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-heading text-lg md:text-xl text-gold tracking-[0.3em] mb-4 uppercase">
            KÝ ỨC DI SẢN
          </p>

          <div className="flex items-center justify-center gap-6 mb-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="story-link text-parchment/40 hover:text-gold font-body text-sm tracking-wider transition-colors duration-300"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="w-12 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent mx-auto mb-4" />

          <p className="font-body text-xs text-parchment/20 tracking-wider">
            © 2026 Lacquer &amp; Lens Studio. Bảo lưu mọi quyền.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default GameFooter;


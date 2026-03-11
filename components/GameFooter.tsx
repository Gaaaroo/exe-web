import { motion } from "framer-motion";

const links = [
  { label: "Discord", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Youtube", href: "#" },
  { label: "Twitter", href: "#" },
] as const;

const GameFooter = () => {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-heading text-2xl text-gold tracking-widest mb-8">
            KÝ ỨC DI SẢN
          </p>

          <div className="flex items-center justify-center gap-8 mb-12">
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

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-8" />

          <p className="font-body text-xs text-parchment/20 tracking-wider">
            © 2026 Lacquer &amp; Lens Studio. Bảo lưu mọi quyền.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default GameFooter;


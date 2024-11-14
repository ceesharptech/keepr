import { motion } from "framer-motion";

function FeaturePreview({
  imageSrc,
  altText,
  caption,
  delay,
}: {
  imageSrc: string;
  altText: string;
  caption: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: { delay: delay, duration: 1 },
      }}
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-full h-44 md:h-56 mb-4 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
        <img src={imageSrc} alt={altText} className="rounded-lg w-full h-full" />
      </div>
      <p className="text-center text-gray-600">{caption}</p>
    </motion.div>
  );
}

export default FeaturePreview;

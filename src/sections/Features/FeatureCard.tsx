import { motion } from "framer-motion";

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { delay: delay, duration: 0.2 },
      }}
      viewport={{ once: false, amount: 0.5 }}
      className="bg-gray-50 p-10 rounded-lg shadow-md text-center transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;

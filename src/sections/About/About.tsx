import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 overflow-hidden" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center transition-all duration-300 ease-in-out">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.2, duration: 0.5 },
              }}
              viewport={{ once: false, amount: 0.5 }}
              className="relative h-64 sm:h-80 lg:h-96 w-full rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src="https://img.freepik.com/free-photo/young-family-enjoying-trips_23-2149176474.jpg?t=st=1730408640~exp=1730412240~hmac=e1dc1bebb6e6352efde1dc189b2fb5ff1e4c543ad3ab7757023713718c6ac3cb&w=800"
                alt="Keepr App Interface"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.4, duration: 0.5 },
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full lg:w-1/2 lg:pl-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              About Keepr
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Keepr is more than just a photo storage app – it's your personal
              time capsule. We understand that every photo tells a story, and
              we're here to help you preserve those stories for years to come.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              With Keepr, you can securely upload, organize, and access your
              cherished memories from any device. Our intuitive interface makes
              it easy to categorize your photos, add descriptions, and even
              create beautiful slideshows to share with loved ones.
            </p>
            <p className="text-lg text-gray-600">
              Whether it's a milestone celebration, a quiet moment of
              reflection, or an everyday adventure, Keepr ensures that your
              memories are always at your fingertips, ready to be relived and
              cherished.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

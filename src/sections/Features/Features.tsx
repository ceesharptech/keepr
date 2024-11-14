import { Aperture, ShieldCheck, MonitorSmartphone } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <section className="py-16 px-4 bg-white" id="features">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Aperture className="w-12 h-12 text-blue-600" />}
            title="Capture Memories"
            description="Allows users to upload and save photos."
            delay={0.2}
          />
          <FeatureCard
            icon={<ShieldCheck className="w-12 h-12 text-blue-600" />}
            title="Secure Storage"
            description="Uses AWS for private, cloud-based photo storage."
            delay={0.4}
          />
          <FeatureCard
            icon={<MonitorSmartphone className="w-12 h-12 text-blue-600" />}
            title="Easy Access"
            description="View and organize memories anytime, from any device."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}

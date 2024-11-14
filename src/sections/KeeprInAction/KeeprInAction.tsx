import FeaturePreview from "./FeaturePreview";
import keeprImage1 from '../../assets/images/keepr-image-1.jpg'
import keeprImage2 from '../../assets/images/keepr-image-2.jpg'
import keeprImage3 from '../../assets/images/keepr-image-3.jpg'

export default function KeeprinAction() {
  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          See Keepr in Action
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeaturePreview
            delay={0.2}
            imageSrc={keeprImage1}
            altText="Photo Upload Feature"
            caption="Easily upload and tag memories"
          />
          <FeaturePreview
            delay={0.4}
            imageSrc={keeprImage2}
            altText="Gallery View"
            caption="Organize your memories in a gallery"
          />
          <FeaturePreview
            delay={0.6}
            imageSrc={keeprImage3}
            altText="Full-Photo View"
            caption="Relive each moment with full details"
          />
        </div>
      </div>
    </section>
  );
}

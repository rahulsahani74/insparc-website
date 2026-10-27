import { SketchbookHome } from "@/components/sketchbook/SketchbookHome";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({ title: "Business Services & Digital Marketing", description: "Insparc Technologies helps with customer enquiries, everyday business operations and digital marketing. Explore our services and clear working process.", path: "/" });
export default function HomePage() { return <SketchbookHome />; }

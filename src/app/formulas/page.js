import { Breadcrumbs, PageHeading } from "@/components/ui";
import FormulaLibrary from "@/components/formulas/formula-library";
import FormulaCard from "@/components/formulas/formula-card";
import { getAllContent } from "@/lib/content";
import { chapters } from "@/data/chapters";
export const metadata = {
  title: "সূত্রভান্ডার",
  description:
    "গণিতের সূত্র, সংজ্ঞা ও সম্পর্কের ব্যাখ্যা, প্রযোজ্য শর্ত এবং সমাধানসহ উদাহরণ।",
};
export default function FormulasPage() {
  const content = getAllContent();
  const formulas = content.flatMap((chapter) => chapter.formulas);
  const topics = content.flatMap((chapter) => chapter.topics);
  return (
    <div className="container page-content">
      <Breadcrumbs items={[{ title: "সূত্রভান্ডার" }]} />
      <PageHeading eyebrow="মুখস্থের আগে অর্থ বোঝো" title="সূত্রভান্ডার">
        সূত্র, সংজ্ঞা ও সম্পর্ক—প্রতীকের অর্থ এবং উদাহরণসহ।
      </PageHeading>
      <p className="notice">
        গণিত ও পদার্থবিজ্ঞানের প্রস্তুত অধ্যায়গুলোর সূত্র, সংজ্ঞা ও সম্পর্ক। বই
        ও হ্যান্ডনোটভিত্তিক সূত্রের উৎস ও পর্যালোচনার তথ্য সংশ্লিষ্ট অধ্যায়ে
        রয়েছে।
      </p>
      <FormulaLibrary formulas={formulas} topics={topics} chapters={chapters}>
        {formulas.map((f) => (
          <FormulaCard key={f.id} formula={f} />
        ))}
      </FormulaLibrary>
    </div>
  );
}

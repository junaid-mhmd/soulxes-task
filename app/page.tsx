import { Suspense } from "react";
import SearchSection from "./components/search-section";
import MainSection from "./components/main-section";
import Loading from "@/components/ui/loading";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <SearchSection />
        <MainSection />
      </Suspense>
    </main>
  );
}

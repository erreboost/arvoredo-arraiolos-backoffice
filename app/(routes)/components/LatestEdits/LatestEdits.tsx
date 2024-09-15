"use client";
import { CustomIcon } from "@/components/CustomIcon";
import { Book, Building } from "lucide-react";
import { TreeTable } from "../TreeTable";
import { useOccurrences } from "@/app/context/OccurrencesContext";
import { useEffect } from "react";

export function LatestEdits() {
  const { allOccurrences, setAllOccurrences } = useOccurrences();

  useEffect(() => {
    // console.log('All occurrences', allOccurrences)
  }, [allOccurrences]);

  return (
    <div className="rounded-lg bg-background p-5 shadow-sm">
      <div className="flex items-center gap-x-2">
        <CustomIcon icon={Book} />
        <p className="text-xl">Ocorrências</p>
      </div>
      <div>
        <TreeTable
          allOccurrences={allOccurrences}
          setAllOccurrences={setAllOccurrences}
        />
      </div>
    </div>
  );
}

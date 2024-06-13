import React, { useEffect, useState } from "react";

interface Tree {
  Estado_fit: string; // Replace with actual type
}

interface DashboardCardData {
  trees: Tree[];
}

interface Props {
  data: DashboardCardData;
}

const DashboardCard02A: React.FC<Props> = ({ data }) => {
  const [numWithSymptoms, setNumWithSymptoms] = useState(0);
  const [numWithoutSymptoms, setNumWithoutSymptoms] = useState(0);

  useEffect(() => {
    if (data && data.trees) {
      let countWithSymptoms = 0;
      let countWithoutSymptoms = 0;

      data.trees.forEach((tree) => {
        if (tree.Estado_fit.includes("sintomas ou sinais")) {
          countWithSymptoms++;
        } else {
          countWithoutSymptoms++;
        }
      });

      setNumWithSymptoms(countWithSymptoms);
      setNumWithoutSymptoms(countWithoutSymptoms);
    }
  }, [data]);

  return (
    <div className="flex-grow overflow-y-auto py-2 h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Árvores com sintomas ou sinais
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-24 mt-12">
          {numWithSymptoms}
        </div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Árvores sem sintomas ou sinais
        </div>
        <div className="text-7xl font-bold text-red-800 dark:text-slate-100 mb-12 mt-12">
          {numWithoutSymptoms}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard02A;

import {CustomIcon} from '@/components/CustomIcon';
import {Book, Building} from 'lucide-react';
import {TreeTable} from '../TreeTable';

export function LatestEdits() {
  return (
    <div className="shadow-sm bg-background rounded-lg p-5">
      <div className="flex gap-x-2 items-center ">
        <CustomIcon icon={Book} />
        <p className="text-xl">Últimas edições</p>
      </div>
      <div>
        <TreeTable />
      </div>
    </div>
  );
}

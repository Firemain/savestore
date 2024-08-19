
// This function needs to be defined to fetch bobs with their sizes and stocks
import InventoryItem from '@/component/admin/InventoryItem';

export default function InventoryManagement({ bobs }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Bob Inventory Management</h1>
      {bobs.map(bob => (
        <InventoryItem key={bob.id} bob={bob} />
      ))}
    </div>
  );
}

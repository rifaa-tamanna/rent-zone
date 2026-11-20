
import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { EquipmentForm } from "../../EquipmentForm";

export default function DashboardOwnerAddEquipmentPage() {
  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Owner Dashboard"
        description="Add your equipment and make it available for customers to rent."
      />

      <EquipmentForm mode="add" />
    </div>
  );
}

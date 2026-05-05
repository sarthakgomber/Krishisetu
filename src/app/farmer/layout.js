import FarmerSidebar from "@/components/layout/FarmerSidebar";

export default function FarmerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-cream">
      <FarmerSidebar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
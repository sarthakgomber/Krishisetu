import BuyerSidebar from "@/components/layout/BuyerSidebar";

export default function BuyerLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-cream">
      <BuyerSidebar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}

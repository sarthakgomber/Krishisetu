import Image from "next/image";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order, role, onStatusChange }) {
  const id = order.id || order._id;
  const product = order.product || order.productId;
  const buyer = order.buyer || order.buyerId;
  const farmer = order.farmer || order.farmerId;
  const { quantity, agreedPrice, totalAmount, status, createdAt } = order;

  const productImage = product?.images?.[0];

  const farmerActions =
    role === "farmer"
      ? status === "pending"
        ? [
            { label: "Confirm Order", next: "confirmed", cls: "btn-primary text-sm" },
            { label: "Reject", next: "cancelled", cls: "btn-danger text-sm" },
          ]
        : status === "confirmed"
        ? [{ label: "Mark Completed", next: "completed", cls: "btn-primary text-sm" }]
        : []
      : [];

  const buyerActions =
    role === "buyer" && status === "pending"
      ? [{ label: "Cancel Order", next: "cancelled", cls: "btn-secondary text-sm" }]
      : [];

  const actions = [...farmerActions, ...buyerActions];

  return (
    <div className="card p-4 hover:shadow-warm-lg transition-shadow duration-200">
      <div className="flex gap-4">
        {/* Product image */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-soil-50 border border-[var(--border)]">
          {productImage ? (
            <Image src={productImage} alt={product?.name || "Product"} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">🌾</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-display font-semibold text-earth text-sm truncate">{product?.name}</p>
            <OrderStatusBadge status={status} />
          </div>

          <p className="text-xs text-muted mb-2.5 flex items-center gap-1">
            <span className="text-leaf-600">
              {role === "farmer" ? "👤" : "🌾"}
            </span>
            {role === "farmer"
              ? `Buyer: ${buyer?.name}`
              : `Farmer: ${farmer?.farmName || farmer?.name}`}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-xs text-muted bg-soil-50 border border-[var(--border)] px-2 py-0.5 rounded-lg">
              {quantity} {product?.unit} × ₹{agreedPrice}
            </span>
            <span className="text-xs font-bold text-earth bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg">
              ₹{totalAmount}
            </span>
            <span className="text-xs text-muted">
              {new Date(createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>

      {actions.length > 0 && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border)]">
          {actions.map((action) => (
            <button
              key={action.next}
              onClick={() => onStatusChange(id, action.next)}
              className={action.cls}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
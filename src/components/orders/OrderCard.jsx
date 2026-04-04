import Image from "next/image";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order, role, onStatusChange }) {
  // Spring Boot returns: order.product, order.buyer, order.farmer, order.id
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
            { label: "Confirm", next: "confirmed", cls: "btn-primary text-sm" },
            { label: "Reject", next: "cancelled", cls: "btn-danger text-sm" },
          ]
        : status === "confirmed"
        ? [{ label: "Mark Completed", next: "completed", cls: "btn-primary text-sm" }]
        : []
      : [];

  const buyerActions =
    role === "buyer" && status === "pending"
      ? [{ label: "Cancel", next: "cancelled", cls: "btn-secondary text-sm" }]
      : [];

  const actions = [...farmerActions, ...buyerActions];

  return (
    <div className="card p-4">
      <div className="flex gap-4">
        {productImage && (
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-soil-50">
            <Image src={productImage} alt={product?.name || "Product"} fill className="object-cover" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-medium text-earth text-sm truncate">{product?.name}</p>
            <OrderStatusBadge status={status} />
          </div>

          <p className="text-xs text-muted mb-2">
            {role === "farmer"
              ? `Buyer: ${buyer?.name}`
              : `Farmer: ${farmer?.farmName || farmer?.name}`}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span className="text-muted">
              {quantity} {product?.unit} × ₹{agreedPrice}
            </span>
            <span className="font-semibold text-earth">Total: ₹{totalAmount}</span>
            <span className="text-muted">{new Date(createdAt).toLocaleDateString("en-IN")}</span>
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

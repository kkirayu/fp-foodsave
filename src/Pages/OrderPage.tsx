import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import type { Pesanan as PesananType } from "../types/Order";
import type { FoodItem } from "../types/FoodItem";
import ReviewModal from "../components/ReviewModal";
import Rating from "../components/Rating";

const OrderSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow-md border flex gap-4 animate-pulse">
    <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0"></div>
    <div className="flex-grow space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

interface OrderItemProps {
  order: PesananType;
  isHistory: boolean;
  onCancel: (orderId: number) => void;
  onReview: (order: PesananType) => void;
  onDelete: (orderId: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  isHistory,
  onCancel,
  onReview,
  onDelete,
}) => {
  const getStatusBadge = (status: string) => {
    const styles: { [key: string]: string } = {
      pending: "bg-yellow-100 text-yellow-800",
      dikonfirmasi: "bg-blue-100 text-blue-800",
      siap_diambil: "bg-indigo-100 text-indigo-800",
      sudah_diambil: "bg-green-100 text-green-800",
      dibatalkan_pembeli: "bg-red-100 text-red-800",
      dibatalkan_penjual: "bg-gray-200 text-gray-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border flex flex-col md:flex-row justify-between items-start gap-4">
      <div className="flex-shrink-0">
        <img
          src={`https://food-saver.kontrakita.web.id${order.makanan.image}`}
          alt={order.makanan.name}
          className="w-24 h-24 object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold">{order.makanan.name}</h2>
        <p className="text-sm text-gray-600">
          Kode Pesanan: {order.unique_code}
        </p>
        <p className="text-sm">Jumlah: {order.quantity}</p>
        <p className="font-semibold">
          Total: Rp {order.total_price.toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(order.order_date).toLocaleString("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </p>
      </div>
      <div className="flex flex-col space-y-2 w-full md:w-auto self-center md:items-end">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium self-start md:self-end ${getStatusBadge(
            order.status
          )}`}
        >
          {order.status.replace(/_/g, " ")}
        </span>
        <div className="flex-grow" />
        <div className="flex flex-row md:flex-col gap-2 w-full">
          {order.status === "pending" && (
            <button
              onClick={() => onCancel(order.id)}
              className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition text-sm"
            >
              Batalkan
            </button>
          )}
          {order.status === "sudah_diambil" && !order.ulasan && (
            <button
              onClick={() => onReview(order)}
              className="flex-1 bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition text-sm"
            >
              Beri Ulasan
            </button>
          )}
          {order.ulasan && (
            <div className="w-full text-left md:text-right">
              <Rating
                value={order.ulasan.rating}
                className="justify-start md:justify-end mb-2"
              />
              <p className="text-sm text-gray-600 p-2 bg-gray-50 rounded-md border text-left">
                {order.ulasan.comment}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrderPage = () => {
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Omit<PesananType, "makanan">[]>([]);
  const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PesananType | null>(null);

  const fetchAllData = async () => {
    if (!token) return;

    setIsLoading(true);
    setError("");
    try {
      const [ordersResponse, foodResponse] = await Promise.all([
        fetch("https://food-saver.kontrakita.web.id/api/v1/pembeli/pesanan", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }),
        fetch("https://food-saver.kontrakita.web.id/api/v1/pembeli/makanan"),
      ]);

      if (!ordersResponse.ok) throw new Error("Gagal memuat riwayat pesanan.");
      if (!foodResponse.ok) throw new Error("Gagal memuat data makanan.");

      const ordersData = await ordersResponse.json();
      const foodData = await foodResponse.json();

      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setAllFoodItems(Array.isArray(foodData) ? foodData : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    } else if (!authLoading) {
      setIsLoading(false);
      setError("Silakan login untuk melihat riwayat pesanan Anda.");
    }
  }, [isAuthenticated, authLoading, token]);

  const ordersWithFoodDetails = useMemo((): PesananType[] => {
    return orders
      .map((order) => {
        const makanan = allFoodItems.find(
          (food) => food.id === order.makanan_id
        );
        return { ...order, makanan: makanan || null };
      })
      .filter((order): order is PesananType => order.makanan !== null)
      .sort(
        (a, b) =>
          new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
      );
  }, [orders, allFoodItems]);

  const { activeOrders, historyOrders } = useMemo(() => {
    const active = ordersWithFoodDetails.filter((o) =>
      ["pending", "dikonfirmasi", "siap_diambil"].includes(o.status)
    );
    const history = ordersWithFoodDetails.filter((o) =>
      ["sudah_diambil", "dibatalkan_pembeli", "dibatalkan_penjual"].includes(
        o.status
      )
    );
    return { activeOrders: active, historyOrders: history };
  }, [ordersWithFoodDetails]);

  const handleCancelOrder = async (orderId: number) => {
    if (
      !window.confirm("Apakah Anda yakin ingin membatalkan pesanan ini?") ||
      !token
    )
      return;
    try {
      const response = await fetch(
        `https://food-saver.kontrakita.web.id/api/v1/pembeli/pesanan/${orderId}/batalkan`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Gagal membatalkan pesanan.");

      alert("Pesanan berhasil dibatalkan.");
      fetchAllData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (
      !window.confirm(
        "Tindakan ini akan menghapus riwayat pesanan dari tampilan. Lanjutkan?"
      )
    )
      return;
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
    alert("Riwayat pesanan telah dihapus dari tampilan.");
  };

  const handleOpenReviewModal = (order: PesananType) => {
    setSelectedOrder(order);
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedOrder(null);
    setIsReviewModalOpen(false);
    fetchAllData();
  };

  if (authLoading) {
    return <div className="text-center py-10">Memeriksa sesi Anda...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  const renderOrderList = (orderList: PesananType[], isHistory: boolean) => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <OrderSkeleton key={i} />
          ))}
        </div>
      );
    }
    if (orderList.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          <p>Tidak ada pesanan di kategori ini.</p>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {orderList.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            isHistory={isHistory}
            onCancel={handleCancelOrder}
            onReview={handleOpenReviewModal}
            onDelete={handleDeleteOrder}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pesanan & Riwayat</h1>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("active")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "active"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Pesanan Aktif ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "history"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Riwayat ({historyOrders.length})
          </button>
        </nav>
      </div>

      <div>
        {activeTab === "active"
          ? renderOrderList(activeOrders, false)
          : renderOrderList(historyOrders, true)}
      </div>

      {selectedOrder && token && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={handleCloseReviewModal}
          orderId={selectedOrder.id}
          token={token}
        />
      )}
    </div>
  );
};

export default OrderPage;

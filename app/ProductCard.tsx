import { Product } from "./Products";

const IMAGE_URL_BASE = "https://bakery-aed4b5b3.digi.loikka.dev"

const ProductCard = ({ product, badge, isSelected, onClick }: { product: Product, badge: string, isSelected: boolean, onClick: () => void }) => {
    return (
        <div key={product.id} className="border rounded flex flex-col items-center w-60 justify-between cursor-pointer hover:scale-105" onClick={onClick}>
            <div>
                <div className="relative">
                    <img src={IMAGE_URL_BASE + product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
                    <span className="absolute top-2 right-2 bg-white/90 text-gray-900 rounded-full px-2 py-0.5 text-xs font-semibold shadow-sm select-none">
                        {badge}
                    </span>
                </div>
                <div className="p-2">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <div>
                            {isSelected && (
                                <span className="inline-block align-middle ml-2 text-green-600" title="Selected">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <circle cx="10" cy="10" r="10" fill="#22c55e" />
                                        <path d="M6 10.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < product.rating ? "text-yellow-500" : "text-gray-300"}`}
                                fill={i < product.rating ? "currentColor" : "none"}
                                stroke="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <polygon
                                    points="10,1 12.59,7.36 19.51,7.36 13.97,11.63 16.56,17.99 10,13.72 3.44,17.99 6.03,11.63 0.49,7.36 7.41,7.36"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>
            <span className="text-md font-bold flex justify-end w-full pr-2">{product.amount} {product.currency}</span>
        </div>
    );
};
export default ProductCard;
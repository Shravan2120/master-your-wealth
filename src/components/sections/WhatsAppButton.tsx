import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "918928271789";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi, I'm interested in financial planning. Please share more details."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Master Your Wealth on WhatsApp"
      className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-[#20BA5A] focus:outline-none focus:ring-4 focus:ring-green-200"
    >
      <FaWhatsapp size={34} />
    </a>
  );
}
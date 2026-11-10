import { SocialIcon } from "@/components/site/ui/social-icon";
import { COMPANY, whatsappUrl } from "@/content/site";

export function WhatsappButton() {
  return (
    <a
      href={whatsappUrl(COMPANY.whatsappGreeting)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Rekadia on WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex size-[60px] items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
    >
      <SocialIcon platform="whatsapp" size={30} />
    </a>
  );
}

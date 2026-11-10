import Image from "next/image";
import { Mail, Map as MapIcon } from "lucide-react";
import { ContactForm } from "@/components/site/forms/contact-form";
import { SocialIcon } from "@/components/site/ui/social-icon";
import { CONTACT_CHANNELS, CONTACT_FORM_COPY, CONTACT_PAGE, type ContactChannelIcon } from "@/content/contact";

function ChannelIcon({ icon }: { icon: ContactChannelIcon }) {
  if (icon === "whatsapp") return <SocialIcon platform="whatsapp" size={20} />;
  const Icon = icon === "email" ? Mail : MapIcon;
  return <Icon aria-hidden="true" size={20} strokeWidth={1.75} />;
}

export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-form-heading"
      className="mx-[10%] my-20 grid grid-cols-1 gap-12 max-md:my-[10vw] lg:grid-cols-2 xl:flex xl:justify-center 2xl:mt-[8vw] 2xl:mb-[10vw]"
    >
      <div className="rounded-lg border border-[#eceef2] shadow-form xl:min-w-0 xl:basis-[870px]">
        <div className="rounded-lg bg-white p-8 max-sm:mt-9">
          <h2
            id="contact-form-heading"
            className="font-montserrat text-xl leading-none font-semibold text-ink max-lg:text-center"
          >
            {CONTACT_FORM_COPY.title}
          </h2>
          <p className="mt-1.5 font-montserrat text-xs text-body max-lg:text-center">{CONTACT_FORM_COPY.description}</p>
          <ContactForm />
        </div>
      </div>

      <div className="flex flex-col gap-6 xl:min-w-0 xl:basis-[100vw]">
        <address className="flex flex-col gap-6 not-italic">
          {CONTACT_CHANNELS.map((channel) => {
            return (
              <div key={channel.label} className="flex flex-col gap-3">
                <p className="flex items-center gap-3 font-montserrat text-base font-semibold text-ink">
                  <ChannelIcon icon={channel.icon} />
                  {channel.label}
                </p>
                {channel.href ? (
                  <a
                    href={channel.href}
                    target={channel.icon === "whatsapp" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="w-fit font-montserrat text-xs text-[#4ca5ff] hover:underline"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <p className="font-montserrat text-xs text-body">{channel.value}</p>
                )}
              </div>
            );
          })}
        </address>
        <a
          href={CONTACT_PAGE.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the Rekadia office location in Google Maps"
          className="block overflow-hidden rounded-lg"
        >
          <Image
            src={CONTACT_PAGE.map.src}
            width={CONTACT_PAGE.map.width}
            height={CONTACT_PAGE.map.height}
            alt={CONTACT_PAGE.map.alt}
            sizes="(min-width: 992px) 45vw, 80vw"
            className="h-auto w-full"
          />
        </a>
      </div>
    </section>
  );
}

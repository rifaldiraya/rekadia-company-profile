import Image from "next/image";
import Link from "next/link";
import { Slider } from "@/components/site/ui/slider";
import { CLIENTS, CLIENTS_SECTION } from "@/content/home";
import type { Client } from "@/types/content";

export function ClientsSection({ clients = CLIENTS }: { clients?: Client[] }) {
  return (
    <section aria-labelledby="clients-heading" className="mx-[10%] mt-[120px] max-sm:mt-[60px]">
      <h2
        id="clients-heading"
        className="text-center font-montserrat text-[1.3rem] font-medium text-[#111]"
      >
        {CLIENTS_SECTION.title}
      </h2>
      <div className="mt-6">
        <Link
          href={CLIENTS_SECTION.seeAll.href}
          className="mb-3 flex w-full justify-end text-sm font-bold text-brand hover:underline max-sm:mb-0"
        >
          {CLIENTS_SECTION.seeAll.label}
        </Link>

        <ul className="grid grid-cols-4 gap-x-4 gap-y-[52px] max-sm:hidden md:grid-cols-5 lg:grid-cols-7">
          {clients.map((client) => (
            <li
              key={client.name}
              className="h-20 w-full rounded-lg border border-line p-3 motion-safe:hover:animate-jiggle"
            >
              <Image
                src={client.logo.src}
                width={client.logo.width}
                height={client.logo.height}
                alt={client.logo.alt}
                sizes="(min-width: 992px) 12vw, 20vw"
                className="size-full object-contain"
              />
            </li>
          ))}
        </ul>

        <Slider
          label="Client logos"
          arrows="dark"
          nav="numbers"
          className="h-[300px] sm:hidden"
          slides={clients.map((client) => (
            <div key={client.name} className="flex h-full items-center justify-center bg-white">
              <Image
                src={client.logo.src}
                width={client.logo.width}
                height={client.logo.height}
                alt={client.logo.alt}
                sizes="50vw"
                className="h-auto w-1/2"
              />
            </div>
          ))}
        />
      </div>
    </section>
  );
}

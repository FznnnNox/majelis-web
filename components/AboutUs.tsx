"use client";

import { BookOpen, Users, MapPin, ExternalLink } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Pembelajaran Al-Qur'an & Rutinan",
    description:
      "Program hafalan surah pendek, bacaan tajwid, dan kajian akhlak anak setiap harinya.",
  },
  {
    icon: Users,
    title: "Puluhan Santri Aktif",
    description:
      "Wadah pendidikan karakter Islami bagi anak-anak di lingkungan Kampung Panggang.",
  },
  {
    icon: MapPin,
    title: "Lokasi Strategis & Ramah Anak",
    description:
      "Lingkungan pengajian yang nyaman, aman, dan mudah diakses oleh warga sekitar.",
  },
];

export default function AboutUs() {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15869.832264639433!2d106.2068525!3d-6.1054722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e41f5007f703879%3A0x8f5d986e4dbd8fb3!2sMajelis%20Al-Inayah!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid";

  const mapDirectUrl =
    "https://www.google.com/maps/place/Majelis+Al-Inayah/@-6.1053849,106.2072068,127m/data=!3m1!1e3!4m6!3m5!1s0x2e41f5007f703879:0x8f5d986e4dbd8fb3!8m2!3d-6.1054722!4d106.2068525!16s%2Fg%2F11yf4dskhg";

  return (
    <section className="bg-white pt-28 sm:pt-40 md:pt-48 pb-12 sm:pb-20 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Tentang Kami
              </h2>
              <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
                Berlokasi di jantung Kampung Panggang, Majelis Al-Inayah hadir
                sebagai pusat pembinaan moral dan agama Islam bagi anak-anak. Kami
                berkomitmen mencetak generasi muda yang berakhlakul karimah,
                mencintai Al-Qur'an, dan memiliki kebersamaan sosial yang kuat.
              </p>
            </div>

            <div className="flex-1 rounded-2xl border border-gray-100 bg-gray-50/80 p-6 sm:p-8 md:p-10">
              <div className="flex flex-col gap-5 sm:gap-6">
                {features.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3.5 sm:gap-4">
                      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm leading-relaxed text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative w-full h-[280px] sm:h-[350px] lg:h-full lg:min-h-[400px] overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-gray-100 lg:col-span-6">
            <iframe
              title="Lokasi Majelis Al-Inayah"
              src={mapEmbedUrl}
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between rounded-xl bg-white/95 p-2.5 sm:p-3.5 shadow-md backdrop-blur-md border border-gray-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-white">
                  <MapPin className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-sm font-semibold text-gray-900 leading-tight">
                    Majelis Al-Inayah
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    Kampung Panggang
                  </p>
                </div>
              </div>

              <a
                href={mapDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-xs font-medium text-white transition-all hover:bg-emerald-800 active:scale-95 shrink-0"
              >
                Buka Maps
                <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
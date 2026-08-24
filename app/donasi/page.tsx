// "use client";

// import { useState, useEffect, useCallback } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { createClient } from "@/lib/supabase/client";
// import {
//   FeaturedCampaign,
//   DonorFormState,
//   Frekuensi,
// } from "./types";
// import DonasiHero from "./_components/DonasiHero";
// import BannerVisual from "./_components/BannerVisual";
// import AmountSelector from "./_components/AmountSelector";
// import FrequencySelector from "./_components/FrequencySelector";
// import DonorInfoForm from "./_components/DonorInfoForm";
// import ProgressTracker from "./_components/ProgressTracker";
// import SubmitButton from "./_components/SubmitButton";
// import SuccessState from "./_components/SuccessState";

// // Direct client initialization outside component to prevent infinite re-render loop
// const supabase = createClient();

// export default function DonasiPage() {
//   const [campaign, setCampaign] = useState<FeaturedCampaign | null>(null);
//   const [isLoadingCampaign, setIsLoadingCampaign] = useState(true);

//   const [selectedAmount, setSelectedAmount] = useState<number>(100000);
//   const [customAmount, setCustomAmount] = useState<string>("100000");
//   const [frequency, setFrequency] = useState<Frekuensi>("Bulanan");
//   const [donorForm, setDonorForm] = useState<DonorFormState>({
//     nama: "",
//     email: "",
//     pesan: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [lastNominal, setLastNominal] = useState(0);

//   // Ambil program unggulan + hitung terkumpul live
//   const fetchCampaign = useCallback(async () => {
//     setIsLoadingCampaign(true);
//     try {
//       const { data: programs, error: programError } = await supabase
//         .from("program_donasi")
//         .select("id, nama, deskripsi, target")
//         .not("target", "is", null)
//         .gt("target", 0)
//         .order("id", { ascending: true })
//         .limit(1);

//       if (programError) throw programError;
//       if (!programs || programs.length === 0) {
//         setCampaign(null);
//         return;
//       }

//       const featured = programs[0];

//       const { data: verifiedDonasi, error: donasiError } = await supabase
//         .from("donasi")
//         .select("nominal")
//         .eq("program_id", featured.id)
//         .eq("status", "Terverifikasi");

//       if (donasiError) throw donasiError;

//       const terkumpul = (verifiedDonasi || []).reduce(
//         (acc, curr: any) => acc + Number(curr.nominal),
//         0
//       );

//       setCampaign({
//         id: featured.id,
//         nama: featured.nama,
//         deskripsi: featured.deskripsi,
//         target: Number(featured.target),
//         terkumpul,
//       });
//     } catch (err) {
//       console.error("Error fetching campaign:", err);
//     } finally {
//       setIsLoadingCampaign(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCampaign();
//   }, [fetchCampaign]);

//   const handleSelectPreset = (amount: number) => {
//     setSelectedAmount(amount);
//     setCustomAmount(amount.toString());
//   };

//   const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, "");
//     setCustomAmount(value);
//     setSelectedAmount(Number(value) || 0);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!donorForm.nama.trim() || !selectedAmount) {
//     alert("Mohon isi nama lengkap dan nominal donasi.");
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     const payload = {
//       donatur: donorForm.nama.trim(),
//       email: donorForm.email.trim() || null,
//       tanggal: new Date().toISOString().slice(0, 10),
//       program_id: campaign?.id ?? null,
//       nominal: selectedAmount,
//       metode: "Transfer BSI / QRIS",
//       status: "Pending",
//       pesan: donorForm.pesan.trim() || null,
//       frekuensi: frequency,
//     };

//     const { error } = await supabase.from("donasi").insert([payload]);
//     if (error) throw error;

//     setLastNominal(selectedAmount);
//     setIsSuccess(true); // Membuka tampilan instruksi pembayaran
//   } catch (err: any) {
//     console.error("Error submitting donasi:", err);
//     alert(err?.message || "Gagal mengirim data donasi.");
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const handleDonateAgain = () => {
//     setIsSuccess(false);
//     setDonorForm({ nama: "", email: "", pesan: "" });
//     setSelectedAmount(100000);
//     setCustomAmount("100000");
//     fetchCampaign();
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="pt-[82px] bg-[#f8faf9] min-h-screen">
//         <DonasiHero />

//         <section className="mx-auto max-w-7xl px-6 lg:px-12 py-8 md:py-12">
//           <div className="overflow-hidden rounded-3xl bg-white p-6 sm:p-10 shadow-sm border border-gray-200/70">
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
//               <BannerVisual />

//               <div className="lg:col-span-7 flex flex-col justify-between">
//                 {isSuccess ? (
//                   <SuccessState
//                     nominal={lastNominal}
//                     onDonateAgain={handleDonateAgain}
//                   />
//                 ) : (
//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <AmountSelector
//                       selectedAmount={selectedAmount}
//                       customAmount={customAmount}
//                       onSelectPreset={handleSelectPreset}
//                       onCustomChange={handleCustomAmountChange}
//                     />

//                     <FrequencySelector
//                       frequency={frequency}
//                       onChange={setFrequency}
//                     />

//                     <DonorInfoForm
//                       formData={donorForm}
//                       onChange={setDonorForm}
//                     />

//                     <ProgressTracker
//                       campaign={campaign}
//                       isLoading={isLoadingCampaign}
//                     />

//                     <SubmitButton isSubmitting={isSubmitting} />
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }
// "use client";

// import { useState, useEffect, useCallback } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { createClient } from "@/lib/supabase/client";
// import {
//   FeaturedCampaign,
//   DonorFormState,
//   Frekuensi,
// } from "./types";
// import DonasiHero from "./_components/DonasiHero";
// import BannerVisual from "./_components/BannerVisual";
// import AmountSelector from "./_components/AmountSelector";
// import FrequencySelector from "./_components/FrequencySelector";
// import DonorInfoForm from "./_components/DonorInfoForm";
// import ProgressTracker from "./_components/ProgressTracker";
// import SubmitButton from "./_components/SubmitButton";
// import SuccessState from "./_components/SuccessState";

// // Direct client initialization outside component to prevent infinite re-render loop
// const supabase = createClient();

// export default function DonasiPage() {
//   const [campaign, setCampaign] = useState<FeaturedCampaign | null>(null);
//   const [isLoadingCampaign, setIsLoadingCampaign] = useState(true);

//   const [selectedAmount, setSelectedAmount] = useState<number>(100000);
//   const [customAmount, setCustomAmount] = useState<string>("100000");
//   const [frequency, setFrequency] = useState<Frekuensi>("Bulanan");
//   const [donorForm, setDonorForm] = useState<DonorFormState>({
//     nama: "",
//     email: "",
//     pesan: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [lastNominal, setLastNominal] = useState(0);

//   // Ambil program unggulan + hitung terkumpul live
//   const fetchCampaign = useCallback(async () => {
//     setIsLoadingCampaign(true);
//     try {
//       const { data: programs, error: programError } = await supabase
//         .from("program_donasi")
//         .select("id, nama, deskripsi, target")
//         .eq("is_active", true)
//         .not("target", "is", null)
//         .gt("target", 0)
//         .order("id", { ascending: true })
//         .limit(1);

//       if (programError) throw programError;
//       if (!programs || programs.length === 0) {
//         setCampaign(null);
//         return;
//       }

//       const featured = programs[0];

//       const { data: verifiedDonasi, error: donasiError } = await supabase
//         .from("donasi")
//         .select("nominal")
//         .eq("program_id", featured.id)
//         .eq("status", "Terverifikasi");

//       if (donasiError) throw donasiError;

//       const terkumpul = (verifiedDonasi || []).reduce(
//         (acc, curr: any) => acc + Number(curr.nominal),
//         0
//       );

//       setCampaign({
//         id: featured.id,
//         nama: featured.nama,
//         deskripsi: featured.deskripsi,
//         target: Number(featured.target),
//         terkumpul,
//       });
//     } catch (err) {
//       console.error("Error fetching campaign:", err);
//     } finally {
//       setIsLoadingCampaign(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCampaign();
//   }, [fetchCampaign]);

//   const handleSelectPreset = (amount: number) => {
//     setSelectedAmount(amount);
//     setCustomAmount(amount.toString());
//   };

//   const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, "");
//     setCustomAmount(value);
//     setSelectedAmount(Number(value) || 0);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!donorForm.nama.trim() || !selectedAmount) {
//       alert("Mohon isi nama lengkap dan nominal donasi.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const payload = {
//         donatur: donorForm.nama.trim(),
//         email: donorForm.email.trim() || null,
//         tanggal: new Date().toISOString().slice(0, 10),
//         program_id: campaign?.id ?? null,
//         nominal: selectedAmount,
//         metode: "Transfer BSI / QRIS",
//         status: "Pending",
//         pesan: donorForm.pesan.trim() || null,
//         frekuensi: frequency,
//       };

//       const { error } = await supabase.from("donasi").insert([payload]);
//       if (error) throw error;

//       setLastNominal(selectedAmount);
//       setIsSuccess(true); // Membuka tampilan instruksi pembayaran
//     } catch (err: any) {
//       console.error("Error submitting donasi:", err);
//       alert(err?.message || "Gagal mengirim data donasi.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDonateAgain = () => {
//     setIsSuccess(false);
//     setDonorForm({ nama: "", email: "", pesan: "" });
//     setSelectedAmount(100000);
//     setCustomAmount("100000");
//     fetchCampaign();
//   };

//   return (
//     <>
//       <Navbar />
//       <main className="pt-[82px] bg-[#f8faf9] min-h-screen relative">
//         {/* Faint eight-point star watermark, echoing Islamic geometric ornament */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-x-0 top-24 flex justify-center opacity-[0.04]"
//         >
//           <svg width="420" height="420" viewBox="0 0 100 100" fill="none">
//             <path
//               d="M50 2 L61 39 L98 50 L61 61 L50 98 L39 61 L2 50 L39 39 Z"
//               stroke="#152e28"
//               strokeWidth="0.6"
//             />
//             <path
//               d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z"
//               stroke="#152e28"
//               strokeWidth="0.6"
//             />
//           </svg>
//         </div>

//         <DonasiHero />

//         <section className="relative mx-auto max-w-7xl px-6 lg:px-12 py-8 md:py-12">
//           <div className="overflow-hidden rounded-3xl bg-white p-6 sm:p-10 shadow-sm border border-gray-200/70">
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
//               <BannerVisual />

//               <div className="lg:col-span-7 flex flex-col justify-between">
//                 {isSuccess ? (
//                   <SuccessState
//                     nominal={lastNominal}
//                     onDonateAgain={handleDonateAgain}
//                   />
//                 ) : (
//                   <form onSubmit={handleSubmit} className="space-y-7">
//                     <AmountSelector
//                       selectedAmount={selectedAmount}
//                       customAmount={customAmount}
//                       onSelectPreset={handleSelectPreset}
//                       onCustomChange={handleCustomAmountChange}
//                     />

//                     <FrequencySelector
//                       frequency={frequency}
//                       onChange={setFrequency}
//                     />

//                     <DonorInfoForm
//                       formData={donorForm}
//                       onChange={setDonorForm}
//                     />

//                     <ProgressTracker
//                       campaign={campaign}
//                       isLoading={isLoadingCampaign}
//                     />

//                     <SubmitButton isSubmitting={isSubmitting} />
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }

"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import {
  FeaturedCampaign,
  DonorFormState,
  Frekuensi,
} from "./types";
import DonasiHero from "./_components/DonasiHero";
import BannerVisual from "./_components/BannerVisual";
import AmountSelector from "./_components/AmountSelector";
import DonorInfoForm from "./_components/DonorInfoForm";
import ProgressTracker from "./_components/ProgressTracker";
import SubmitButton from "./_components/SubmitButton";
import SuccessState from "./_components/SuccessState";

const supabase = createClient();

function DonasiContent() {
  const searchParams = useSearchParams();
  const programId = searchParams.get("program");

  const [campaign, setCampaign] = useState<FeaturedCampaign | null>(null);
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(true);

  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>("100000");
  const [donorForm, setDonorForm] = useState<DonorFormState>({
    nama: "",
    email: "",
    pesan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastNominal, setLastNominal] = useState(0);

  // Ambil program berdasarkan parameter ?program=ID atau default program pertama
  const fetchCampaign = useCallback(async () => {
    setIsLoadingCampaign(true);
    try {
      let featured = null;

      // 1. Cek jika ada programId di URL
      if (programId) {
        const { data: progData, error: progErr } = await supabase
          .from("program_donasi")
          .select("id, nama, deskripsi, target")
          .eq("id", programId)
          .maybeSingle();

        if (!progErr && progData) {
          featured = progData;
        }
      }

      // 2. Fallback jika tidak ada ID atau ID tidak ditemukan
      if (!featured) {
        const { data: programs, error: programError } = await supabase
          .from("program_donasi")
          .select("id, nama, deskripsi, target")
          .order("id", { ascending: true })
          .limit(1);

        if (programError) throw programError;
        if (programs && programs.length > 0) {
          featured = programs[0];
        }
      }

      if (!featured) {
        setCampaign(null);
        return;
      }

      // 3. Hitung total donasi terverifikasi untuk program terpilih
      const { data: verifiedDonasi, error: donasiError } = await supabase
        .from("donasi")
        .select("nominal")
        .eq("program_id", featured.id)
        .eq("status", "Terverifikasi");

      if (donasiError) throw donasiError;

      const terkumpul = (verifiedDonasi || []).reduce(
        (acc, curr: any) => acc + Number(curr.nominal),
        0
      );

      setCampaign({
        id: featured.id,
        nama: featured.nama,
        deskripsi: featured.deskripsi,
        target: Number(featured.target),
        terkumpul,
      });
    } catch (err) {
      console.error("Error fetching campaign:", err);
    } finally {
      setIsLoadingCampaign(false);
    }
  }, [programId]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomAmount(value);
    setSelectedAmount(Number(value) || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!donorForm.nama.trim() || !selectedAmount) {
      alert("Mohon isi nama lengkap dan nominal donasi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        donatur: donorForm.nama.trim(),
        email: donorForm.email.trim() || null,
        tanggal: new Date().toISOString().slice(0, 10),
        program_id: campaign?.id ?? null,
        nominal: selectedAmount,
        metode: "Transfer BSI / QRIS",
        status: "Pending",
        pesan: donorForm.pesan.trim() || null,
      };

      const { error } = await supabase.from("donasi").insert([payload]);
      if (error) throw error;

      setLastNominal(selectedAmount);
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Error submitting donasi:", err);
      alert(err?.message || "Gagal mengirim data donasi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDonateAgain = () => {
    setIsSuccess(false);
    setDonorForm({ nama: "", email: "", pesan: "" });
    setSelectedAmount(100000);
    setCustomAmount("100000");
    fetchCampaign();
  };

  return (
    <main className="pt-[82px] bg-[#f8faf9] min-h-screen relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 flex justify-center opacity-[0.04]"
      >
        <svg width="420" height="420" viewBox="0 0 100 100" fill="none">
          <path
            d="M50 2 L61 39 L98 50 L61 61 L50 98 L39 61 L2 50 L39 39 Z"
            stroke="#152e28"
            strokeWidth="0.6"
          />
          <path
            d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z"
            stroke="#152e28"
            strokeWidth="0.6"
          />
        </svg>
      </div>

      <DonasiHero />

      <section className="relative mx-auto max-w-7xl px-6 lg:px-12 py-8 md:py-12">
        <div className="overflow-hidden rounded-3xl bg-white p-6 sm:p-10 shadow-sm border border-gray-200/70">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <BannerVisual />

            <div className="lg:col-span-7 flex flex-col justify-between">
              {isSuccess ? (
                <SuccessState
                  nominal={lastNominal}
                  onDonateAgain={handleDonateAgain}
                />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <AmountSelector
                    selectedAmount={selectedAmount}
                    customAmount={customAmount}
                    onSelectPreset={handleSelectPreset}
                    onCustomChange={handleCustomAmountChange}
                  />

                  <DonorInfoForm
                    formData={donorForm}
                    onChange={setDonorForm}
                  />

                  <ProgressTracker
                    campaign={campaign}
                    isLoading={isLoadingCampaign}
                  />

                  <SubmitButton isSubmitting={isSubmitting} />
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function DonasiPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen pt-[120px] text-center text-xs text-gray-400">Memuat halaman...</div>}>
        <DonasiContent />
      </Suspense>
      <Footer />
    </>
  );
}
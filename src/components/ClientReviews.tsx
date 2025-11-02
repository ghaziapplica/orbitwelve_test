"use client";

import { createClient } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Review {
  id: string;
  author: string;
  comment: string;
  position?: string;
  rating?: number;
}

type Country =
  | "all"
  | "arabia"
  | "Australia"
  | "Bahrain"
  | "Belgium"
  | "Canada"
  | "France"
  | "Germany"
  | "Grenada"
  | "Gyana"
  | "Hong Kong"
  | "India"
  | "Italy"
  | "Jordan"
  | "Netherlands"
  | "Pakistan"
  | "Panama"
  | "Poland"
  | "UAE"
  | "UK"
  | "USA";

const BUCKET = "reviews";

function toFolderSlug(country: Country): string {
  if (country === "all") return "All";

  const folderMap: Record<string, string> = {
    "Saudi Arabia": "Arabia",
    Australia: "Australia",
    Bahrain: "Bahrain",
    Belgium: "Belgium",
    Canada: "Canada",
    France: "France",
    Germany: "Germany",
    Grenada: "Grenada",
    Gyana: "Gyana",
    "Hong Kong": "Hong Kong",
    India: "India",
    Italy: "Italy",
    Jordan: "Jordan",
    Netherlands: "Netherlands",
    Pakistan: "Pakistan",
    Panama: "Panama",
    Poland: "Poland",
    UAE: "UAE",
    UK: "UK",
    USA: "USA",
  };

  return folderMap[country] || country;
}

type ImageItem = {
  id: string;
  name: string;
  url: string;
  country: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ClientReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const countries: Country[] = useMemo(
    () => [
      "all",
      "arabia",
      "Australia",
      "Bahrain",
      "Belgium",
      "Canada",
      "France",
      "Germany",
      "Grenada",
      "Gyana",
      "Hong Kong",
      "India",
      "Italy",
      "Jordan",
      "Netherlands",
      "Pakistan",
      "Panama",
      "Poland",
      "UAE",
      "UK",
      "USA",
    ],
    []
  );

  const [activeCountry, setActiveCountry] = useState<Country>("all");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const listFolderImages = useCallback(async (folder: string) => {
    const { data, error } = await supabase.storage.from(BUCKET).list(folder, {
      limit: 200,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }

    const files = (data || []).filter((d: any) => !d.name.endsWith("/"));

    const withUrl: ImageItem[] = files.map((f: any, idx: number) => {
      const filePath = `${folder}/${f.name}`;
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

      return {
        id: `${folder}-${idx}`,
        name: f.name,
        url: urlData.publicUrl,
        country: folder,
      };
    });

    return withUrl;
  }, []);

  const loadImages = useCallback(
    async (country: Country) => {
      setLoading(true);
      setError(null);
      try {
        if (country === "all") {
          const { data: rootData, error: rootError } = await supabase.storage
            .from(BUCKET)
            .list("", { limit: 100 });

          if (rootError) throw rootError;

          const folders =
            rootData?.filter((item) => !item.name.includes(".")) || [];

          const allImages: ImageItem[] = [];
          for (const folder of folders) {
            const images = await listFolderImages(folder.name);
            allImages.push(...images);
          }
          setImages(allImages);
        } else {
          const folder = toFolderSlug(country);
          const list = await listFolderImages(folder);
          setImages(list);
        }
      } catch (e: any) {
        console.error("💥 Error loading images:", e);
        setError(e?.message || "Failed to load images");
        setImages([]);
      } finally {
        setLoading(false);
      }
    },
    [listFolderImages]
  );

  useEffect(() => {
    loadImages(activeCountry);
  }, [activeCountry, loadImages]);

  // ⭐ Star rating helper
  const renderRating = (rating: number = 5) => (
    <div className="flex items-center mt-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 py-16 bg-transparent">
      {/* 🏷️ Title + Filters */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
          Client Testimonials
        </h2>

        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
          {countries.map((country) => {
            const isActive = activeCountry === country;
            return (
              <button
                key={country}
                onClick={() => setActiveCountry(country)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  isActive
                    ? "bg-[#1098D5] text-white border-[#1098D5] shadow-sm"
                    : "bg-transparent text-gray-700 border-gray-300 hover:bg-[#1098D5]/10"
                }`}
                style={{ textTransform: "capitalize" }}
              >
                {country}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <svg
            className="animate-spin h-8 w-8 text-[#1098D5]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}

      {/* Empty */}
      {!loading && images.length === 0 && (
        <div className="text-center text-gray-500 py-16">
          No images found for "{activeCountry}"
        </div>
      )}

      {/* Image Grid */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {images.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-xl hover:shadow-lg transition-transform duration-200 hover:scale-[1.02] overflow-hidden bg-transparent"
            >
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-80 object-cover cursor-pointer"
                loading="lazy"
                onClick={() => setSelectedImage(img)}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Full Size Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

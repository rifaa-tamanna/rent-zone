"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  PackagePlus,
  UploadCloud,
  FileText,
  Images,
  X,
  ImagePlus,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";

import { DashboardPageHeader } from "@/app/components/dashboard/DashboardPageHeader";
import { Card } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-[#A6532E] focus:ring-2 focus:ring-[#A6532E]/20";

const labelClass = "text-sm font-semibold text-foreground";

type SelectedImage = {
  file: File;
  preview: string;
};

type UploadResponse = {
  success: boolean;
  message: string;
  images: string[];
};

type EquipmentResponse = {
  success: boolean;
  message: string;
};

export default function DashboardOwnerAddEquipmentPage() {
  const [rentalTypes, setRentalTypes] = useState<string[]>(["daily"]);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [manualImageUrls, setManualImageUrls] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const previewUrls = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleRentalType = (type: string) => {
    setRentalTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type],
    );
  };

  // Select multiple images
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const remainingSlots = 5 - selectedImages.length;

    if (remainingSlots <= 0) {
      toast.error("You can upload a maximum of 5 images.");
      event.target.value = "";
      return;
    }

    const validFiles: SelectedImage[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image.`);
        continue;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds the 5 MB limit.`);
        continue;
      }

      if (validFiles.length >= remainingSlots) {
        toast.error("You can upload a maximum of 5 images.");
        break;
      }

      const preview = URL.createObjectURL(file);

      previewUrls.current.push(preview);

      validFiles.push({
        file,
        preview,
      });
    }

    setSelectedImages((prev) => [...prev, ...validFiles]);

    event.target.value = "";
  };

  // Remove selected image
  const removeImage = (preview: string) => {
    URL.revokeObjectURL(preview);

    previewUrls.current = previewUrls.current.filter(
      (url) => url !== preview,
    );

    setSelectedImages((prev) =>
      prev.filter((item) => item.preview !== preview),
    );
  };

  // Submit equipment
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (rentalTypes.length === 0) {
      toast.error("Please select at least one rental type.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const manualUrls = manualImageUrls
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    // Check image availability
    if (selectedImages.length === 0 && manualUrls.length === 0) {
      toast.error("Please upload an image or provide an image URL.");
      return;
    }

    // Validate manual image URLs
    const validManualUrls = manualUrls.filter((url) => {
      try {
        const parsedUrl = new URL(url);
        return ["http:", "https:"].includes(parsedUrl.protocol);
      } catch {
        return false;
      }
    });

    if (validManualUrls.length !== manualUrls.length) {
      toast.error("Please provide valid image URLs.");
      return;
    }

    try {
      setIsSubmitting(true);

      let uploadedImageUrls: string[] = [];

      // 1. Upload selected images to ImgBB
      if (selectedImages.length > 0) {
        const imageFormData = new FormData();

        selectedImages.forEach(({ file }) => {
          imageFormData.append("images", file);
        });

        toast.loading("Uploading equipment images...", {
          id: "equipment-upload",
        });

        const uploadResult = await apiFetch<UploadResponse>(
          "/api/owner/images",
          {
            method: "POST",
            body: imageFormData,
          },
        );

        uploadedImageUrls = uploadResult.images;

        toast.success("Images uploaded successfully!", {
          id: "equipment-upload",
        });
      }

      // 2. Combine uploaded and manual image URLs
      const allImages = [
        ...new Set([...uploadedImageUrls, ...validManualUrls]),
      ];

      if (allImages.length === 0) {
        throw new Error("At least one equipment image is required.");
      }

      // 3. Prepare rental prices
      const rentalPrice: Record<string, number> = {};

      rentalTypes.forEach((type) => {
        const price = Number(formData.get(`price-${type}`));

        if (!Number.isFinite(price) || price <= 0) {
          throw new Error(`Please enter a valid ${type} rental price.`);
        }

        rentalPrice[type] = price;
      });

      // 4. Prepare equipment data
      const equipmentData = {
        name: String(formData.get("name") || "").trim(),
        description: String(formData.get("description") || "").trim(),
        category: String(formData.get("category") || ""),
        location: String(formData.get("location") || "").trim(),

        rentalTypes,
        rentalPrice,

        availableQuantity: Number(formData.get("availableQuantity")),

        condition: String(formData.get("condition") || ""),
        brand: String(formData.get("brand") || "").trim(),
        model: String(formData.get("model") || "").trim(),

        image: allImages[0],
        images: allImages,

        rentalTerms: String(formData.get("rentalTerms") || ""),
      };

      // 5. Save equipment in MongoDB through Express
      const result = await apiFetch<EquipmentResponse>(
        "/api/owner/equipment",
        {
          method: "POST",
          body: JSON.stringify(equipmentData),
        },
      );

      toast.success(
        result.message || "Equipment submitted successfully!",
      );

      // 6. Reset form
      form.reset();

      setRentalTypes(["daily"]);
      setSelectedImages([]);
      setManualImageUrls("");

      previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
      previewUrls.current = [];
    } catch (error) {
      toast.dismiss("equipment-upload");

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Owner Dashboard"
        description="Add your equipment and make it available for customers to rent."
      />

      <Card className="mx-auto max-w-4xl overflow-hidden border-border bg-card p-5 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#A6532E]/10 text-[#A6532E]">
            <PackagePlus className="size-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
              Equipment Information
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Provide complete details about your equipment.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="space-y-5">
            <div className="border-b border-border pb-3">
              <h3 className="font-bold text-foreground">
                Basic Information
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Enter the basic details of your equipment.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass}>
                  Equipment Name <span className="text-[#A6532E]">*</span>
                </label>
                <input
                  name="name"
                  required
                  placeholder="e.g. Mini Excavator"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>
                  Category <span className="text-[#A6532E]">*</span>
                </label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Construction">Construction Equipment</option>
                  <option value="Agriculture">Agriculture Equipment</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Technology">Technology & Electronics</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>
                Description <span className="text-[#A6532E]">*</span>
              </label>
              <textarea
                name="description"
                required
                rows={4}
                placeholder="Describe your equipment, its features and uses..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass}>
                  Location <span className="text-[#A6532E]">*</span>
                </label>
                <input
                  name="location"
                  required
                  placeholder="e.g. Dhaka, Bangladesh"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass}>
                  Available Quantity <span className="text-[#A6532E]">*</span>
                </label>
                <input
                  name="availableQuantity"
                  type="number"
                  min="1"
                  required
                  placeholder="e.g. 5"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Rental Information */}
          <section className="space-y-5">
            <div className="border-b border-border pb-3">
              <h3 className="font-bold text-foreground">
                Rental Information
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose your rental options and set your prices.
              </p>
            </div>

            <div className="space-y-3">
              <label className={labelClass}>
                Rental Type <span className="text-[#A6532E]">*</span>
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {["daily", "weekly", "monthly"].map((type) => {
                  const checked = rentalTypes.includes(type);

                  return (
                    <label
                      key={type}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                        checked
                          ? "border-[#A6532E] bg-[#A6532E]/10 text-[#A6532E] shadow-sm"
                          : "border-border bg-background text-foreground hover:border-[#A6532E]/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleRentalType(type)}
                        className="size-4 cursor-pointer accent-[#A6532E]"
                      />
                      <span className="text-sm font-semibold capitalize">
                        {type} Rental
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {rentalTypes.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-3">
                {rentalTypes.map((type) => (
                  <div key={type} className="space-y-2">
                    <label className={labelClass}>
                      {type.charAt(0).toUpperCase() + type.slice(1)} Price ($){" "}
                      <span className="text-[#A6532E]">*</span>
                    </label>
                    <input
                      name={`price-${type}`}
                      type="number"
                      min="1"
                      required
                      placeholder="e.g. 50"
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Equipment Details */}
          <section className="space-y-5">
            <div className="border-b border-border pb-3">
              <h3 className="font-bold text-foreground">
                Equipment Details
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Add condition and manufacturer information.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className={labelClass}>
                  Condition <span className="text-[#A6532E]">*</span>
                </label>
                <select
                  name="condition"
                  required
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select condition
                  </option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className={labelClass}>
                  Brand <span className="text-[#A6532E]">*</span>
                </label>
                <input
                  name="brand"
                  required
                  placeholder="e.g. Caterpillar"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>
                Model <span className="text-[#A6532E]">*</span>
              </label>
              <input
                name="model"
                required
                placeholder="e.g. CAT 301.7 CR"
                className={inputClass}
              />
            </div>
          </section>

          {/* Equipment Images */}
          <section className="space-y-5">
            <div className="border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Images className="size-5 text-[#A6532E]" />
                <h3 className="font-bold text-foreground">
                  Equipment & Machinery Images
                </h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Upload up to 5 images or add image URLs manually.
              </p>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className={labelClass}>
                Upload Equipment Images{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (ImgBB Hosted)
                </span>
              </label>

              <label
                className={`group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-9 text-center transition-all ${
                  selectedImages.length >= 5
                    ? "cursor-not-allowed border-border opacity-50"
                    : "cursor-pointer border-[#A6532E]/30 bg-[#A6532E]/5 hover:border-[#A6532E] hover:bg-[#A6532E]/10"
                }`}
              >
                <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#A6532E]/10 text-[#A6532E] transition-transform group-hover:scale-110">
                  <UploadCloud className="size-6" />
                </div>

                <span className="text-sm font-bold text-foreground">
                  {selectedImages.length >= 5
                    ? "Maximum images selected"
                    : "Click to upload images"}
                </span>

                <span className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, JPEG or WEBP · Maximum 5 MB per image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={selectedImages.length >= 5 || isSubmitting}
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Selected images</span>
                <span className="font-semibold text-[#A6532E]">
                  {selectedImages.length}/5
                </span>
              </div>

              {/* Image Preview */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {selectedImages.map((item) => (
                    <div
                      key={item.preview}
                      className="group relative overflow-hidden rounded-xl border border-border bg-muted"
                    >
                      <img
                        src={item.preview}
                        alt={item.file.name}
                        className="aspect-square w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(item.preview)}
                        disabled={isSubmitting}
                        aria-label="Remove image"
                        className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/70 text-white opacity-100 transition-colors hover:bg-[#A6532E] sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <X className="size-4" />
                      </button>

                      <div className="truncate bg-card px-2 py-2 text-xs text-foreground">
                        {item.file.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Manual Image URLs */}
            <div className="space-y-2">
              <label className={labelClass}>
                Or Add Additional Image URLs Manually
              </label>

              <textarea
                name="imageUrls"
                rows={4}
                value={manualImageUrls}
                onChange={(event) => setManualImageUrls(event.target.value)}
                placeholder={`https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg\nhttps://example.com/image-3.jpg`}
                className={`${inputClass} resize-y font-mono text-xs leading-6`}
              />

              <p className="text-xs text-muted-foreground">
                Paste image URLs, one URL per line. Uploaded and manual URLs
                will be combined.
              </p>
            </div>
          </section>

          {/* Rental Terms */}
          <section className="space-y-4">
            <div className="border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-[#A6532E]" />
                <h3 className="font-bold text-foreground">
                  Rental Terms & Conditions
                </h3>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                Explain your rental rules and conditions to customers.
              </p>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>
                Rental Terms{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (Optional)
                </span>
              </label>

              <textarea
                name="rentalTerms"
                rows={5}
                placeholder={`Enter your rental terms and conditions...\n\nExample:\n1. Valid identification is required.\n2. Equipment must be returned in its original condition.\n3. Late returns may incur additional charges.`}
                className={`${inputClass} resize-y leading-6`}
              />
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <button
              type="reset"
              disabled={isSubmitting}
              onClick={() => {
                setRentalTypes(["daily"]);
                setSelectedImages([]);
                setManualImageUrls("");

                previewUrls.current.forEach((url) =>
                  URL.revokeObjectURL(url),
                );
                previewUrls.current = [];
              }}
              className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-[#A6532E] hover:bg-[#A6532E]/5 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || rentalTypes.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A6532E] to-[#844225] px-6 py-3 text-sm font-bold text-[#F3DFC2] shadow-md shadow-[#A6532E]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#A6532E]/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ImagePlus className="size-4" />
                  Submit Equipment
                </>
              )}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

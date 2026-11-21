"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
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

import { Card } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import type { Equipment } from "@/types/equipment";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-[#A6532E] focus:ring-2 focus:ring-[#A6532E]/20";

const labelClass = "text-sm font-semibold text-foreground";

type SelectedImage = {
  file: File;
  preview: string;
};

type EquipmentFormProps = {
  mode: "add" | "edit";
  initialEquipment?: Equipment;
  onSuccess?: () => void;
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

export function EquipmentForm({
  mode,
  initialEquipment,
  onSuccess,
}: EquipmentFormProps) {
  const [rentalTypes, setRentalTypes] = useState<string[]>(
    initialEquipment?.rentalTypes || ["daily"],
  );

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  const [existingImages, setExistingImages] = useState<string[]>(
    initialEquipment?.images?.length
      ? initialEquipment.images
      : initialEquipment?.image
        ? [initialEquipment.image]
        : [],
  );

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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const remainingSlots = 5 - existingImages.length - selectedImages.length;

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

      validFiles.push({ file, preview });
    }

    setSelectedImages((prev) => [...prev, ...validFiles]);
    event.target.value = "";
  };

  const removeSelectedImage = (preview: string) => {
    URL.revokeObjectURL(preview);

    previewUrls.current = previewUrls.current.filter((url) => url !== preview);

    setSelectedImages((prev) =>
      prev.filter((item) => item.preview !== preview),
    );
  };

  const removeExistingImage = (url: string) => {
    setExistingImages((prev) => prev.filter((item) => item !== url));
  };

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

    if (
      existingImages.length === 0 &&
      selectedImages.length === 0 &&
      validManualUrls.length === 0
    ) {
      toast.error("Please provide at least one equipment image.");
      return;
    }

    try {
      setIsSubmitting(true);

      let uploadedImages: string[] = [];

      // Upload new images
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

        uploadedImages = uploadResult.images;

        toast.success("Images uploaded successfully!", {
          id: "equipment-upload",
        });
      }

      const allImages = [
        ...new Set([...existingImages, ...uploadedImages, ...validManualUrls]),
      ];

      if (allImages.length === 0) {
        throw new Error("At least one equipment image is required.");
      }

      const rentalPrice: Record<string, number> = {};

      rentalTypes.forEach((type) => {
        const price = Number(formData.get(`price-${type}`));

        if (!Number.isFinite(price) || price <= 0) {
          throw new Error(`Please enter a valid ${type} rental price.`);
        }

        rentalPrice[type] = price;
      });

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

      const endpoint =
        mode === "edit"
          ? `/api/owner/equipment/${initialEquipment?._id}`
          : "/api/owner/equipment";

      const result = await apiFetch<EquipmentResponse>(endpoint, {
        method: mode === "edit" ? "PUT" : "POST",
        body: JSON.stringify(equipmentData),
      });

      toast.success(
        result.message ||
          (mode === "edit"
            ? "Equipment updated successfully!"
            : "Equipment submitted successfully!"),
      );

      if (mode === "add") {
        form.reset();
        setRentalTypes(["daily"]);
        setSelectedImages([]);
        setExistingImages([]);
        setManualImageUrls("");

        previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
        previewUrls.current = [];
      }

      onSuccess?.();
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

  const imageCount = existingImages.length + selectedImages.length;

  return (
    <Card className="mx-auto max-w-4xl overflow-hidden border-border bg-card p-5 shadow-sm sm:p-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#A6532E]/10 text-[#A6532E]">
          <PackagePlus className="size-6" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            Equipment Information
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "edit"
              ? "Update your equipment information."
              : "Provide complete details about your equipment."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <section className="space-y-5">
          <div className="border-b border-border pb-3">
            <h3 className="font-bold text-foreground">Basic Information</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter the basic details of your equipment.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className={labelClass}>Equipment Name *</label>
              <input
                name="name"
                required
                defaultValue={initialEquipment?.name || ""}
                placeholder="e.g. Mini Excavator"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Category *</label>
              <select
                name="category"
                required
                defaultValue={initialEquipment?.category || ""}
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
            <label className={labelClass}>Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={initialEquipment?.description || ""}
              placeholder="Describe your equipment, its features and uses..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className={labelClass}>Location *</label>
              <input
                name="location"
                required
                defaultValue={initialEquipment?.location || ""}
                placeholder="e.g. Dhaka, Bangladesh"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Available Quantity *</label>
              <input
                name="availableQuantity"
                type="number"
                min="1"
                required
                defaultValue={initialEquipment?.availableQuantity ?? ""}
                placeholder="e.g. 5"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Rental Information */}
        <section className="space-y-5">
          <div className="border-b border-border pb-3">
            <h3 className="font-bold text-foreground">Rental Information</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Choose your rental options and set your prices.
            </p>
          </div>

          <div className="space-y-3">
            <label className={labelClass}>Rental Type *</label>

            <div className="grid gap-3 sm:grid-cols-3">
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
                      className="size-4 accent-[#A6532E]"
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
                    {type.charAt(0).toUpperCase() + type.slice(1)} Price ($) *
                  </label>
                  <input
                    name={`price-${type}`}
                    type="number"
                    min="1"
                    required
                    defaultValue={initialEquipment?.rentalPrice?.[type] ?? ""}
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
            <h3 className="font-bold text-foreground">Equipment Details</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Add condition and manufacturer information.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className={labelClass}>Condition *</label>
              <select
                name="condition"
                required
                defaultValue={initialEquipment?.condition || ""}
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
              <label className={labelClass}>Brand *</label>
              <input
                name="brand"
                required
                defaultValue={initialEquipment?.brand || ""}
                placeholder="e.g. Caterpillar"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Model *</label>
            <input
              name="model"
              required
              defaultValue={initialEquipment?.model || ""}
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

          {existingImages.length > 0 && (
            <div className="space-y-3">
              <label className={labelClass}>Existing Images</label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {existingImages.map((url) => (
                  <div
                    key={url}
                    className="group relative overflow-hidden rounded-xl border border-border bg-muted"
                  >
                    <img
                      src={url}
                      alt="Equipment"
                      className="aspect-square w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeExistingImage(url)}
                      disabled={isSubmitting}
                      aria-label="Remove existing image"
                      className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-[#A6532E]"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className={labelClass}>
              Upload Equipment Images (ImgBB Hosted)
            </label>

            <label
              className={`group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-9 text-center transition-all ${
                imageCount >= 5
                  ? "cursor-not-allowed border-border opacity-50"
                  : "cursor-pointer border-[#A6532E]/30 bg-[#A6532E]/5 hover:border-[#A6532E] hover:bg-[#A6532E]/10"
              }`}
            >
              <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-[#A6532E]/10 text-[#A6532E]">
                <UploadCloud className="size-6" />
              </div>

              <span className="text-sm font-bold text-foreground">
                {imageCount >= 5
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
                disabled={imageCount >= 5 || isSubmitting}
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Total images</span>
              <span className="font-semibold text-[#A6532E]">
                {imageCount}/5
              </span>
            </div>

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
                      onClick={() => removeSelectedImage(item.preview)}
                      disabled={isSubmitting}
                      aria-label="Remove image"
                      className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-[#A6532E]"
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

          <div className="space-y-2">
            <label className={labelClass}>
              Add Additional Image URLs Manually
            </label>

            <textarea
              rows={4}
              value={manualImageUrls}
              onChange={(event) => setManualImageUrls(event.target.value)}
              placeholder={`https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg`}
              className={`${inputClass} resize-y font-mono text-xs leading-6`}
            />

            <p className="text-xs text-muted-foreground">
              Paste image URLs, one URL per line.
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
            <label className={labelClass}>Rental Terms (Optional)</label>
            <textarea
              name="rentalTerms"
              rows={5}
              defaultValue={
                Array.isArray(initialEquipment?.rentalTerms)
                  ? initialEquipment.rentalTerms.join("\n")
                  : initialEquipment?.rentalTerms || ""
              }
              placeholder="Enter your rental terms and conditions..."
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
              setRentalTypes(initialEquipment?.rentalTypes || ["daily"]);
              setSelectedImages([]);
              setExistingImages(
                initialEquipment?.images?.length
                  ? initialEquipment.images
                  : initialEquipment?.image
                    ? [initialEquipment.image]
                    : [],
              );
              setManualImageUrls("");

              previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
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
                {mode === "edit" ? "Save Changes" : "Submit Equipment"}
              </>
            )}
          </button>
        </div>
      </form>
    </Card>
  );
}

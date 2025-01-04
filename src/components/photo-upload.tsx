"use client";

import { cn } from "@/lib/utils";
import { Download, X } from "lucide-react";
import Image from "next/image";
import { ComponentProps, forwardRef, useId, useState } from "react";

type Props = ComponentProps<"input"> & {
  onUpload?: (file: File) => void;
};

export const PhotoUpload = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const generatedId = useId();
  const inputId = props.id ?? generatedId;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <label
      htmlFor={inputId}
      className={cn(
        "relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors",
        isDragging ? "border-primary " : "border-gray-300",
        imagePreview && "border-solid"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="Upload an image by clicking or dragging here"
    >
      <input
        ref={ref}
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 cursor-pointer opacity-0"
        aria-label="Upload an image"
      />
      {imagePreview ? (
        <div className="relative aspect-square w-full">
          <Image src={imagePreview} alt="Image preview" fill className="rounded-lg object-cover" />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setImagePreview(null);
            }}
            className="absolute top-2 right-2 bg-gray-500 hover:bg-destructive hover:scale-110 transition-all duration-300 rounded-full p-1"
          >
            <X />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <Download className="mb-2 h-6 w-6 " aria-hidden="true" />
          <p className="text-sm">{isDragging ? "Just drop it" : "Drag an image here"}</p>
        </div>
      )}
    </label>
  );
});

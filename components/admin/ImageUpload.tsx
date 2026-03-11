'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const BUCKET = 'listing-images'

function makePath(filename: string): string {
  const safe = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}-${safe}`
}

export interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  disabled?: boolean
  maxFiles?: number
}

export function ImageUpload({ value, onChange, disabled, maxFiles = 12 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    const remaining = maxFiles - value.length
    if (remaining <= 0) {
      toast.error(`Maximum ${maxFiles} images allowed.`)
      e.target.value = ''
      return
    }
    const toUpload = Array.from(files).slice(0, remaining)
    setUploading(true)
    const newUrls: string[] = []
    try {
      for (const file of toUpload) {
        if (!file.type.startsWith('image/')) {
          toast.error(`Skipped ${file.name}: not an image.`)
          continue
        }
        const path = makePath(file.name)
        const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        })
        if (error) {
          toast.error(error.message)
          continue
        }
        const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
        newUrls.push(data.publicUrl)
      }
      if (newUrls.length) onChange([...value, ...newUrls])
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled || uploading}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || uploading || value.length >= maxFiles}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload from device'}
        </Button>
        <span className="text-sm text-neutral-500">
          {value.length} / {maxFiles} images
        </span>
      </div>
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {value.map((url, i) => (
            <div key={url} className="relative group rounded-lg overflow-hidden border border-neutral-200 bg-neutral-50 aspect-square">
              <img src={url} alt="" className="w-full h-full object-cover" />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="absolute top-1 right-1 p-1.5 rounded-full bg-red-500 text-white opacity-90 hover:opacity-100 shadow"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {value.length === 0 && !uploading && (
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50/50 py-8 text-neutral-500 cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 hover:text-primary-600 transition-colors"
        >
          <ImageIcon className="w-10 h-10 mb-2" />
          <span className="text-sm">Click or drag images here</span>
        </div>
      )}
    </div>
  )
}

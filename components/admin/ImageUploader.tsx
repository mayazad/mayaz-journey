'use client'

import { useState, useRef } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

interface ImageUploaderProps {
  bucket: string
  currentUrl?: string | null
  onUpload: (url: string) => void
  label?: string
  accept?: string
}

export default function ImageUploader({
  bucket,
  currentUrl,
  onUpload,
  label = 'Upload Image',
  accept = 'image/*',
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const isPDF = accept === 'application/pdf'

  async function handleFile(file: File) {
    if (!file) return
    setError('')
    setUploading(true)

    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
    const publicUrl = urlData.publicUrl
    onUpload(publicUrl)

    if (!isPDF) {
      setPreview(publicUrl)
    } else {
      setPreview(file.name)
    }

    setUploading(false)
  }

  return (
    <div>
      <p className="text-sm font-medium text-slate-300 mb-2">{label}</p>

      {/* Preview */}
      {preview && !isPDF && (
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-white/10 mb-3 group">
          <Image src={preview} alt="Preview" fill sizes="128px" className="object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(null); onUpload('') }}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      )}

      {preview && isPDF && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 mb-3">
          <span className="truncate max-w-[200px]">{preview}</span>
          <button
            type="button"
            onClick={() => { setPreview(null); onUpload('') }}
            className="text-slate-500 hover:text-red-400 transition-colors ml-auto"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file) }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-indigo-500/5 text-slate-400 hover:text-white text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            {isPDF ? <Upload size={15} /> : <ImageIcon size={15} />}
            {preview ? 'Replace' : 'Choose file'}
          </>
        )}
      </button>

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  )
}

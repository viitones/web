
interface CompressImageParams {
  file: File;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}
export function CompressImage({
  file,
  maxWidth = Number.POSITIVE_INFINITY,
  maxHeight = Number.POSITIVE_INFINITY,
  quality = 1,
}: CompressImageParams) {

  const getWebpFileName = (fileName: string): string => {
    const nameWithoutExtension = fileName.split('.').slice(0, -1).join('.')
    return `${nameWithoutExtension}.webp`
  }

  const allowedFileTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ]

  if (!allowedFileTypes.includes(file.type)) {
    throw new Error('Unsupported image format')
  }

  return new Promise<File>((resolve, reject) => {

    const reader = new FileReader() //leitura de arquivos aos poucos

    reader.onload = progressEvent => {
    const compressed = new Image()

    compressed.onload = () => {
      const canvas = document.createElement('canvas')
      
      let { width, height } = compressed

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      const context = canvas.getContext('2d')
      if (!context) {
        reject(new Error('Could not get canvas context'))
        return
      }

      context.drawImage(compressed, 0, 0, width, height)

      canvas.toBlob( 
        blob => {
          if (!blob) throw new Error('Canvas is empty')

          const compressedBlobFile = new File(
            [blob],
            getWebpFileName(file.name),
            { type: 'image/webp', lastModified: Date.now() }
          )

          resolve(compressedBlobFile)
        },
        'image/webp',
        quality
       )
    }

    compressed.src = progressEvent.target?.result as string
  }

  reader.readAsDataURL(file) //lendo o arquivo como URL
  })
}

function getExtensionFromType(type: string) {
  if (type === "image/webp") return ".webp";
  if (type === "image/png") return ".png";
  if (type === "image/jpeg") return ".jpg";
  return "";
}

export async function forceDownload(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();

  const contentType = blob.type;
  const ext = getExtensionFromType(contentType);

  const finalName = filename.endsWith(ext)
    ? filename
    : filename + ext;

  const objectUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = finalName;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
}

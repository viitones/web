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

// export const downloadUrl = async (url: string) => {
//   try {
//     const response = await fetch(url, { mode: "cors" });
//     const blob = await response.blob();

//     const link = document.createElement("a");

//     const urlObj = new URL(url);
//     const pathname = urlObj.pathname;
//     const segments = pathname
//       .split("/")
//       .filter((segment) => segment.length > 0);
//     const filename = segments.length > 0 ? segments[segments.length - 1] : null;

//     if (!filename) {
//       throw new Error("URL does not contain a valid filename");
//     }

//     link.href = window.URL.createObjectURL(blob);
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   } catch (error) {
//     console.error("Error downloading the file", error);
//   }
// };
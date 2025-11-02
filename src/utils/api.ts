export const API_BASE = "http://localhost:5000";

export async function fetchData<T = unknown>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function postData<TRequest = unknown, TResponse = unknown>(
  endpoint: string,
  data: TRequest
): Promise<TResponse> {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to post data");
  return res.json();
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, { method: "POST", body: formData });
  if (!res.ok) throw new Error("Failed to upload image");

  const data: { imageUrl: string } = await res.json();
  return data.imageUrl;
}

export async function deleteData(endpoint: string, id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${endpoint}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete data");
}

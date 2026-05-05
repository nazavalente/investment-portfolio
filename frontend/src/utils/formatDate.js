export function formatDate(dateValue) {
  if (!dateValue) return "-";

  const date = new Date(dateValue);

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
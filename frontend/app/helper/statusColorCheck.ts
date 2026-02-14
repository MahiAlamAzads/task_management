export const getStatusClass = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-gray-200 text-gray-800";
    case "inprogress":
      return "bg-yellow-200 text-gray-800";
    case "done":
      return "bg-green-200 text-green-800";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

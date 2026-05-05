export const validateTransaction = (body) => {
  const errors = [];

  const transactionType = body.transaction_type ?? body.transactionType;
  const quantity = body.quantity;
  const pricePerUnit = body.price_per_unit ?? body.pricePerUnit;
  const transactionDate = body.transaction_date ?? body.transactionDate;
  const assetId = body.asset_id ?? body.assetId;
  const assetName = body.asset_name ?? body.assetName;
  const assetCode = body.asset_code ?? body.assetCode;

  const allowedTypes = ["beli", "jual", "buy", "sell"];

  if (
    !transactionType ||
    !allowedTypes.includes(String(transactionType).toLowerCase())
  ) {
    errors.push("Jenis transaksi harus Beli atau Jual");
  }

  if (quantity === undefined || quantity === null || quantity === "") {
    errors.push("Jumlah wajib diisi");
  }

  if (pricePerUnit === undefined || pricePerUnit === null || pricePerUnit === "") {
    errors.push("Harga per unit wajib diisi");
  }

  if (!transactionDate) {
    errors.push("Tanggal transaksi wajib diisi");
  }

  if (!assetId && !assetName && !assetCode) {
    errors.push("Aset transaksi wajib ditentukan");
  }

  return errors;
};
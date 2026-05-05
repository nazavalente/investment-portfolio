export const validateAsset = (body) => {
  const errors = [];

  const assetName = body.asset_name ?? body.assetName;
  const assetCode = body.asset_code ?? body.assetCode;
  const assetType = body.asset_type ?? body.assetType;

  if (!assetName || !String(assetName).trim()) {
    errors.push("Nama aset wajib diisi");
  }

  if (!assetCode || !String(assetCode).trim()) {
    errors.push("Kode aset wajib diisi");
  }

  if (!assetType || !String(assetType).trim()) {
    errors.push("Tipe aset wajib diisi");
  }

  return errors;
};
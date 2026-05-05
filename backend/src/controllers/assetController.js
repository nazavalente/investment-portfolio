import {
  createAssetData,
  deleteAssetData,
  getAllAssets,
  getAssetDetail,
  updateAssetData,
} from "../services/assetService.js";
import { errorResponse, successResponse } from "../utils/responseFormatter.js";

export const getAssets = async (req, res) => {
  try {
    const assets = await getAllAssets(req.user.id);
    return successResponse(res, assets, "Daftar aset berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const getAssetById = async (req, res) => {
  try {
    const asset = await getAssetDetail(req.user.id, req.params.id);
    return successResponse(res, asset, "Detail aset berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const createAsset = async (req, res) => {
  try {
    const asset = await createAssetData(req.user.id, req.body);
    return successResponse(res, asset, "Aset berhasil ditambahkan", 201);
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const updateAsset = async (req, res) => {
  try {
    const asset = await updateAssetData(req.user.id, req.params.id, req.body);
    return successResponse(res, asset, "Aset berhasil diperbarui");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const result = await deleteAssetData(req.user.id, req.params.id);
    return successResponse(res, result, "Aset berhasil dihapus");
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};
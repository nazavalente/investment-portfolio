import prisma from "../config/db.js";
import { errorResponse, successResponse } from "../utils/responseFormatter.js";

const parseId = (value) => Number(value);

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    const formatted = categories.map((item) => ({
      id: item.id,
      category_name: item.categoryName,
      description: item.description,
      created_at: item.createdAt,
    }));

    return successResponse(res, formatted, "Daftar kategori berhasil diambil");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID kategori tidak valid", 400);
    }

    const category = await prisma.category.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!category) {
      return errorResponse(res, "Kategori tidak ditemukan", 404);
    }

    return successResponse(
      res,
      {
        id: category.id,
        category_name: category.categoryName,
        description: category.description,
        created_at: category.createdAt,
      },
      "Detail kategori berhasil diambil"
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const createCategory = async (req, res) => {
  try {
    const categoryName = req.body.category_name ?? req.body.categoryName;
    const description = req.body.description ?? null;

    if (!categoryName) {
      return errorResponse(res, "Nama kategori wajib diisi", 400);
    }

    const category = await prisma.category.create({
      data: {
        categoryName,
        description,
        userId: req.user.id,
      },
    });

    return successResponse(
      res,
      {
        id: category.id,
        category_name: category.categoryName,
        description: category.description,
        created_at: category.createdAt,
      },
      "Kategori berhasil ditambahkan",
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID kategori tidak valid", 400);
    }

    const categoryName = req.body.category_name ?? req.body.categoryName;

    const existing = await prisma.category.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return errorResponse(res, "Kategori tidak ditemukan", 404);
    }

    const description =
      req.body.description !== undefined
        ? req.body.description
        : existing.description;

    const updated = await prisma.category.update({
      where: { id },
      data: {
        categoryName: categoryName ?? existing.categoryName,
        description,
      },
    });

    return successResponse(
      res,
      {
        id: updated.id,
        category_name: updated.categoryName,
        description: updated.description,
        created_at: updated.createdAt,
      },
      "Kategori berhasil diperbarui"
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID kategori tidak valid", 400);
    }

    const existing = await prisma.category.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!existing) {
      return errorResponse(res, "Kategori tidak ditemukan", 404);
    }

    await prisma.category.delete({
      where: { id },
    });

    return successResponse(res, { id }, "Kategori berhasil dihapus");
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
import { fetchFromApi } from "../utils/api";
import { getQuery, createError, defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const prefCode = query.prefCode;

    if (!prefCode) {
      throw createError({
        statusCode: 400,
        message: "Missing 'prefCode' query parameter",
      });
    }

    const data = await fetchFromApi(
      `/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      event
    );

    return data;
  } catch (error: any) {
    // もしすでに createError で投げたエラーならそのまま再スロー
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: "Failed to fetch population data",
    });
  }
});

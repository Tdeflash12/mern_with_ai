declare module "../constants/prompt.js" {
  export const PRODUCT_DESCRIPTION_PROMPT: string;
}

declare module "../constants/roles.js" {
  export const USER: string;
  export const MERCHANT: string;
  export const ADMIN: string;
}

declare module "../models/Product.js" {
  const Product: any;
  export default Product;
}

declare module "../utils/file.js" {
  const uploadFile: (files: any[]) => Promise<Array<{ url?: string }>>;
  export default uploadFile;
}

declare module "../utils/gemini.js" {
  const promptGemini: (promptMessage: string) => Promise<string>;
  export default promptGemini;
}
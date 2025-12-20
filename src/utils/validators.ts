export const validateInput = (
  text: string
): { valid: boolean; error?: string } => {
  const cleaned = text.trim();

  if (cleaned.length < 50) {
    return { valid: false, error: "Please provide at least 50 characters" };
  }

  if (cleaned.length > 10000) {
    return {
      valid: false,
      error: "Content is too long (max 10,000 characters)",
    };
  }

  const words = cleaned.split(/\s+/).filter((word) => word.length > 2);
  if (words.length < 10) {
    return {
      valid: false,
      error: "Please provide at least 10 meaningful words",
    };
  }

  // Check for repeated characters
  const repeatedPattern = /(.)\1{10,}/;
  if (repeatedPattern.test(cleaned)) {
    return { valid: false, error: "Invalid content detected" };
  }

  // Check text vs symbols ratio
  const alphaCount = (cleaned.match(/[a-zA-Z]/g) || []).length;
  const alphaRatio = alphaCount / cleaned.length;
  if (alphaRatio < 0.5) {
    return { valid: false, error: "Content should contain mostly text" };
  }

  return { valid: true };
};

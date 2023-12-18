export const generateSlug = (data: string): string => {
  return data
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

type BinaryID = Buffer & { readonly __binaryIDBrand: unique symbol };

function isBinaryID(id: Buffer): id is BinaryID {
  return id instanceof Buffer && id.length === 16;
}

export function validateBinaryID(id: Buffer): BinaryID {
  if (!isBinaryID(id)) {
    throw new Error(`Invalid binary ID`);
  }
  return id as BinaryID;
}

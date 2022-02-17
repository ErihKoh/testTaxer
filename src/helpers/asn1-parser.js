import ASN1 from "@lapo/asn1js";
import Hex from "@lapo/asn1js/hex";

const asn1Parser = (file) => {
  const result = ASN1.decode(file);
  if (result.typeName() !== "SEQUENCE") {
    throw "Неверная структура конверта сертификата (ожидается SEQUENCE)";
  }

  return result;
};

export default asn1Parser;

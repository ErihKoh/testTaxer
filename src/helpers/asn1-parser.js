import ASN1 from "@lapo/asn1js";

const asn1Parser = (file) => {
  const result = ASN1.decode(file);
  if (result.typeName() !== "SEQUENCE") {
    throw "Неверная структура конверта сертификата (ожидается SEQUENCE)";
  }

  return result.sub[0].stream.enc;
};

export default asn1Parser;

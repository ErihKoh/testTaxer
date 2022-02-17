import ASN1 from "@lapo/asn1js";

const asn1Parser = (file) => {
  const result = ASN1.decode(file);
  if (result.typeName() !== "SEQUENCE") {
    throw "Неверная структура конверта сертификата (ожидается SEQUENCE)";
  }

  //   console.log(result.sub[0]);
  return result;
};

export default asn1Parser;

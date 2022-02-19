import ASN1 from "@lapo/asn1js";

const asn1Parser = (file) => {
  const result = ASN1.decode(file);
  if (result.typeName() !== "SEQUENCE") {
    throw new Error(
      "Неверная структура конверта сертификата (ожидается SEQUENCE)"
    );
  }

  // console.log(result.sub[0].sub[4].sub[0].content());
  console.log(result.sub[0].sub[3].sub[0].sub[0].sub[1].content());
  return result.sub[0].content();
};

export default asn1Parser;

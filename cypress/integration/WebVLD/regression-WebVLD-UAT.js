/// <reference types="Cypress" />

import WebVLD_PO from "../../support/pageObjects/WebVLD_PO";

describe("This automate use to regression WebVLD-UAT", { retries: 2 }, () => {
  const webVLD_PO = new WebVLD_PO();

  context("Scenario 1 : PDF ธรรมดา Sign และ Timestamp", () => {
    const fileName = "1.PDF_TEST.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "PDF-Digital Signature: น่าเชื่อถือ \n" +
        "PDF-Timestamp: ไม่น่าเชื่อถือ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUntrusted("ไม่น่าเชื่อถือ");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว \n" +
        "ประเภทลายมือชื่อดิจิทัล : Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล : ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Approval signature"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: ไม่น่าเชื่อถือ \n" +
        "สถานะ: ไม่สามารถพิสูจน์ตัวตนเจ้าของใบรับรองได้",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUntrusted("ไม่น่าเชื่อถือ");
        webVLD_PO.pdfETimeStampResultStatusDanger(
          "ไม่สามารถพิสูจน์ตัวตนเจ้าของใบรับรองได้"
        );
      }
    );
  });

  context("Scenario 2 : XML ใบกำกับภาษีที่ Sign แล้ว", () => {
    const fileName = "2_ใบกำกับภาษี sign.xml";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "XML-Digital Signature: น่าเชื่อถือ \n" +
        "XML-Schema and Schematron: ผ่าน",
      () => {
        webVLD_PO.addConfigFor_XML(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.xmlSignatureStatusTrusted("น่าเชื่อถือ");
        webVLD_PO.xmlStructureStatusTrusted("ผ่าน");
      }
    );

    it(
      "XML-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว",
      () => {
        webVLD_PO.clickToExpand_XML_Signature(0);
        webVLD_PO.xmlSignatureResult_signatureTrusted("น่าเชื่อถือ");
        webVLD_PO.xmlSignatureResultStatus(
          "ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว"
        );
      }
    );

    it(
      "XML Schema and Schematron should be:\n\n " +
        "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
        "ผลการตรวจสอบเงื่อนไขที่กำหนด: ผ่าน",
      () => {
        webVLD_PO.expand_xmlStructureResult();
        webVLD_PO.xmlStructureResult_schemaValid("ผ่าน");
        webVLD_PO.xmlStructureResult_schematronValid("ผ่าน");
      }
    );
  });

  context("Scenario 3 : PDFA3 Sign (Service provider)", () => {
    const fileName = "64-001.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "XML-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
        "XML-Schema and Schematron: กรุณาตรวจสอบ \n" +
        "ผลการตรวจสอบ PDF-Digital Signature: น่าเชื่อถือ \n" +
        "ผลการตรวจสอบ PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.xmlSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
        webVLD_PO.xmlStructureStatusWarning("กรุณาตรวจสอบ");
        webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "XML-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_XML_Signature(0);
        webVLD_PO.xmlSignatureResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.xmlSignatureResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );

    it(
      "XML Schema and Schematron should be:\n\n " +
        "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
        "ผลการตรวจสอบเงื่อนไขที่กำหนด: ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้",
      () => {
        webVLD_PO.expand_xmlStructureResult();
        webVLD_PO.xmlStructureResult_schemaValid("ผ่าน");
        webVLD_PO.xmlStructureResult_schematronWarning(
          "ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้"
        );
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Certification signature level 2 \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ระบบยังไม่สามารถตรวจสอบประเภทลายมือชื่อดิจิทัลนี้ได้ \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Certification signature level 2"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ระบบยังไม่สามารถตรวจสอบประเภทลายมือชื่อดิจิทัลนี้ได้"
        );
        webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
          0,
          "น่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 4 : PDF Etax by email", () => {
    const fileName = "TS25631219_INV00000006.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " + "ผลการตรวจสอบ PDF-Timestamp: น่าเชื่อถือ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfTimestampStatusTrusted("น่าเชื่อถือ");
      }
    );

    it(
      "PDF E-Timestamp detail should be:\n\n " +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ \n" +
        "สถานะ: การประทับรับรองเวลามีความน่าเชื่อถือ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureTrusted(0, "น่าเชื่อถือ");
        webVLD_PO.pdfETimeStampResultStatus(
          "การประทับรับรองเวลามีความน่าเชื่อถือ"
        );
      }
    );
  });

  context("Scenario 5 : ไฟล์ Signature พัง-ไม่รองรับการตรวจที่ WebVLD", () => {
    const fileName = "002106101822_unlock.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "XML-Digital Signature: น่าเชื่อถือ \n" +
        "XML-Schema and Schematron: ผ่าน \n" +
        "PDF-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.xmlSignatureStatusTrusted("น่าเชื่อถือ");
        webVLD_PO.xmlStructureStatusTrusted("ผ่าน");
        webVLD_PO.pdfSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "XML-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ",
      () => {
        webVLD_PO.clickToExpand_XML_Signature(0);
        webVLD_PO.xmlSignatureResult_signatureTrusted("น่าเชื่อถือ");
        webVLD_PO.xmlSignatureResultStatus(
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
      }
    );

    it(
      "XML Schema and Schematron should be:\n\n " +
        "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
        "ผลการตรวจสอบเงื่อนไขที่กำหนด: ผ่าน",
      () => {
        webVLD_PO.expand_xmlStructureResult();
        webVLD_PO.xmlStructureResult_schemaValid("ผ่าน");
        webVLD_PO.xmlStructureResult_schematronValid("ผ่าน");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: ระบบเกิดข้อผิดพลาดไม่สามารถตรวจสอบเอกสารได้ \n" +
        "สถานะ: ระบบเกิดข้อผิดพลาดไม่สามารถตรวจสอบเอกสารได้ \n" +
        "ประเภทลายมือชื่อดิจิทัล: ไม่พบข้อมูลสถานะ \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult_signatureUndefine(
          "ระบบเกิดข้อผิดพลาดไม่สามารถตรวจสอบเอกสารได้"
        );
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "ระบบเกิดข้อผิดพลาดไม่สามารถตรวจสอบเอกสารได้"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 6 : ไฟล์มีการเพิ่มเติมหลัง sign", () => {
    const fileName = "pdf_signFoxit_addcomment.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "PDF-Digital Signature: กรุณาตรวจสอบ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfSignatureStatusWarning("กรุณาตรวจสอบ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: กรุณาตรวจสอบ \n" +
        "สถานะ: มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลา \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult_signatureWarning("กรุณาตรวจสอบ");
        webVLD_PO.pdfDigitalSignatureResultStatusWarning(
          "มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลา"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Approval signature"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 7 : ไฟล์ที่มี Signature มากกว่า 5 signature", () => {
    const fileName = "pdf_6sign.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "XML-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
        "XML-Schema and Schematron: ผ่าน \n" +
        "PDF-Digital Signature: น่าเชื่อถือ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.xmlSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
        webVLD_PO.xmlStructureStatusTrusted("ผ่าน");
        webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "XML-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_XML_Signature(0);
        webVLD_PO.xmlSignatureResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.xmlSignatureResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );

    it(
      "XML Schema and Schematron should be:\n\n " +
        "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
        "ผลการตรวจสอบเงื่อนไขที่กำหนด: ผ่าน",
      () => {
        webVLD_PO.expand_xmlStructureResult();
        webVLD_PO.xmlStructureResult_schemaValid("ผ่าน");
        webVLD_PO.xmlStructureResult_schematronValid("ผ่าน");
      }
    );

    it(
      "PDF-Signature(0) detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(
          "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > :nth-child(22)"
        ).should("contain.text", "Approval signature");
        cy.get(
          "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
        ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
        webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
          0,
          "น่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF-Signature(1) detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(1);
        webVLD_PO.pdfDigitalSignatureResult(1, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatusMultipleResult(
          1,
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(
          "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > :nth-child(22)"
        ).should("contain.text", "Approval signature");
        cy.get(
          "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
        ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
        webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
          1,
          "น่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF-Signature(2) detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(2);
        webVLD_PO.pdfDigitalSignatureResult(2, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatusMultipleResult(
          2,
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(
          "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > :nth-child(22)"
        ).should("contain.text", "Approval signature");
        cy.get(
          "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
        ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
        webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
          2,
          "น่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF-Signature(3) detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(3);
        webVLD_PO.pdfDigitalSignatureResult(3, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatusMultipleResult(
          3,
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(
          "#pdfDigitalSignatureResult-3 > .card > :nth-child(1) > .row > :nth-child(22)"
        ).should("contain.text", "Approval signature");
        cy.get(
          "#pdfDigitalSignatureResult-3 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
        ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
        webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
          3,
          "น่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF-Signature(4) detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(4);
        webVLD_PO.pdfDigitalSignatureResult(4, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatusMultipleResult(
          4,
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(
          "#pdfDigitalSignatureResult-4 > .card > :nth-child(1) > .row > :nth-child(22)"
        ).should("contain.text", "Approval signature");
        cy.get(
          "#pdfDigitalSignatureResult-4 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
        ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
        webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
          4,
          "น่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 8 : ไฟล์ที่มี Timestamp มากกว่า 5 timestamp", () => {
    const fileName = "pdf_7TS.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "PDF-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
        "PDF-Timestamp: น่าเชื่อถือ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
        webVLD_PO.pdfTimestampStatusTrusted("น่าเชื่อถือ");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ \n" +
        "ประเภทลายมือชื่อดิจิทัล: ไม่พบข้อมูลสถานะ \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult_signatureUndefine(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
      }
    );

    it(
      "PDF E-Timestamp (1) should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ \n" +
        "สถานะ: การประทับรับรองเวลามีความน่าเชื่อถือ",
      () => {
        webVLD_PO.clickToExpand_Multiple_PDF_E_Timestamp(2);
        webVLD_PO.pdfETimeStampResult_signatureTrusted(0, "น่าเชื่อถือ");
        webVLD_PO.pdfETimeStampResult_StatusTrusted(
          0,
          "การประทับรับรองเวลามีความน่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF E-Timestamp (2) should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ \n" +
        "สถานะ: การประทับรับรองเวลามีความน่าเชื่อถือ",
      () => {
        webVLD_PO.clickToExpand_Multiple_PDF_E_Timestamp(3);
        webVLD_PO.pdfETimeStampResult_signatureTrusted(1, "น่าเชื่อถือ");
        webVLD_PO.pdfETimeStampResult_StatusTrusted(
          1,
          "การประทับรับรองเวลามีความน่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF E-Timestamp (3) should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ \n" +
        "สถานะ: การประทับรับรองเวลามีความน่าเชื่อถือ",
      () => {
        webVLD_PO.clickToExpand_Multiple_PDF_E_Timestamp(4);
        webVLD_PO.pdfETimeStampResult_signatureTrusted(2, "น่าเชื่อถือ");
        webVLD_PO.pdfETimeStampResult_StatusTrusted(
          2,
          "การประทับรับรองเวลามีความน่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF E-Timestamp (4) should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ \n" +
        "สถานะ: การประทับรับรองเวลามีความน่าเชื่อถือ",
      () => {
        webVLD_PO.clickToExpand_Multiple_PDF_E_Timestamp(5);
        webVLD_PO.pdfETimeStampResult_signatureTrusted(3, "น่าเชื่อถือ");
        webVLD_PO.pdfETimeStampResult_StatusTrusted(
          3,
          "การประทับรับรองเวลามีความน่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF E-Timestamp (5) should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ \n" +
        "สถานะ: การประทับรับรองเวลามีความน่าเชื่อถือ",
      () => {
        webVLD_PO.clickToExpand_Multiple_PDF_E_Timestamp(6);
        webVLD_PO.pdfETimeStampResult_signatureTrusted(4, "น่าเชื่อถือ");
        webVLD_PO.pdfETimeStampResult_StatusTrusted(
          4,
          "การประทับรับรองเวลามีความน่าเชื่อถือ"
        );
      }
    );
  });

  context("Scenario 9 : Sign selfsign", () => {
    const fileName = "pdf_sign_selfsign.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "PDF-Digital Signature: ไม่น่าเชื่อถือ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfSignatureStatusUntrusted("ไม่น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: ไม่น่าเชื่อถือ \n" +
        "สถานะ: ไม่สามารถพิสูจน์ตัวตนเจ้าของใบรับรองได้ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult_signatureUntrusted(
          "ไม่น่าเชื่อถือ"
        );
        webVLD_PO.pdfDigitalSignatureResultStatusDanger(
          "ไม่สามารถพิสูจน์ตัวตนเจ้าของใบรับรองได้"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Approval signature"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 10 : pdf เปล่า", () => {
    const fileName = "pdf_nosign.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "PDF-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ \n" +
        "ประเภทลายมือชื่อดิจิทัล: ไม่พบข้อมูลสถานะ \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult_signatureUndefine(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 11 : ไฟล์ XML ที่ไม่รู้จักโครงสร้าง", () => {
    const fileName = "sample.xml";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "XML-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
        "XML-Schema and Schematron: กรุณาตรวจสอบ",
      () => {
        webVLD_PO.addConfigFor_XML(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.xmlSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
        webVLD_PO.xmlStructureStatusWarning("กรุณาตรวจสอบ");
      }
    );

    it(
      "XML-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_XML_Signature(0);
        webVLD_PO.xmlSignatureResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.xmlSignatureResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );

    it(
      "XML Schema and Schematron should be:\n\n " +
        "ผลการตรวจสอบโครงสร้างข้อมูล: ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้ \n" +
        "ผลการตรวจสอบเงื่อนไขที่กำหนด: ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้",
      () => {
        webVLD_PO.expand_xmlStructureResult();
        webVLD_PO.xmlStructureResult_schemaWarning(
          "ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้"
        );
        webVLD_PO.xmlStructureResult_schematronWarning(
          "ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้"
        );
      }
    );
  });

  context("Scenario 12 : PDF ที่ถูก revork ก่อน sign ", () => {
    const fileName = "pdf_signSig_certrevoke.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "XML-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
        "XML-Schema and Schematron: ผ่าน \n" +
        "PDF-Digital Signature: ไม่น่าเชื่อถือ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.xmlSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
        webVLD_PO.xmlStructureStatusTrusted("ผ่าน");
        webVLD_PO.pdfSignatureStatusUntrusted("ไม่น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "XML-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_XML_Signature(0);
        webVLD_PO.xmlSignatureResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.xmlSignatureResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );

    it(
      "XML Schema and Schematron should be:\n\n " +
        "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
        "ผลการตรวจสอบเงื่อนไขที่กำหนด: ผ่าน",
      () => {
        webVLD_PO.expand_xmlStructureResult();
        webVLD_PO.xmlStructureResult_schemaValid("ผ่าน");
        webVLD_PO.xmlStructureResult_schematronValid("ผ่าน");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: ไม่น่าเชื่อถือ \n" +
        "สถานะ: ใบรับรองถูกใช้หลังจากหมดอายุ หรือหลังจากถูกเพิกถอน \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: กรุณาตรวจสอบกับผู้ให้บริการ ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult_signatureUntrusted(
          "ไม่น่าเชื่อถือ"
        );
        webVLD_PO.pdfDigitalSignatureResultStatusDanger(
          "ใบรับรองถูกใช้หลังจากหมดอายุ หรือหลังจากถูกเพิกถอน"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Approval signature"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
        webVLD_PO.pdfDigitalSignatureEmbeddedTimestampResult(
          "กรุณาตรวจสอบกับผู้ให้บริการ"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 13 : PDF ที่ถูก revork หลัง sign", () => {
    const fileName = "pdf_signDss_certRevokeAfterSign.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "XML-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
        "XML-Schema and Schematron: ผ่าน \n" +
        "PDF-Digital Signature: น่าเชื่อถือ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.xmlSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
        webVLD_PO.xmlStructureStatusTrusted("ผ่าน");
        webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "XML-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_XML_Signature(0);
        webVLD_PO.xmlSignatureResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.xmlSignatureResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );

    it(
      "XML Schema and Schematron should be:\n\n " +
        "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
        "ผลการตรวจสอบเงื่อนไขที่กำหนด: ผ่าน",
      () => {
        webVLD_PO.expand_xmlStructureResult();
        webVLD_PO.xmlStructureResult_schemaValid("ผ่าน");
        webVLD_PO.xmlStructureResult_schematronValid("ผ่าน");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Approval signature"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
        webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
          0,
          "น่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 14 : PDF ถูก revoke หลัง sign", () => {
    const fileName = "pdf_sign_certExpireAfterSign.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "XML-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
        "XML-Schema and Schematron: ผ่าน \n" +
        "PDF-Digital Signature: น่าเชื่อถือ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.xmlSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
        webVLD_PO.xmlStructureStatusTrusted("ผ่าน");
        webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "XML-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_XML_Signature(0);
        webVLD_PO.xmlSignatureResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.xmlSignatureResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );

    it(
      "XML Schema and Schematron should be:\n\n " +
        "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
        "ผลการตรวจสอบเงื่อนไขที่กำหนด: ผ่าน",
      () => {
        webVLD_PO.expand_xmlStructureResult();
        webVLD_PO.xmlStructureResult_schemaValid("ผ่าน");
        webVLD_PO.xmlStructureResult_schematronValid("ผ่าน");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Approval signature"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context(
    "Scenario 15 : XML file ที่มี schema schematron transcript และมีการ sign",
    () => {
      const fileName = "transcript_sign.xml";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "XML-Digital Signature: น่าเชื่อถือ \n" +
          "XML-Schema and Schematron: ผ่าน",
        () => {
          webVLD_PO.addConfigFor_XML(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);
          webVLD_PO.xmlSignatureStatusTrusted("น่าเชื่อถือ");
          webVLD_PO.xmlStructureStatusTrusted("ผ่าน");
        }
      );

      it(
        "XML-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ",
        () => {
          webVLD_PO.clickToExpand_XML_Signature(0);
          webVLD_PO.xmlSignatureResult_signatureTrusted("น่าเชื่อถือ");
          webVLD_PO.xmlSignatureResultStatus(
            "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
          );
        }
      );

      it(
        "XML Schema and Schematron should be:\n\n " +
          "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
          "ผลการตรวจสอบเงื่อนไขที่กำหนด: ผ่าน",
        () => {
          webVLD_PO.expand_xmlStructureResult();
          webVLD_PO.xmlStructureResult_schemaValid("ผ่าน");
          webVLD_PO.xmlStructureResult_schematronValid("ผ่าน");
        }
      );
    }
  );

  context("Scenario 16 : PDF sort chain", () => {
    const fileName =
      "API Specification Draft (E-Document to Doc Server)_signed.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "PDF-Digital Signature: ไม่น่าเชื่อถือ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfSignatureStatusUntrusted("ไม่น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: ไม่น่าเชื่อถือ \n" +
        "สถานะ: ตรวจพบว่าเอกสารมีการแก้ไขหลังลงลายมือชื่อดิจิทัล หรือหลังการประทับรับรองเวลา \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult_signatureUntrusted(
          "ไม่น่าเชื่อถือ"
        );
        webVLD_PO.pdfDigitalSignatureResultStatusDanger(
          "ตรวจพบว่าเอกสารมีการแก้ไขหลังลงลายมือชื่อดิจิทัล หรือหลังการประทับรับรองเวลา"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Approval signature"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
        webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
          0,
          "น่าเชื่อถือ"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context(
    "Scenario 17 : PDF File  เเนบ chain ไม่ครบ เเละ เเนบ dss ไม่ถูกต้อง",
    () => {
      const fileName = "ใบขอรับใบอนุญาตให้ดำเนินการสถานพยาบาล.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "XML-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
          "XML-Schema and Schematron: กรุณาตรวจสอบ \n" +
          "PDF-Digital Signature: น่าเชื่อถือ \n" +
          "PDF-Timestamp: น่าเชื่อถือ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);
          webVLD_PO.xmlSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
          webVLD_PO.xmlStructureStatusWarning("กรุณาตรวจสอบ");
          webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
          webVLD_PO.pdfTimestampStatusTrusted("น่าเชื่อถือ");
        }
      );

      it(
        "XML-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          webVLD_PO.clickToExpand_XML_Signature(0);
          webVLD_PO.xmlSignatureResult_signatureUndefined(
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          webVLD_PO.xmlSignatureResultStatus(
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );

      it(
        "XML Schema and Schematron should be:\n\n " +
          "ผลการตรวจสอบโครงสร้างข้อมูล: ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้ \n" +
          "ผลการตรวจสอบเงื่อนไขที่กำหนด: ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้",
        () => {
          webVLD_PO.expand_xmlStructureResult();
          webVLD_PO.xmlStructureResult_schemaWarning(
            "ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้"
          );
          webVLD_PO.xmlStructureResult_schematronWarning(
            "ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้"
          );
        }
      );

      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ - ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว\n" +
          "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
          "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
        () => {
          webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
          webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
          cy.get("#pdfDigitalSignatureResultStatus").should(
            "contain.text",
            "ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว"
          );
          cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
            "contain.text",
            "Approval signature"
          );
          cy.get("#pdfDigitalSignatureTypeResultStatus").should(
            "contain.text",
            "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
          );
          webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
            0,
            "น่าเชื่อถือ"
          );
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ \n" +
          "สถานะ: การประทับรับรองเวลามีความน่าเชื่อถือ",
        () => {
          webVLD_PO.clickToExpand_PDF_E_Timestamp();
          webVLD_PO.pdfETimeStampResult_signatureTrusted(0, "น่าเชื่อถือ");
          webVLD_PO.pdfETimeStampResultStatus(
            "การประทับรับรองเวลามีความน่าเชื่อถือ"
          );
        }
      );
    }
  );

  context(
    "Scenario 18 : PDF File  เรื่อง object stream ครับ เวลามาการเพิ่มเนื้อหาเเทรกเข้ามา หลังจากมีการลงนามเเล้ว",
    () => {
      const fileName = "Tally_Purchase_Agreement_TH.docx.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "PDF-Digital Signature: น่าเชื่อถือ \n" +
          "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);
          webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
          webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
        }
      );

      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง",
        () => {
          webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
          webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
          webVLD_PO.pdfDigitalSignatureResultStatus(
            "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
          );
          cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
            "contain.text",
            "Approval signature"
          );
          cy.get("#pdfDigitalSignatureTypeResultStatus").should(
            "contain.text",
            "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
          );
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          webVLD_PO.clickToExpand_PDF_E_Timestamp();
          webVLD_PO.pdfETimeStampResult_signatureUndefined(
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          webVLD_PO.pdfETimeStampResultStatus(
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );
    }
  );

  context(
    "Scenario 19 : มีการระบุ object stream นอก signature แล้วไม่ได้ระบุใน DSS",
    () => {
      const fileName = "2020611976223164799________________8-7_signed.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "PDF-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
          "PDF-Timestamp: น่าเชื่อถือ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);
          webVLD_PO.pdfSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
          webVLD_PO.pdfTimestampStatusTrusted("น่าเชื่อถือ");
        }
      );

      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ \n" +
          "ประเภทลายมือชื่อดิจิทัล: ไม่พบข้อมูลสถานะ \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
          webVLD_PO.pdfDigitalSignatureResult_signatureUndefine(
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          webVLD_PO.pdfDigitalSignatureResultStatus(
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
          cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
            "contain.text",
            "ไม่พบข้อมูลสถานะ"
          );
          cy.get("#pdfDigitalSignatureTypeResultStatus").should(
            "contain.text",
            "ไม่พบข้อมูลสถานะ"
          );
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ \n" +
          "สถานะ: การประทับรับรองเวลามีความน่าเชื่อถือ",
        () => {
          webVLD_PO.clickToExpand_PDF_E_Timestamp();
          webVLD_PO.pdfETimeStampResult_signatureTrusted(0, "น่าเชื่อถือ");
          webVLD_PO.pdfETimeStampResultStatus(
            "การประทับรับรองเวลามีความน่าเชื่อถือ"
          );
        }
      );
    }
  );

  context(
    "Scenario 20 : confirm FE able display status ในส่วนของ embedded timestamp",
    () => {
      const fileName = "64-001.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "XML-Digital Signature: ไม่พบข้อมูลสถานะ \n" +
          "XML-Schema and Schematron: กรุณาตรวจสอบ \n" +
          "ผลการตรวจสอบ PDF-Digital Signature: น่าเชื่อถือ \n" +
          "ผลการตรวจสอบ PDF-Timestamp: ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);
          webVLD_PO.xmlSignatureStatusUndefined("ไม่พบข้อมูลสถานะ");
          webVLD_PO.xmlStructureStatusWarning("กรุณาตรวจสอบ");
          webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
          webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
        }
      );

      it(
        "XML-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          webVLD_PO.clickToExpand_XML_Signature(0);
          webVLD_PO.xmlSignatureResult_signatureUndefined(
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          webVLD_PO.xmlSignatureResultStatus(
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );

      it(
        "XML Schema and Schematron should be:\n\n " +
          "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
          "ผลการตรวจสอบเงื่อนไขที่กำหนด: ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้",
        () => {
          webVLD_PO.expand_xmlStructureResult();
          webVLD_PO.xmlStructureResult_schemaValid("ผ่าน");
          webVLD_PO.xmlStructureResult_schematronWarning(
            "ระบบยังไม่รองรับโครงสร้าง/เงื่อนไขข้อมูลนี้"
          );
        }
      );

      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล: Certification signature level 2 \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ระบบยังไม่สามารถตรวจสอบประเภทลายมือชื่อดิจิทัลนี้ได้ \n" +
          "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
        () => {
          webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
          webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
          webVLD_PO.pdfDigitalSignatureResultStatus(
            "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
          );
          cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
            "contain.text",
            "Certification signature level 2"
          );
          cy.get("#pdfDigitalSignatureTypeResultStatus").should(
            "contain.text",
            "ระบบยังไม่สามารถตรวจสอบประเภทลายมือชื่อดิจิทัลนี้ได้"
          );
          webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
            0,
            "น่าเชื่อถือ"
          );
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          webVLD_PO.clickToExpand_PDF_E_Timestamp();
          webVLD_PO.pdfETimeStampResult_signatureUndefined(
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          webVLD_PO.pdfETimeStampResultStatus(
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );
    }
  );

  context("Scenario 21 : Dss มีการระบุ CRL ที่เป็นค่าว่าง", () => {
    const fileName = "อธิบดีกรมการขนส่งทางบก.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "PDF-Digital Signature: กรุณาตรวจสอบ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfSignatureStatusWarning("กรุณาตรวจสอบ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: กรุณาตรวจสอบ \n" +
        "สถานะ: มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลา \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult_signatureWarning("กรุณาตรวจสอบ");
        webVLD_PO.pdfDigitalSignatureResultStatusWarning(
          "มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลา"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Approval signature"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 22 : Dss มีการระบุ CRL ที่เป็นค่าว่าง", () => {
    const fileName = "2564_depa1403_00071.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "PDF-Digital Signature: น่าเชื่อถือ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Certification signature level 1 \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา - กรุณาตรวจสอบกับผู้ให้บริการ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Certification signature level 1"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง"
        );
        cy.get(":nth-child(27) > .col-sm-12").should(
          "contain.text",
          "กรุณาตรวจสอบกับผู้ให้บริการ"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 23 : Dss มีการระบุ CRL ที่เป็นค่าว่าง", () => {
    const fileName = "fixbug_certify_doc.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "PDF-Digital Signature: น่าเชื่อถือ \n" +
        "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);
        webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
        webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Certification signature level 1 \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา - กรุณาตรวจสอบกับผู้ให้บริการ",
      () => {
        webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
        webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
        webVLD_PO.pdfDigitalSignatureResultStatus(
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Certification signature level 1"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง"
        );
        cy.get(":nth-child(27) > .col-sm-12").should(
          "contain.text",
          "กรุณาตรวจสอบกับผู้ให้บริการ"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        webVLD_PO.clickToExpand_PDF_E_Timestamp();
        webVLD_PO.pdfETimeStampResult_signatureUndefined(
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        webVLD_PO.pdfETimeStampResultStatus(
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context(
    "Scenario 24 : [cypress หาวิธี check font color]embedded timestamp ผลตรวจ 'น่าเชื่อถือ' จะแสดงเป็นสีเขียว นอกนั้นจะแสดงเป็นสีดำ",
    () => {
      const fileName = "INET.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "ผลการตรวจสอบ PDF-Digital Signature: น่าเชื่อถือ \n" +
          "ผลการตรวจสอบ PDF-Timestamp: ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);
          webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
          webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
        }
      );

      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล: Certification signature level 1 \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง \n" +
          "ผลการตรวจสอบการประทับรับรองเวลา: กรุณาตรวจสอบกับผู้ให้บริการ ",
        () => {
          webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
          webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
          webVLD_PO.pdfDigitalSignatureResultStatus(
            "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
          );
          cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
            "contain.text",
            "Certification signature level 1"
          );
          cy.get("#pdfDigitalSignatureTypeResultStatus").should(
            "contain.text",
            "ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง"
          );
          webVLD_PO.pdfDigitalSignatureEmbeddedTimestampResult(
            "กรุณาตรวจสอบกับผู้ให้บริการ"
          );
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          webVLD_PO.clickToExpand_PDF_E_Timestamp();
          webVLD_PO.pdfETimeStampResult_signatureUndefined(
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          webVLD_PO.pdfETimeStampResultStatus(
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );
    }
  );

  context(
    "Scenario 25 : [Cypress หาวิธี check font color เขียว ]Embedded timestamp ผลตรวจ 'น่าเชื่อถือ' ต้องแสดงเป็นสีเขียว ",
    () => {
      const fileName =
        "API Specification Draft (E-Document to Doc Server)_signed.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "PDF-Digital Signature: ไม่น่าเชื่อถือ \n" +
          "PDF-Timestamp: ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);
          webVLD_PO.pdfSignatureStatusUntrusted("ไม่น่าเชื่อถือ");
          webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
        }
      );

      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: ไม่น่าเชื่อถือ \n" +
          "สถานะ: ตรวจพบว่าเอกสารมีการแก้ไขหลังลงลายมือชื่อดิจิทัล หรือหลังการประทับรับรองเวลา \n" +
          "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
          "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
        () => {
          webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
          webVLD_PO.pdfDigitalSignatureResult_signatureUntrusted(
            "ไม่น่าเชื่อถือ"
          );
          webVLD_PO.pdfDigitalSignatureResultStatusDanger(
            "ตรวจพบว่าเอกสารมีการแก้ไขหลังลงลายมือชื่อดิจิทัล หรือหลังการประทับรับรองเวลา"
          );
          cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
            "contain.text",
            "Approval signature"
          );
          cy.get("#pdfDigitalSignatureTypeResultStatus").should(
            "contain.text",
            "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
          );
          webVLD_PO.pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
            0,
            "น่าเชื่อถือ"
          );
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          webVLD_PO.clickToExpand_PDF_E_Timestamp();
          webVLD_PO.pdfETimeStampResult_signatureUndefined(
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          webVLD_PO.pdfETimeStampResultStatus(
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );
    }
  );

  context(
    "Scenario 26 : Confirm title header text change from Timestamp Signature to Embedded Timestamp",
    () => {
      const fileName = "INET.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "ผลการตรวจสอบ PDF-Digital Signature: น่าเชื่อถือ \n" +
          "ผลการตรวจสอบ PDF-Timestamp: ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);
          webVLD_PO.pdfSignatureStatusTrusted("น่าเชื่อถือ");
          webVLD_PO.pdfTimestampStatusUndefined("ไม่พบข้อมูลสถานะ");
        }
      );

      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล: Certification signature level 1 \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง \n" +
          "** Header title ** : change from Timestamp Signature to Embedded Timestamp \n" +
          "ผลการตรวจสอบการประทับรับรองเวลา: กรุณาตรวจสอบกับผู้ให้บริการ ",
        () => {
          webVLD_PO.clickToExpand_pdfDigitalSignatureResult(0);
          webVLD_PO.pdfDigitalSignatureResult(0, "น่าเชื่อถือ");
          webVLD_PO.pdfDigitalSignatureResultStatus(
            "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
          );
          cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
            "contain.text",
            "Certification signature level 1"
          );
          cy.get("#pdfDigitalSignatureTypeResultStatus").should(
            "contain.text",
            "ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง"
          );

          //Check text title of header
          webVLD_PO.textTitleHeaderOfEmbeddedTimeStamp("Embedded Timestamp");
          webVLD_PO.pdfDigitalSignatureEmbeddedTimestampResult(
            "กรุณาตรวจสอบกับผู้ให้บริการ"
          );
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลตรวจสอบการประทับรับรองเวลา: เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ: เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          webVLD_PO.clickToExpand_PDF_E_Timestamp();
          webVLD_PO.pdfETimeStampResult_signatureUndefined(
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          webVLD_PO.pdfETimeStampResultStatus(
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );
    }
  );

  context("Scenario 27 : ตรวจ pdf  ที่เป็น read only file", () => {
    const fileName = "readonly.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "ผลการตรวจสอบ XML-Digital Signature : น่าเชื่อถือ \n" +
        "ผลการตรวจสอบ XML-Schema and Schematron :  ผ่าน \n" +
        "ผลการตรวจสอบ PDF-Digital Signature : น่าเชื่อถือ \n" +
        "ผลการตรวจสอบ PDF-Timestamp :  น่าเชื่อถือ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);

        //set new
        cy.get("#xmlSignatureStatusTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#xmlStructureStatusTrusted").should("contain.text", "ผ่าน");
        cy.get("#pdfSignatureStatusTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfTimestampStatusTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
      }
    );

    it(
      "XML-Signature detail should be:\n\n " +
        "ผลการตรวจสอบลายมือชื่อดิจิทัล - น่าเชื่อถือ \n" +
        "สถานะ - การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ",
      () => {
        //click to expand
        cy.get(
          "#heading-xmlSignatureResult-0 > .row > .col-2 > .caret"
        ).click();
        cy.get("#xmlSignatureResult-0-signatureTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#xmlSignatureResultStatus").should(
          "contain.text",
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
      }
    );

    it(
      "XML Schema and Schematron should be:\n\n " +
        "ผลการตรวจสอบโครงสร้างข้อมูล: ผ่าน \n" +
        "ผลตรวจสอบเงื่อนไขที่กำหนด - ผ่าน",
      () => {
        //click to expand
        cy.get(
          "#heading-xmlStructureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#xmlStructureResult-0-schemaValid").should(
          "contain.text",
          "ผ่าน"
        );
        cy.get("#xmlStructureResult-0-schematronValid").should(
          "contain.text",
          "ผ่าน"
        );
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจสอบการประทับรับรองเวลา: น่าเชื่อถือ ",
      () => {
        //click to expand
        cy.get(
          "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfDigitalSignatureResult-0-signatureTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfDigitalSignatureResultStatus").should(
          "contain.text",
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Approval signature"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
        cy.get(
          "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
        ).should("contain.text", "น่าเชื่อถือ");
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลการตรวจสอบการประทับรับรองเวลา - น่าเชื่อถือ \n" +
        "สถานะ -  ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว",
      () => {
        //click to expand
        cy.get(
          "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfETimeStampResult-0-signatureTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfETimeStampResultStatus").should(
          "contain.text",
          "ใบรับรองหมดอายุ หรือถูกเพิกถอนการใช้งานแล้ว"
        );
      }
    );
  });

  context("Scenario 28 : ไฟล์ที่มีการ encrypt และ ทำ Certified level 1", () => {
    const fileName = "Please sign.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "ผลการตรวจสอบ PDF-Digital Signature : น่าเชื่อถือ\n" +
        "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);

        //set new
        cy.get("#pdfSignatureStatusTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfTimestampStatusUndefined").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Certification signature level 1 \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง",
      () => {
        //click to expand
        cy.get(
          "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfDigitalSignatureResult-0-signatureTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfDigitalSignatureResultStatus").should(
          "contain.text",
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Certification signature level 1"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง"
        );
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        //click to expand
        cy.get(
          "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
          "contain.text",
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        cy.get("#pdfETimeStampResultStatus").should(
          "contain.text",
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 29 : pdf ที่เป็น Certified Lv1  เท่านั้น", () => {
    const fileName = "pdf_a_Certify1.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "ผลการตรวจสอบ PDF-Digital Signature : น่าเชื่อถือ\n" +
        "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);

        //set new
        cy.get("#pdfSignatureStatusTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfTimestampStatusUndefined").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล: Certification signature level 1 \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล: ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง \n" +
        "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
      () => {
        //click to expand
        cy.get(
          "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfDigitalSignatureResult-0-signatureTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfDigitalSignatureResultStatus").should(
          "contain.text",
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Certification signature level 1"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง"
        );
        cy.get(
          "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
        ).should("contain.text", "น่าเชื่อถือ");
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        //click to expand
        cy.get(
          "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
          "contain.text",
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        cy.get("#pdfETimeStampResultStatus").should(
          "contain.text",
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 30 : pdf ที่เป็น Certified Lv3  เท่านั้น", () => {
    const fileName = "pdf_a_Certify3.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "ผลการตรวจสอบ PDF-Digital Signature : น่าเชื่อถือ\n" +
        "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);

        //set new
        cy.get("#pdfSignatureStatusTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfTimestampStatusUndefined").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล - Certification signature level 3 \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ระบบยังไม่สามารถตรวจสอบประเภทลายมือชื่อดิจิทัลนี้ได้ \n" +
        "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
      () => {
        //click to expand
        cy.get(
          "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfDigitalSignatureResult-0-signatureTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfDigitalSignatureResultStatus").should(
          "contain.text",
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Certification signature level 3"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ระบบยังไม่สามารถตรวจสอบประเภทลายมือชื่อดิจิทัลนี้ได้"
        );
        cy.get(
          "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
        ).should("contain.text", "น่าเชื่อถือ");
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        //click to expand
        cy.get(
          "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
          "contain.text",
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        cy.get("#pdfETimeStampResultStatus").should(
          "contain.text",
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 31 : pdf ที่ทำ Certified Lv1 แล้ว ตามด้วย approve", () => {
    const fileName = "pdf_certify1_approve.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "ผลการตรวจสอบ PDF-Digital Signature :  กรุณาตรวจสอบ\n" +
        "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);

        //set new
        cy.get("#pdfSignatureStatusWarning").should(
          "contain.text",
          "กรุณาตรวจสอบ"
        );
        cy.get("#pdfTimestampStatusUndefined").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
      }
    );

    //01
    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล - Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
      () => {
        //click to expand
        cy.get(
          "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfDigitalSignatureResult-0-signatureTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get(
          "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
        ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
        cy.get(
          "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > :nth-child(22)"
        ).should("contain.text", "Approval signature");
        cy.get("#pdfDigitalSignatureTypeResultStatus").should(
          "contain.text",
          "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง"
        );
        cy.get(
          "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
        ).should("contain.text", "น่าเชื่อถือ");
      }
    );

    //02
    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลการตรวจสอบลายมือชื่อดิจิทัล - กรุณาตรวจสอบ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล - Certification signature level 1 \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัลประเภทรับรอง \n" +
        "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
      () => {
        //click to expand
        cy.get(
          "#heading-pdfDigitalSignatureResult-1 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfDigitalSignatureResult-1-signatureElse").should(
          "contain.text",
          "กรุณาตรวจสอบ"
        );
        cy.get(
          "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
        ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
        cy.get(
          "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > :nth-child(22)"
        ).should("contain.text", "Certification signature level 1");
        cy.get("#pdfDigitalSignatureTypeResultStatusDanger").should(
          "contain.text",
          "มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัลประเภทรับรอง"
        );
        cy.get(
          "#pdfDigitalSignatureResult-embedTimestampResult-1-signatureTrusted"
        ).should("contain.text", "น่าเชื่อถือ");
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        //click to expand
        cy.get(
          "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
          "contain.text",
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        cy.get("#pdfETimeStampResultStatus").should(
          "contain.text",
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context("Scenario 32 : pdf 1 approve และ ตามด้วย 1 Certified", () => {
    const fileName = "pdf_a_approve_certify1.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "ผลการตรวจสอบ PDF-Digital Signature : น่าเชื่อถือ\n" +
        "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);

        //set new
        cy.get("#pdfSignatureStatusTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get("#pdfTimestampStatusUndefined").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
      }
    );

    //01
    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล - Certification signature level 1 \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง \n" +
        "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
      () => {
        //click to expand
        cy.get(
          "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfDigitalSignatureResult-0-signatureTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get(
          "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
        ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
        cy.get(
          "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > :nth-child(22)"
        ).should("contain.text", "Certification signature level 1");
        cy.get(
          "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
        ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง");
        cy.get(
          "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
        ).should("contain.text", "น่าเชื่อถือ");
      }
    );

    //02
    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล - Approval signature \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
        "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
      () => {
        //click to expand
        cy.get(
          "#heading-pdfDigitalSignatureResult-1 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfDigitalSignatureResult-1-signatureTrusted").should(
          "contain.text",
          "น่าเชื่อถือ"
        );
        cy.get(
          "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
        ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
        cy.get(
          "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > :nth-child(22)"
        ).should("contain.text", "Approval signature");
        cy.get(
          "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
        ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
        cy.get(
          "#pdfDigitalSignatureResult-embedTimestampResult-1-signatureTrusted"
        ).should("contain.text", "น่าเชื่อถือ");
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        //click to expand
        cy.get(
          "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
          "contain.text",
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        cy.get("#pdfETimeStampResultStatus").should(
          "contain.text",
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context(
    "Scenario 33 : pdf ที่ทำ approve แล้วทำ Certified Lv1 ซ้ำ 2 ครั้ง",
    () => {
      const fileName = "pdf_a_approve_certify1_certify1.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "ผลการตรวจสอบ PDF-Digital Signature :  กรุณาตรวจสอบ \n" +
          "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);

          //set new
          cy.get("#pdfSignatureStatusWarning").should(
            "contain.text",
            "กรุณาตรวจสอบ"
          );
          cy.get("#pdfTimestampStatusUndefined").should(
            "contain.text",
            "ไม่พบข้อมูลสถานะ"
          );
        }
      );

      //01
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Certification signature level 1 \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-0-signatureTrusted").should(
            "contain.text",
            "น่าเชื่อถือ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Certification signature level 1");
          cy.get(
            "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
          ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง");
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      //02
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลการตรวจสอบลายมือชื่อดิจิทัล -  กรุณาตรวจสอบ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Certification signature level 1 \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - มีการลงลายมือชื่อดิจิทัลประเภทรับรองมากกว่าหนึ่งลายมือชื่อ \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-1 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-1-signatureElse").should(
            "contain.text",
            "กรุณาตรวจสอบ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Certification signature level 1");
          cy.get("#pdfDigitalSignatureTypeResultStatusDanger").should(
            "contain.text",
            "มีการลงลายมือชื่อดิจิทัลประเภทรับรองมากกว่าหนึ่งลายมือชื่อ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-1-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      //03
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลการตรวจสอบลายมือชื่อดิจิทัล -  น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Approval signature \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-2 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-2-signatureTrusted").should(
            "contain.text",
            "น่าเชื่อถือ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Approval signature");
          cy.get(
            "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
          ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-2-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          //click to expand
          cy.get(
            "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
            "contain.text",
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          cy.get("#pdfETimeStampResultStatus").should(
            "contain.text",
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );
    }
  );

  context(
    "Scenario 34 : pdf ที่ทำ approve แล้ว ทำ Certified Lv1 และทำ approve อีกครั้ง",
    () => {
      const fileName = "pdf_a_approve_certify1_approve.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "ผลการตรวจสอบ PDF-Digital Signature :  กรุณาตรวจสอบ \n" +
          "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);

          //set new
          cy.get("#pdfSignatureStatusWarning").should(
            "contain.text",
            "กรุณาตรวจสอบ"
          );
          cy.get("#pdfTimestampStatusUndefined").should(
            "contain.text",
            "ไม่พบข้อมูลสถานะ"
          );
        }
      );

      //01
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Approval signature \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-0-signatureTrusted").should(
            "contain.text",
            "น่าเชื่อถือ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Approval signature");
          cy.get(
            "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
          ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      //02
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลการตรวจสอบลายมือชื่อดิจิทัล -  กรุณาตรวจสอบ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Certification signature level 1 \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัลประเภทรับรอง \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-1 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-1-signatureElse").should(
            "contain.text",
            "กรุณาตรวจสอบ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Certification signature level 1");
          cy.get("#pdfDigitalSignatureTypeResultStatusDanger").should(
            "contain.text",
            "มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัลประเภทรับรอง"
          );
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-1-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      //03
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Approval signature \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-2 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-2-signatureTrusted").should(
            "contain.text",
            "น่าเชื่อถือ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Approval signature");
          cy.get(
            "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
          ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-2-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          //click to expand
          cy.get(
            "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
            "contain.text",
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          cy.get("#pdfETimeStampResultStatus").should(
            "contain.text",
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );
    }
  );

  context(
    "Scenario 35 : pdf ที่ทำ Certified Lv2  แล้วทำ approve 2 ครั้ง และ ตามด้วย ทำ Certified Lv1 ปิดท้าย",
    () => {
      const fileName = "pdf_certify2_approve_approve_certify1.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "ผลการตรวจสอบ PDF-Digital Signature :  กรุณาตรวจสอบ \n" +
          "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);

          //set new
          cy.get("#pdfSignatureStatusWarning").should(
            "contain.text",
            "กรุณาตรวจสอบ"
          );
          cy.get("#pdfTimestampStatusUndefined").should(
            "contain.text",
            "ไม่พบข้อมูลสถานะ"
          );
        }
      );

      //01
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Certification signature level 1 \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-0-signatureTrusted").should(
            "contain.text",
            "น่าเชื่อถือ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Certification signature level 1");
          cy.get(
            "#pdfDigitalSignatureResult-0 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
          ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทรับรองถูกต้อง");
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      //02
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Approval signature \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-1 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-1-signatureTrusted").should(
            "contain.text",
            "น่าเชื่อถือ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Approval signature");
          cy.get(
            "#pdfDigitalSignatureResult-1 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
          ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-1-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      //03
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลตรวจสอบลายมือชื่อดิจิทัล: น่าเชื่อถือ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Approval signature \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-2 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-2-signatureTrusted").should(
            "contain.text",
            "น่าเชื่อถือ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Approval signature");
          cy.get(
            "#pdfDigitalSignatureResult-2 > .card > :nth-child(1) > .row > #pdfDigitalSignatureTypeResultStatus"
          ).should("contain.text", "ลายมือชื่อดิจิทัลประเภทอนุมัติถูกต้อง");
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-2-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      //04
      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลการตรวจสอบลายมือชื่อดิจิทัล -  กรุณาตรวจสอบ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Certification signature level 2 \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - มีการลงลายมือชื่อดิจิทัลประเภทรับรองมากกว่าหนึ่งลายมือชื่อ \n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-3 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-3-signatureElse").should(
            "contain.text",
            "กรุณาตรวจสอบ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-3 > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
          ).should("contain.text", "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ");
          cy.get(
            "#pdfDigitalSignatureResult-3 > .card > :nth-child(1) > .row > :nth-child(22)"
          ).should("contain.text", "Certification signature level 2");
          cy.get("#pdfDigitalSignatureTypeResultStatusDanger").should(
            "contain.text",
            "มีการลงลายมือชื่อดิจิทัลประเภทรับรองมากกว่าหนึ่งลายมือชื่อ"
          );
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-3-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          //click to expand
          cy.get(
            "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
            "contain.text",
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          cy.get("#pdfETimeStampResultStatus").should(
            "contain.text",
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );
    }
  );

  context("Scenario 36 : pdf ที่ทำ Certified Lv1 แล้ว edit comment", () => {
    const fileName = "pdf_Certify1_comment.pdf";

    before(() => {
      webVLD_PO.visitHomePage();
    });

    it(
      "Summary should be:\n\n " +
        "ผลการตรวจสอบ PDF-Digital Signature : กรุณาตรวจสอบ \n" +
        "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
      () => {
        webVLD_PO.addConfigFor_PDF(fileName);
        webVLD_PO.clickOn_SubmitBtn();
        webVLD_PO.confirmTestFile(fileName);

        //set new
        cy.get("#pdfSignatureStatusWarning").should(
          "contain.text",
          "กรุณาตรวจสอบ"
        );
        cy.get("#pdfTimestampStatusUndefined").should(
          "contain.text",
          "ไม่พบข้อมูลสถานะ"
        );
      }
    );

    it(
      "PDF-Signature detail should be:\n\n " +
        "ผลการตรวจสอบลายมือชื่อดิจิทัล - กรุณาตรวจสอบ \n" +
        "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
        "ประเภทลายมือชื่อดิจิทัล - Certification signature level 1 \n" +
        "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัลประเภทรับรอง \n" +
        "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
      () => {
        //click to expand
        cy.get(
          "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfDigitalSignatureResult-0-signatureElse").should(
          "contain.text",
          "กรุณาตรวจสอบ"
        );
        cy.get("#pdfDigitalSignatureResultStatus").should(
          "contain.text",
          "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
        );
        cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
          "contain.text",
          "Certification signature level 1"
        );
        cy.get("#pdfDigitalSignatureTypeResultStatusDanger").should(
          "contain.text",
          "มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัลประเภทรับรอง"
        );
        cy.get(
          "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
        ).should("contain.text", "น่าเชื่อถือ");
      }
    );

    it(
      "PDF E-Timestamp should be:\n\n " +
        "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
        "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
      () => {
        //click to expand
        cy.get(
          "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
        ).click();
        cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
          "contain.text",
          "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
        );
        cy.get("#pdfETimeStampResultStatus").should(
          "contain.text",
          "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
        );
      }
    );
  });

  context(
    "Scenario 37 : pdf with form ทำ certify Lv1 นำไป edit form ใน Foxit ",
    () => {
      const fileName = "TestPDF2_certify1_editFormFoxit.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "ผลการตรวจสอบ PDF-Digital Signature : กรุณาตรวจสอบ\n" +
          "ผลการตรวจสอบ PDF-Timestamp :  ไม่พบข้อมูลสถานะ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);

          //set new
          cy.get("#pdfSignatureStatusWarning").should(
            "contain.text",
            "กรุณาตรวจสอบ"
          );
          cy.get("#pdfTimestampStatusUndefined").should(
            "contain.text",
            "ไม่พบข้อมูลสถานะ"
          );
        }
      );

      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลการตรวจสอบลายมือชื่อดิจิทัล - กรุณาตรวจสอบ \n" +
          "สถานะ: การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ \n" +
          "ประเภทลายมือชื่อดิจิทัล - Certification signature level 1 \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัลประเภทรับรอง\n" +
          "ผลการตรวจการประทับรับรองเวลา -  น่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-0-signatureElse").should(
            "contain.text",
            "กรุณาตรวจสอบ"
          );
          cy.get("#pdfDigitalSignatureResultStatus").should(
            "contain.text",
            "การลงลายมือชื่อดิจิทัลมีความน่าเชื่อถือ"
          );
          cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
            "contain.text",
            "Certification signature level 1"
          );
          cy.get("#pdfDigitalSignatureTypeResultStatusDanger").should(
            "contain.text",
            "มีบางส่วนของเอกสารไม่ถูกลงลายมือชื่อดิจิทัลประเภทรับรอง"
          );
          cy.get(
            "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureTrusted"
          ).should("contain.text", "น่าเชื่อถือ");
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลการตรวจสอบการประทับรับรองเวลา - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ -  เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ",
        () => {
          //click to expand
          cy.get(
            "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
            "contain.text",
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          cy.get("#pdfETimeStampResultStatus").should(
            "contain.text",
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
        }
      );
    }
  );

  context(
    "Scenario 38 : Fixed https redirect ของตัว AIA ( ก่อนหน้านี้ มีปัญหา )  แก้ไขให้รองรับ https ",
    () => {
      const fileName = "pdf_nosign_timestamped_thaipostwithcode.pdf";

      before(() => {
        webVLD_PO.visitHomePage();
      });

      it(
        "Summary should be:\n\n " +
          "ผลการตรวจสอบ PDF-Digital Signature : ไม่พบข้อมูลสถานะ \n" +
          "ผลการตรวจสอบ PDF-Timestamp :  น่าเชื่อถือ",
        () => {
          webVLD_PO.addConfigFor_PDF(fileName);
          webVLD_PO.clickOn_SubmitBtn();
          webVLD_PO.confirmTestFile(fileName);

          //set new test git
          cy.get("#pdfSignatureStatusUndefined").should(
            "contain.text",
            "ไม่พบข้อมูลสถานะ"
          );
          cy.get("#pdfTimestampStatusTrusted").should(
            "contain.text",
            "น่าเชื่อถือ"
          );
        }
      );

      it(
        "PDF-Signature detail should be:\n\n " +
          "ผลการตรวจสอบลายมือชื่อดิจิทัล - เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้ \n" +
          "สถานะ - เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ \n" +
          "ประเภทลายมือชื่อดิจิทัล - ไม่พบข้อมูลสถานะ \n" +
          "ผลการตรวจสอบประเภทลายมือชื่อดิจิทัล - ไม่พบข้อมูลสถานะ",
        () => {
          //click to expand
          cy.get(
            "#heading-pdfDigitalSignatureResult-0 > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfDigitalSignatureResult-0-signatureUndefine").should(
            "contain.text",
            "เอกสารยังไม่มีองค์ประกอบที่ระบบสามารถใช้ทำการตรวจสอบได้"
          );
          cy.get("#pdfDigitalSignatureResultStatus").should(
            "contain.text",
            "เอกสารไม่มีลายมือชื่อดิจิทัล/การประทับรับรองเวลา หรือถูกลงลายมือชื่อดิจิทัล/ประทับรับรองเวลาด้วยรูปแบบที่ระบบยังไม่รองรับ"
          );
          cy.get(".card > :nth-child(1) > .row > :nth-child(22)").should(
            "contain.text",
            "ไม่พบข้อมูลสถานะ"
          );
          cy.get("#pdfDigitalSignatureTypeResultStatus").should(
            "contain.text",
            "ไม่พบข้อมูลสถานะ"
          );
        }
      );

      it(
        "PDF E-Timestamp should be:\n\n " +
          "ผลการตรวจสอบการประทับรับรองเวลา - น่าเชื่อถือ \n" +
          "สถานะ -  การประทับรับรองเวลามีความน่าเชื่อถือ",
        () => {
          //click to expand
          cy.get(
            "#pdfTimeStampingResult > .row > .col-2 > .caret > .svg-inline--fa"
          ).click();
          cy.get("#pdfETimeStampResult-0-signatureTrusted").should(
            "contain.text",
            "น่าเชื่อถือ"
          );
          cy.get("#pdfETimeStampResultStatus").should(
            "contain.text",
            "การประทับรับรองเวลามีความน่าเชื่อถือ"
          );
        }
      );
    }
  );
});

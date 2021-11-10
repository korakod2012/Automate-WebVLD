class WebVLD_PO {
  visitHomePage() {
    cy.visit(Cypress.env("webvld_uat"));
  }

  addConfigFor_XML(fileName) {
    cy.fixture(fileName).then((fileContent) => {
      cy.get("#file-uploader").attachFile(
        { fileContent, fileName: fileName, mimeType: "text/xml" },
        { uploadType: "input" }
      );
    });
  }

  addConfigFor_PDF(fileName) {
    cy.fixture(fileName, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("#file-uploader").attachFile({
          fileContent,
          filePath: fileName,
          encoding: "utf-8",
          lastModified: new Date().getTime(),
        });
      });
  }

  clickOn_SubmitBtn() {
    cy.get("[class='col-sm-12'] span").click();
    cy.wait(7000);
  }

  //** center result  */
  confirmTestFile(fileName) {
    cy.get("#fileName").should("contain.text", fileName);
  }

  xmlSignatureStatusTrusted(xmlSigStatus) {
    cy.get("#xmlSignatureStatusTrusted").should("contain.text", xmlSigStatus);
  }

  xmlSignatureStatusWarning(xmlSigStatus) {
    cy.get("#xmlSignatureStatusWarning").should("contain.text", xmlSigStatus);
  }

  xmlStructureStatusTrusted(xmlStructureStatus) {
    cy.get("#xmlStructureStatusTrusted").should(
      "contain.text",
      xmlStructureStatus
    );
  }

  xmlSignatureStatusUndefined(xmlSigStatus) {
    cy.get("#xmlSignatureStatusUndefined").should("contain.text", xmlSigStatus);
  }

  xmlStructureStatusWarning(xmlStructureStatus) {
    cy.get("#xmlStructureStatusWarning").should(
      "contain.text",
      xmlStructureStatus
    );
  }

  //** expand XML Signature result */
  expand_XMLSignature_result() {
    cy.get("#heading-xmlSignatureResult-0").click();
  }

  xmlSignatureResult_fileName(fileName) {
    cy.get("#xmlSignatureResult-0-fileName").should("contain.text", fileName);
  }

  xmlSignatureResult_signatureUntrusted(result) {
    cy.get("#xmlSignatureResult-0-signatureUntrusted").should(
      "contain.text",
      result
    );
  }
  xmlSignatureResultStatusDanger(statusDanger) {
    cy.get("#xmlSignatureResultStatusDanger").should(
      "contain.text",
      statusDanger
    );
  }

  //** expand xml structure result */
  expand_xmlStructureResult() {
    cy.get("#heading-xmlStructureResult-0").click();
  }

  xmlStructureResult_filename(fileName) {
    cy.get("#xmlStructureResult-0-fileName").should("contain.text", fileName);
  }

  xmlStructureResult_schemaValid(status) {
    cy.get("#xmlStructureResult-0-schemaValid").should("contain.text", status);
  }

  xmlStructureResult_schemaWarning(status) {
    cy.get("#xmlStructureResult-0-schemaWarning").should(
      "contain.text",
      status
    );
  }

  xmlStructureResult_schematronWarning(status) {
    cy.get("#xmlStructureResult-0-schematronWarning").should(
      "contain.text",
      status
    );
  }

  xmlStructureResult_schematronValid(status) {
    cy.get("#xmlStructureResult-0-schematronValid").should(
      "contain.text",
      status
    );
  }

  xmlStructureResult_schematronWarning(status) {
    cy.get("#xmlStructureResult-0-schematronWarning").should(
      "contain.text",
      status
    );
  }

  xmlSignatureResult_signatureTrusted(status) {
    cy.get("#xmlSignatureResult-0-signatureTrusted").should(
      "contain.text",
      status
    );
  }

  xmlSignatureResultStatus(status) {
    cy.get("#xmlSignatureResultStatus").should("contain.text", status);
  }

  pdfSignatureStatusTrusted(status) {
    cy.get("#pdfSignatureStatusTrusted").should("contain.text", status);
  }

  clickToExpand_PDF_Digital_Signature(index) {
    cy.get("#heading-pdfDigitalSignatureResult-" + index).click();
  }

  clickToExpand_XML_Signature(index) {
    cy.get("#heading-xmlSignatureResult-" + index).click();
  }

  clickToExpand_PDF_E_Timestamp() {
    cy.get("#pdfTimeStampingResult").click();
  }

  clickToExpand_Multiple_PDF_E_Timestamp(index) {
    cy.get(
      ":nth-child(" + index + ") > #pdfTimeStampingResult > .row > .col-10"
    ).click();
  }

  pdfDigitalSignatureResult(index, status) {
    cy.get("#pdfDigitalSignatureResult-" + index + "-signatureTrusted").should(
      "contain.text",
      status
    );
  }

  pdfDigitalSignatureResult_signatureWarning(status) {
    cy.get("#pdfDigitalSignatureResult-0-signatureWarning").should(
      "contain.text",
      status
    );
  }

  pdfSignatureStatusUntrusted(status) {
    cy.get("#pdfSignatureStatusUntrusted").should("contain.text", status);
  }

  pdfTimestampStatusUndefined(status) {
    cy.get("#pdfTimestampStatusUndefined").should("contain.text", status);
  }

  clickToExpand_pdfDigitalSignatureResult(index) {
    cy.get("#heading-pdfDigitalSignatureResult-" + index).click();
  }

  pdfDigitalSignatureResult_signatureUntrusted(result) {
    cy.get("#pdfDigitalSignatureResult-0-signatureUntrusted").should(
      "contain.text",
      result
    );
  }

  pdfDigitalSignatureResultStatusDanger(result) {
    cy.get("#pdfDigitalSignatureResultStatusDanger").should(
      "contain.text",
      result
    );
  }

  pdfDigitalSignatureResult_embedTimestampResult_signatureUntrusted(result) {
    cy.get(
      "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureUntrusted"
    ).should("contain.text", result);
  }

  pdfDigitalSignatureEmbeddedTimestampResult(status) {
    cy.get(".col-sm-12.pb-2.py-sm-2").should("contain.text", status);
  }

  //** validate color of embedded timestamp */
  embeddedTimestampResultColorBlack() {
    cy.document().toMatchImageSnapshot({
      imageConfig: {
        createDiffImage: true, // Should a "diff image" be created, can be disabled for performance
        threshold: 0.01, // Amount in pixels or percentage before snapshot image is invalid
        thresholdType: "percent", // Can be either "pixel" or "percent"
      },
      name: "Image-embededTimestamp-black", // Naming resulting image file with a custom name rather than concatenating test titles
    });

    // cy.get(".col-sm-12.pb-2.py-sm-2").scrollIntoView({
    //   offset: { buttom: 500, left: 0 },
    // });

    // cy.get(".col-sm-12.pb-2.py-sm-2").toMatchImageSnapshot({
    //   imageConfig: {
    //     createDiffImage: false, // Should a "diff image" be created, can be disabled for performance
    //     threshold: 0.01, // Amount in pixels or percentage before snapshot image is invalid
    //     thresholdType: "percent", // Can be either "pixel" or "percent"
    //   },
    //   name: "Image-embededTimestamp-black", // Naming resulting image file with a custom name rather than concatenating test titles
    // });
  }

  textTitleHeaderOfEmbeddedTimeStamp(headerText) {
    cy.get(".mt-2 > .result-label").should("contain.text", headerText);
  }

  pdfSignatureStatusWarning(status) {
    cy.get("#pdfSignatureStatusWarning").should("contain.text", status);
  }

  xmlSignatureResult_signatureUndefined(result) {
    cy.get("#xmlSignatureResult-0-signatureUndefined").should(
      "contain.text",
      result
    );
  }

  pdfETimeStampResultStatus(result) {
    cy.get("#pdfETimeStampResultStatus").should("contain.text", result);
  }

  pdfSignatureStatusUndefined(status) {
    cy.get("#pdfSignatureStatusUndefined").should("contain.text", status);
  }

  pdfTimestampStatusTrusted(status) {
    cy.get("#pdfTimestampStatusTrusted").should("contain.text", status);
  }

  pdfDigitalSignatureResult_signatureUndefine(result) {
    cy.get("#pdfDigitalSignatureResult-0-signatureUndefine").should(
      "contain.text",
      result
    );
  }

  pdfDigitalSignatureResultStatus(status) {
    cy.get("#pdfDigitalSignatureResultStatus").should("contain.text", status);
  }

  pdfDigitalSignatureResultStatusMultipleResult(index, status) {
    cy.get(
      "#pdfDigitalSignatureResult-" +
        index +
        " > .card > :nth-child(1) > .row > #pdfDigitalSignatureResultStatus"
    ).should("contain.text", status);
  }

  pdfDigitalSignatureResultStatusWarning(status) {
    cy.get("#pdfDigitalSignatureResultStatusWarning").should(
      "contain.text",
      status
    );
  }

  pdfDigitalSignatureResult_embedTimestampResult(result) {
    cy.get(
      "#pdfDigitalSignatureResult-embedTimestampResult-0-signatureUndefine"
    ).should("contain.text", result);
  }

  pdfDigitalSignatureEmbResultStatus(status) {
    cy.get("#pdfDigitalSignatureEmbResultStatus").should(
      "contain.text",
      status
    );
  }

  pdfDigitalSignatureEmbResultStatusDanger(status) {
    cy.get("#pdfDigitalSignatureEmbResultStatusDanger").should(
      "contain.text",
      status
    );
  }

  pdfDigitalSignatureEmbResultStatusMultiple(index, status) {
    cy.get(
      "#pdfDigitalSignatureResult-" +
        index +
        " > .card > :nth-child(1) > .row > #pdfDigitalSignatureEmbResultStatus"
    ).should("contain.text", status);
  }

  pdfDigitalSignatureResult_embedTimestampResult_signatureTrusted(
    index,
    result
  ) {
    cy.get(
      "#pdfDigitalSignatureResult-embedTimestampResult-" +
        index +
        "-signatureTrusted"
    ).should("contain.text", result);
  }

  pdfETimeStampResult_signatureTrusted(index, result) {
    cy.get("#pdfETimeStampResult-" + index + "-signatureTrusted").should(
      "contain.text",
      result
    );
  }

  clickToExpand_Then_Verify_PDF_E_TimeStamp(index, result) {
    cy.get(
      "#pdfResult .pdb:nth-of-type(" + index + ") #pdfTimeStampingResult"
    ).click();

    let tsIndex = index - 2;

    cy.get("#pdfETimeStampResult-" + tsIndex + "-signatureTrusted").should(
      "contain.text",
      result
    );
  }

  pdfTimestampStatusWarning(status) {
    cy.get("#pdfTimestampStatusWarning").should("contain.text", status);
  }

  clickToExpand_Then_Verify_PDF_E_TimeStampWithIndex(index) {
    cy.get(
      "div:nth-of-type(" + index + ") > div#pdfTimeStampingResult"
    ).click();
  }

  pdfETimeStampResult_signatureUndefined(index, result) {
    cy.get("#pdfETimeStampResult-" + index + "-signatureUndefined").should(
      "contain.text",
      result
    );
  }

  pdfTimestampStatusUntrusted(status) {
    cy.get("#pdfTimestampStatusUntrusted").should("contain.text", status);
  }

  pdfETimeStampResult_signatureUntrusted(result) {
    cy.get("#pdfETimeStampResult-0-signatureUntrusted").should(
      "contain.text",
      result
    );
  }

  pdfETimeStampResult_signatureUndefined(result) {
    cy.get("#pdfETimeStampResult-0-signatureUndefined").should(
      "contain.text",
      result
    );
  }

  // pdfETimeStampResult_signatureTrusted(result) {
  //   cy.get("#pdfETimeStampResult-0-signatureTrusted").should(
  //     "contain.text",
  //     result
  //   );
  // }

  pdfETimeStampResult_StatusTrusted(index, result) {
    cy.get(
      "#pdfTimeStampingResult-" +
        index +
        " > .card > :nth-child(1) > .row > #pdfETimeStampResultStatus"
    ).should("contain.text", result);
  }

  pdfETimeStampResultStatusDanger(status) {
    cy.get("#pdfETimeStampResultStatusDanger").should("contain.text", status);
  }
}
export default WebVLD_PO;

import { formatMyDate } from "@/lib/date";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { getCourseDetails } from "@/queries/courses";
import { getAReport } from "@/queries/reports";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET(request) {
  try {
    // Fetch custom fonts dynamically at runtime
    const kalamFontUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/kalam/Kalam-Regular.ttf`;
    const kalamFontBytes = await fetch(kalamFontUrl).then((res) =>
      res.arrayBuffer()
    );

    const montserratItalicFontUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/montserrat/Montserrat-Italic.ttf`;
    const montserratItalicFontBytes = await fetch(montserratItalicFontUrl).then(
      (res) => res.arrayBuffer()
    );

    const montserratFontUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/fonts/montserrat/Montserrat-Medium.ttf`;
    const montserratFontBytes = await fetch(montserratFontUrl).then((res) =>
      res.arrayBuffer()
    );

    /* -----------------
     * Configurations
     *-------------------*/
    const searchParams = request.nextUrl.searchParams;
    const courseId = searchParams.get("courseId");
    if (!courseId) {
      return new Response("Missing courseId parameter", { status: 400 });
    }

    const course = await getCourseDetails(courseId);
    const loggedInUser = await getLoggedInUser();

    const report = await getAReport({
      course: courseId,
      student: loggedInUser.id,
    });
    const completionDate = report?.completion_date
      ? formatMyDate(report.completion_date)
      : formatMyDate(Date.now());

    const completionInfo = {
      name: `${loggedInUser?.firstName} ${loggedInUser?.lastName}`,
      completionDate: completionDate,
      courseName: course.title,
      instructor: `${course?.instructor?.firstName} ${course?.instructor?.lastName}`,
      instructorDesignation: `${course?.instructor?.designation}`,
      sign: "/sign.png",
    };

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const kalamFont = await pdfDoc.embedFont(kalamFontBytes);
    const montserratItalic = await pdfDoc.embedFont(montserratItalicFontBytes);
    const montserrat = await pdfDoc.embedFont(montserratFontBytes);

    const page = pdfDoc.addPage([841.89, 595.28]);
    const { width, height } = page.getSize();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    /* -----------------
     * Logo
     *-------------------*/
    const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`;
    const logoBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
    const logo = await pdfDoc.embedPng(logoBytes);
    const logoDimns = logo.scale(0.5);

    page.drawImage(logo, {
      x: width / 2 - logoDimns.width / 2,
      y: height - 120,
      width: logoDimns.width,
      height: logoDimns.height,
    });

    /* -----------------
     * Title
     *-------------------*/
    const titleFontSize = 30;
    const titleText = "Certificate Of Completion";
    const titleTextWidth = montserrat.widthOfTextAtSize(
      titleText,
      titleFontSize
    );

    page.drawText(titleText, {
      x: width / 2 - titleTextWidth / 2,
      y: height - (logoDimns.height + 125),
      size: titleFontSize,
      font: montserrat,
      color: rgb(0, 0.53, 0.71),
    });

    /* -----------------
     * Name Label
     *-------------------*/
    const nameLabelText = "This certificate is hereby bestowed upon";
    const nameLabelFontSize = 20;
    const nameLabelTextWidth = montserratItalic.widthOfTextAtSize(
      nameLabelText,
      nameLabelFontSize
    );

    page.drawText(nameLabelText, {
      x: width / 2 - nameLabelTextWidth / 2,
      y: height - (logoDimns.height + 170),
      size: nameLabelFontSize,
      font: montserratItalic,
      color: rgb(0, 0, 0),
    });

    /* -----------------
     * Name
     *-------------------*/
    const nameText = completionInfo.name;
    const nameFontSize = 40;
    const nameTextWidth = timesRomanFont.widthOfTextAtSize(
      nameText,
      nameFontSize
    );

    page.drawText(nameText, {
      x: width / 2 - nameTextWidth / 2,
      y: height - (logoDimns.height + 220),
      size: nameFontSize,
      font: kalamFont,
      color: rgb(0, 0, 0),
    });

    /* -----------------
     * Details Info
     *-------------------*/
    const detailsText = `This is to certify that ${completionInfo.name} successfully completed the ${completionInfo.courseName} course on ${completionInfo.completionDate} by ${completionInfo.instructor}`;
    const detailsFontSize = 16;
    const detailsTextWidth = montserrat.widthOfTextAtSize(
      titleText,
      titleFontSize
    );

    page.drawText(detailsText, {
      x: width / 2 - 700 / 2,
      y: height - 330,
      size: detailsFontSize,
      font: montserrat,
      color: rgb(0, 0, 0),
      maxWidth: 700,
      wordBreaks: [" "],
    });

    /* -----------------
     * Signatures
     *-------------------*/
    const signatureBoxWidth = 300;
    page.drawText(completionInfo.instructor, {
      x: width - signatureBoxWidth,
      y: 90,
      size: detailsFontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(completionInfo.instructorDesignation, {
      x: width - signatureBoxWidth,
      y: 72,
      size: 10,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      maxWidth: 250,
    });
    page.drawLine({
      start: { x: width - signatureBoxWidth, y: 110 },
      end: { x: width - 60, y: 110 },
      thickness: 1,
      color: rgb(0, 0, 0),
    });

    const signUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${completionInfo.sign}`;
    const signBytes = await fetch(signUrl).then((res) => res.arrayBuffer());
    const sign = await pdfDoc.embedPng(signBytes);

    page.drawImage(sign, {
      x: width - signatureBoxWidth,
      y: 120,
      width: 180,
      height: 54,
    });

    // Pattern
    const patternUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pattern.jpg`;
    const patternBytes = await fetch(patternUrl).then((res) =>
      res.arrayBuffer()
    );
    const pattern = await pdfDoc.embedJpg(patternBytes);

    page.drawImage(pattern, {
      x: 0,
      y: 0,
      width: width,
      height: height,
      opacity: 0.2,
    });

    /* -----------------
     * Generate and Send Response
     *-------------------*/
    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    return new Response("Failed to generate certificate", { status: 500 });
  }
}
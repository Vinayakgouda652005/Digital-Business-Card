/**
 * vCard (.vcf) generator for Vinayak Manjunath Gouda
 */
export function downloadVCard() {
  return new Promise((resolve) => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Vinayak Manjunath Gouda',
      'N:Gouda;Vinayak;Manjunath;;',
      'TITLE:Founder & CEO',
      'ORG:EMSTRAP PRIVATE LIMITED',
      'ROLE:Founder & CEO',
      'EMAIL;TYPE=INTERNET,PREF:vinayak@emstrap.com',
      'TEL;TYPE=CELL,VOICE:+919880882476',
      'URL:https://www.linkedin.com/in/vinayak-gouda',
      'NOTE:Founder & CEO — EMSTRAP | Co-Founder — Zwapy. Building technology-driven products for real-world problems.',
      'REV:' + new Date().toISOString(),
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Vinayak_Manjunath_Gouda.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      resolve();
    }, 400);
  });
}

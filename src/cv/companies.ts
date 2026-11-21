import type { ImageMetadata } from "astro";
import nabLogo from "../images/companies/nab.png";
import zaloLogo from "../images/companies/zalo.svg";

/**
 * Website-only details that do not belong in the CV PDF, keyed by the
 * `company` name in cv.yaml. A company missing here still renders, with its
 * initial in place of a logo.
 */
export const companyDetails: Record<string, { url?: string; logo?: ImageMetadata }> = {
  Axon: { url: "https://www.axon.com" },
  "National Australia Bank": { url: "https://www.nab.com.au", logo: nabLogo },
  "Zalo (VNG Corporation)": { url: "https://vng.com.vn/", logo: zaloLogo },
};

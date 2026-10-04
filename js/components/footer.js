import { createElement } from "../dom.js";

export function createFooter() {
  const footer = createElement("footer", "footer");
  const container = createElement("div", "footer__container");

  const copyright = createElement("p", "footer__copyright", "© 2026 Memory Game");

  const githubLink = createElement("a", "footer__link", "GitHub");
  githubLink.href = "https://github.com/mrGolbya";
  githubLink.target = "_blank";
  githubLink.rel = "noopener";

  const rsSchoolLink = createElement("a", "footer__link", "RS School");
  rsSchoolLink.href = "https://rs.school/";
  rsSchoolLink.target = "_blank";
  rsSchoolLink.rel = "noopener";

  const links = createElement("div", "footer__links");
  links.append(githubLink, rsSchoolLink);

  container.append(copyright, links);
  footer.append(container);

  return footer;
}
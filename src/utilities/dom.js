export const toggleOverflowY = (selector, isHidden) => {
  const element = document.querySelector(selector);
  element.style.overflowY = isHidden ? 'hidden' : 'scroll';
};

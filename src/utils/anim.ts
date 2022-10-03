export const attatchAnim = (e: any) => {
  e.preventDefault();
  e.target.classList.remove('animate');
  e.target.classList.add('animate');
  setTimeout(() => {
    e.target.classList.remove('animate');
  }, 700);
};

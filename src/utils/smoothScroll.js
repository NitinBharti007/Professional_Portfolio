export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Different header heights for mobile and desktop
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    const headerHeight = isMobile ? 30 : 5; // 30px for mobile, 20px for desktop
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

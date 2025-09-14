export const smoothScrollTo = (elementId) => {
  console.log('Attempting to scroll to:', elementId); // Debug log
  
  const scrollToElement = () => {
    const element = document.getElementById(elementId);
    console.log('Element found:', element); // Debug log
    
      if (element) {
        // Different header heights for mobile and desktop
        const isMobile = window.innerWidth < 1024; // lg breakpoint
        const headerHeight = isMobile ? 25 : 15; // More gap for mobile, minimal for desktop
        const elementPosition = element.offsetTop - headerHeight;
      
      console.log('Scrolling to position:', elementPosition); // Debug log
      
      window.scrollTo({
        top: Math.max(0, elementPosition), // Ensure we don't scroll to negative position
        behavior: 'smooth',
      });
      return true;
    }
    return false;
  };

  // Try to scroll immediately
  if (!scrollToElement()) {
    console.log('Element not found, retrying...'); // Debug log
    // If element not found, wait a bit and try again (for page navigation)
    setTimeout(() => {
      if (!scrollToElement()) {
        console.log('Element still not found, final retry...'); // Debug log
        // If still not found, try one more time after a longer delay
        setTimeout(scrollToElement, 500);
      }
    }, 200);
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

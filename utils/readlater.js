
export const addToReadLater = (blog) => {
    const existing = JSON.parse(localStorage.getItem('readLater')) || [];
    localStorage.setItem('readLater', JSON.stringify([...existing, blog]));
  };
  
  export const removeFromReadLater = (slug) => {
    const existing = JSON.parse(localStorage.getItem('readLater')) || [];
    const updated = existing.filter((item) => item.slug !== slug);
    localStorage.setItem('readLater', JSON.stringify(updated));
  };
  
  export const isInReadLater = (slug) => {
    const existing = JSON.parse(localStorage.getItem('readLater')) || [];
    return existing.some((item) => item.slug === slug);
  };
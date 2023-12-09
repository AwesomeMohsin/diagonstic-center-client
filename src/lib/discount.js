export function calculateDiscount(originalPrice, discountPercentage) {
    const discountAmount = originalPrice * discountPercentage / 100;

    const remainingAmount = originalPrice - discountAmount;

    
    return remainingAmount;

  }
  

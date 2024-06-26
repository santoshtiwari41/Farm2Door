class RecommendationSystem {
    constructor(customerData) {
      this.customerData = customerData;
      this.purchaseHistory = {};
    }
  
    async fetchAndStorePurchaseHistory(customerId) {
      try {
       
        const response = await fetch(`/api/purchaseHistory?customerId=${customerId}`);
        const purchaseHistory = await response.json();
  
        
        this.purchaseHistory[customerId] = purchaseHistory;
  
        console.log(`Purchase history for customer ${customerId} fetched and stored successfully.`);
      } catch (error) {
        console.error(`Error fetching and storing purchase history for customer ${customerId}:`, error);
      }
    }
  
    generateRecommendation(customerId) {
    
      const purchaseHistory = this.purchaseHistory[customerId] || [];
  

      if (purchaseHistory.length === 0) {
        return "Explore our latest products!";
      } else if (purchaseHistory.length <= 3) {
        return "Try our related products. You might like them!";
      } else {
        return "Explore our diverse range of products for a great experience.";
      }
    }
  }

  const recommendationSystem = new RecommendationSystem(customerData);
  
  
  const customerIdToFetch = 1;
  recommendationSystem.fetchAndStorePurchaseHistory(customerIdToFetch);
  

  const recommendation = recommendationSystem.generateRecommendation(customerIdToFetch);
  console.log(recommendation);
  





  














  
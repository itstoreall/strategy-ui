import axios from 'axios';

class ChartService {
  async fetchFearAndGreedIndex() {
    try {
      const response = await axios.get('https://api.alternative.me/fng/');
      const data = response.data;

      if (data && data.data && data.data.length > 0) {
        const fearAndGreedIndex = data.data[0];
        /*
        return {
          value: fearAndGreedIndex.value,
          valueClassification: fearAndGreedIndex.value_classification,
          timestamp: fearAndGreedIndex.timestamp,
        };
        */
        return fearAndGreedIndex.value;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Fear and Greed Index:', error);
      return null;
    }
  }
}

export const chartService = new ChartService();

/*
import axios from "axios";
import API_KEY from "./key";

class ChartService {
  static getChart(coin, period) {
    let interval;
    let startDate;

    // Set the interval and start date based on the selected period
    switch (period) {
      case "1DAY":
        interval = "h1"; // 1 hour intervals
        startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case "7DAY":
        interval = "h6"; // 6 hour intervals
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "1MTH":
        interval = "d1"; // 1 day intervals
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        interval = "h1";
        startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
    }

    const endDate = new Date();

    return axios.get(`https://api.coincap.io/v2/assets/${coin.toLowerCase()}/history`, {
      params: {
        interval: interval,
        start: startDate.getTime(),
        end: endDate.getTime(),
      },
      headers: {
        Accept: "application/json",
        // Note: CoinCap API might not require Authorization for basic requests
      },
    });
  }
}

export default ChartService;*/



class ChartService {
  static getChart(coin, period) {
    return new Promise((resolve) => {
      const now = Date.now();
      const data = [];

      for (let i = 0; i < 10; i++) {
        data.push({
          date: now - i * 3600 * 1000,
          priceUsd: (Math.random() * 100).toFixed(2), // случајна цена
        });
      }

      resolve({ data: { data } });
    });
  }
}

export default ChartService;

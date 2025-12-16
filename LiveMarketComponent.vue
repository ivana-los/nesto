<script setup>
import { ref, computed } from "vue";
import { useCoinsStore } from "../store/coinsStore";

const coinStore = useCoinsStore();

const sortBy = ref(null);

const sortedCoins = computed(() => {
  const coins = [...coinStore.coinDataTop50];

  if (sortBy.value === "change") {
    return coins.sort((a, b) => {
      return parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr);
    });
  } else if (sortBy.value === "volume") {
    return coins.sort((a, b) => {
      return parseFloat(b.volumeUsd24Hr) - parseFloat(a.volumeUsd24Hr);
    });
  }

  return coins;
});

const setSortBy = (criterion) => {
  // Toggle off if clicking the same button
  if (sortBy.value === criterion) {
    sortBy.value = null;
  } else {
    sortBy.value = criterion;
  }
};

const formatNumber = (value) => {
  const num = Number(value);
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + "K";
  }
  return num.toFixed(2);
};

const formatPrice = (price) => {
  const num = Number(price);
  if (num >= 1.01) return num.toFixed(2);
  if (num >= 0.01) return num.toFixed(4);
  return num.toFixed(8);
};
</script>

<template>
  <div class="bg-[#1B2028] w-full rounded-[10px] p-[20px] mt-[20px] mb-[15px] mx-auto max-w-7xl">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-white font-bold text-3xl">Live Market</h1>

      <!-- Sorting buttons -->
      <div class="flex gap-3">
        <button
            @click="setSortBy('change')"
            :class="[
            'px-4 py-2 rounded-lg font-semibold transition-all duration-200',
            sortBy === 'change'
              ? 'bg-[#1ECB4F] text-white shadow-lg'
              : 'bg-[#454151] text-gray-300 hover:bg-[#5a5566]'
          ]"
        >
          Sort by Change %
        </button>

        <button
            @click="setSortBy('volume')"
            :class="[
            'px-4 py-2 rounded-lg font-semibold transition-all duration-200',
            sortBy === 'volume'
              ? 'bg-[#1ECB4F] text-white shadow-lg'
              : 'bg-[#454151] text-gray-300 hover:bg-[#5a5566]'
          ]"
        >
          Sort by Volume 24h
        </button>
      </div>
    </div>

    <!-- Table header -->
    <div class="grid grid-cols-5 gap-4 mt-[20px] text-gray-400 font-semibold pb-3 border-b border-gray-700">
      <p>Coin</p>
      <p>Change</p>
      <p>Market Cap</p>
      <p>24h Volume</p>
      <p>Price</p>
    </div>

    <!-- Scrollable coin list -->
    <div class="max-h-[400px] overflow-y-scroll">
      <div
          v-for="(coin, index) in sortedCoins"
          :key="coin.id"
          class="grid grid-cols-5 gap-4 py-4 text-gray-300 border-b border-gray-800 hover:bg-[#252a34] transition-colors"
      >
        <div class="flex items-center gap-2">
          <span class="text-gray-500 font-mono text-sm">{{ index + 1 }}</span>
          <span class="font-semibold">{{ coin.name }}</span>
          <span class="text-gray-500 text-sm">{{ coin.symbol }}</span>
        </div>

        <p
            :class="Number(coin.changePercent24Hr) < 0 ? 'font-bold text-red-500' : 'font-bold text-[#1ECB4F]'"
        >
          {{ Number(coin.changePercent24Hr) >= 0 ? '+' : '' }}{{ Number(coin.changePercent24Hr).toFixed(2) }}%
        </p>

        <p class="font-medium">${{ formatNumber(coin.marketCapUsd) }}</p>

        <p class="font-medium">${{ formatNumber(coin.volumeUsd24Hr) }}</p>

        <p class="font-semibold">${{ formatPrice(coin.priceUsd) }}</p>
      </div>
    </div>

    <!-- Active sort indicator -->
    <div v-if="sortBy" class="mt-4 text-gray-400 text-sm">
      <p>
        Currently sorted by:
        <span class="text-[#1ECB4F] font-semibold">
          {{ sortBy === 'change' ? 'Change %' : 'Volume 24h' }}
        </span>
        (descending)
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar styling */
.overflow-y-scroll::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-scroll::-webkit-scrollbar-track {
  background: #1B2028;
  border-radius: 4px;
}

.overflow-y-scroll::-webkit-scrollbar-thumb {
  background: #454151;
  border-radius: 4px;
}

.overflow-y-scroll::-webkit-scrollbar-thumb:hover {
  background: #5a5566;
}
</style>
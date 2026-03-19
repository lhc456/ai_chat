<template>
  <div class="flex gap-3 mb-4">
    <!-- AI 头像 -->
    <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
      <span class="text-white text-sm">🤖</span>
    </div>

    <!-- 打字指示器 -->
    <div class="px-4 py-2 bg-gray-100 rounded-2xl rounded-bl-none">
      <div class="flex gap-1">
        <span 
          class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
          style="animation-delay: -0.3s;"
        ></span>
        <span 
          class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
          style="animation-delay: -0.15s;"
        ></span>
        <span 
          class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>

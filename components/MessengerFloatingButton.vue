<template>
  <a
    href="https://m.me/907614445926603"
    target="_blank"
    rel="noopener noreferrer"
    class="messenger-float"
    aria-label="Chat with us on Messenger"
  >
    <img width="48" height="48" src="https://img.icons8.com/fluency/96/facebook-messenger--v2.png" alt="facebook-messenger--v2"/>
  </a>
</template>

<style scoped>
.messenger-float {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  background-color: white;
  padding: 4px;
}

@media (max-width: 600px) {
  .messenger-float {
    bottom: 6rem;
    right: 2rem;
    width: 2.5rem;
    height: 2.5rem;
  }
}

.messenger-float:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.messenger-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled, 'header-home': isHomeActive }" ref="headerEl">
    <div class="header-container">
      <!-- Mobile Logo (shown only on mobile) -->
      <div class="mobile-logo-container">
        <NuxtLink to="/">
          <NuxtImg 
            src="/rang-logo-2026-v2.png" 
            alt="logo" 
            class='mobile-logo-image' 
            loading="eager"
            preload
            priority
          />
        </NuxtLink>
      </div>
      <div>
        <h1 class="heading-text">RANG BANGLADESH</h1>
      </div>
      <div class="header-content">
        <div class="w-[100px]!">
          <NuxtLink to="/">
            <NuxtImg 
              src="/rang-logo-2026-v2.png" 
              alt="logo" 
              class='logo-image' 
              loading="eager"
              preload
              priority
            />
          </NuxtLink>
        </div>
        <nav class="nav items-end! ml-3!">
          <!-- <NuxtLink to="/" :class="getNavLinkHomeClass(isHomeActive)">
            Home
          </NuxtLink> -->
          
          <!-- Dynamic Menu Items from Settings API -->
          <template v-for="(item, index) in sortedMenuItems" :key="item.id">
            <!-- Menu Item with Dropdown -->
            <div v-if="item.children && item.children.length > 0" class="nav-dropdown" 
                 @mouseenter="handleMenuMouseEnter(item, index)" 
                 @mouseleave="handleMenuMouseLeave(item, index)">
              <NuxtLink 
                v-if="item.link.startsWith('/') || item.link === '#'"
                :to="item.link === '#' ? '#' : item.link" 
                :class="getNavLinkClass(isMenuItemActive(item))" 
                class="nav-link-with-dropdown">
                {{ item.title }}
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </NuxtLink>
              <a 
                v-else
                :href="item.link"
                :target="item.new_tab === 1 ? '_blank' : '_self'"
                :rel="item.new_tab === 1 ? 'noopener noreferrer' : ''"
                :class="getNavLinkClass(false)" 
                class="nav-link-with-dropdown">
                {{ item.title }}
                <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </a>
              <div v-if="showDropdowns[item.id.toString()] && item.children && item.children.length > 0" class="nav-dropdown-menu">
                <template v-for="child in item.children.sort((a, b) => a.order - b.order)" :key="child.id">
                  <NuxtLink 
                    v-if="child.link.startsWith('/') || child.link === '#'"
                    :to="child.link === '#' ? '#' : child.link"
                    class="nav-dropdown-item"
                    @click="showDropdowns[item.id.toString()] = false">
                    {{ child.title?.replace(/&amp;/g, '&') }}
                  </NuxtLink>
                  <a 
                    v-else
                    :href="child.link"
                    :target="child.new_tab === 1 ? '_blank' : '_self'"
                    :rel="child.new_tab === 1 ? 'noopener noreferrer' : ''"
                    class="nav-dropdown-item"
                    @click="showDropdowns[item.id.toString()] = false">
                    {{ child.title?.replace(/&amp;/g, '&') }}
                  </a>
                </template>
              </div>
            </div>
            <!-- Simple Menu Item (no dropdown) -->
            <NuxtLink 
              v-else-if="item.link.startsWith('/') || item.link === '#'"
              :to="item.link === '#' ? '#' : item.link" 
              :class="getNavLinkClass(isMenuItemActive(item))">
              {{ item.title }}
            </NuxtLink>
            <a 
              v-else
              :href="item.link"
              :target="item.new_tab === 1 ? '_blank' : '_self'"
              :rel="item.new_tab === 1 ? 'noopener noreferrer' : ''"
              :class="getNavLinkClass(false)">
              {{ item.title }}
            </a>
          </template>
        </nav>

        <!-- Desktop Header Actions -->
        <div class="header-actions desktop-actions ml-auto!">
          <button class="action-button" @click="toggleSearchMenu">
            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Search Menu Dropdown -->
          <div v-if="showSearchMenu" class="search-menu-dropdown">
            <div class="search-container">
              <UInput v-model="searchText" placeholder="Search products..." class="search-input-menu text-black!"
                icon="i-heroicons-magnifying-glass" @input="handleSearch" @focus="showSearchResults = true" autofocus />
              <div v-if="showSearchResults && (searchOptions.length > 0 || searchText.length >= 2)"
                class="search-results-dropdown">
                <div v-if="isSearching" class="search-loading">
                  <p>Searching...</p>
                </div>
                <div v-else-if="searchOptions.length > 0" class="search-results-list">
                  <NuxtLink v-for="option in searchOptions" :key="option.id"
                    :to="`/products/${option.category.slug}/${option.slug}`" class="search-result-item"
                    @click="closeSearchMenu">
                    <div class="search-result-image">
                      <NuxtImg :src="getImageUrl(option.image)" :alt="option.name" class="result-image" loading="lazy"
                        format="webp" quality="85" />
                    </div>
                    <div class="search-result-details">
                      <div class="search-result-name">{{ option.name }}</div>
                      <div class="search-result-price">{{ formatPrice(option.price) }}</div>
                    </div>
                  </NuxtLink>
                </div>
                <div v-else-if="searchText.length >= 2" class="search-empty">
                  <p>No products found</p>
                </div>
              </div>
            </div>
          </div>
          <div class="currency-dropdown-container">
            <button class="action-button-flex" @click="toggleCurrencyDropdown">
              <!-- BDT (Taka) Icon -->
              <svg v-if="currency === 'BDT'" class="action-icon color-inherit" width="24" height="24"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 13.2504C15.4143 13.2504 15.75 13.5862 15.75 14.0004V14.5004C15.7499 15.3622 15.4073 16.1888 14.7979 16.7982C14.1884 17.4076 13.3619 17.7504 12.5 17.7504H12C11.2708 17.7504 10.5714 17.4603 10.0557 16.9447C9.54007 16.4291 9.25014 15.7296 9.25004 15.0004V11.7504H8.00004C7.58595 11.7504 7.25024 11.4144 7.25004 11.0004C7.25004 10.5862 7.58583 10.2504 8.00004 10.2504H9.25004V8.61853L9.24223 8.55506C9.23691 8.53475 9.2291 8.51495 9.21879 8.49646C9.19808 8.45935 9.16802 8.42802 9.13188 8.40564C9.09577 8.38333 9.05415 8.37052 9.01176 8.36853C8.96933 8.36662 8.92673 8.37597 8.88871 8.3949H8.88774L8.335 8.67127L8.26469 8.70154C7.90925 8.83612 7.50269 8.68256 7.32914 8.33533C7.14417 7.96471 7.29446 7.51347 7.66508 7.32849L8.21781 7.0531L8.42289 6.96619C8.63274 6.89289 8.85573 6.86042 9.07914 6.87049C9.37684 6.88396 9.66643 6.97266 9.91996 7.12928C10.1736 7.286 10.3831 7.5056 10.5284 7.76599C10.6736 8.02633 10.7499 8.31946 10.75 8.61756V10.2504H15L15.0772 10.2543C15.4551 10.2929 15.75 10.6122 15.75 11.0004C15.7499 11.3884 15.4551 11.7079 15.0772 11.7465L15 11.7504H10.75V15.0004C10.7501 15.3318 10.8819 15.6498 11.1163 15.8842C11.3507 16.1185 11.6686 16.2504 12 16.2504H12.5C12.9641 16.2504 13.4092 16.0657 13.7373 15.7377C14.0059 15.4692 14.1758 15.1218 14.2295 14.7504H14C13.586 14.7504 13.2502 14.4144 13.25 14.0004C13.25 13.5862 13.5858 13.2504 14 13.2504H15Z"
                  fill="currentColor" />
                <path
                  d="M20 12C20 9.87827 19.1575 7.84306 17.6572 6.34277C16.1569 4.84248 14.1217 4.84248 12 4C9.87827 4 7.84306 4.84248 6.34277 6.34277C4.84248 7.84306 4 9.87827 4 12C4 13.0506 4.20734 14.0909 4.60938 15.0615C5.01141 16.0321 5.59995 16.9144 6.34277 17.6572C7.08559 18.4 7.96795 18.9886 8.93848 19.3906C9.90908 19.7927 10.9494 20 12 20C13.0506 20 14.0909 19.7927 15.0615 19.3906C16.0321 18.9886 16.9144 18.4 17.6572 17.6572C18.4 16.9144 18.9886 16.0321 19.3906 15.0615C19.7927 14.0909 20 13.0506 20 12ZM22 12C22 13.3132 21.7418 14.6139 21.2393 15.8271C20.7367 17.0404 19.9998 18.1427 19.0713 19.0713C18.1427 19.9998 17.0404 20.7367 15.8271 21.2393C14.6139 21.7418 13.3132 22 12 22C10.6868 22 9.38611 21.7418 8.17285 21.2393C6.95964 20.7367 5.85727 19.9998 4.92871 19.0713C4.00015 18.1427 3.26329 17.0404 2.76074 15.8271C2.2582 14.6139 2 13.3132 2 12C2 9.34784 3.05335 6.80407 4.92871 4.92871C6.80407 3.05335 9.34784 2 12 2C14.6522 2 17.1959 3.05335 19.0713 4.92871C20.9467 6.80407 22 9.34784 22 12Z"
                  fill="currentColor" />
              </svg>
              <!-- USD (Dollar) Icon -->
              <svg v-else class="action-icon color-inherit" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 12C20 9.87827 19.1575 7.84306 17.6572 6.34277C16.1569 4.84248 14.1217 4.84248 12 4C9.87827 4 7.84306 4.84248 6.34277 6.34277C4.84248 7.84306 4 9.87827 4 12C4 13.0506 4.20734 14.0909 4.60938 15.0615C5.01141 16.0321 5.59995 16.9144 6.34277 17.6572C7.08559 18.4 7.96795 18.9886 8.93848 19.3906C9.90908 19.7927 10.9494 20 12 20C13.0506 20 14.0909 19.7927 15.0615 19.3906C16.0321 18.9886 16.9144 18.4 17.6572 17.6572C18.4 16.9144 18.9886 16.0321 19.3906 15.0615C19.7927 14.0909 20 13.0506 20 12ZM22 12C22 13.3132 21.7418 14.6139 21.2393 15.8271C20.7367 17.0404 19.9998 18.1427 19.0713 19.0713C18.1427 19.9998 17.0404 20.7367 15.8271 21.2393C14.6139 21.7418 13.3132 22 12 22C10.6868 22 9.38611 21.7418 8.17285 21.2393C6.95964 20.7367 5.85727 19.9998 4.92871 19.0713C4.00015 18.1427 3.26329 17.0404 2.76074 15.8271C2.2582 14.6139 2 13.3132 2 12C2 9.34784 3.05335 6.80407 4.92871 4.92871C6.80407 3.05335 9.34784 2 12 2C14.6522 2 17.1959 3.05335 19.0713 4.92871C20.9467 6.80407 22 9.34784 22 12Z"
                  fill="currentColor" />
                <path
                  d="M12 3V21M9 7.5C9 6.67157 9.67157 6 10.5 6H13.5C14.3284 6 15 6.67157 15 7.5C15 8.32843 14.3284 9 13.5 9H10.5C9.67157 9 9 9.67157 9 10.5C9 11.3284 9.67157 12 10.5 12H13.5C14.3284 12 15 12.6716 15 13.5C15 14.3284 14.3284 15 13.5 15H10.5C9.67157 15 9 15.6716 9 16.5"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
              </svg>
              <svg class="action-icon-small" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
            <!-- Currency Dropdown Menu -->
            <div v-if="showCurrencyDropdown" class="currency-dropdown">
              <button class="currency-option" :class="{ 'currency-option-active': currency === 'BDT' }"
                @click="selectCurrency('BDT')">
                <span class="currency-label">Taka (BDT)</span>
                <span v-if="currency === 'BDT'" class="currency-check">✓</span>
              </button>
              <button class="currency-option" :class="{ 'currency-option-active': currency === 'USD' }"
                @click="selectCurrency('USD')">
                <span class="currency-label">USD</span>
                <span v-if="currency === 'USD'" class="currency-check">✓</span>
              </button>
            </div>
          </div>
          <NuxtLink :to="wishlistLink" class="action-button color-inherit">
            <svg class="action-icon color-inherit" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </NuxtLink>
          <!-- <NuxtLink to="/store" class="action-button color-inherit">
            <button class="action-button color-inherit">
              <svg class="action-icon color-inherit" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 10-8 0v4" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14l-1 12H6L5 8z" />
              </svg>
            </button>
          </NuxtLink> -->
          <NuxtLink to="/store-location-rang" class="action-button p-0 color-inherit store-locator-link">
            <button class="action-button py-0 color-inherit pt-2!">
              <!-- <NuxtImg src="/store-locator-2.png" alt="Store Locator" class="action-icon store-locator-icon"
                style="filter: brightness(1) invert(0); width: 24px; height: 34px;" format="webp" quality="85"
                loading="lazy" /> -->
              <svg class="action-icon color-inherit" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 4H2V2H18V4ZM13.04 10H3.04L3.64 7H16.36L16.76 9C17.5 9.04 18.21 9.19 18.89 9.46L18 5H2L1 10V12H2V18H10.5C10.17 17.2 10 16.35 10 15.5V16H4V12H10V15.5C10 13.84 10.64 12.17 11.9 10.9C12.26 10.55 12.64 10.25 13.04 10ZM23.39 21L22 22.39L18.88 19.32C18.19 19.75 17.37 20 16.5 20C14 20 12 18 12 15.5C12 13 14 11 16.5 11C19 11 21 13 21 15.5C21 16.38 20.75 17.21 20.31 17.9L23.39 21ZM19 15.5C19 14.837 18.7366 14.2011 18.2678 13.7322C17.7989 13.2634 17.163 13 16.5 13C15.837 13 15.2011 13.2634 14.7322 13.7322C14.2634 14.2011 14 14.837 14 15.5C14 16.163 14.2634 16.7989 14.7322 17.2678C15.2011 17.7366 15.837 18 16.5 18C17.163 18 17.7989 17.7366 18.2678 17.2678C18.7366 16.7989 19 16.163 19 15.5Z"
                  fill="currentColor" />
              </svg>

            </button>
          </NuxtLink>
          <NuxtLink to="/cart" class="action-button color-inherit cart-button">
            <svg class="action-icon color-inherit" width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 18C17.5304 18 18.0391 18.2107 18.4142 18.5858C18.7893 18.9609 19 19.4696 19 20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22C16.4696 22 15.9609 21.7893 15.5858 21.4142C15.2107 21.0391 15 20.5304 15 20C15 18.89 15.89 18 17 18ZM1 2H4.27L5.21 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63L7.17 14.75C7.17 14.8163 7.19634 14.8799 7.24322 14.9268C7.29011 14.9737 7.3537 15 7.42 15H19V17H7C6.46957 17 5.96086 16.7893 5.58579 16.4142C5.21071 16.0391 5 15.5304 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2ZM7 18C7.53043 18 8.03914 18.2107 8.41421 18.5858C8.78929 18.9609 9 19.4696 9 20C9 20.5304 8.78929 21.0391 8.41421 21.4142C8.03914 21.7893 7.53043 22 7 22C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20C5 18.89 5.89 18 7 18ZM16 11L18.78 6H12.46H6.14L8.5 11H16Z"
                fill="currentColor" />
            </svg>
            <span v-if="cartTotalItems > 0" class="cart-badge">{{ cartTotalItems }}</span>
          </NuxtLink>
          <NuxtLink :to="accountLink" class="action-button color-inherit">
            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </NuxtLink>
          <!-- Logout Button (Desktop) -->
          <button v-if="hasToken" @click="handleLogout" class="action-button color-inherit" title="Logout">
            <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-button mr-auto! md:mr-0! ml-0! md:ml-auto!" @click="toggleDrawer">
          <svg class="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Nuxt UI Drawer -->
    <UDrawer nobodyStyles='false' v-model:open="isDrawerOpen" direction="left" class="header-drawer" :ui="{
      content: 'header-drawer',
      header: '',
      body: ''
    }">
      <template #content>
        <div class="p-6 bg-white header-drawer-template overflow-auto">
          <div class="flex items-center justify-between mb-6">
            <NuxtLink to="/" @click="closeDrawer">
              <NuxtImg 
                src="/rang-logo-2026-v2.png" 
                alt="Rang Bangladesh Logo" 
                class="mobile-nav-logo h-[90px]!" 
                loading="eager"
              />
            </NuxtLink>
            <UButton color="primary" variant="ghost" icon="i-heroicons-x-mark" @click="closeDrawer" />
          </div>

          <!-- Mobile Navigation Links -->
          <div class="mobile-nav-links">
            <!-- <NuxtLink to="/" :class="getNavLinkHomeClass(isHomeActive)" @click="closeDrawer">
              Home
            </NuxtLink> -->
            
            <!-- Dynamic Mobile Menu Items from Settings API -->
            <template v-for="(item, index) in sortedMenuItems" :key="item.id">
              <!-- Mobile Menu Item with Dropdown -->
              <div v-if="item.children && item.children.length > 0" class="mobile-nav-dropdown">
                <div class="mobile-nav-dropdown-header">
                  <NuxtLink 
                    v-if="item.link.startsWith('/') || item.link === '#'"
                    :to="item.link === '#' ? '#' : item.link" 
                    :class="getNavLinkClass(isMenuItemActive(item))" 
                    class="mobile-nav-link"
                    @click="closeDrawer">
                    {{ item.title }}
                  </NuxtLink>
                  <a 
                    v-else
                    :href="item.link"
                    :target="item.new_tab === 1 ? '_blank' : '_self'"
                    :rel="item.new_tab === 1 ? 'noopener noreferrer' : ''"
                    :class="getNavLinkClass(false)" 
                    class="mobile-nav-link"
                    @click="closeDrawer">
                    {{ item.title }}
                  </a>
                  <button 
                    class="mobile-nav-dropdown-toggle"
                    @click.stop="toggleMobileMenuDropdown(item, index)">
                    <svg class="nav-icon" fill="currentColor" viewBox="0 0 20 20" 
                         :class="{ 'rotate-180': showMobileDropdowns[item.id.toString()] }">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div v-if="showMobileDropdowns[item.id.toString()] && item.children && item.children.length > 0" 
                     class="mobile-nav-dropdown-menu">
                  <template v-for="child in item.children.sort((a, b) => a.order - b.order)" :key="child.id">
                    <NuxtLink 
                      v-if="child.link.startsWith('/') || child.link === '#'"
                      :to="child.link === '#' ? '#' : child.link"
                      class="mobile-nav-dropdown-item"
                      @click="closeDrawer">
                      {{ child.title?.replace(/&amp;/g, '&') }}
                    </NuxtLink>
                    <a 
                      v-else
                      :href="child.link"
                      :target="child.new_tab === 1 ? '_blank' : '_self'"
                      :rel="child.new_tab === 1 ? 'noopener noreferrer' : ''"
                      class="mobile-nav-dropdown-item"
                      @click="closeDrawer">
                      {{ child.title?.replace(/&amp;/g, '&') }}
                    </a>
                  </template>
                </div>
              </div>
              <!-- Simple Mobile Menu Item (no dropdown) -->
              <NuxtLink 
                v-else-if="item.link.startsWith('/') || item.link === '#'"
                :to="item.link === '#' ? '#' : item.link" 
                :class="getNavLinkClass(isMenuItemActive(item))" 
                @click="closeDrawer">
                {{ item.title }}
              </NuxtLink>
              <a 
                v-else
                :href="item.link"
                :target="item.new_tab === 1 ? '_blank' : '_self'"
                :rel="item.new_tab === 1 ? 'noopener noreferrer' : ''"
                :class="getNavLinkClass(false)" 
                @click="closeDrawer">
                {{ item.title }}
              </a>
            </template>
          </div>

          <!-- Mobile Search Section -->
          <div class="mobile-search-section">
            <div v-if="!showMobileSearch" class="mobile-search-toggle">
              <UButton color="primary" variant="ghost" class="w-full justify-start text-orange-600 hover:bg-orange-50"
                icon="i-heroicons-magnifying-glass" @click="showMobileSearch = true">
                Search
              </UButton>
            </div>
            <div v-else class="mobile-search-container">
              <div class="mobile-search-input-wrapper">
                <UInput v-model="searchText" placeholder="Search products..." class="mobile-search-input"
                  icon="i-heroicons-magnifying-glass" @input="handleSearch" @focus="showSearchResults = true"
                  autofocus />
                <UButton color="primary" variant="ghost" icon="i-heroicons-x-mark" @click="closeMobileSearch"
                  class="mobile-search-close" />
              </div>
              <div v-if="showSearchResults && (searchOptions.length > 0 || searchText.length >= 2)"
                class="mobile-search-results">
                <div v-if="isSearching" class="search-loading">
                  <p>Searching...</p>
                </div>
                <div v-else-if="searchOptions.length > 0" class="search-results-list">
                  <NuxtLink v-for="option in searchOptions" :key="option.id"
                    :to="`/products/${option.category.slug}/${option.slug}`" class="search-result-item"
                    @click="closeMobileSearch">
                    <div class="search-result-image">
                      <NuxtImg :src="getImageUrl(option.image)" :alt="option.name" class="result-image" loading="lazy"
                        format="webp" quality="85" />
                    </div>
                    <div class="search-result-details">
                      <div class="search-result-name">{{ option.name }}</div>
                      <div class="search-result-price">{{ formatPrice(option.price) }}</div>
                    </div>
                  </NuxtLink>
                </div>
                <div v-else-if="searchText.length >= 2" class="search-empty">
                  <p>No products found</p>
                </div>
              </div>
            </div>
          </div>

          <div class="header-drawer-template-buttons">
            <div class="mobile-currency-container">
              <UButton color="primary" variant="ghost" class="w-full justify-start text-orange-600 hover:bg-orange-50"
                @click="toggleMobileCurrencyDropdown">
                <template #leading>
                  <!-- BDT (Taka) Icon -->
                  <svg v-if="currency === 'BDT'" class="w-5 h-5" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 13.2504C15.4143 13.2504 15.75 13.5862 15.75 14.0004V14.5004C15.7499 15.3622 15.4073 16.1888 14.7979 16.7982C14.1884 17.4076 13.3619 17.7504 12.5 17.7504H12C11.2708 17.7504 10.5714 17.4603 10.0557 16.9447C9.54007 16.4291 9.25014 15.7296 9.25004 15.0004V11.7504H8.00004C7.58595 11.7504 7.25024 11.4144 7.25004 11.0004C7.25004 10.5862 7.58583 10.2504 8.00004 10.2504H9.25004V8.61853L9.24223 8.55506C9.23691 8.53475 9.2291 8.51495 9.21879 8.49646C9.19808 8.45935 9.16802 8.42802 9.13188 8.40564C9.09577 8.38333 9.05415 8.37052 9.01176 8.36853C8.96933 8.36662 8.92673 8.37597 8.88871 8.3949H8.88774L8.335 8.67127L8.26469 8.70154C7.90925 8.83612 7.50269 8.68256 7.32914 8.33533C7.14417 7.96471 7.29446 7.51347 7.66508 7.32849L8.21781 7.0531L8.42289 6.96619C8.63274 6.89289 8.85573 6.86042 9.07914 6.87049C9.37684 6.88396 9.66643 6.97266 9.91996 7.12928C10.1736 7.286 10.3831 7.5056 10.5284 7.76599C10.6736 8.02633 10.7499 8.31946 10.75 8.61756V10.2504H15L15.0772 10.2543C15.4551 10.2929 15.75 10.6122 15.75 11.0004C15.7499 11.3884 15.4551 11.7079 15.0772 11.7465L15 11.7504H10.75V15.0004C10.7501 15.3318 10.8819 15.6498 11.1163 15.8842C11.3507 16.1185 11.6686 16.2504 12 16.2504H12.5C12.9641 16.2504 13.4092 16.0657 13.7373 15.7377C14.0059 15.4692 14.1758 15.1218 14.2295 14.7504H14C13.586 14.7504 13.2502 14.4144 13.25 14.0004C13.25 13.5862 13.5858 13.2504 14 13.2504H15Z"
                      fill="currentColor" />
                    <path
                      d="M20 12C20 9.87827 19.1575 7.84306 17.6572 6.34277C16.1569 4.84248 14.1217 4.84248 12 4C9.87827 4 7.84306 4.84248 6.34277 6.34277C4.84248 7.84306 4 9.87827 4 12C4 13.0506 4.20734 14.0909 4.60938 15.0615C5.01141 16.0321 5.59995 16.9144 6.34277 17.6572C7.08559 18.4 7.96795 18.9886 8.93848 19.3906C9.90908 19.7927 10.9494 20 12 20C13.0506 20 14.0909 19.7927 15.0615 19.3906C16.0321 18.9886 16.9144 18.4 17.6572 17.6572C18.4 16.9144 18.9886 16.0321 19.3906 15.0615C19.7927 14.0909 20 13.0506 20 12ZM22 12C22 13.3132 21.7418 14.6139 21.2393 15.8271C20.7367 17.0404 19.9998 18.1427 19.0713 19.0713C18.1427 19.9998 17.0404 20.7367 15.8271 21.2393C14.6139 21.7418 13.3132 22 12 22C10.6868 22 9.38611 21.7418 8.17285 21.2393C6.95964 20.7367 5.85727 19.9998 4.92871 19.0713C4.00015 18.1427 3.26329 17.0404 2.76074 15.8271C2.2582 14.6139 2 13.3132 2 12C2 9.34784 3.05335 6.80407 4.92871 4.92871C6.80407 3.05335 9.34784 2 12 2C14.6522 2 17.1959 3.05335 19.0713 4.92871C20.9467 6.80407 22 9.34784 22 12Z"
                      fill="currentColor" />
                  </svg>
                  <!-- USD (Dollar) Icon -->
                  <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 12C20 9.87827 19.1575 7.84306 17.6572 6.34277C16.1569 4.84248 14.1217 4.84248 12 4C9.87827 4 7.84306 4.84248 6.34277 6.34277C4.84248 7.84306 4 9.87827 4 12C4 13.0506 4.20734 14.0909 4.60938 15.0615C5.01141 16.0321 5.59995 16.9144 6.34277 17.6572C7.08559 18.4 7.96795 18.9886 8.93848 19.3906C9.90908 19.7927 10.9494 20 12 20C13.0506 20 14.0909 19.7927 15.0615 19.3906C16.0321 18.9886 16.9144 18.4 17.6572 17.6572C18.4 16.9144 18.9886 16.0321 19.3906 15.0615C19.7927 14.0909 20 13.0506 20 12ZM22 12C22 13.3132 21.7418 14.6139 21.2393 15.8271C20.7367 17.0404 19.9998 18.1427 19.0713 19.0713C18.1427 19.9998 17.0404 20.7367 15.8271 21.2393C14.6139 21.7418 13.3132 22 12 22C10.6868 22 9.38611 21.7418 8.17285 21.2393C6.95964 20.7367 5.85727 19.9998 4.92871 19.0713C4.00015 18.1427 3.26329 17.0404 2.76074 15.8271C2.2582 14.6139 2 13.3132 2 12C2 9.34784 3.05335 6.80407 4.92871 4.92871C6.80407 3.05335 9.34784 2 12 2C14.6522 2 17.1959 3.05335 19.0713 4.92871C20.9467 6.80407 22 9.34784 22 12Z"
                      fill="currentColor" />
                    <path
                      d="M12 3V21M9 7.5C9 6.67157 9.67157 6 10.5 6H13.5C14.3284 6 15 6.67157 15 7.5C15 8.32843 14.3284 9 13.5 9H10.5C9.67157 9 9 9.67157 9 10.5C9 11.3284 9.67157 12 10.5 12H13.5C14.3284 12 15 12.6716 15 13.5C15 14.3284 14.3284 15 13.5 15H10.5C9.67157 15 9 15.6716 9 16.5"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
                  </svg>
                </template>
                Currency
                <svg class="action-icon-small" fill="currentColor" viewBox="0 0 20 20" style="margin-left: auto;">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </UButton>
              <!-- Mobile Currency Dropdown Menu -->
              <div v-if="showMobileCurrencyDropdown" class="mobile-currency-dropdown">
                <button class="currency-option" :class="{ 'currency-option-active': currency === 'BDT' }"
                  @click="selectMobileCurrency('BDT')">
                  <span class="currency-label">Taka (BDT)</span>
                  <span v-if="currency === 'BDT'" class="currency-check">✓</span>
                </button>
                <button class="currency-option" :class="{ 'currency-option-active': currency === 'USD' }"
                  @click="selectMobileCurrency('USD')">
                  <span class="currency-label">USD</span>
                  <span v-if="currency === 'USD'" class="currency-check">✓</span>
                </button>
              </div>
            </div>
            <NuxtLink :to="wishlistLink" class="w-full" @click="closeDrawer">
              <UButton color="primary" variant="ghost" class="w-full justify-start text-orange-600 hover:bg-orange-50"
                icon="i-heroicons-heart">
                Wishlist
              </UButton>
            </NuxtLink>
            <NuxtLink to="/cart" class="mobile-cart-button" @click="closeDrawer">
              <UButton color="primary" variant="ghost" class="w-full justify-start text-orange-600 hover:bg-orange-50"
                icon="i-heroicons-shopping-cart">
                Cart
              </UButton>
              <span v-if="cartTotalItems > 0" class="cart-badge mobile-cart-badge">{{ cartTotalItems }}</span>
            </NuxtLink>
            <!-- <NuxtLink to="/store" class="action-button color-inherit" style="padding: 0;">

              <UButton color="primary" variant="ghost" class="w-full justify-start text-orange-600 hover:bg-orange-50">
                <svg class="action-icon color-inherit" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 10-8 0v4" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14l-1 12H6L5 8z" />
                </svg>
                Store
              </UButton>
            </NuxtLink> -->
            <NuxtLink to="/store-location-rang" class="action-button color-inherit" style="padding: 0;" @click="closeDrawer">
              <button class="color-inherit flex items-center gap-1">
                <svg class="action-icon color-inherit" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 4H2V2H18V4ZM13.04 10H3.04L3.64 7H16.36L16.76 9C17.5 9.04 18.21 9.19 18.89 9.46L18 5H2L1 10V12H2V18H10.5C10.17 17.2 10 16.35 10 15.5V16H4V12H10V15.5C10 13.84 10.64 12.17 11.9 10.9C12.26 10.55 12.64 10.25 13.04 10ZM23.39 21L22 22.39L18.88 19.32C18.19 19.75 17.37 20 16.5 20C14 20 12 18 12 15.5C12 13 14 11 16.5 11C19 11 21 13 21 15.5C21 16.38 20.75 17.21 20.31 17.9L23.39 21ZM19 15.5C19 14.837 18.7366 14.2011 18.2678 13.7322C17.7989 13.2634 17.163 13 16.5 13C15.837 13 15.2011 13.2634 14.7322 13.7322C14.2634 14.2011 14 14.837 14 15.5C14 16.163 14.2634 16.7989 14.7322 17.2678C15.2011 17.7366 15.837 18 16.5 18C17.163 18 17.7989 17.7366 18.2678 17.2678C18.7366 16.7989 19 16.163 19 15.5Z"
                    fill="currentColor" />
                </svg>
                Store Locator
              </button>
            </NuxtLink>

            <NuxtLink :to="accountLink" class="w-full" @click="closeDrawer">
              <UButton color="primary" variant="ghost" class="w-full justify-start text-orange-600 hover:bg-orange-50"
                icon="i-heroicons-user">
                Account
              </UButton>
            </NuxtLink>
            
            <!-- Logout/Login Button -->
            <NuxtLink v-if="!hasToken" to="/login" class="w-full" @click="closeDrawer">
              <UButton color="primary" variant="ghost" class="w-full justify-start text-orange-600 hover:bg-orange-50"
                icon="i-heroicons-arrow-right-on-rectangle">
                Login
              </UButton>
            </NuxtLink>
            <button v-else @click="handleLogout" class="w-full">
              <UButton color="primary" variant="ghost" class="w-full justify-start text-red-600 hover:bg-red-50"
                icon="i-heroicons-arrow-right-on-rectangle">
                Logout
              </UButton>
            </button>
          </div>
        </div>
      </template>
    </UDrawer>
  </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'nuxt/app';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useApi } from '../composables/useApi';
import { useCart } from '../composables/useCart';
import { useCurrency } from '../composables/useCurrency';
import type { Category, CategoryResponse, MenuItem, Product, ProductResponse, SettingsResponse } from '../types/homepage';

const route = useRoute()
const router = useRouter()
const { totalItems: cartTotalItems } = useCart()
const { currency, setCurrency, formatPrice } = useCurrency()

// Check if user is authenticated (has token)
const hasToken = computed(() => {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('auth_token')
  return !!token
})

// Account link based on authentication status
const accountLink = computed(() => {
  return hasToken.value ? '/myprofile' : '/login'
})

// Wishlist link based on authentication status
const wishlistLink = computed(() => {
  return hasToken.value ? '/wishlist' : '/login'
})

// Reactive state for drawer
const isDrawerOpen = ref(false)

// Currency dropdown state
const showCurrencyDropdown = ref(false)
const showMobileCurrencyDropdown = ref(false)

// Search functionality
const searchText = ref('')
const searchOptions = ref<Product[]>([])
const isSearching = ref(false)
const showSearchResults = ref(false)
const showSearchMenu = ref(false)
const showMobileSearch = ref(false)
let searchTimeout: ReturnType<typeof setTimeout> | null = null

// Toggle search menu
const toggleSearchMenu = () => {
  showSearchMenu.value = !showSearchMenu.value
  if (!showSearchMenu.value) {
    closeSearchMenu()
  }
}

// Helper function to get full image URL
const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  // If image path already includes http/https, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  // Otherwise, prepend the API base URL
  return `https://rangbd.thecell.tech${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`
}

// Search function with debounce
const performSearch = async (query: string) => {
  if (!query || query.trim().length < 2) {
    searchOptions.value = []
    return
  }

  isSearching.value = true
  try {
    const { backendUrl } = useApi()
    const apiUrl = `${backendUrl}/product?q=${encodeURIComponent(query.trim())}`
    const response = await $fetch<ProductResponse>(apiUrl)

    if (response.success && response.data) {
      searchOptions.value = response.data.slice(0, 10) // Limit to 10 results
    } else {
      searchOptions.value = []
    }
  } catch (error) {
    console.error('Error searching products:', error)
    searchOptions.value = []
  } finally {
    isSearching.value = false
  }
}

// Debounced search handler
const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  const query = target.value

  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(() => {
    performSearch(query)
  }, 300) // 300ms debounce
}

// Close search menu
const closeSearchMenu = () => {
  searchText.value = ''
  searchOptions.value = []
  showSearchResults.value = false
  showSearchMenu.value = false
}

// Close mobile search
const closeMobileSearch = () => {
  searchText.value = ''
  searchOptions.value = []
  showSearchResults.value = false
  showMobileSearch.value = false
}

// Close search results when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.search-container') && !target.closest('.action-button')) {
      showSearchResults.value = false
      showSearchMenu.value = false
    }
    // Close currency dropdown when clicking outside
    if (!target.closest('.currency-dropdown-container')) {
      showCurrencyDropdown.value = false
    }
    // Close mobile currency dropdown when clicking outside
    if (!target.closest('.mobile-currency-container')) {
      showMobileCurrencyDropdown.value = false
    }
    // Close category dropdowns when clicking outside
    if (!target.closest('.nav-dropdown')) {
      showWomenDropdown.value = false
      showMenDropdown.value = false
      showKidsDropdown.value = false
      showJewelryDropdown.value = false
      showCollectionsDropdown.value = false
      // Close all dynamic dropdowns
      Object.keys(showDropdowns.value).forEach(key => {
        showDropdowns.value[key] = false
      })
    }
  })
})

// Categories state
const categories = ref<Category[]>([])
const menuItems = ref<MenuItem[]>([])

// Dropdown states - now dynamic based on menu items
const showDropdowns = ref<Record<string, boolean>>({})
const showMobileDropdowns = ref<Record<string, boolean>>({})

// Legacy dropdown states (for backward compatibility if needed)
const showWomenDropdown = ref(false)
const showMenDropdown = ref(false)
const showKidsDropdown = ref(false)
const showJewelryDropdown = ref(false)
const showCollectionsDropdown = ref(false)

// Timeout refs for dropdown delays
let womenDropdownTimeout: ReturnType<typeof setTimeout> | null = null
let menDropdownTimeout: ReturnType<typeof setTimeout> | null = null
let kidsDropdownTimeout: ReturnType<typeof setTimeout> | null = null
let jewelryDropdownTimeout: ReturnType<typeof setTimeout> | null = null
let collectionsDropdownTimeout: ReturnType<typeof setTimeout> | null = null

// Dropdown handlers with delay
const handleWomenMouseEnter = () => {
  if (womenDropdownTimeout) clearTimeout(womenDropdownTimeout)
  showWomenDropdown.value = true
}

const handleWomenMouseLeave = () => {
  womenDropdownTimeout = setTimeout(() => {
    showWomenDropdown.value = false
  }, 150)
}

const handleMenMouseEnter = () => {
  if (menDropdownTimeout) clearTimeout(menDropdownTimeout)
  showMenDropdown.value = true
}

const handleMenMouseLeave = () => {
  menDropdownTimeout = setTimeout(() => {
    showMenDropdown.value = false
  }, 150)
}

const handleKidsMouseEnter = () => {
  if (kidsDropdownTimeout) clearTimeout(kidsDropdownTimeout)
  showKidsDropdown.value = true
}

const handleKidsMouseLeave = () => {
  kidsDropdownTimeout = setTimeout(() => {
    showKidsDropdown.value = false
  }, 150)
}

const handleJewelryMouseEnter = () => {
  if (jewelryDropdownTimeout) clearTimeout(jewelryDropdownTimeout)
  showJewelryDropdown.value = true
}

const handleJewelryMouseLeave = () => {
  jewelryDropdownTimeout = setTimeout(() => {
    showJewelryDropdown.value = false
  }, 150)
}

const handleCollectionsMouseEnter = () => {
  if (collectionsDropdownTimeout) clearTimeout(collectionsDropdownTimeout)
  showCollectionsDropdown.value = true
}

const handleCollectionsMouseLeave = () => {
  collectionsDropdownTimeout = setTimeout(() => {
    showCollectionsDropdown.value = false
  }, 150)
}

const showMobileWomenDropdown = ref(false)
const showMobileMenDropdown = ref(false)
const showMobileKidsDropdown = ref(false)
const showMobileJewelryDropdown = ref(false)
const showMobileCollectionsDropdown = ref(false)

// Computed properties for specific categories
const womenCategory = computed(() => categories.value.find(cat => cat.slug === 'women'))
const menCategory = computed(() => categories.value.find(cat => cat.slug === 'men'))
const kidsCategory = computed(() => categories.value.find(cat => cat.slug === 'kids'))
const jewelryCategory = computed(() => categories.value.find(cat => cat.slug === 'jewelry'))

// Fetch categories
const fetchCategories = async () => {
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<CategoryResponse>(`${backendUrl}/category`)
    if (response.success && response.data) {
      categories.value = response.data
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

// Fetch settings and menu
const fetchSettings = async () => {
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<SettingsResponse>(`${backendUrl}/settings`)
    console.log('Settings API Response:', response)
    
    if (response.success && response.data && response.data.menu) {
      menuItems.value = response.data.menu || []
      // Initialize dropdown states for each menu item
      menuItems.value.forEach((item) => {
        if (item.children && item.children.length > 0) {
          const key = item.id.toString()
          showDropdowns.value[key] = false
          showMobileDropdowns.value[key] = false
        }
      })
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
  }
}

// Computed property for sorted menu items (by order)
const sortedMenuItems = computed(() => {
  if (menuItems.value.length === 0) return []
  return [...menuItems.value].sort((a, b) => a.order - b.order)
})

// Helper function to check if a menu item is active
const isMenuItemActive = (item: MenuItem): boolean => {
  const currentPath = route.path
  // Skip check for external links (starting with http/https or #)
  if (item.link.startsWith('http') || item.link === '#') {
    return false
  }
  if (item.link === currentPath || currentPath.startsWith(item.link + '/')) {
    return true
  }
  // Check if any child is active
  if (item.children && item.children.length > 0) {
    return item.children.some(child => isMenuItemActive(child))
  }
  return false
}

// Dropdown handlers for dynamic menu items
const handleMenuMouseEnter = (item: MenuItem, index: number) => {
  const key = item.id.toString()
  if (item.children && item.children.length > 0) {
    showDropdowns.value[key] = true
  }
}

const handleMenuMouseLeave = (item: MenuItem, index: number) => {
  const key = item.id.toString()
  setTimeout(() => {
    showDropdowns.value[key] = false
  }, 150)
}

const toggleMobileMenuDropdown = (item: MenuItem, index: number) => {
  const key = item.id.toString()
  showMobileDropdowns.value[key] = !showMobileDropdowns.value[key]
}

// Reactive state for scroll position
const isScrolled = ref(false)

// Header element and dynamic height
const headerEl = ref<HTMLElement | null>(null)
const headerHeight = ref(0)

// Function to toggle drawer
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

// Function to close drawer
const closeDrawer = () => {
  isDrawerOpen.value = false
  // Also close mobile search when drawer closes
  closeMobileSearch()
  // Also close mobile currency dropdown when drawer closes
  showMobileCurrencyDropdown.value = false
  // Close all mobile category dropdowns
  showMobileWomenDropdown.value = false
  showMobileMenDropdown.value = false
  // Close all dynamic mobile dropdowns
  Object.keys(showMobileDropdowns.value).forEach(key => {
    showMobileDropdowns.value[key] = false
  })
}

// Handle logout
const handleLogout = async () => {
  try {
    // Clear all localStorage
    if (typeof window !== 'undefined') {
      localStorage.clear()
      console.log('LocalStorage cleared successfully')
    }
    
    // Close drawer if it's open (for mobile)
    if (isDrawerOpen.value) {
      closeDrawer()
    }
    
    // Check if we're already on home page, if so refresh, otherwise navigate
    const currentPath = route.path
    if (currentPath === '/' || currentPath === '/home') {
      // Already on home page, refresh to update UI
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    } else {
      // Navigate to home page
      await router.push('/')
    }
  } catch (error) {
    console.error('Error during logout:', error)
    // Even if there's an error, try to redirect or refresh
    if (isDrawerOpen.value) {
      closeDrawer()
    }
    const currentPath = route.path
    if (currentPath === '/' || currentPath === '/home') {
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    } else {
      await router.push('/')
    }
  }
}

// Currency dropdown functions
const toggleCurrencyDropdown = () => {
  showCurrencyDropdown.value = !showCurrencyDropdown.value
}

const selectCurrency = (newCurrency: 'BDT' | 'USD') => {
  setCurrency(newCurrency, true) // true indicates manual selection
  showCurrencyDropdown.value = false
}

// Mobile currency dropdown functions
const toggleMobileCurrencyDropdown = () => {
  showMobileCurrencyDropdown.value = !showMobileCurrencyDropdown.value
}

const selectMobileCurrency = (newCurrency: 'BDT' | 'USD') => {
  setCurrency(newCurrency, true) // true indicates manual selection
  showMobileCurrencyDropdown.value = false
}

// Computed property to get current route
const currentRoute = computed(() => router.currentRoute.value.path)
console.log('🚀 - currentRoute:', currentRoute.value)

// Computed properties for each nav link to determine if it's active
const isHomeActive = computed(() => currentRoute.value === '/')
const isWomenActive = computed(() => currentRoute.value === '/women')
const isMenActive = computed(() => currentRoute.value === '/men')
const isKidsActive = computed(() => currentRoute.value === '/kids')
const isJewelryActive = computed(() => currentRoute.value === '/jewelry')
const isCollectionsActive = computed(() => currentRoute.value.startsWith('/collections'))
const isAccessoriesActive = computed(() => currentRoute.value === '/accessories')
const isChobirBazarActive = computed(() => currentRoute.value === '/chobir-bazar')

// Function to get nav link class based on active state and current page
const getNavLinkClass = (isActive: boolean) => {
  // On home page, all links should be white
  if (isHomeActive.value) {
    return 'nav-link nav-link-home-page'
  }
  // On other pages, active link should be orange
  return isActive ? 'nav-link nav-link-active' : 'nav-link'
}

const getNavLinkHomeClass = (isActive: boolean) => {
  // On home page, home link should be orange
  if (isHomeActive.value) {
    return 'nav-link nav-link-active'
  }
  // On other pages, active link should be orange
  return isActive ? 'nav-link nav-link-active' : 'nav-link'
}

// Function to handle scroll and layout changes
const handleScroll = () => {
  const threshold = headerHeight.value || 0
  isScrolled.value = window.scrollY > threshold
}

const measureHeader = () => {
  headerHeight.value = headerEl.value ? headerEl.value.offsetHeight : 0
}

// Add scroll event listener on mount
onMounted(async () => {
  await nextTick()
  measureHeader()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', () => {
    measureHeader()
    handleScroll()
  })
  // Initialize scroll state on mount
  handleScroll()
  // Fetch categories and settings
  fetchCategories()
  fetchSettings()
  
  // Ensure currency is properly loaded from localStorage on mount
  // This ensures the header icon updates correctly after page refresh
  if (typeof window !== 'undefined') {
    const savedCurrency = localStorage.getItem('currency') as 'BDT' | 'USD' | null
    if (savedCurrency && (savedCurrency === 'BDT' || savedCurrency === 'USD')) {
      // Only set if different to trigger reactivity
      if (currency.value !== savedCurrency) {
        setCurrency(savedCurrency, true)
      }
    }
  }
})

// Remove scroll event listener on unmount
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<style scoped>
@import './AppHeader.css';
</style>

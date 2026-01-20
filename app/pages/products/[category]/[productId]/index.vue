<template>
    <div class="product-page">
        <AppHeader />

        <!-- Breadcrumb Navigation -->
        <!-- <div class="breadcrumb-bg">
            <div class="breadcrumb">
                <NuxtLink to="/">Homepage</NuxtLink>
                <span>/</span>
                <NuxtLink :to="`/products/${category}`">{{ categoryTitle }}</NuxtLink>
                <span>/</span>
                <span>{{ product?.name || 'Product' }}</span>
            </div>
        </div> -->

        <!-- Loading State Skeleton -->
        <div v-if="isLoading" class="product-container loading-skeleton">
            <!-- Left Side - Product Images Skeleton -->
            <div class="product-images">
                <!-- Thumbnail Images Skeleton -->
                <div class="thumbnail-images">
                    <div v-for="i in 4" :key="i" class="thumbnail skeleton-thumbnail">
                        <div class="skeleton-box"></div>
                    </div>
                </div>

                <!-- Main Product Image Skeleton -->
                <div class="main-image-wrapper">
                    <div class="skeleton-box skeleton-main-image"></div>
                </div>
            </div>

            <!-- Right Side - Product Details Skeleton -->
            <div class="product-details-container">
                <div class="product-details-p-1">
                    <div class="product-title-share-btn">
                        <div class="skeleton-box skeleton-title"></div>
                        <div class="skeleton-box skeleton-share-btn"></div>
                    </div>

                    <!-- Pricing Skeleton -->
                    <div class="pricing">
                        <div class="skeleton-box skeleton-price"></div>
                        <div class="skeleton-box skeleton-compare-price"></div>
                    </div>

                    <!-- Rating Skeleton -->
                    <div class="rating-section-sku-share-btn">
                        <div class="skeleton-box skeleton-rating"></div>
                        <div class="skeleton-box skeleton-sku"></div>
                    </div>
                </div>

                <!-- Size Selection Skeleton -->
                <div class="product-details-p-2" v-if="!isMobile">
                    <div class="size-selection">
                        <div class="skeleton-box skeleton-label"></div>
                        <div class="skeleton-size-options">
                            <div v-for="i in 5" :key="i" class="skeleton-box skeleton-size-option"></div>
                        </div>
                    </div>

                    <!-- Color Selection Skeleton -->
                    <div class="color-selection">
                        <div class="skeleton-box skeleton-label"></div>
                        <div class="skeleton-color-options">
                            <div v-for="i in 4" :key="i" class="skeleton-box skeleton-color-option"></div>
                        </div>
                    </div>

                    <!-- Quantity Selector Skeleton -->
                    <div class="quantity-selector">
                        <div class="skeleton-box skeleton-quantity"></div>
                    </div>

                    <!-- Action Buttons Skeleton -->
                    <div class="action-buttons">
                        <div class="skeleton-box skeleton-button"></div>
                        <div class="skeleton-box skeleton-button"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
            <p>Error loading product: {{ error }}</p>
        </div>

        <!-- Product Details Section -->
        <div v-else-if="product" class="product-container">
            <!-- Left Side - Product Images -->
            <div class="product-images">
                <!-- Thumbnail Images -->
                <div class="thumbnail-images">
                    <div v-for="(image, index) in productImages" :key="index" class="thumbnail"
                        :class="{ active: selectedImageIndex === index }" @click="selectedImageIndex = index">
                        <NuxtImg 
                            :src="getImageUrl(image)" 
                            :alt="`${product.name} view ${index + 1}`" 
                            class="thumbnail-img"
                            loading="lazy" 
                            format="webp" 
                            quality="75"
                            sizes="80px"
                            width="80"
                            height="98"
                        />

                        <!-- Show More Overlay for last thumbnail (only when there are more than 4 images) -->
                        <div v-if="hasMoreImages && index === productImages.length - 1 && !showMoreImages" 
                            class="thumbnail-show-more-overlay"
                            @click.stop="showMoreImages = true">
                            <div class="thumbnail-show-more-content">
                                <span class="thumbnail-show-more-text">Show More</span>
                                <svg class="thumbnail-show-more-arrow"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        
                        <!-- Show Less Overlay for last thumbnail (when all images are shown) -->
                        <div v-if="hasMoreImages && index === productImages.length - 1 && showMoreImages" 
                            class="thumbnail-show-more-overlay"
                            @click.stop="showMoreImages = false">
                            <div class="thumbnail-show-more-content">
                                <span class="thumbnail-show-more-text">Show Less</span>
                                <svg class="thumbnail-show-more-arrow rotated"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Product Image -->
                <div 
                    class="main-image-wrapper"
                    @mouseenter="handleImageMouseEnter"
                    @mouseleave="handleImageMouseLeave"
                    @mousemove="handleImageMouseMove"
                >
                    <NuxtImg 
                        v-if="productImages[selectedImageIndex]" 
                        :src="getImageUrl(productImages[selectedImageIndex] || '')" 
                        :alt="product.name" 
                        class="main-image"
                        :style="imageZoomStyle"
                        loading="eager" 
                        format="webp" 
                        quality="85"
                        preload
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                        width="1200"
                        height="1463"
                    />
                </div>
            </div>

            <!-- Right Side - Product Details -->
            <div class="product-details-container">
                <div class="product-details-p-1">
                    <div class="product-title-share-btn">

                        <div class="product-title">{{ product.name }}</div>
                        <div class="product-actions-mobile flex! sm:hidden!">
                            <!-- Wishlist Button (only for logged-in users) -->
                            <button 
                                v-if="isLoggedIn" 
                                class="wishlist-btn-mobile" 
                                @click.stop.prevent="handleToggleWishlist"
                                :title="isInWishlist(product?.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                            >
                                <svg 
                                    v-if="isInWishlist(product?.id)" 
                                    class="wishlist-icon filled" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <svg 
                                    v-else 
                                    class="wishlist-icon" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <UTooltip :text="shareTooltipText" :open="showShareTooltipMobile">
                                <button class="share-btn-mobile" @click.stop.prevent="handleShare($event, 'mobile')">
                                    <NuxtImg 
                                        class="w-3 h-3"
                                        src="/product-details/ios_share.svg" 
                                        alt="Share"
                                        format="webp"
                                        quality="85" 
                                        loading="lazy" 
                                    />
                                </button>
                            </UTooltip>
                        </div>
                    </div>

                    <!-- Pricing -->
                    <div class="pricing">
                        <div class="price-container">
                            <span v-if="showComparePrice" class="original-price">{{ formatPrice(comparePriceToDisplay.price, comparePriceToDisplay.priceUsd) }}</span>
                            <span class="current-price">{{ formatPrice(currentPriceToDisplay.price, currentPriceToDisplay.priceUsd) }}</span>
                        </div>
                        <span v-if="showComparePrice && effectiveComparePrice > selectedVariantPrice" class="discount">
                            -{{ Math.round(((effectiveComparePrice - selectedVariantPrice) / effectiveComparePrice) * 100) }}%
                        </span>
                    </div>

                    <!-- Rating and Reviews -->
                    <div class="rating-section-sku-share-btn">
                        <div class="rating-section">
                            <div class="stars">
                                <svg v-for="i in 5" :key="i" class="star" :class="{ filled: i <= 4 }"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="rating-number">4.4</span>
                            <span class="reviews">5 Reviews</span>
                        </div>

                        <!-- SKU -->
                        <div class="sku-share-btn">
                            <div class="sku">
                                SKU: {{ product.sku }}
                            </div>

                            <div class="share-wishlist-buttons">
                                <!-- Wishlist Button (only for logged-in users) -->
                                <button 
                                    v-if="isLoggedIn" 
                                    class="wishlist-btn-desktop" 
                                    @click.stop.prevent="handleToggleWishlist"
                                    :title="isInWishlist(product?.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                                >
                                    <svg 
                                        v-if="isInWishlist(product?.id)" 
                                        class="wishlist-icon filled" 
                                        fill="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <svg 
                                        v-else 
                                        class="wishlist-icon" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <div class="wishlist-text">Wishlist</div>
                                </button>
                                <!-- Share Button -->
                                <UTooltip :text="shareTooltipText" :open="showShareTooltipDesktop">
                                    <button class="share-btn" @click.stop.prevent="handleShare($event, 'desktop')">
                                        <NuxtImg
                                        class="w-4 h-4"
                                        src="/product-details/ios_share.svg"
                                         alt="Share"
                                          format="webp"
                                           quality="85" 
                                           loading="lazy" 
                                        />
                                        <div class="share-text">Share</div>
                                    </button>
                                </UTooltip>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product Details Section (Desktop) -->
                <div class="product-details-p-2" v-if="!isMobile">
                    <!-- Product Description -->
                    <div class="product-description" v-if="product?.description">
                        <h2 class="info-section-title">Product Description</h2>
                        <div class="description-content">
                            <div class="description-item">
                                <div class="description-text" v-html="product.description"></div>
                            </div>
                        </div>
                    </div>

                <!-- Tags and Campaigns -->
                <div v-if="hasTags || hasCampaigns" class="product-tags-campaigns">
                    <!-- Tags -->
                    <div v-if="hasTags" class="tags-section">
                        <span class="tags-label">Tags: </span>
                        <template v-if="Array.isArray((product as any)?.tags)">
                            <!-- Tags as array -->
                            <NuxtLink 
                                v-for="tag in (product as any).tags" 
                                :key="tag" 
                                :to="`/products/${category}?tag=${encodeURIComponent(tag)}`"
                                class="tag-link"
                            >
                                {{ tag }}
                            </NuxtLink>
                        </template>
                        <template v-else>
                            <!-- Tags as object -->
                            <NuxtLink 
                                v-for="(displayName, tagKey) in (product as any)?.tags" 
                                :key="tagKey" 
                                :to="`/tags/${encodeURIComponent(tagKey)}`"
                                class="tag-link"
                            >
                                {{ displayName }}
                            </NuxtLink>
                        </template>
                    </div>
                    <!-- Campaigns -->
                    <div v-if="hasCampaigns" class="campaigns-section">
                        <span class="campaigns-label">Campaigns: </span>
                        <template v-if="Array.isArray((product as any)?.campaigns)">
                            <!-- Campaigns as array -->
                            <NuxtLink 
                                v-for="campaign in (product as any).campaigns" 
                                :key="campaign" 
                                :to="`/products/${category}?campaign=${encodeURIComponent(campaign)}`"
                                class="campaign-link"
                            >
                                {{ campaign }}
                            </NuxtLink>
                        </template>
                        <template v-else>
                            <!-- Campaigns as object -->
                            <NuxtLink 
                                v-for="(displayName, campaignKey) in (product as any)?.campaigns" 
                                :key="campaignKey" 
                                :to="`/campaigns/${encodeURIComponent(campaignKey)}`"
                                class="campaign-link"
                            >
                                {{ displayName }}
                            </NuxtLink>
                        </template>
                    </div>
                </div>

                    <!-- Size Selection -->
                    <div v-if="availableSizes.length > 0" class="size-selection">
                        <label class="selection-label">Size</label>
                        <div class="size-radio-group">
                            <label v-for="size in availableSizes" :key="size" class="size-radio-option"
                                :class="{ selected: selectedSize === size }">
                                <input type="radio" :value="size" v-model="selectedSize" class="size-radio-input" />
                                <span class="size-radio-label">{{ size }}</span>
                            </label>
                        </div>
                        <NuxtLink to="/size-guide" target="_blank" class="size-guide-link">See Sizes & Fit Details</NuxtLink>
                    </div>

                    <!-- Color Selection -->
                    <div class="color-selection">
                        <label class="selection-label">Color</label>
                        <div class="color-options">
                            <div 
                                v-for="(color, index) in availableColors" 
                                :key="index" 
                                class="color-option-wrapper"
                                @click="selectedColorIndex = index"
                            >
                                <div
                                    class="color-option"
                                    :class="{ selected: selectedColorIndex === index }"
                                    :style="{ backgroundColor: color.value || '#ccc' }"
                                ></div>
                                <span class="color-name">{{ color.name }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Quantity Selector -->
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" @click="decreaseQuantity"
                            :disabled="quantity <= 1">-</button>
                        <span class="quantity-text">Quantity: {{ quantity }}</span>
                        <button class="quantity-btn plus" @click="increaseQuantity" :disabled="quantity >= 20">+</button>
                    </div>

                    <!-- Action Buttons -->
                    <div class="action-buttons">
                        <button class="buy-now-btn" @click="handleBuyNow" :disabled="quantity >= 20">Buy Now</button>
                        <button class="add-to-basket-btn" @click="handleAddToCart" :disabled="quantity >= 20">Add to Basket</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Product Details Section (always shown on mobile) -->
        <div class="product-details-p-2-mobile" v-if="isMobile">
            <!-- Product Description -->
            <div class="product-description" v-if="product?.description">
                <h2 class="info-section-title">Product Description</h2>
                <div class="description-content">
                    <div class="description-item">
                        <div class="description-text" v-html="product.description"></div>
                    </div>
                </div>
            </div>

            <!-- Tags and Campaigns -->
            <div v-if="hasTags || hasCampaigns" class="product-tags-campaigns">
                <!-- Tags -->
                <div v-if="hasTags" class="tags-section">
                    <span class="tags-label">Tags: </span>
                    <template v-if="Array.isArray((product as any)?.tags)">
                        <!-- Tags as array -->
                        <NuxtLink 
                            v-for="tag in (product as any).tags" 
                            :key="tag" 
                            :to="`/products/${category}?tag=${encodeURIComponent(tag)}`"
                            class="tag-link"
                        >
                            {{ tag }}
                        </NuxtLink>
                    </template>
                    <template v-else>
                        <!-- Tags as object -->
                        <NuxtLink 
                            v-for="(displayName, tagKey) in (product as any)?.tags" 
                            :key="tagKey" 
                            :to="`/tags/${encodeURIComponent(tagKey)}`"
                            class="tag-link"
                        >
                            {{ displayName }}
                        </NuxtLink>
                    </template>
                </div>
                <!-- Campaigns -->
                <div v-if="hasCampaigns" class="campaigns-section">
                    <span class="campaigns-label">Campaigns: </span>
                    <template v-if="Array.isArray((product as any)?.campaigns)">
                        <!-- Campaigns as array -->
                        <NuxtLink 
                            v-for="campaign in (product as any).campaigns" 
                            :key="campaign" 
                            :to="`/products/${category}?campaign=${encodeURIComponent(campaign)}`"
                            class="campaign-link"
                        >
                            {{ campaign }}
                        </NuxtLink>
                    </template>
                    <template v-else>
                        <!-- Campaigns as object -->
                        <NuxtLink 
                            v-for="(displayName, campaignKey) in (product as any)?.campaigns" 
                            :key="campaignKey" 
                            :to="`/campaigns/${encodeURIComponent(campaignKey)}`"
                            class="campaign-link"
                        >
                            {{ displayName }}
                        </NuxtLink>
                    </template>
                </div>
            </div>

            <div class="size-selection" v-if="availableSizes.length > 0">
                <label class="selection-label">Size</label>
                <div class="size-radio-group">
                    <label v-for="size in availableSizes" :key="size" class="size-radio-option"
                        :class="{ selected: selectedSize === size }">
                        <input type="radio" :value="size" v-model="selectedSize" class="size-radio-input" />
                        <span class="size-radio-label">{{ size }}</span>
                    </label>
                </div>
                <NuxtLink to="/size-guide" target="_blank" class="size-guide-link">See Sizes & Fit Details</NuxtLink>
            </div>

            <!-- Color Selection -->
            <div class="color-selection">
                <label class="selection-label">Color</label>
                <div class="color-options">
                    <div 
                        v-for="(color, index) in availableColors" 
                        :key="index" 
                        class="color-option-wrapper"
                        @click="selectedColorIndex = index"
                    >
                        <div
                            class="color-option"
                            :class="{ selected: selectedColorIndex === index }"
                            :style="{ backgroundColor: color.value || '#ccc' }"
                        ></div>
                        <span class="color-name">{{ color.name }}</span>
                    </div>
                </div>
            </div>

            <!-- Quantity Selector -->
            <div class="quantity-selector">
                <button class="quantity-btn minus" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                <span class="quantity-text">Quantity: {{ quantity }}</span>
                <button class="quantity-btn plus" @click="increaseQuantity" :disabled="quantity >= 20">+</button>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons">
                <button class="buy-now-btn" @click="handleBuyNow" :disabled="quantity >= 20">Buy Now</button>
                <button class="add-to-basket-btn" @click="handleAddToCart" :disabled="quantity >= 20">Add to Basket</button>
            </div>
        </div>

        <!-- Matching Series Section (Mobile - shown first) -->
        <div v-if="matchingSeriesItems.length > 0 && isMobile" class="matching-series-section-container">
            <div class="matching-series-section">
                <h2 class="section-title">Explore Our Matching Series:</h2>
                <section>
                    <UCarousel ref="matchingSeriesCarousel" v-slot="{ item, index }" :items="matchingSeriesItems"
                        :slides-per-view="2" :space-between="15" :ui="{
                            item: 'matching-series-item',
                            container: 'matching-series-products mobile-layout',
                        }" class="matching-series-carousel mobile-layout">
                        <div class=" w-full flex items-center gap-2">
                            <div class="item-checkbox">
                                <input type="checkbox" :id="`mobile-matching-${item.name}`" v-model="item.checked"
                                    class="checkbox-input" disabled />
                                <label :for="`mobile-matching-${item.name}`" class="checkbox-label"></label>
                            </div>

                            <div class="item-image w-full!">
                                <NuxtLink :to="`/products/${item.product?.category?.slug || category}/${item.slug}`">
                                    <NuxtImg :src="getImageUrl(item.image)" :alt="item.name" class="product-img" loading="lazy"
                                        format="webp" quality="85" />
                                </NuxtLink>
                            </div>

                            <div class="item-details">
                                <p class="item-name line-clamp-1 min-h-[20px]">{{ item.name }}</p>

                                <!-- Size Selector -->
                                <div class="size-selector">
                                    <select v-model="item.size" class="size-select" @change="updateMatchingSeriesSize(matchingSeriesItems.findIndex(i => i.id === item.id), $event)">
                                        <option v-for="size in getAvailableSizesForProduct(item.product)" :key="size" :value="size">
                                            {{ size }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </UCarousel>
                </section>
            </div>
        </div>

        <!-- Frequently Bought Together Section (Mobile - shown second) -->
        <div v-if="frequentlyBoughtItems.length > 0 && isMobile" class="frequently-bought-section">
            <h2 class="section-title">Frequently bought together</h2>

            <div class="frequently-bought-container">
                <!-- Mobile Carousel Layout -->
                <UCarousel ref="frequentlyBoughtCarousel" v-slot="{ item }" :items="frequentlyBoughtItems"
                    :slides-per-view="2" :space-between="15" :ui="{
                        item: 'frequently-bought-item',
                        container: 'frequently-bought-products mobile-layout',
                    }" class="frequently-bought-carousel mobile-layout">
                    <div class="frequently-bought-item">
                        <div class="item-image">
                            <NuxtLink :to="`/products/${item.product?.category?.slug || category}/${item.slug}`">
                                <NuxtImg :src="getImageUrl(item.image)" :alt="item.name" class="product-img" loading="lazy"
                                    format="webp" quality="85" />
                            </NuxtLink>
                            <div class="item-checkbox">
                                <input type="checkbox" :id="`mobile-item-${item.id}`" v-model="item.selected"
                                    class="checkbox-input" />
                                <label :for="`mobile-item-${item.id}`" class="checkbox-label"></label>
                            </div>
                        </div>

                        <div class="item-details">
                            <p class="item-description line-clamp-2 min-h-[40px]">{{ item.description }}</p>
                            <p class="item-price">{{ formatPrice(item.priceValue, item.product?.price_usd) }}</p>
                        </div>
                    </div>
                </UCarousel>
            </div>

            <!-- Summary Section - Below the products -->
            <div class="frequently-bought-summary">
                <div class="total-price">
                    <span class="total-label">Total price :</span>
                    <span class="total-amount">{{ totalPrice }}</span>
                </div>
                <button class="add-to-cart-btn" @click="addFrequentlyBoughtToCart">
                    Add to cart
                </button>
            </div>
        </div>

        <!-- Matching Series Section (Desktop) -->
        <div v-if="matchingSeriesItems.length > 0 && !isMobile" class="matching-series-section-container">
            <div class="matching-series-section">
                <h2 class="section-title">Explore Our Matching Series:</h2>

                <div class="matching-series-container">
                    <div class="matching-series-products">
                        <div v-for="(item, index) in displayedMatchingSeriesItems" :key="index" class="matching-series-item">
                            <!-- Checkbox -->
                            <div class="item-checkbox">
                                <input type="checkbox" :id="`matching-${index}`" v-model="item.checked"
                                    class="checkbox-input" disabled />
                                <label :for="`matching-${index}`" class="checkbox-label"></label>
                            </div>

                            <!-- Product Image -->
                            <div class="item-image w-full! h-full!">
                                <NuxtLink :to="`/products/${item.product?.category?.slug || category}/${item.slug}`">
                                    <NuxtImg :src="getImageUrl(item.image)" :alt="item.name" class="product-img" loading="lazy"
                                        format="webp" quality="85" />
                                </NuxtLink>
                            </div>

                            <!-- Product Details -->
                            <div class="item-details">
                                <p class="item-name">{{ item.name }}</p>

                                <!-- Size Selector -->
                                <div class="size-selector">
                                    <select v-model="item.size" class="size-select" @change="updateMatchingSeriesSize(index, $event)">
                                        <option v-for="size in getAvailableSizesForProduct(item.product)" :key="size" :value="size">
                                            {{ size }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Frequently Bought Together Section (Desktop) -->
            <div v-if="frequentlyBoughtItems.length > 0" class="frequently-bought-section">
                <h2 class="section-title">Frequently bought together</h2>

                <div class="frequently-bought-container">
                    <!-- Desktop Grid Layout -->
                    <div class="frequently-bought-products desktop-layout">
                        <div v-for="(item, index) in frequentlyBoughtItems" :key="index" class="frequently-bought-item">
                            <!-- Product Image -->
                            <div class="item-image">
                                <NuxtLink :to="`/products/${item.product?.category?.slug || category}/${item.slug}`">
                                    <NuxtImg :src="getImageUrl(item.image)" :alt="item.name" class="product-img" loading="lazy"
                                        format="webp" quality="85" />
                                </NuxtLink>
                                <div class="item-checkbox">
                                    <input type="checkbox" :id="`item-${index}`" v-model="item.selected"
                                        class="checkbox-input" />
                                    <label :for="`item-${index}`" class="checkbox-label"></label>
                                </div>
                            </div>

                            <div class="item-details">
                                <p class="item-description line-clamp-2 min-h-[40px]">{{ item.description }}</p>
                                <p class="item-price">{{ formatPrice(item.priceValue, item.product?.price_usd) }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Summary Section - Below the products -->
                <div class="frequently-bought-summary">
                    <div class="total-price">
                        <span class="total-label">Total price :</span>
                        <span class="total-amount">{{ totalPrice }}</span>
                    </div>
                    <button class="add-to-cart-btn" @click="addFrequentlyBoughtToCart">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>

        <!-- Customer Reviews Section -->
        <!-- <div class="reviews-section">
            <h2 class="reviews-title">Customer Reviews</h2>

            <div class="reviews-summary">

                <div>
                    <div class="overall-rating">
                        <div class="rating-display">
                            <div class="stars-display">
                                <svg v-for="i in 5" :key="i" class="star"
                                    :class="{ filled: i <= Math.floor(overallRating), partial: i === Math.ceil(overallRating) && overallRating % 1 !== 0 }"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="rating-number">{{ overallRating }}</span>
                            <p class="reviews-count">{{ totalReviews }} Reviews {{ totalSold }} Sold</p>
                        </div>
                    </div>
                    <div class="star-distribution">
                        <div v-for="(count, index) in starDistribution" :key="index" class="star-bar">
                            <span class="star-label">{{ 5 - index }} Stars ({{ count }})</span>
                            <div class="bar-container">
                                <div class="bar-fill"
                                    :style="{ width: `${(count / Math.max(...starDistribution)) * 100}%` }"></div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="attribute-ratings">
                    <div class="attribute-item">
                        <span class="attribute-label">Quality: Excellent</span>
                        <div class="attribute-slider">
                            <div class="slider-track">
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                            </div>
                        </div>
                        <div class="quality-slider-labels">
                            <div>Poor</div>
                            <div class="ml-auto">Excellent</div>
                        </div>
                    </div>
                    <div class="attribute-item">
                        <span class="attribute-label">Value: Excellent</span>
                        <div class="attribute-slider">
                            <div class="slider-track">
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                            </div>
                        </div>
                        <div class="quality-slider-labels">
                            <div>Poor</div>
                            <div class="ml-auto">Excellent</div>
                        </div>
                    </div>
                    <div class="attribute-item">
                        <span class="attribute-label">Fit: Big</span>
                        <div class="attribute-slider">
                            <div class="slider-track">
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                                <div class="quality-bar"></div>
                            </div>
                        </div>
                        <div class="quality-slider-labels">
                            <div>Very Small</div>
                            <div class="ml-auto">Very Big</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="reviews-controls">
                <div class="search-box">
                    <input type="text" v-model="searchQuery" placeholder="Try searching for a keyword"
                        class="search-input" />
                    <svg class="search-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="sort-dropdown">
                    <select v-model="sortBy" class="sort-select">
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="highest">Highest Rating</option>
                        <option value="lowest">Lowest Rating</option>
                        <option value="most-helpful">Most Helpful</option>
                    </select>
                    <svg class="dropdown-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
            </div>

            <div class="reviews-list">
                <div v-for="review in filteredAndSortedReviews" :key="review.id" class="review-item">
                    <div class="review-header">
                        <div class="review-rating">
                            <div class="review-stars">
                                <svg v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span class="rating-text">{{ review.rating }}/5</span>
                        </div>
                        <div class="review-meta">
                            <span class="reviewer-name">{{ review.reviewerName }}</span>

                            <span v-if="review.verified" class="verified-badge">
                                Verified Buyer
                                <svg class="check-icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                            <span class="review-date">{{ review.date }}</span>
                        </div>
                    </div>

                    <div class="review-content">
                        <h3 class="review-title">{{ review.title }}</h3>
                        <p class="review-text">{{ review.text }}</p>

                        <div class="review-footer">
                            <div class="helpfulness">
                                <span class="helpfulness-text">Is this review helpful?</span>
                                <div class="helpfulness-buttons">
                                    <button class="helpfulness-btn yes-btn" @click="voteHelpful(review.id, true)"
                                        :class="{ active: review.userVote === 'yes' }">
                                        <svg class="thumbs-icon" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.834a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                        </svg>
                                        Yes ({{ review.helpfulYes }})
                                    </button>
                                    <button class="helpfulness-btn no-btn" @click="voteHelpful(review.id, false)"
                                        :class="{ active: review.userVote === 'no' }">
                                        <svg class="thumbs-icon" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.834a2 2 0 00-1.106-1.79l-.05-.025A4 4 0 0011.057 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                                        </svg>
                                        No ({{ review.helpfulNo }})
                                    </button>
                                </div>
                            </div>
                            <button class="report-btn">Report</button>
                        </div>
                    </div>
                    <div class="review-attributes">
                        <div class="attribute-rating">
                            <span class="attr-label">Quality :</span>
                            <span class="attr-value">{{ review.attributes.quality }}</span>
                        </div>
                        <div class="attribute-rating">
                            <span class="attr-label">Value :</span>
                            <span class="attr-value">{{ review.attributes.value }}</span>
                        </div>
                        <div class="attribute-rating">
                            <span class="attr-label">Fit :</span>
                            <span class="attr-value">{{ review.attributes.fit }}</span>
                        </div>
                    </div>




                </div>
            </div>
        </div> -->

        <!-- Related Products Section -->
        <div class="related-products-section" v-if="!isMobile && relatedProducts.length > 0">
            <div class="related-products-header">
                <div class="related-products-title">
                    <div>
                        <span class="related-products-title-light">Related&nbsp;</span>
                        <span class="related-products-title-bold">Products</span>
                    </div>
                </div>
            </div>

            <div class="related-products-grid" v-if="relatedProducts.length > 0">
                <NuxtLink v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" :to="`/products/${relatedProduct.category?.slug || category}/${relatedProduct.slug}`" class="related-product-card">
                    <div class="product-image-container">
                        <NuxtImg 
                            :src="getImageUrl(getProductImage(relatedProduct, 0))" 
                            :alt="relatedProduct.name" 
                            class="product-img product-img-default"
                            loading="lazy"
                            format="webp" 
                            quality="80"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            width="400"
                            height="488"
                        />
                        <NuxtImg 
                            :src="getImageUrl(getProductImage(relatedProduct, 1))" 
                            :alt="relatedProduct.name" 
                            class="product-img product-img-hover"
                            loading="lazy"
                            format="webp" 
                            quality="80"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            width="400"
                            height="488"
                        />
                        <NuxtImg 
                            v-if="getProductImage(relatedProduct, 2) !== ''"
                            :src="getImageUrl(getProductImage(relatedProduct, 2) || '')" 
                            :alt="relatedProduct.name" 
                            class="product-img product-img-hover-delayed"
                            loading="lazy"
                            format="webp" 
                            quality="80"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            width="400"
                            height="488"
                        />
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">{{ relatedProduct.name }}</h3>
                        <div class="product-price-container">
                            <span v-if="shouldShowComparePriceForRelated(relatedProduct)" class="product-original-price">{{ formatPrice(getComparePriceToDisplayForRelated(relatedProduct).price, getComparePriceToDisplayForRelated(relatedProduct).priceUsd) }}</span>
                            <span class="product-price">{{ formatPrice(getCurrentPriceToDisplayForRelated(relatedProduct).price, getCurrentPriceToDisplayForRelated(relatedProduct).priceUsd) }}</span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
        <section v-if="isMobile && relatedProducts.length > 0" class="related-products-section-mobile">
            <div class="related-products-title">
                <div>
                    <span class="related-products-title-light">Related</span>
                    <span class="related-products-title-bold">Products</span>
                </div>
            </div>
            <!-- Related Products Carousel -->
            <UCarousel v-if="relatedProducts.length > 0" ref="carouselRef" v-slot="{ item }" :items="relatedProducts" :ui="{
                item: 'basis-1/2',
                container: 'rounded-lg gap-4'
            }" class="rounded-lg gap-4" :slides-per-view="2" :slides-per-group="1" :space-between="15" :autoplay="false"
                :infinite="true" tabindex="0">
                <NuxtLink :to="`/products/${item.category?.slug || category}/${item.slug}`" class="carousel-item">
                    <NuxtImg :src="getImageUrl(item.image)" :alt="item.name"
                        class="w-full h-80 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                        loading="lazy" format="webp" quality="85" />
                    <div class="related-products-info">
                        <h3 class="new-arrival-name-light">{{ item.name }}</h3>
                        <div class="related-products-price-container">
                            <span v-if="shouldShowComparePriceForRelated(item)" class="related-products-original-price">{{ formatPrice(getComparePriceToDisplayForRelated(item).price, getComparePriceToDisplayForRelated(item).priceUsd) }}</span>
                            <h4 class="related-products-price">{{ formatPrice(getCurrentPriceToDisplayForRelated(item).price, getCurrentPriceToDisplayForRelated(item).priceUsd) }}</h4>
                        </div>
                    </div>
                </NuxtLink>
            </UCarousel>
        </section>
    </div>
    <AppFooter />
</template>

<script setup lang="ts">
// All Vue composables and components are auto-imported in Nuxt 4
// CSS is imported globally via nuxt.config.ts
import { navigateTo, useHead, useRoute } from 'nuxt/app'
import { computed, onMounted, ref, watch } from 'vue'
import AppFooter from '../../../../../components/AppFooter.vue'
import { useApi } from '../../../../../composables/useApi'
import { useCart } from '../../../../../composables/useCart'
import { useCurrency } from '../../../../../composables/useCurrency'
import { useWishlist } from '../../../../../composables/useWishlist'
import type { Product } from '../../../../../types/homepage'
// Get route parameters
import './product.css'
const route = useRoute()
const category = route.params.category as string
const productIdSlug = computed(() => route.params.productId as string)

// Product data from API
const product = ref<Product | null>(null)
const relatedProducts = ref<Product[]>([])
const crossSoldProducts = ref<Product[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

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

// Get all product images (main image, images object, variant images)
const getAllProductImages = (product: Product): string[] => {
  const images: string[] = []
  
  // Add main image
  if (product.image) {
    images.push(product.image)
  }
  
  // Add images from images object
  if (product.images && typeof product.images === 'object') {
    Object.values(product.images).forEach(img => {
      if (img && !images.includes(img)) {
        images.push(img)
      }
    })
  }
  
  // Add variant images
  if (product.variants) {
    product.variants.forEach(variant => {
      if (variant.image && !images.includes(variant.image)) {
        images.push(variant.image)
      }
    })
  }
  
  return images
}

// Get product image based on image index
// index 0: 1st image (default), index 1: 2nd image (hover), index 2: 3rd image (hover delayed)
const getProductImage = (product: Product, imageIndex: number): string => {
  const allImages = getAllProductImages(product)
  
  // If no images, return product.image as fallback or empty string
  if (allImages.length === 0) return product.image || ''
  
  // If only 1 image, return it for all states
  if (allImages.length === 1) return allImages[0] || product.image || ''
  
  // Return image at specified index, or fallback to available images
  if (imageIndex === 0) {
    // Default: 1st image (index 0)
    return allImages[0] || product.image || ''
  } else if (imageIndex === 1) {
    // Hover: 2nd image (index 1) if available, otherwise use first image
    return allImages.length >= 2 && allImages[1] ? allImages[1] : (allImages[0] || product.image || '')
  } else if (imageIndex === 2) {
    // Hover delayed: 3rd image (index 2) if available, otherwise return empty string (don't show)
    return allImages.length >= 3 && allImages[2] ? allImages[2] : ''
  }
  
  return product.image || ''
}

// Reactive data
const selectedImageIndex = ref(0)
const selectedColorIndex = ref(0)
const selectedSize = ref('')
const quantity = ref(1)
const showMoreImages = ref(false)
const showShareTooltipMobile = ref(false)
const showShareTooltipDesktop = ref(false)
const shareTooltipText = ref('Link copied!')

// Image zoom state
const isImageHovered = ref(false)
const imageZoomPosition = ref({ x: 0, y: 0 })
const zoomLevel = 2 // Zoom level (2x zoom)

// Fetch product details from API
const fetchProductDetails = async () => {
  if (!productIdSlug.value) return

  isLoading.value = true
  error.value = null

  try {
    const { backendUrl } = useApi()
    const apiUrl = `${backendUrl}/product/${productIdSlug.value}`
    const response = await $fetch<any>(apiUrl)
    console.log('Product Detail API Response:', response)

    if (response.success && response.data) {
      // Check if data is a Product or an object with product and related
      if ('product' in response.data) {
        product.value = response.data.product
        relatedProducts.value = response.data.related || []
        crossSoldProducts.value = (response.data as any).cross_sold || []
      } else if ('related' in response.data || 'cross_sold' in response.data) {
        product.value = response.data as Product
        relatedProducts.value = (response.data as any).related || []
        crossSoldProducts.value = (response.data as any).cross_sold || []
      } else {
        product.value = response.data as Product
        // Check if there's a related or cross_sold field at the root level
        relatedProducts.value = (response as any).related || []
        crossSoldProducts.value = (response as any).cross_sold || []
      }
      
      // Set first available size as default
      if (product.value?.variants && product.value.variants.length > 0) {
        const firstVariant = product.value.variants.find(v => v.attributes?.size)
        if (firstVariant?.attributes?.size) {
          selectedSize.value = firstVariant.attributes.size
        } else {
          // Fallback: get first size from available sizes
          const sizes = new Set<string>()
          product.value.variants.forEach(variant => {
            if (variant.attributes?.size) {
              sizes.add(variant.attributes.size)
            }
          })
          const sortedSizes = Array.from(sizes).sort()
          if (sortedSizes.length > 0) {
            selectedSize.value = sortedSizes[0] || ''
          }
        }
      }
      
      console.log('Product loaded:', product.value)
      console.log('Related products:', relatedProducts.value)
      console.log('Cross-sold products:', crossSoldProducts.value)
      console.log('Default size selected:', selectedSize.value)
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
    error.value = errorMessage
    console.error('Error fetching product details:', err)
  } finally {
    isLoading.value = false
  }
}

// Watch for productIdSlug changes
watch(productIdSlug, () => {
  fetchProductDetails()
  selectedImageIndex.value = 0
}, { immediate: true })

// Watch for product changes to reset selected image and set default size
watch(product, (newProduct) => {
  selectedImageIndex.value = 0
  
  // Set first available size as default
  if (newProduct?.variants && newProduct.variants.length > 0) {
    const firstVariant = newProduct.variants.find(v => v.attributes?.size)
    if (firstVariant?.attributes?.size) {
      selectedSize.value = firstVariant.attributes.size
    } else if (availableSizes.value.length > 0) {
      selectedSize.value = availableSizes.value[0] || ''
    }
  }
})

// Fetch on mount
onMounted(() => {
  fetchProductDetails()
  handleResize()
  window.addEventListener('resize', handleResize)
  initializeWishlist()
})

// Meta - update when product is loaded
useHead({
    title: computed(() => product.value ? `${product.value.name} - Rang` : 'Product Details - Rang'),
    meta: computed(() => [
        { name: 'description', content: product.value ? product.value.description?.replace(/<[^>]*>/g, '').substring(0, 160) || `Discover ${product.value.name} at Rang` : 'Product Details' }
    ])
})

const isMobile = ref(false)

// Handle responsive behavior
const handleResize = () => {
    isMobile.value = window.innerWidth < 600
}


// Matching series items state
const matchingSeriesItems = ref<Array<{
  id: number
  checked: boolean
  image: string
  name: string
  size: string
  price: number
  price_usd?: number
  slug: string
  product: Product
}>>([])

// Update matching series items when product combo_products change
watch(product, (newProduct) => {
  // Extract combo_products from the product
  const comboProducts = (newProduct as any)?.combo_products || []
  
  if (!comboProducts || comboProducts.length === 0) {
    matchingSeriesItems.value = []
    return
  }

  matchingSeriesItems.value = comboProducts.map((product: Product, index: number) => {
    // Get first available size from variants
    const firstVariant = product.variants?.[0]
    const defaultSize = firstVariant?.attributes?.size || 'M'
    
    // Get the minimum price from variants or use product price
    const minPrice = product.variants?.length > 0
      ? Math.min(...product.variants.map(v => v.price))
      : product.price
    
    // Get the minimum USD price from variants or use product price_usd
    let finalPriceUsd: number | undefined = undefined
    if (product.variants?.length > 0) {
      const usdPrices = product.variants.map(v => v.price_usd).filter(p => p !== undefined && p !== null && p > 0) as number[]
      if (usdPrices.length > 0) {
        finalPriceUsd = Math.min(...usdPrices)
      } else if (product.price_usd !== undefined && product.price_usd > 0) {
        finalPriceUsd = product.price_usd
      }
    } else if (product.price_usd !== undefined && product.price_usd > 0) {
      finalPriceUsd = product.price_usd
    }

    return {
      id: product.id,
      checked: true, // All items checked by default and disabled
      image: product.image,
      name: product.name,
      size: defaultSize,
      price: minPrice,
      price_usd: finalPriceUsd,
      slug: product.slug,
      product: product // Store full product for reference
    }
  })
}, { immediate: true })

// Frequently bought together items state
const frequentlyBoughtItems = ref<Array<{
  id: number
  name: string
  description: string
  price: string
  priceValue: number
  image: string
  selected: boolean
  slug: string
  product: Product
}>>([])

// Update frequently bought items when cross-sold products change
watch(crossSoldProducts, (newCrossSoldProducts) => {
  if (!newCrossSoldProducts || newCrossSoldProducts.length === 0) {
    frequentlyBoughtItems.value = []
    return
  }

  frequentlyBoughtItems.value = newCrossSoldProducts.map((product, index) => {
    // Get the minimum price from variants or use product price
    const minPrice = product.variants?.length > 0
      ? Math.min(...product.variants.map(v => v.price))
      : product.price

    // Get description from product or create a default one
    const description = product.description 
      ? product.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
      : `This Item: ${product.name}`

    return {
      id: product.id,
      name: product.name,
      description: description,
      price: `TK : ${minPrice.toLocaleString()}`,
      priceValue: minPrice,
      image: product.image,
      selected: index === 0, // First item selected by default
      slug: product.slug,
      product: product // Store full product for reference
    }
  })
}, { immediate: true })

// Reviews data
const overallRating = ref(4.4)
const totalReviews = ref(5)
const totalSold = ref(13)
const starDistribution = ref([1, 4, 0, 0, 0]) // [5-star, 4-star, 3-star, 2-star, 1-star]
const searchQuery = ref('')
const sortBy = ref('newest')

const attributeRatings = ref({
    quality: 4.8,
    qualityLabel: 'Excellent',
    value: 4.2,
    valueLabel: 'Great',
    fit: 4.6,
    fitLabel: 'Big'
})

const reviews = ref([
    {
        id: 1,
        rating: 4.4,
        reviewerName: 'MandyG',
        verified: true,
        date: '12 April, 2024',
        title: 'Great Quality',
        text: 'Lovely jacket, really good quality and colour! It is a very oversized fit so would recommend sizing down if you can.',
        helpfulYes: 2,
        helpfulNo: 0,
        userVote: null as 'yes' | 'no' | null,
        attributes: {
            quality: 'Excellent',
            value: 'Great',
            fit: 'Big'
        }
    },
    {
        id: 2,
        rating: 4.4,
        reviewerName: 'Jillgingercat',
        verified: false,
        date: '12 April, 2024',
        title: 'Great Spring Jacket/Over Shirt',
        text: 'Great valve and excellent quality for the price I am a standard size 16 in everything but this item is huge so I bought size 14. And, this has still room to spare.',
        helpfulYes: 2,
        helpfulNo: 0,
        userVote: null as 'yes' | 'no' | null,
        attributes: {
            quality: 'Excellent',
            value: 'Excellent',
            fit: 'Big'
        }
    },
    {
        id: 3,
        rating: 4.4,
        reviewerName: 'WenD17',
        verified: false,
        date: '9 February, 2024',
        title: 'Good Basic Jacket',
        text: 'Nice cotton and colour, yes its baggy but that is part of the style, nice e length',
        helpfulYes: 2,
        helpfulNo: 0,
        userVote: null as 'yes' | 'no' | null,
        attributes: {
            quality: 'Excellent',
            value: 'Great',
            fit: 'True to size'
        }
    }
])

// Related products are now loaded from API in relatedProducts ref

// Computed properties for product data
const categoryTitle = computed(() => {
  if (!product.value?.category) return category
  return product.value.category.name || category
})

// Check if tags exist (handling both array and object formats)
const hasTags = computed(() => {
  const tags = (product.value as any)?.tags
  if (!tags) return false
  if (Array.isArray(tags)) {
    return tags.length > 0
  }
  if (typeof tags === 'object') {
    return Object.keys(tags).length > 0
  }
  return false
})

// Check if campaigns exist (handling both array and object formats)
const hasCampaigns = computed(() => {
  const campaigns = (product.value as any)?.campaigns
  if (!campaigns) return false
  if (Array.isArray(campaigns)) {
    return campaigns.length > 0
  }
  if (typeof campaigns === 'object') {
    return Object.keys(campaigns).length > 0
  }
  return false
})

// Product images from API
const allProductImages = computed(() => {
  if (!product.value) return []
  
  const images: string[] = []
  
  // Add main image
  if (product.value.image) {
    images.push(product.value.image)
  }
  
  // Add images from images object
  if (product.value.images && typeof product.value.images === 'object') {
    Object.values(product.value.images).forEach(img => {
      if (img && !images.includes(img)) {
        images.push(img)
      }
    })
  }
  
  // Add variant images
  if (product.value.variants) {
    product.value.variants.forEach(variant => {
      if (variant.image && !images.includes(variant.image)) {
        images.push(variant.image)
      }
    })
  }
  
  return images.length > 0 ? images : ['/placeholder.png']
})

// Displayed product images (4 by default, all when showMoreImages is true)
const productImages = computed(() => {
  if (showMoreImages.value) {
    return allProductImages.value
  }
  return allProductImages.value.slice(0, 4)
})

// Check if there are more than 4 images
const hasMoreImages = computed(() => {
  return allProductImages.value.length > 4
})

// Available sizes from variants
const availableSizes = computed(() => {
  if (!product.value?.variants) return []
  
  const sizes = new Set<string>()
  product.value.variants.forEach(variant => {
    if (variant.attributes?.size) {
      sizes.add(variant.attributes.size)
    }
  })
  
  return Array.from(sizes).sort()
})

// Available colors from variants
const availableColors = computed(() => {
  if (!product.value?.variants) return []
  
  const colorMap = new Map<string, { name: string; value: string }>()
  product.value.variants.forEach(variant => {
    if (variant.attributes?.color) {
      const colorName = variant.attributes.color
      if (!colorMap.has(colorName)) {
        // Try to get color value from variant or use a default
        colorMap.set(colorName, {
          name: colorName,
          value: colorName // Default color, you might want to map color names to hex values
        })
      }
    }
  })
  
  return Array.from(colorMap.values())
})

// Computed property to find the selected variant based on size and color
const selectedVariant = computed(() => {
  if (!product.value?.variants || product.value.variants.length === 0) {
    return null
  }
  
  // If no size is selected, return null
  if (!selectedSize.value) {
    return null
  }
  
  // Find variant matching selected size and color
  const selectedColor = availableColors.value[selectedColorIndex.value]?.name
  
  // First, try to find exact match (size + color)
  if (selectedColor) {
    const exactMatch = product.value.variants.find(v => {
      const sizeMatch = v.attributes?.size === selectedSize.value
      const colorMatch = v.attributes?.color === selectedColor
      return sizeMatch && colorMatch
    })
    if (exactMatch) {
      return exactMatch
    }
  }
  
  // If no exact match, find by size only (prioritize first variant with matching size)
  const sizeMatch = product.value.variants.find(v => v.attributes?.size === selectedSize.value)
  if (sizeMatch) {
    return sizeMatch
  }
  
  // Fallback: return first variant if no match found
  return product.value.variants[0] || null
})

// Computed properties for selected variant price
const selectedVariantPrice = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value.price
  }
  return product.value?.price || 0
})

const selectedVariantPriceUsd = computed(() => {
  if (!product.value) return undefined
  
  if (selectedVariant.value?.price_usd !== undefined && selectedVariant.value.price_usd > 0) {
    return selectedVariant.value.price_usd
  }
  
  // Calculate USD price based on the ratio between variant price and product price
  if (product.value.price_usd && product.value.price > 0 && selectedVariant.value) {
    return (selectedVariant.value.price / product.value.price) * product.value.price_usd
  }
  
  return product.value.price_usd
})

const selectedVariantComparePrice = computed(() => {
  if (!product.value) return 0
  
  // First check if variant has compare_price
  if (selectedVariant.value?.compare_price !== undefined && selectedVariant.value.compare_price !== null && selectedVariant.value.compare_price > 0) {
    return selectedVariant.value.compare_price
  }
  
  // If variant doesn't have compare_price (or no variant selected), use product compare_price
  const productComparePrice = product.value.compare_price
  if (productComparePrice !== undefined && productComparePrice !== null && productComparePrice > 0) {
    return productComparePrice
  }
  
  return 0
})

const selectedVariantComparePriceUsd = computed(() => {
  if (!product.value) return undefined
  
  // First check if variant has compare_price_usd
  if (selectedVariant.value?.compare_price_usd !== undefined && selectedVariant.value.compare_price_usd !== null && selectedVariant.value.compare_price_usd > 0) {
    return selectedVariant.value.compare_price_usd
  }
  
  // Calculate USD compare price based on the ratio if variant has compare_price but not compare_price_usd
  if (selectedVariant.value?.compare_price && product.value.compare_price_usd && product.value.compare_price && product.value.compare_price > 0) {
    return (selectedVariant.value.compare_price / product.value.compare_price) * product.value.compare_price_usd
  }
  
  // If product has compare_price_usd, use it
  if (product.value.compare_price_usd !== undefined && product.value.compare_price_usd !== null && product.value.compare_price_usd > 0) {
    return product.value.compare_price_usd
  }
  
  return undefined
})

// Get the effective compare price (from variant or product)
const effectiveComparePrice = computed(() => {
  if (selectedVariantComparePrice.value > 0) {
    return selectedVariantComparePrice.value
  }
  return product.value?.compare_price || 0
})

// Get the effective compare price USD (from variant or product)
const effectiveComparePriceUsd = computed(() => {
  if (selectedVariantComparePriceUsd.value !== undefined && selectedVariantComparePriceUsd.value !== null && selectedVariantComparePriceUsd.value > 0) {
    return selectedVariantComparePriceUsd.value
  }
  return product.value?.compare_price_usd
})

// Get the compare price to display (converted to USD if currency is USD)
const comparePriceToDisplay = computed(() => {
  const comparePrice = effectiveComparePrice.value
  
  if (currency.value === 'USD') {
    // Convert compare_price to USD using exchange rate
    if (comparePrice > 0 && exchangeRate.value > 0) {
      const comparePriceUsd = comparePrice / exchangeRate.value
      return { price: 0, priceUsd: comparePriceUsd }
    }
    return { price: 0, priceUsd: 0 }
  }
  
  // For BDT, return compare_price as is
  return { price: comparePrice, priceUsd: effectiveComparePriceUsd.value }
})

// Get the current price to display
const currentPriceToDisplay = computed(() => {
  if (currency.value === 'USD') {
    // Convert price to USD using exchange rate
    if (selectedVariantPrice.value > 0 && exchangeRate.value > 0) {
      const priceUsd = selectedVariantPrice.value / exchangeRate.value
      return { price: 0, priceUsd: priceUsd }
    }
    return { price: 0, priceUsd: 0 }
  }
  
  // For BDT, return price as is
  return { price: selectedVariantPrice.value, priceUsd: selectedVariantPriceUsd.value }
})

// Check if prices differ (for both BDT and USD)
// Show compare_price if it exists and differs from the current price
const showComparePrice = computed(() => {
  if (!product.value) return false
  
  const currentPrice = selectedVariantPrice.value
  const comparePrice = effectiveComparePrice.value
  const currentPriceUsd = selectedVariantPriceUsd.value
  const comparePriceUsd = effectiveComparePriceUsd.value
  
  // Check if BDT prices differ - compare_price must exist and be different from current price
  if (comparePrice > 0 && currentPrice > 0 && comparePrice !== currentPrice) {
    return true
  }
  
  // Check if USD prices differ
  if (comparePriceUsd !== undefined && 
      comparePriceUsd !== null && 
      comparePriceUsd > 0 &&
      currentPriceUsd !== undefined &&
      currentPriceUsd !== null &&
      currentPriceUsd > 0 &&
      Math.abs(comparePriceUsd - currentPriceUsd) > 0.01) {
    return true
  }
  
  return false
})

// Computed properties
const totalPrice = computed(() => {
    const { currency, exchangeRate } = useCurrency()
    const selectedItems = frequentlyBoughtItems.value.filter(item => item.selected)
    
    if (currency.value === 'USD') {
      // Sum USD prices if available, otherwise convert BDT prices
      const totalUsd = selectedItems.reduce((sum, item) => {
        const priceUsd = item.product?.price_usd !== undefined && item.product.price_usd > 0 ? item.product.price_usd : item.priceValue / exchangeRate.value
        return sum + priceUsd
      }, 0)
      return formatPrice(0, totalUsd)
    } else {
      const total = selectedItems.reduce((sum, item) => {
        return sum + (item.priceValue || 0)
      }, 0)
      return formatPrice(total)
    }
})

// Display only first 4 matching series items
const displayedMatchingSeriesItems = computed(() => {
    return matchingSeriesItems.value.slice(0, 4)
})

// Total price for matching series items
const matchingSeriesTotalPrice = computed(() => {
    const { currency, exchangeRate } = useCurrency()
    const selectedItems = matchingSeriesItems.value.filter(item => item.checked)
    
    if (currency.value === 'USD') {
      // Sum USD prices if available, otherwise convert BDT prices
      const totalUsd = selectedItems.reduce((sum, item) => {
        let priceUsd: number
        if (item.price_usd !== undefined && item.price_usd !== null && item.price_usd > 0) {
          priceUsd = item.price_usd
        } else if (item.price && exchangeRate.value > 0) {
          priceUsd = item.price / exchangeRate.value
        } else {
          priceUsd = 0
        }
        return sum + priceUsd
      }, 0)
      return formatPrice(0, totalUsd > 0 ? totalUsd : undefined)
    } else {
      const total = selectedItems.reduce((sum, item) => {
        return sum + (item.price || 0)
      }, 0)
      return formatPrice(total)
    }
})

const filteredAndSortedReviews = computed(() => {
    let filtered = reviews.value

    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(review =>
            review.title.toLowerCase().includes(query) ||
            review.text.toLowerCase().includes(query) ||
            review.reviewerName.toLowerCase().includes(query)
        )
    }

    // Sort reviews
    switch (sortBy.value) {
        case 'newest':
            return filtered.sort((a, b) => b.id - a.id)
        case 'oldest':
            return filtered.sort((a, b) => a.id - b.id)
        case 'highest':
            return filtered.sort((a, b) => b.rating - a.rating)
        case 'lowest':
            return filtered.sort((a, b) => a.rating - b.rating)
        case 'most-helpful':
            return filtered.sort((a, b) => (b.helpfulYes - b.helpfulNo) - (a.helpfulYes - a.helpfulNo))
        default:
            return filtered
    }
})

// Methods
const increaseQuantity = () => {
    if (quantity.value < 20) {
        quantity.value++
    }
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

const { addToCart } = useCart()
const { formatPrice, currency, exchangeRate } = useCurrency()

// Helper functions for related products price comparison
const shouldShowComparePriceForRelated = (product: Product): boolean => {
  const comparePrice = product.compare_price || 0
  const currentPrice = product.price || 0
  
  // Check if prices differ
  if (comparePrice > 0 && currentPrice > 0 && comparePrice !== currentPrice) {
    return true
  }
  
  return false
}

// Get the compare price to display for related products (converted to USD if currency is USD)
const getComparePriceToDisplayForRelated = (product: Product): { price: number; priceUsd?: number } => {
  const comparePrice = product.compare_price || 0
  
  if (currency.value === 'USD') {
    // Convert compare_price to USD using exchange rate
    if (comparePrice > 0 && exchangeRate.value > 0) {
      const comparePriceUsd = comparePrice / exchangeRate.value
      return { price: 0, priceUsd: comparePriceUsd }
    }
    return { price: 0, priceUsd: 0 }
  }
  
  // For BDT, return compare_price as is
  return { price: comparePrice, priceUsd: product.compare_price_usd }
}

// Get the current price to display for related products
const getCurrentPriceToDisplayForRelated = (product: Product): { price: number; priceUsd?: number } => {
  if (currency.value === 'USD') {
    // Convert price to USD using exchange rate
    if (product.price && exchangeRate.value > 0) {
      const priceUsd = product.price / exchangeRate.value
      return { price: 0, priceUsd: priceUsd }
    }
    return { price: 0, priceUsd: 0 }
  }
  
  // For BDT, return price as is
  return { price: product.price || 0, priceUsd: product.price_usd }
}

// Wishlist functionality
const { isLoggedIn, isInWishlist, toggleWishlist, initializeWishlist } = useWishlist()

// Handle wishlist toggle
const handleToggleWishlist = async () => {
  if (product.value?.id && product.value?.slug) {
    await toggleWishlist(product.value.id, product.value.slug)
  }
}

const handleAddToCart = () => {
    if (!product.value) return
    
    // Size is mandatory only if product has variants
    const hasVariants = product.value.variants && product.value.variants.length > 0
    if (hasVariants && !selectedSize.value) {
        alert('Please select a size')
        return
    }

    // Find the variant matching selected size and color (only if variants exist)
    const selectedVariant = hasVariants ? (
      product.value.variants?.find(variant => {
        const sizeMatch = variant.attributes?.size === selectedSize.value
        const colorMatch = availableColors.value[selectedColorIndex.value]?.name === variant.attributes?.color
        return sizeMatch && (selectedColorIndex.value === -1 || colorMatch)
      }) || product.value.variants?.find(variant => variant.attributes?.size === selectedSize.value)
    ) : null

    const variantPrice = selectedVariant?.price || product.value.price
    // Calculate USD price based on ratio if variant price differs from product price
    let variantPriceUsd: number | undefined = undefined
    if (selectedVariant?.price_usd !== undefined && selectedVariant.price_usd > 0) {
      variantPriceUsd = selectedVariant.price_usd
    } else if (product.value.price_usd && product.value.price > 0) {
      // Calculate USD price based on the ratio between variant price and product price
      variantPriceUsd = (variantPrice / product.value.price) * product.value.price_usd
    } else {
      variantPriceUsd = product.value.price_usd
    }
    const variantImage = selectedVariant?.image || product.value.image

    // Check if product is a combo product
    const isCombo = (product.value as any).is_combo === true
    const comboProducts = (product.value as any).combo_products

    for (let i = 0; i < quantity.value; i++) {
        const cartItem: any = {
            id: product.value.id.toString(),
            name: product.value.name,
            price: variantPrice,
            price_usd: variantPriceUsd,
            priceDisplay: formatPrice(variantPrice, variantPriceUsd),
            image: getImageUrl(variantImage),
            size: hasVariants ? selectedSize.value : undefined,
            color: selectedVariant?.attributes?.color || availableColors.value[selectedColorIndex.value]?.name,
            sku: selectedVariant?.sku || product.value.sku,
            product_id: product.value.id,
            variant_id: selectedVariant?.id,
            vat: (product.value as any).vat || (product.value as any).category?.vat || null
        }

        // Add combo product properties if it's a combo - new format
        if (isCombo && Array.isArray(comboProducts) && comboProducts.length > 0) {
            // Extract product_id and variant_id from each combo product
            const productsArray = comboProducts.map((comboProduct: any) => {
                // Handle both formats: direct product_id/variant_id or full product object
                if (comboProduct.product_id && comboProduct.variant_id) {
                    return {
                        product_id: comboProduct.product_id,
                        variant_id: comboProduct.variant_id
                    }
                } else if (comboProduct.id) {
                    // Full product object - find variant based on selected size from matchingSeriesItems
                    const productId = comboProduct.id
                    // Find the matching item in matchingSeriesItems to get the selected size
                    const matchingItem = matchingSeriesItems.value.find(item => item.id === productId)
                    const selectedSize = matchingItem?.size
                    
                    // Find variant matching the selected size, or fallback to first variant
                    const selectedVariant = selectedSize
                        ? comboProduct.variants?.find((v: any) => v.attributes?.size === selectedSize)
                        : null
                    const variant = selectedVariant || comboProduct.variants?.[0]
                    
                    if (variant?.id) {
                        return {
                            product_id: productId,
                            variant_id: variant.id
                        }
                    }
                }
                return null
            }).filter((p: any) => p !== null)

            if (productsArray.length > 0) {
                cartItem.product_id = product.value.id
                cartItem.qty = 1
                cartItem.products = productsArray
            }
        }

        addToCart(cartItem)
    }

}

const handleBuyNow = () => {
    handleAddToCart()
    navigateTo('/cart')
}

// Share functionality - uses native share on mobile, clipboard on desktop
const handleShare = async (event: Event, buttonType: 'mobile' | 'desktop') => {
    event.preventDefault()
    event.stopPropagation()
    
    if (!product.value) return
    
    const productUrl = window.location.href
    const productName = product.value.name
    const shareText = `Check out ${productName} on Rang Bangladesh!`
    
    // Check if on mobile device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // Use native share API only on mobile devices
    if (isMobileDevice && navigator.share) {
        try {
            await navigator.share({
                title: productName,
                text: shareText,
                url: productUrl
            })
        } catch (err) {
            // User cancelled or error - fall through to clipboard
            if ((err as Error).name === 'AbortError') {
                return // User cancelled, do nothing
            }
            // For other errors, fall through to clipboard
        }
        return
    }
    
    // Clipboard fallback for desktop browsers
    const showTooltip = () => {
        if (buttonType === 'mobile') {
            showShareTooltipMobile.value = true
            setTimeout(() => {
                showShareTooltipMobile.value = false
            }, 2000)
        } else {
            showShareTooltipDesktop.value = true
            setTimeout(() => {
                showShareTooltipDesktop.value = false
            }, 2000)
        }
    }
    
    try {
        await navigator.clipboard.writeText(productUrl)
        showTooltip()
    } catch (err) {
        // Final fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = productUrl
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        showTooltip()
    }
}

const addFrequentlyBoughtToCart = () => {
    const selectedItems = frequentlyBoughtItems.value.filter(item => item.selected)
    selectedItems.forEach(item => {
      // Get first variant or use product price
      const firstVariant = item.product?.variants?.[0]
      const variantPrice = firstVariant?.price || item.priceValue
      const variantPriceUsd = firstVariant?.price_usd || item.product?.price_usd
      const variantImage = firstVariant?.image || item.product?.image || item.image
      const variantSize = firstVariant?.attributes?.size

      addToCart({
          id: item.id.toString(),
          name: item.name,
          price: variantPrice,
          price_usd: variantPriceUsd,
          priceDisplay: formatPrice(variantPrice, variantPriceUsd),
          image: getImageUrl(variantImage),
          size: variantSize,
          sku: firstVariant?.sku || item.product?.sku || '',
          product_id: item.id,
          variant_id: firstVariant?.id,
          vat: (item.product as any)?.vat || ((item.product as any)?.category as any)?.vat || null
      })
    })

    // alert(`Added ${selectedItems.length} item(s) to cart!`)
}

// Helper function to get available sizes for a product
const getAvailableSizesForProduct = (product: Product | undefined): string[] => {
  if (!product?.variants) return ['S', 'M', 'L', 'XL', 'XXL']
  
  const sizes = new Set<string>()
  product.variants.forEach(variant => {
    if (variant.attributes?.size) {
      sizes.add(variant.attributes.size)
    }
  })
  
  return Array.from(sizes).sort().length > 0 ? Array.from(sizes).sort() : ['S', 'M', 'L', 'XL', 'XXL']
}

// Update matching series item price when size changes
const updateMatchingSeriesSize = (index: number, event: Event) => {
  const selectElement = event.target as HTMLSelectElement
  const newSize = selectElement.value
  // Find the actual item in matchingSeriesItems by index
  const displayedItem = displayedMatchingSeriesItems.value[index]
  if (!displayedItem) return
  const item = matchingSeriesItems.value.find(i => i.id === displayedItem.id)
  if (!item) return
  
  if (item && item.product) {
    // Find variant with the new size
    const variant = item.product.variants?.find(v => v.attributes?.size === newSize)
    if (variant) {
      item.size = newSize
      item.price = variant.price
      item.price_usd = variant.price_usd
    }
  }
}

const addMatchingSeriesToCart = () => {
    const selectedItems = matchingSeriesItems.value.filter(item => item.checked)
    selectedItems.forEach(item => {
      // Find the variant matching the selected size
      const selectedVariant = item.product?.variants?.find(variant => 
        variant.attributes?.size === item.size
      ) || item.product?.variants?.[0]
      
      const variantPrice = selectedVariant?.price || item.price
      const variantPriceUsd = selectedVariant?.price_usd || item.product?.price_usd
      const variantImage = selectedVariant?.image || item.image
      
      addToCart({
          id: item.id.toString(),
          name: item.name,
          price: variantPrice,
          price_usd: variantPriceUsd,
          priceDisplay: formatPrice(variantPrice, variantPriceUsd),
          image: getImageUrl(variantImage),
          size: item.size,
          sku: selectedVariant?.sku || item.product?.sku || '',
          product_id: item.id,
          variant_id: selectedVariant?.id,
          vat: (item.product as any)?.vat || ((item.product as any)?.category as any)?.vat || null
      })
    })

    // alert(`Added ${selectedItems.length} matching series item(s) to cart!`)
}

// Nuxt UI Carousel references
const frequentlyBoughtCarousel = ref()
const matchingSeriesCarousel = ref()

// Image zoom computed style
const imageZoomStyle = computed(() => {
  if (!isImageHovered.value) {
    return {
      transform: 'scale(1)',
      transformOrigin: 'center center'
    }
  }
  
  const { x, y } = imageZoomPosition.value
  return {
    transform: `scale(${zoomLevel})`,
    transformOrigin: `${x}% ${y}%`,
    transition: 'transform 0.1s ease-out'
  }
})

// Image zoom handlers
const handleImageMouseEnter = () => {
  if (!isMobile.value) {
    isImageHovered.value = true
  }
}

const handleImageMouseLeave = () => {
  isImageHovered.value = false
  imageZoomPosition.value = { x: 0, y: 0 }
}

const handleImageMouseMove = (event: MouseEvent) => {
  if (!isMobile.value && isImageHovered.value) {
    const target = event.currentTarget as HTMLElement
    if (target) {
      const rect = target.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      imageZoomPosition.value = { x, y }
    }
  }
}



const voteHelpful = (reviewId: number, isHelpful: boolean) => {
    const review = reviews.value.find(r => r.id === reviewId)
    if (!review) return

    // If user already voted the same way, remove the vote
    if (review.userVote === (isHelpful ? 'yes' : 'no')) {
        review.userVote = null
        if (isHelpful) {
            review.helpfulYes--
        } else {
            review.helpfulNo--
        }
    } else {
        // If user voted differently, update the vote
        if (review.userVote === 'yes') {
            review.helpfulYes--
        } else if (review.userVote === 'no') {
            review.helpfulNo--
        }

        review.userVote = isHelpful ? 'yes' : 'no'
        if (isHelpful) {
            review.helpfulYes++
        } else {
            review.helpfulNo++
        }
    }
}
</script>
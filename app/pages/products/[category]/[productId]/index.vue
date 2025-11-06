<template>
    <div class="product-page">
        <AppHeader />

        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb-bg">
            <div class="breadcrumb">
                <NuxtLink to="/">Homepage</NuxtLink>
                <span>/</span>
                <NuxtLink :to="`/products/${category}`">{{ categoryTitle }}</NuxtLink>
                <span>/</span>
                <span>{{ product?.name || 'Product' }}</span>
            </div>
        </div>

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
                        <NuxtImg :src="getImageUrl(image)" :alt="`${product.name} view ${index + 1}`" class="thumbnail-img"
                            loading="lazy" format="webp" quality="85" />

                        <!-- Show More Overlay for last thumbnail -->
                        <div v-if="index === productImages.length - 1" class="thumbnail-show-more-overlay"
                            @click.stop="showMoreImages = !showMoreImages">
                            <div class="thumbnail-show-more-content">
                                <span class="thumbnail-show-more-text">Show More</span>
                                <svg class="thumbnail-show-more-arrow" :class="{ rotated: showMoreImages }"
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
                <div class="main-image-wrapper">
                    <NuxtImg v-if="productImages[selectedImageIndex]" :src="getImageUrl(productImages[selectedImageIndex] || '')" :alt="product.name" class="main-image"
                        loading="eager" format="webp" quality="90" />
                </div>
            </div>

            <!-- Right Side - Product Details -->
            <div class="product-details-container">
                <div class="product-details-p-1">
                    <div class="product-title-share-btn">

                        <div class="product-title">{{ product.name }}</div>
                        <button class="share-btn-mobile">
                            <img src="/product-details/ios_share.svg" alt="Share" />
                        </button>
                    </div>

                    <!-- Pricing -->
                    <div class="pricing">
                        <span class="current-price">Tk {{ product.price.toLocaleString() }}</span>
                        <span v-if="product.compare_price > product.price" class="original-price">Tk {{ product.compare_price.toLocaleString() }}</span>
                        <span v-if="product.compare_price > product.price" class="discount">
                            -{{ Math.round(((product.compare_price - product.price) / product.compare_price) * 100) }}%
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

                            <!-- Share Button -->
                            <button class="share-btn">
                                <img src="/product-details/ios_share.svg" alt="Share" />
                                <div class="share-text">Share</div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Size Selection -->
                <div class="product-details-p-2" v-if="!isMobile">
                    <div class="size-selection">
                        <label class="selection-label">Size</label>
                        <div class="size-radio-group">
                            <label v-for="size in availableSizes" :key="size" class="size-radio-option"
                                :class="{ selected: selectedSize === size }">
                                <input type="radio" :value="size" v-model="selectedSize" class="size-radio-input" />
                                <span class="size-radio-label">{{ size }}</span>
                            </label>
                        </div>
                        <div class="size-dropdown-container">
                            <select v-model="selectedSize" class="size-dropdown">
                                <option value="" disabled>Select
                                </option>
                                <option v-for="size in availableSizes" :key="size" :value="size">
                                    {{ size }}
                                </option>
                            </select>
                            <NuxtLink to="#" class="size-guide-link">See Sizes & Fit Details</NuxtLink>
                        </div>
                    </div>

                    <!-- Color Selection -->
                    <div class="color-selection">
                        <label class="selection-label">Color</label>
                        <div class="color-options">
                            <div v-for="(color, index) in availableColors" :key="index" class="color-option"
                                :class="{ selected: selectedColorIndex === index }"
                                :style="{ backgroundColor: color.value || '#ccc' }" @click="selectedColorIndex = index" :title="color.name"></div>
                        </div>
                    </div>

                    <!-- Quantity Selector -->
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" @click="decreaseQuantity"
                            :disabled="quantity <= 1">-</button>
                        <span class="quantity-text">Quantity: {{ quantity }}</span>
                        <button class="quantity-btn plus" @click="increaseQuantity">+</button>
                    </div>

                    <!-- Action Buttons -->
                    <div class="action-buttons">
                        <button class="buy-now-btn" @click="handleBuyNow">Buy Now</button>
                        <button class="add-to-basket-btn" @click="handleAddToCart">Add to Basket</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Matching Series Section -->
        <div class="matching-series-section-container">
            <div class="matching-series-section">
                <h2 class="section-title">Explore Our Matching Series:</h2>

                <div class="matching-series-container" v-if="!isMobile">
                    <div class="matching-series-products">
                        <div v-for="(item, index) in matchingSeriesItems" :key="index" class="matching-series-item">
                            <!-- Checkbox -->
                            <div class="item-checkbox">
                                <input type="checkbox" :id="`matching-${index}`" v-model="item.checked"
                                    class="checkbox-input" />
                                <label :for="`matching-${index}`" class="checkbox-label"></label>
                            </div>

                            <!-- Product Image -->
                            <div class="item-image">
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

                                <p class="item-price">TK {{ item.price.toLocaleString() }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <section v-if="isMobile">
                    <UCarousel ref="matchingSeriesCarousel" v-slot="{ item, index }" :items="matchingSeriesItems"
                        :slides-per-view="2" :space-between="15" :ui="{
                            item: 'matching-series-item',
                            container: 'matching-series-products mobile-layout',
                        }" class="matching-series-carousel mobile-layout">
                        <div class="matching-series-item matching-series-item-mobile">
                            <div class="item-checkbox">
                                <input type="checkbox" :id="`mobile-matching-${item.name}`" v-model="item.checked"
                                    class="checkbox-input" />
                                <label :for="`mobile-matching-${item.name}`" class="checkbox-label"></label>
                            </div>

                            <div class="item-image">
                                <NuxtLink :to="`/products/${item.product?.category?.slug || category}/${item.slug}`">
                                    <NuxtImg :src="getImageUrl(item.image)" :alt="item.name" class="product-img" loading="lazy"
                                        format="webp" quality="85" />
                                </NuxtLink>
                            </div>

                            <div class="item-details">
                                <p class="item-name">{{ item.name }}</p>

                                <!-- Size Selector -->
                                <div class="size-selector">
                                    <select v-model="item.size" class="size-select" @change="updateMatchingSeriesSize(matchingSeriesItems.findIndex(i => i.id === item.id), $event)">
                                        <option v-for="size in getAvailableSizesForProduct(item.product)" :key="size" :value="size">
                                            {{ size }}
                                        </option>
                                    </select>
                                </div>

                                <p class="item-price">TK {{ item.price.toLocaleString() }}</p>
                            </div>
                        </div>
                    </UCarousel>

                    <!-- Matching Series Summary -->
                    <div class="matching-series-summary">
                        <div class="total-price">
                            <span class="total-label">Total price :</span>
                            <span class="total-amount">{{ matchingSeriesTotalPrice }}</span>
                        </div>
                        <button class="add-to-cart-btn" @click="addMatchingSeriesToCart">
                            Add to cart
                        </button>
                    </div>
                </section>
            </div>
            <div class="product-details-p-2-mobile" v-if="isMobile">
                <div class="size-selection">
                    <label class="selection-label">Size</label>
                    <div class="size-radio-group">
                        <label v-for="size in availableSizes" :key="size" class="size-radio-option"
                            :class="{ selected: selectedSize === size }">
                            <input type="radio" :value="size" v-model="selectedSize" class="size-radio-input" />
                            <span class="size-radio-label">{{ size }}</span>
                        </label>
                    </div>
                    <div class="size-dropdown-container">
                        <select v-model="selectedSize" class="size-dropdown">
                            <option value="" disabled>Select
                            </option>
                            <option v-for="size in availableSizes" :key="size" :value="size">
                                {{ size }}
                            </option>
                        </select>
                        <NuxtLink to="#" class="size-guide-link">See Sizes & Fit Details</NuxtLink>
                    </div>
                </div>

                <!-- Color Selection -->
                <div class="color-selection">
                    <label class="selection-label">Color</label>
                    <div class="color-options">
                        <div v-for="(color, index) in availableColors" :key="index" class="color-option"
                            :class="{ selected: selectedColorIndex === index }"
                            :style="{ backgroundColor: color.value || '#ccc' }" @click="selectedColorIndex = index" :title="color.name"></div>
                    </div>
                </div>

                <!-- Quantity Selector -->
                <div class="quantity-selector">
                    <button class="quantity-btn minus" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                    <span class="quantity-text">Quantity: {{ quantity }}</span>
                    <button class="quantity-btn plus" @click="increaseQuantity">+</button>
                </div>

                <!-- Action Buttons -->
                <div class="action-buttons">
                    <button class="buy-now-btn" @click="handleBuyNow">Buy Now</button>
                    <button class="add-to-basket-btn" @click="handleAddToCart">Add to Basket</button>
                </div>
            </div>

            <!-- Frequently Bought Together Section -->
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
                                <p class="item-description">{{ item.description }}</p>
                                <p class="item-price">{{ item.price }}</p>
                            </div>
                        </div>
                    </div>

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
                                <p class="item-description">{{ item.description }}</p>
                                <p class="item-price">{{ item.price }}</p>
                            </div>
                        </div>
                    </UCarousel>

                    <!-- Summary Section -->
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
        </div>

        <!-- Product Information Section -->
        <div class="product-info-section">
            <div class="product-info-container">
                <!-- Left Column - Product Description -->
                <div class="product-description">
                    <h2 class="info-section-title">Product Description</h2>

                    <div class="description-content" v-if="product?.description">
                        <div class="description-item">
                            <div class="description-text" v-html="product.description"></div>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Product Specification -->
                <div class="product-specification">
                    <h2 class="info-section-title">Product Specification</h2>

                    <div class="specification-content">
                        <ul class="specification-list">
                            <li><span class="spec-label">Product Code</span> - 21491001</li>
                            <li><span class="spec-label">Iron</span> - Cool iron, Iron Inside Out</li>
                            <li><span class="spec-label">Washing Instructions</span> - Machine washable</li>
                            <li><span class="spec-label">Country of Origin</span> - India</li>
                            <li><span class="spec-label">Neckline</span> - Collar</li>
                            <li><span class="spec-label">Brand</span> - John Lewis ANYDAY</li>
                            <li><span class="spec-label">Fastening</span> - Button</li>
                            <li><span class="spec-label">Drying Instructions</span> - Do not tumble dry</li>
                            <li><span class="spec-label">Pattern Details</span> - Plain</li>
                            <li><span class="spec-label">Composition</span> - 100% cotton</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Customer Reviews Section -->
        <div class="reviews-section">
            <h2 class="reviews-title">Customer Reviews</h2>

            <!-- Overall Rating Summary -->
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
                <!-- Star Distribution -->


                <!-- Attribute Ratings -->
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

            <!-- Search and Sort -->
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

            <!-- Individual Reviews -->
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
        </div>

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
                        <NuxtImg :src="getImageUrl(relatedProduct.image)" :alt="relatedProduct.name" class="product-image" loading="lazy"
                            format="webp" quality="85" />
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">{{ relatedProduct.name }}</h3>
                        <p class="product-price">Tk {{ relatedProduct.price.toLocaleString() }}</p>
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
                        <h4 class="related-products-price">Tk {{ item.price.toLocaleString() }}</h4>
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
import { useCart } from '../../../../../composables/useCart'
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

// Reactive data
const selectedImageIndex = ref(0)
const selectedColorIndex = ref(0)
const selectedSize = ref('')
const quantity = ref(1)
const showMoreImages = ref(false)

// Fetch product details from API
const fetchProductDetails = async () => {
  if (!productIdSlug.value) return

  isLoading.value = true
  error.value = null

  try {
    const apiUrl = `https://rangbd.thecell.tech/api/product/${productIdSlug.value}`
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
      console.log('Product loaded:', product.value)
      console.log('Related products:', relatedProducts.value)
      console.log('Cross-sold products:', crossSoldProducts.value)
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

// Watch for product changes to reset selected image
watch(product, () => {
  selectedImageIndex.value = 0
})

// Fetch on mount
onMounted(() => {
  fetchProductDetails()
  handleResize()
  window.addEventListener('resize', handleResize)
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
  slug: string
  product: Product
}>>([])

// Update matching series items when related products change
watch(relatedProducts, (newRelatedProducts) => {
  if (!newRelatedProducts || newRelatedProducts.length === 0) {
    matchingSeriesItems.value = []
    return
  }

  matchingSeriesItems.value = newRelatedProducts.map((product, index) => {
    // Get first available size from variants
    const firstVariant = product.variants?.[0]
    const defaultSize = firstVariant?.attributes?.size || 'M'
    
    // Get the minimum price from variants or use product price
    const minPrice = product.variants?.length > 0
      ? Math.min(...product.variants.map(v => v.price))
      : product.price

    return {
      id: product.id,
      checked: index === 0, // First item checked by default
      image: product.image,
      name: product.name,
      size: defaultSize,
      price: minPrice,
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

// Product images from API
const productImages = computed(() => {
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
          value: '#ccc' // Default color, you might want to map color names to hex values
        })
      }
    }
  })
  
  return Array.from(colorMap.values())
})

// Computed properties
const totalPrice = computed(() => {
    const selectedItems = frequentlyBoughtItems.value.filter(item => item.selected)
    const total = selectedItems.reduce((sum, item) => {
        return sum + (item.priceValue || 0)
    }, 0)
    return `Tk ${total.toLocaleString()}`
})

// Total price for matching series items
const matchingSeriesTotalPrice = computed(() => {
    const selectedItems = matchingSeriesItems.value.filter(item => item.checked)
    const total = selectedItems.reduce((sum, item) => {
        return sum + (item.price || 0)
    }, 0)
    return `TK ${total.toLocaleString()}`
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
    quantity.value++
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

const { addToCart } = useCart()

const handleAddToCart = () => {
    if (!product.value) return
    
    if (!selectedSize.value) {
        alert('Please select a size')
        return
    }

    // Find the variant matching selected size and color
    const selectedVariant = product.value.variants?.find(variant => {
      const sizeMatch = variant.attributes?.size === selectedSize.value
      const colorMatch = availableColors.value[selectedColorIndex.value]?.name === variant.attributes?.color
      return sizeMatch && (selectedColorIndex.value === -1 || colorMatch)
    }) || product.value.variants?.find(variant => variant.attributes?.size === selectedSize.value)

    const variantPrice = selectedVariant?.price || product.value.price
    const variantImage = selectedVariant?.image || product.value.image

    for (let i = 0; i < quantity.value; i++) {
        addToCart({
            id: product.value.id.toString(),
            name: product.value.name,
            price: variantPrice,
            priceDisplay: `Tk ${variantPrice.toLocaleString()}`,
            image: getImageUrl(variantImage),
            size: selectedSize.value,
            color: selectedVariant?.attributes?.color || availableColors.value[selectedColorIndex.value]?.name,
            sku: selectedVariant?.sku || product.value.sku
        })
    }

    alert('Item added to cart!')
}

const handleBuyNow = () => {
    handleAddToCart()
    navigateTo('/cart')
}

const addFrequentlyBoughtToCart = () => {
    const selectedItems = frequentlyBoughtItems.value.filter(item => item.selected)
    selectedItems.forEach(item => {
      // Get first variant or use product price
      const firstVariant = item.product?.variants?.[0]
      const variantPrice = firstVariant?.price || item.priceValue
      const variantImage = firstVariant?.image || item.product?.image || item.image
      const variantSize = firstVariant?.attributes?.size

      addToCart({
          id: item.id.toString(),
          name: item.name,
          price: variantPrice,
          priceDisplay: `Tk ${variantPrice.toLocaleString()}`,
          image: getImageUrl(variantImage),
          size: variantSize,
          sku: firstVariant?.sku || item.product?.sku || ''
      })
    })

    alert(`Added ${selectedItems.length} item(s) to cart!`)
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
  const item = matchingSeriesItems.value[index]
  
  if (item && item.product) {
    // Find variant with the new size
    const variant = item.product.variants?.find(v => v.attributes?.size === newSize)
    if (variant) {
      item.size = newSize
      item.price = variant.price
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
      const variantImage = selectedVariant?.image || item.image
      
      addToCart({
          id: item.id.toString(),
          name: item.name,
          price: variantPrice,
          priceDisplay: `Tk ${variantPrice.toLocaleString()}`,
          image: getImageUrl(variantImage),
          size: item.size,
          sku: selectedVariant?.sku || item.product?.sku || ''
      })
    })

    alert(`Added ${selectedItems.length} matching series item(s) to cart!`)
}

// Nuxt UI Carousel references
const frequentlyBoughtCarousel = ref()
const matchingSeriesCarousel = ref()



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
<template>
  <main class="checkout-page">
    <div class="checkout-container">
      
      <div class="checkout-content pb-30! sm:pb-0!">
        <h1 class="checkout-title">Checkout</h1>
        
        <!-- Loading Skeleton -->
        <div v-if="isLoadingCart" class="checkout-layout loading-skeleton">
          <!-- Left Side - Forms Skeleton -->
          <div class="checkout-forms">
            <section class="checkout-section">
              <div class="skeleton-box skeleton-section-title"></div>
              <div class="checkout-form">
                <div class="form-row">
                  <div class="form-group">
                    <div class="skeleton-box skeleton-label"></div>
                    <div class="skeleton-box skeleton-input"></div>
                  </div>
                  <div class="form-group">
                    <div class="skeleton-box skeleton-label"></div>
                    <div class="skeleton-box skeleton-input"></div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-label"></div>
                  <div class="skeleton-box skeleton-input"></div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-label"></div>
                  <div class="skeleton-box skeleton-input"></div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-label"></div>
                  <div class="skeleton-box skeleton-input"></div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <div class="skeleton-box skeleton-label"></div>
                    <div class="skeleton-box skeleton-input"></div>
                  </div>
                  <div class="form-group">
                    <div class="skeleton-box skeleton-label"></div>
                    <div class="skeleton-box skeleton-input"></div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-label"></div>
                  <div class="skeleton-box skeleton-input"></div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-checkbox"></div>
                </div>
                <div class="form-group">
                  <div class="skeleton-box skeleton-section-title-small"></div>
                  <div class="skeleton-box skeleton-textarea"></div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Side - Order Summary Skeleton -->
          <div class="checkout-summary">
            <div class="summary-card">
              <div class="skeleton-box skeleton-section-title"></div>
              
              <!-- Order Items Skeleton -->
              <div class="order-items">
                <div v-for="i in 3" :key="i" class="order-item">
                  <div class="order-item-image">
                    <div class="skeleton-box skeleton-order-image"></div>
                  </div>
                  <div class="order-item-details">
                    <div class="skeleton-box skeleton-order-name"></div>
                    <div class="skeleton-box skeleton-order-attr"></div>
                    <div class="skeleton-box skeleton-order-price"></div>
                  </div>
                </div>
              </div>

              <!-- Order Totals Skeleton -->
              <div class="order-totals">
                <div class="total-row">
                  <div class="skeleton-box skeleton-total-label"></div>
                  <div class="skeleton-box skeleton-total-value"></div>
                </div>
                <div class="total-row">
                  <div class="skeleton-box skeleton-total-label"></div>
                  <div class="skeleton-box skeleton-total-value"></div>
                </div>
                <div class="total-row total-row-final">
                  <div class="skeleton-box skeleton-total-label-large"></div>
                  <div class="skeleton-box skeleton-total-value-large"></div>
                </div>
              </div>

              <!-- Place Order Button Skeleton -->
              <div class="skeleton-box skeleton-button"></div>
              <div class="skeleton-box skeleton-link"></div>
            </div>
          </div>
        </div>

        <div v-else-if="isEmpty" class="empty-cart-message">
          <p>Your cart is empty. Please add items to your cart before checkout.</p>
          <NuxtLink to="/products/men" class="shop-button">Continue Shopping</NuxtLink>
        </div>

        <div v-else class="checkout-layout" :class="{ 'processing-order': isPlacingOrder }">
          <!-- Loading Overlay when placing order -->
          <div v-if="isPlacingOrder" class="order-processing-overlay">
            <div class="processing-spinner">
              <div class="spinner"></div>
              <p class="processing-text">Processing your order...</p>
            </div>
          </div>

          <!-- Left Side - Forms -->
          <div class="checkout-forms">
            <!-- Shipping Information -->
            <section class="checkout-section">
              <h2 class="section-title">Shipping Information</h2>
              <form class="checkout-form" @submit.prevent="handleSubmit" novalidate>
                <div class="form-group">
                  <label for="fullName" class="form-label">Full Name *</label>
                  <input
                    id="fullName"
                    v-model="shippingInfo.fullName"
                    type="text"
                    class="form-input"
                    :class="{ 'input-error': !!errors.fullName }"
                    required
                    placeholder="Enter your full name"
                    @blur="handleAddressFieldBlur"
                  />
                  <div v-if="errors.fullName" class="field-error">{{ errors.fullName }}</div>
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email Address<span v-if="isInternationalOrder" class="required-star"> *</span></label>
                  <input
                    id="email"
                    v-model="shippingInfo.email"
                    type="email"
                    class="form-input"
                    :class="{ 'input-error': !!errors.email }"
                    :required="isInternationalOrder"
                    placeholder="your.email@example.com"
                    @blur="handleAddressFieldBlur"
                  />
                  <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
                </div>

                <div class="form-group">
                  <label for="phone" class="form-label">Phone Number *</label>
                  <input
                    id="phone"
                    v-model="shippingInfo.phone"
                    type="tel"
                    class="form-input"
                    :class="{ 'input-error': !!errors.phone }"
                    placeholder="01XXXXXXXXX"
                    required
                    @blur="handleAddressFieldBlur"
                  />
                  <div v-if="errors.phone" class="field-error">{{ errors.phone }}</div>
                </div>

                <div class="form-group">
                  <label for="addressLine1" class="form-label">Address Line 1 *</label>
                  <input
                    id="addressLine1"
                    v-model="shippingInfo.addressLine1"
                    type="text"
                    class="form-input"
                    :class="{ 'input-error': !!errors.addressLine1 }"
                    required
                    placeholder="House, street, area"
                    @blur="handleAddressFieldBlur"
                  />
                  <div v-if="errors.addressLine1" class="field-error">{{ errors.addressLine1 }}</div>
                </div>

                <div class="form-group">
                  <label for="addressLine2" class="form-label">Address Line 2</label>
                  <input
                    id="addressLine2"
                    v-model="shippingInfo.addressLine2"
                    type="text"
                    class="form-input"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    @blur="handleAddressFieldBlur"
                  />
                </div>

                <div class="form-group">
                  <label for="country" class="form-label">Country *</label>
                  <div class="searchable-select-wrapper">
                    <input
                      id="country"
                      v-model="countrySearchTerm"
                      type="text"
                      class="form-input searchable-input"
                      :class="{ 'input-error': !!errors.country }"
                      :placeholder="shippingInfo.country || 'Search or select country...'"
                      required
                      @focus="showCountryDropdown = true"
                      @input="showCountryDropdown = true"
                      @blur="handleCountryBlur"
                    />
                    <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                    <div v-if="showCountryDropdown && filteredCountries.length > 0" class="searchable-dropdown">
                      <div
                        v-for="country in filteredCountries"
                        :key="country"
                        class="searchable-option"
                        @mousedown.prevent="selectCountry(country)"
                      >
                        {{ country }}
                      </div>
                    </div>
                    <div v-if="showCountryDropdown && filteredCountries.length === 0 && countrySearchTerm" class="searchable-dropdown">
                      <div class="searchable-option no-results">No countries found</div>
                    </div>
                  </div>
                  <div v-if="errors.country" class="field-error">{{ errors.country }}</div>
                </div>

                 <div class="form-group">
                   <label for="city" class="form-label">City *</label>
                   <!-- Searchable dropdown for Bangladesh -->
                   <div v-if="isBangladesh" class="searchable-select-wrapper">
                     <input
                       id="city"
                       v-model="citySearchTerm"
                       type="text"
                         class="form-input searchable-input"
                         :class="{ 'input-error': !!errors.city }"
                       :placeholder="isLoadingCities ? 'Loading cities...' : (shippingInfo.city || 'Search or select city...')"
                       :disabled="isLoadingCities"
                       @focus="showCityDropdown = true"
                       @input="showCityDropdown = true"
                       @blur="handleCityBlur"
                     />
                     <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20">
                       <path fill-rule="evenodd"
                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                         clip-rule="evenodd" />
                     </svg>
                     <div v-if="showCityDropdown && filteredCities.length > 0" class="searchable-dropdown">
                       <div
                         v-for="city in filteredCities"
                         :key="city"
                         class="searchable-option"
                         @mousedown.prevent="selectCity(city)"
                       >
                         {{ city }}
                       </div>
                     </div>
                     <div v-if="showCityDropdown && filteredCities.length === 0 && citySearchTerm" class="searchable-dropdown">
                       <div class="searchable-option no-results">No cities found</div>
                     </div>
                   </div>
                   <!-- Regular input for other countries -->
                   <input
                     v-else
                     id="city"
                     v-model="shippingInfo.city"
                     type="text"
                     class="form-input"
                     required
                     placeholder="Enter your city"
                     @blur="handleAddressFieldBlur"
                   />
                 </div>

                 <!-- Zone Selection (only for Bangladesh) -->
                 <div v-if="isBangladesh" class="form-group">
                   <label for="zone" class="form-label">Zone *</label>
                   <div class="searchable-select-wrapper">
                     <input
                       id="zone"
                       v-model="zoneSearchTerm"
                       type="text"
                       class="form-input searchable-input"
                       :class="{ 'input-error': !!errors.zone }"
                       :placeholder="isLoadingZones ? 'Loading zones...' : (zones.length === 0 && shippingInfo.city_id ? 'No zones available' : (getZoneDisplayName() || 'Search or select zone...'))"
                       :required="!!shippingInfo.city_id"
                       :disabled="isLoadingZones || !shippingInfo.city || !shippingInfo.city_id"
                       :key="`zone-${shippingInfo.city_id || shippingInfo.city || 'none'}`"
                       @focus="showZoneDropdown = true"
                       @input="showZoneDropdown = true"
                       @blur="handleZoneBlur"
                     />
                     <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20">
                       <path fill-rule="evenodd"
                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                         clip-rule="evenodd" />
                     </svg>
                     <div v-if="showZoneDropdown && filteredZones.length > 0" class="searchable-dropdown">
                       <div
                         v-for="zone in filteredZones"
                         :key="zone.zone_id || zone.id || zone"
                         class="searchable-option"
                         @mousedown.prevent="selectZone(zone)"
                       >
                         {{ typeof zone === 'string' ? zone : (zone.zone_name || zone.name || zone.zone || zone.title || '') }}
                       </div>
                     </div>
                     <div v-if="showZoneDropdown && filteredZones.length === 0 && zoneSearchTerm" class="searchable-dropdown">
                       <div class="searchable-option no-results">No zones found</div>
                     </div>
                   </div>
                   <div v-if="errors.zone" class="field-error">{{ errors.zone }}</div>
                 </div>

                <div class="form-group">
                  <label for="postalCode" class="form-label">Postal Code</label>
                  <input
                    id="postalCode"
                    v-model="shippingInfo.postalCode"
                    type="text"
                    class="form-input"
                    placeholder="Postal Code"
                    @blur="handleAddressFieldBlur"
                  />
                </div>

                <!-- Delivery Options -->
                <div class="form-group">
                  <label for="shippingMethod" class="form-label">Delivery Options *</label>
                  <div class="select-wrapper">
                    <select
                      id="shippingMethod"
                      v-model="shippingMethod"
                      class="form-input"
                      :class="{ 'input-error': !!errors.shippingMethod }"
                      required
                      :disabled="isLoadingShippingMethods"
                      @change="deliveryPartner = ''"
                    >
                      <option value="">Select Delivery Option</option>
                      <option value="home_delivery">Home Delivery</option>
                      <option value="international_shipping">International Shipping</option>
                      <option value="store_pickup">Outlet</option>
                    </select>
                    <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div v-if="errors.shippingMethod" class="field-error">{{ errors.shippingMethod }}</div>
                </div>

                <!-- Delivery Partner Selection (shown when Home Delivery is selected) -->
                <div v-if="shippingMethod === 'home_delivery'" class="form-group">
                  <label for="deliveryPartner" class="form-label">Delivery Partner *</label>
                  <div class="select-wrapper">
                    <select
                      id="deliveryPartner"
                      v-model="deliveryPartner"
                      class="form-input"
                      :class="{ 'input-error': !!errors.deliveryPartner }"
                      required
                      @change="deliveryLocation = ''"
                    >
                      <option value="">Select Delivery Partner</option>
                      <option 
                        v-for="option in deliveryPartnerOptions" 
                        :key="option.value" 
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                    <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div v-if="errors.deliveryPartner" class="field-error">{{ errors.deliveryPartner }}</div>
                </div>

                <!-- Delivery Location Selection (shown for SA Paribahan and Sundarban) -->
                <div v-if="shippingMethod === 'home_delivery' && requiresLocationSelection" class="form-group">
                  <label for="deliveryLocation" class="form-label">Delivery Location *</label>
                  <div class="select-wrapper">
                    <select
                      id="deliveryLocation"
                      v-model="deliveryLocation"
                      class="form-input"
                      :class="{ 'input-error': !!errors.deliveryLocation }"
                      required
                    >
                      <option value="">Select Location</option>
                      <option value="inside_dhaka">Inside Dhaka</option>
                      <option value="outside_dhaka">Outside Dhaka</option>
                    </select>
                    <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div v-if="errors.deliveryLocation" class="field-error">{{ errors.deliveryLocation }}</div>
                </div>

                <!-- Outlet Selection (shown when Outlet is selected) -->
                <div v-if="shippingMethod === 'store_pickup'" class="form-group">
                  <label for="selectedOutlet" class="form-label">Select Outlet *</label>
                  <div class="select-wrapper">
                    <select
                      id="selectedOutlet"
                      v-model="selectedOutlet"
                      class="form-input"
                      :class="{ 'input-error': !!errors.selectedOutlet }"
                      :required="shippingMethod === 'store_pickup'"
                    >
                      <option value="">Select Outlet</option>
                      <option 
                        v-for="location in locations" 
                        :key="location.id || location.name" 
                        :value="location.id"
                      >
                        {{ location.name }}
                      </option>
                    </select>
                    <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div v-if="errors.selectedOutlet" class="field-error">{{ errors.selectedOutlet }}</div>
                  <!-- Display selected outlet address -->
                  <div v-if="selectedOutlet && selectedOutletLocation" class="outlet-address">
                    <p class="outlet-address-label">Outlet Address:</p>
                    <p class="outlet-address-text">{{ selectedOutletLocation.address }}</p>
                    <p v-if="selectedOutletLocation.phone" class="outlet-address-phone">Phone: {{ selectedOutletLocation.phone }}</p>
                  </div>
                </div>

                <!-- Payment Option -->
                <div class="form-group">
                  <label for="paymentMethod" class="form-label">Payment Option *</label>
                  <div class="select-wrapper">
                    <select
                      id="paymentMethod"
                      v-model="paymentMethod"
                      class="form-input"
                      :class="{ 'input-error': !!errors.paymentMethod }"
                      required
                    >
                      <option value="">Select Payment Option</option>
                      <option v-if="shippingMethod !== 'international_shipping'" value="cash_on_delivery">Cash on Delivery</option>
                      <option value="online">Debit/Credit Card, Bkash</option>
                      <option v-if="supportsPayPal" value="paypal">PayPal</option>
                    </select>
                    <svg class="select-caret" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div v-if="errors.paymentMethod" class="field-error">{{ errors.paymentMethod }}</div>
                </div>

                <!-- Gift Package Checkbox -->
                <div class="form-group checkbox-group flex-row">
                  <label class="checkout-checkbox-label">
                    <input
                      type="checkbox"
                      v-model="isGiftPackage"
                      class="checkout-checkbox-input"
                    />
                  </label>
                  <span>Gift package?</span>
                </div>

                <!-- Billing Same as Shipping -->
                <div class="form-group checkbox-group flex-row">
                  <label class="checkout-checkbox-label">
                    <input
                      type="checkbox"
                      v-model="billingSameAsShipping"
                      class="checkout-checkbox-input"
                    />
                  </label>
                  <span>Billing address same as shipping</span>
                </div>

                <!-- Billing Information (if different) -->
                <div v-if="!billingSameAsShipping" class="billing-section">
                  <h3 class="subsection-title">Billing Information</h3>
                  <div class="form-group">
                    <label for="billingFullName" class="form-label">Full Name</label>
                    <input
                      id="billingFullName"
                      v-model="billingInfo.fullName"
                      type="text"
                      class="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div class="form-group">
                    <label for="billingAddress" class="form-label">Address</label>
                    <input
                      id="billingAddress"
                      v-model="billingInfo.address"
                      type="text"
                      class="form-input"
                      placeholder="Street address"
                    />
                  </div>

                  <div class="form-group">
                    <label for="billingCity" class="form-label">City</label>
                    <input
                      id="billingCity"
                      v-model="billingInfo.city"
                      type="text"
                      class="form-input"
                      placeholder="City"
                    />
                  </div>
                </div>

                <!-- Payment Method -->
                <!-- <div class="payment-section">
                  <h3 class="subsection-title">Payment Method</h3>
                  <div class="payment-options">
                    <label class="payment-option">
                      <input
                        type="radio"
                        v-model="paymentMethod"
                        value="cash-on-delivery"
                        class="radio-input"
                        required
                      />
                      <div class="payment-option-content">
                        <span class="payment-option-name">Cash on Delivery</span>
                        <span class="payment-option-desc">Pay when you receive your order</span>
                      </div>
                    </label>
                    <label class="payment-option">
                      <input
                        type="radio"
                        v-model="paymentMethod"
                        value="bank-transfer"
                        class="radio-input"
                        required
                      />
                      <div class="payment-option-content">
                        <span class="payment-option-name">Bank Transfer</span>
                        <span class="payment-option-desc">Transfer directly to our bank account</span>
                      </div>
                    </label>
                    <label class="payment-option">
                      <input
                        type="radio"
                        v-model="paymentMethod"
                        value="mobile-banking"
                        class="radio-input"
                        required
                      />
                      <div class="payment-option-content">
                        <span class="payment-option-name">Mobile Banking</span>
                        <span class="payment-option-desc">bKash, Nagad, Rocket, etc.</span>
                      </div>
                    </label>
                  </div>
                </div> -->

                <!-- Coupon Code -->
                <div class="form-group">
                  <label for="couponCode" class="form-label">Coupon Code (Optional)</label>
                  <div class="coupon-input-group">
                    <input
                      id="couponCode"
                      v-model="couponCode"
                      type="text"
                      class="form-input coupon-input"
                      placeholder="Enter coupon code"
                      :disabled="isValidatingCoupon || couponValidated"
                    />
                    <button
                      type="button"
                      class="validate-coupon-button"
                      @click="validateCoupon"
                      :disabled="!couponCode || isValidatingCoupon || couponValidated"
                    >
                      <span v-if="isValidatingCoupon">Validating...</span>
                      <span v-else-if="couponValidated">✓ Valid</span>
                      <span v-else>Validate</span>
                    </button>
                  </div>
                  <div v-if="couponError" class="coupon-error">
                    {{ couponError }}
                  </div>
                  <div v-if="couponValidated && couponData" class="coupon-success">
                    Coupon applied! Discount: {{ formatPrice(effectiveCouponDiscount) }}
                  </div>
                  <button
                    v-if="couponValidated"
                    type="button"
                    class="remove-coupon-button"
                    @click="removeCoupon"
                  >
                    Remove Coupon
                  </button>
                </div>

                <!-- Order Notes -->
                <div class="form-group">
                  <label for="orderNotes" class="form-label">Order Notes *</label>
                  <textarea
                    id="orderNotes"
                    v-model="orderNotes"
                    class="form-textarea"
                    :class="{ 'input-error': !!errors.orderNotes }"
                    rows="4"
                    placeholder="Any special instructions for your order..."
                  ></textarea>
                  <div v-if="errors.orderNotes" class="field-error">{{ errors.orderNotes }}</div>
                </div>
              </form>
            </section>
          </div>

          <!-- Right Side - Order Summary -->
          <div class="checkout-summary">
            <div class="summary-card">
              <h2 class="summary-title">Order Summary</h2>
              
              <!-- Order Items -->
              <div class="order-items">
                <div
                  v-for="(item, index) in cartItems"
                  :key="`${item.id}-${item.size}-${item.color}-${index}`"
                  class="order-item"
                >
                  <div class="order-item-image">
                    <NuxtImg
                      :src="item.image"
                      :alt="item.name"
                      class="item-image"
                      loading="lazy"
                      format="webp"
                      quality="85"
                    />
                  </div>
                  <div class="order-item-details">
                    <h4 class="order-item-name">{{ item.name }}</h4>
                    <div class="order-item-attributes">
                      <span v-if="item.size" class="order-item-attr">Size: {{ item.size }}</span>
                      <span v-if="item.color" class="order-item-attr">Color: {{ item.color }}</span>
                      <span class="order-item-attr">Qty: {{ item.quantity }}</span>
                    </div>
                    <p class="order-item-price">{{ formatItemTotal(item) }}</p>
                  </div>
                </div>
              </div>

              <!-- Order Totals -->
              <div class="order-totals">
                <div class="total-row">
                  <span class="total-label">Subtotal</span>
                  <span class="total-value">{{ subtotalDisplay }}</span>
                </div>
                <div v-if="totalVat > 0" class="total-row">
                  <span class="total-label">VAT</span>
                  <span class="total-value">{{ totalVatDisplay }}</span>
                </div>
                <div v-if="couponValidated && couponData" class="total-row">
                  <span class="total-label">Discount</span>
                  <span class="total-value discount-value">-{{ formatPrice(effectiveCouponDiscount) }}</span>
                </div>
                <div class="total-row">
                  <span class="total-label">Shipping</span>
                  <span class="total-value">{{ shippingCostDisplay }}</span>
                </div>
                <div v-if="isGiftPackage" class="total-row">
                  <span class="total-label">Gift Package</span>
                  <span class="total-value">{{ giftPackageChargeDisplay }}</span>
                </div>
                <div class="total-row total-row-final">
                  <span class="total-label">Total</span>
                  <span class="total-value">{{ grandTotalDisplay }}</span>
                </div>
              </div>

              <!-- Place Order Button -->
              <button
                class="place-order-button"
                @click="handlePlaceOrder"
                :disabled="isPlacingOrder"
              >
                <span v-if="!isPlacingOrder">Place Order</span>
                <span v-else>Processing...</span>
              </button>

              <NuxtLink to="/cart" class="back-to-cart-link">
                ← Back to Cart
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import { navigateTo, useHead } from 'nuxt/app'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import AppFooter from '../../../components/AppFooter.vue'
import { useApi } from '../../../composables/useApi'
import { useCart } from '../../../composables/useCart'
import { useCurrency } from '../../../composables/useCurrency'
import './checkout.css'

// Define page meta to ensure route is recognized
definePageMeta({
  layout: false
})

useHead({
  title: 'Checkout - Rang Bangladesh',
  meta: [
    { name: 'description', content: 'Complete your purchase and place your order.' }
  ]
})

const {
  cartItems,
  subtotal,
  subtotalDisplay,
  totalVat,
  totalVatDisplay,
  totalPrice,
  totalPriceDisplay,
  isEmpty,
  clearCart
} = useCart()

const { formatPrice, currency, currencyCode, exchangeRate, setCurrency } = useCurrency()

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

// Helper function to get headers with auth token if available
const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    'X-Requested-With': 'XMLHttpRequest'
  }
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

// Format item total price based on current currency
const formatItemTotal = (item: any) => {
  if (currency.value === 'USD') {
    const itemPriceUsd = item.price_usd !== undefined && item.price_usd > 0 
      ? item.price_usd 
      : (item.price / exchangeRate.value)
    const totalUsd = itemPriceUsd * item.quantity
    if (!isFinite(totalUsd) || isNaN(totalUsd)) {
      return '$0.00'
    }
    return `$${totalUsd.toFixed(2)}`
  } else {
    const total = item.price * item.quantity
    return `Tk ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
}

// Loading state for cart initialization
const isLoadingCart = ref(true)

// Fetch locations from API
const fetchLocations = async () => {
  isLoadingLocations.value = true
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<any>(`${backendUrl}/locations`)
    console.log('Locations API Response:', response)
    
    if (response.success && response.data && Array.isArray(response.data)) {
      locations.value = response.data
    }
  } catch (error) {
    console.error('Error fetching locations:', error)
  } finally {
    isLoadingLocations.value = false
  }
}

// Fetch settings from API
const fetchSettings = async () => {
  isLoadingSettings.value = true
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<any>(`${backendUrl}/settings`)
    
    if (response.success && response.data) {
      settingsData.value = response.data
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
  } finally {
    isLoadingSettings.value = false
  }
}

// Fetch shipping methods from API with address data
const fetchShippingMethods = async (addressData?: any) => {
  isLoadingShippingMethods.value = true
  try {
    const { backendUrl } = useApi()
    
    const response = await $fetch<any>(`${backendUrl}/order/shipping-methods`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: {
        address: addressData,
        currency: currencyCode.value
      }
    })
    console.log('Shipping Methods API Response:', response)
    console.log('Shipping Methods API Response Data:', response.data)
    
    // Handle both response structures: { success: true, data: {...} } or direct object
    let shippingMethodsData = null
    let responseData = null
    
    // Check if response has success property (standard API response)
    if (response && typeof response === 'object' && 'success' in response) {
      if (response.success && response.data) {
        responseData = response.data
        // If response.data contains shipping_methods, use that; otherwise use the whole data
        shippingMethodsData = response.data.shipping_methods || response.data
      }
    } else if (response && typeof response === 'object') {
      // Handle case where response is directly the shipping methods object
      // Check if it has shipping methods structure (has store_pickup, home_delivery, etc.)
      if ('store_pickup' in response || 'home_delivery' in response || 'international_shipping' in response) {
        responseData = response
        shippingMethodsData = response.shipping_methods || response
      }
    }
    
    if (shippingMethodsData) {
      // Store city_id and zone_id from API response if provided
      if (responseData && responseData.city_id !== undefined) {
        shippingInfo.value.city_id = responseData.city_id
      }
      if (responseData && responseData.zone_id !== undefined) {
        shippingInfo.value.zone_id = responseData.zone_id
      }
      
      // Store the currently selected shipping method slug before updating
      const currentSelectedSlug = shippingMethod.value
      
      // Update shipping methods (now an object structure)
      shippingMethods.value = shippingMethodsData
      console.log('Updated shippingMethods.value:', shippingMethods.value)
      console.log('Type of shippingMethods.value:', typeof shippingMethods.value)
      console.log('Is it an object?', shippingMethods.value && typeof shippingMethods.value === 'object')
      console.log('Keys in shippingMethods.value:', Object.keys(shippingMethods.value))
      console.log('home_delivery in shippingMethods:', shippingMethods.value.home_delivery)
      console.log('Type of home_delivery:', typeof shippingMethods.value.home_delivery)
      if (shippingMethods.value.home_delivery) {
        console.log('Keys in home_delivery:', Object.keys(shippingMethods.value.home_delivery))
        console.log('pathao:', shippingMethods.value.home_delivery.pathao)
        console.log('sa_paribahan:', shippingMethods.value.home_delivery.sa_paribahan)
        console.log('sundarban:', shippingMethods.value.home_delivery.sundarban)
      }
      
      // If the previously selected method still exists, keep it selected
      // Otherwise, reset to empty
      if (currentSelectedSlug) {
        const methodStillExists = shippingMethodsData[currentSelectedSlug] !== undefined
        if (!methodStillExists) {
          shippingMethod.value = ''
          deliveryPartner.value = ''
        }
      }
    }
  } catch (error) {
    console.error('Error fetching shipping methods:', error)
  } finally {
    isLoadingShippingMethods.value = false
  }
}

// Handler for address field blur events
const handleAddressFieldBlur = async () => {
  // Call the existing function to fetch shipping methods with current address data
  await fetchShippingMethodsWithAddress()
}

// Function to fetch shipping methods with current address data
const fetchShippingMethodsWithAddress = async (forceCall: boolean = false) => {
  // Collect all address data
  const addressData: any = {
    name: shippingInfo.value.fullName || '',
    phone: shippingInfo.value.phone || '',
    email: shippingInfo.value.email || '',
    line_1: shippingInfo.value.addressLine1 || '',
    line_2: shippingInfo.value.addressLine2 || '',
    city: shippingInfo.value.city || '',
    country: shippingInfo.value.country || '',
    postal_code: shippingInfo.value.postalCode || ''
  }
  
  // Add city_id and zone_id if available
  if (shippingInfo.value.city_id) {
    addressData.city_id = shippingInfo.value.city_id
  }
  if (shippingInfo.value.zone_id) {
    addressData.zone_id = shippingInfo.value.zone_id
  }
  
  // Call API if forced (e.g., when shipping method or delivery partner changes) or if we have address data
  if (forceCall || addressData.country || addressData.city || addressData.line_1) {
    await fetchShippingMethods(addressData)
  }
}

// Function to get location from browser
const getBrowserLocation = async () => {
  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by this browser.')
    return
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      })
    })

    const { latitude, longitude } = position.coords

    // Use reverse geocoding API to get address details
    try {
      // Using OpenStreetMap Nominatim API (free, no API key required)
      const response = await $fetch<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`, {
        headers: {
          'User-Agent': 'Rang Bangladesh E-commerce' // Required by Nominatim
        }
      })

      if (response && response.address) {
        const address = response.address

        // Populate country if available and not already set
        if (address.country && !shippingInfo.value.country) {
          shippingInfo.value.country = address.country
        }

        // Auto-set currency based on detected country (always, unless user manually selected)
        const hasManualCurrencySelection = typeof window !== 'undefined' && localStorage.getItem('currency_manually_set') === 'true'
        
        // Always detect and set currency based on location, unless user has manually selected
        if (!hasManualCurrencySelection && address.country) {
          // List of countries that typically use USD
          const usdCountries = [
            'United States', 'United States of America', 'USA', 'US',
            'Canada', 'Puerto Rico', 'US Virgin Islands', 'Guam', 
            'American Samoa', 'Marshall Islands', 'Micronesia', 'Palau'
          ]
          
          const isUSDCountry = usdCountries.some(usdCountry => 
            address.country?.toUpperCase() === usdCountry.toUpperCase()
          )
          
          if (isUSDCountry) {
            setCurrency('USD', false) // false = auto-detected, not manual
            console.log('Currency automatically set to USD based on location:', address.country)
          } else {
            // Default to BDT for non-USD countries
            setCurrency('BDT', false) // false = auto-detected, not manual
            console.log('Currency automatically set to BDT based on location:', address.country)
          }
        }

        // Optionally populate city if not already set
        // Only set if it matches one of the available cities
        if (address.city && !shippingInfo.value.city) {
          // Only set if it matches one of the available cities to avoid clearing
          if (availableCities.value.includes(address.city)) {
            shippingInfo.value.city = address.city
          }
        }
      }
    } catch (error) {
      console.error('Error fetching reverse geocoding:', error)
    }
  } catch (error) {
    console.log('Error getting location:', error)
    // User denied location access or error occurred
  }
}

// Client-side redirect if cart is empty
onMounted(async () => {
  // Simulate cart loading time to show skeleton
  setTimeout(() => {
    isLoadingCart.value = false
  }, 300)
  
  // Fetch locations on mount
  fetchLocations()
  
  // Fetch all cities once on mount (cached, no need to fetch again)
  fetchCities()
  
  // Fetch shipping methods on mount
  fetchShippingMethods()
  
  // Fetch settings on mount
  fetchSettings()
  
  // Initialize country search term with default country
  if (shippingInfo.value.country) {
    countrySearchTerm.value = shippingInfo.value.country
  }
  
  // Force checkbox styles to be applied after navigation
  await nextTick()
  
  // Ensure city is set to empty string to show default option after DOM is ready
  shippingInfo.value.city = ''
  
  if (typeof window !== 'undefined') {
    // Force reflow to ensure CSS is applied
    const checkboxes = document.querySelectorAll('.checkout-checkbox-input')
    checkboxes.forEach((checkbox) => {
      // Trigger reflow to ensure styles are applied
      const htmlElement = checkbox as HTMLElement
      void htmlElement.offsetHeight
    })
    
    // Ensure the select elements show the default option
    await nextTick()
    const citySelect = document.getElementById('city') as HTMLSelectElement
    if (citySelect) {
      citySelect.value = ''
      citySelect.selectedIndex = 0
    }
  }
  
  // Try to get browser location to populate country and state/district
  // Run this after ensuring the default is set to avoid conflicts
  // Use a small delay to ensure the select is properly initialized
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      getBrowserLocation()
    }
  }, 100)
  
  if (isEmpty.value) {
    // Optionally redirect to cart page
    // navigateTo('/cart')
  }
})

// List of all countries (Bangladesh first for default)
const countries = [
  'Bangladesh',
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
  'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait',
  'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
  'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
  'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan',
  'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
  'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen', 'Zambia', 'Zimbabwe'
]

// Searchable select state for country (declared before computed properties)
const countrySearchTerm = ref('')
const showCountryDropdown = ref(false)

// Bangladesh Districts/States
const bangladeshDistricts = [
  'Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Kishoreganj', 'Netrokona', 'Jamalpur',
  'Sherpur', 'Mymensingh', 'Faridpur', 'Gopalganj', 'Madaripur', 'Shariatpur', 'Rajbari', 'Chittagong', 'Cox\'s Bazar', 'Bandarban',
  'Rangamati', 'Khagrachhari', 'Feni', 'Noakhali', 'Lakshmipur', 'Chandpur', 'Comilla', 'Brahmanbaria', 'Sylhet', 'Moulvibazar',
  'Habiganj', 'Sunamganj', 'Rajshahi', 'Natore', 'Pabna', 'Sirajganj', 'Bogra', 'Joypurhat', 'Naogaon', 'Chapai Nawabganj',
  'Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon', 'Barisal', 'Barguna',
  'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur', 'Khulna', 'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Magura',
  'Meherpur', 'Narail', 'Satkhira', 'Kushtia'
]

// Bangladesh Cities by District
const bangladeshCities: Record<string, string[]> = {
  'Dhaka': ['Dhaka', 'Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Wari', 'Old Dhaka', 'Tejgaon', 'Ramna', 'Motijheel', 'Kotwali', 'Lalbagh', 'Sutrapur', 'Sabujbagh', 'Dhanmondi', 'Shyamoli', 'Mohammadpur', 'Kafrul', 'Cantonment'],
  'Gazipur': ['Gazipur', 'Kaliakair', 'Kapasia', 'Sreepur', 'Tongi'],
  'Narayanganj': ['Narayanganj', 'Bandar', 'Rupganj', 'Sonargaon', 'Araihazar'],
  'Tangail': ['Tangail', 'Kalihati', 'Bhuapur', 'Delduar', 'Ghatail', 'Gopalpur', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur'],
  'Manikganj': ['Manikganj', 'Singair', 'Shibalaya', 'Saturia', 'Harirampur', 'Ghior', 'Daulatpur'],
  'Munshiganj': ['Munshiganj', 'Sreenagar', 'Sirajdikhan', 'Lohajang', 'Gazaria', 'Tongibari'],
  'Narsingdi': ['Narsingdi', 'Belabo', 'Monohardi', 'Palash', 'Raipura', 'Shibpur'],
  'Kishoreganj': ['Kishoreganj', 'Bajitpur', 'Bhairab', 'Hossainpur', 'Itna', 'Karimganj', 'Katiadi', 'Kuliarchar', 'Mithamain', 'Nikli', 'Pakundia', 'Tarail'],
  'Netrokona': ['Netrokona', 'Atpara', 'Barhatta', 'Durgapur', 'Khaliajuri', 'Kalmakanda', 'Kendua', 'Madan', 'Mohanganj', 'Purbadhala'],
  'Jamalpur': ['Jamalpur', 'Baksiganj', 'Dewanganj', 'Islampur', 'Madarganj', 'Melandaha', 'Sarishabari'],
  'Sherpur': ['Sherpur', 'Jhenaigati', 'Nakla', 'Nalitabari', 'Sreebardi'],
  'Mymensingh': ['Mymensingh', 'Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon', 'Gauripur', 'Haluaghat', 'Ishwarganj', 'Muktagachha', 'Nandail', 'Phulpur', 'Tarakanda'],
  'Faridpur': ['Faridpur', 'Alfadanga', 'Bhanga', 'Boalmari', 'Charbhadrasan', 'Madhukhali', 'Nagarkanda', 'Sadarpur', 'Saltha'],
  'Gopalganj': ['Gopalganj', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'],
  'Madaripur': ['Madaripur', 'Kalkini', 'Rajoir', 'Shibchar'],
  'Shariatpur': ['Shariatpur', 'Bhedarganj', 'Damudya', 'Gosairhat', 'Naria', 'Zajira'],
  'Rajbari': ['Rajbari', 'Baliakandi', 'Goalandaghat', 'Pangsha'],
  'Chittagong': ['Chittagong', 'Anwara', 'Banshkhali', 'Boalkhali', 'Chandanaish', 'Fatikchhari', 'Hathazari', 'Lohagara', 'Mirsharai', 'Patiya', 'Raujan', 'Sandwip', 'Satkania', 'Sitakunda'],
  'Cox\'s Bazar': ['Cox\'s Bazar', 'Chakaria', 'Kutubdia', 'Maheshkhali', 'Ramu', 'Teknaf', 'Ukhia'],
  'Bandarban': ['Bandarban', 'Alikadam', 'Lama', 'Naikhongchhari', 'Rowangchhari', 'Ruma', 'Thanchi'],
  'Rangamati': ['Rangamati', 'Bagaichhari', 'Barkal', 'Juraichhari', 'Kaptai', 'Kawkhali', 'Langadu', 'Naniarchar', 'Rajsthali'],
  'Khagrachhari': ['Khagrachhari', 'Dighinala', 'Lakshmichhari', 'Mahalchhari', 'Manikchhari', 'Matiranga', 'Panchhari', 'Ramgarh'],
  'Feni': ['Feni', 'Chhagalnaiya', 'Daganbhuiyan', 'Parshuram', 'Sonagazi'],
  'Noakhali': ['Noakhali', 'Begumganj', 'Chatkhil', 'Companiganj', 'Hatiya', 'Kabirhat', 'Senbagh', 'Subarnachar'],
  'Lakshmipur': ['Lakshmipur', 'Ramganj', 'Raipur', 'Ramgati'],
  'Chandpur': ['Chandpur', 'Faridganj', 'Hajiganj', 'Kachua', 'Matlab Dakshin', 'Matlab Uttar', 'Shahrasti'],
  'Comilla': ['Comilla', 'Barura', 'Brahmanpara', 'Burichong', 'Chandina', 'Chauddagram', 'Daudkandi', 'Debidwar', 'Homna', 'Laksam', 'Meghna', 'Monohargonj', 'Muradnagar', 'Nangalkot', 'Titas'],
  'Brahmanbaria': ['Brahmanbaria', 'Akhaura', 'Bancharampur', 'Bijoynagar', 'Kasba', 'Nabinagar', 'Nasirnagar', 'Sarail'],
  'Sylhet': ['Sylhet', 'Balaganj', 'Beanibazar', 'Bishwanath', 'Balaganj', 'Companigonj', 'Fenchuganj', 'Golapganj', 'Gowainghat', 'Jaintiapur', 'Kanaighat', 'Osmani Nagar', 'Zakiganj'],
  'Moulvibazar': ['Moulvibazar', 'Barlekha', 'Juri', 'Kamalganj', 'Kulaura', 'Rajnagar', 'Sreemangal'],
  'Habiganj': ['Habiganj', 'Ajmiriganj', 'Bahubal', 'Baniyachong', 'Chunarughat', 'Lakhai', 'Madhabpur', 'Nabiganj', 'Shaistaganj'],
  'Sunamganj': ['Sunamganj', 'Bishwamvarpur', 'Chhatak', 'Derai', 'Dharampasha', 'Dharmapasha', 'Dowarabazar', 'Jagannathpur', 'Jamalganj', 'Sullah', 'Tahirpur'],
  'Rajshahi': ['Rajshahi', 'Bagha', 'Bagmara', 'Charghat', 'Durgapur', 'Godagari', 'Mohanpur', 'Paba', 'Puthia', 'Tanore'],
  'Natore': ['Natore', 'Bagatipara', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Singra'],
  'Pabna': ['Pabna', 'Atgharia', 'Bera', 'Bhangura', 'Chatmohar', 'Faridpur', 'Ishwardi', 'Santhia', 'Sujanagar'],
  'Sirajganj': ['Sirajganj', 'Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur', 'Raiganj', 'Shahjadpur', 'Tarash', 'Ullahpara'],
  'Bogra': ['Bogra', 'Adamdighi', 'Dhunat', 'Dhupchanchia', 'Gabtali', 'Kahaloo', 'Nandigram', 'Sariakandi', 'Shajahanpur', 'Sherpur', 'Shibganj', 'Sonatala'],
  'Joypurhat': ['Joypurhat', 'Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi'],
  'Naogaon': ['Naogaon', 'Atrai', 'Badalgachhi', 'Dhamoirhat', 'Manda', 'Mohadevpur', 'Niamatpur', 'Patnitala', 'Porsha', 'Raninagar', 'Sapahar'],
  'Chapai Nawabganj': ['Chapai Nawabganj', 'Bholahat', 'Gomastapur', 'Nachole', 'Shibganj'],
  'Rangpur': ['Rangpur', 'Badarganj', 'Gangachara', 'Kaunia', 'Mithapukur', 'Pirgacha', 'Pirganj', 'Taraganj'],
  'Dinajpur': ['Dinajpur', 'Birampur', 'Birganj', 'Biral', 'Bochaganj', 'Chirirbandar', 'Fulbari', 'Ghoraghat', 'Hakimpur', 'Kaharole', 'Khansama', 'Nawabganj', 'Parbatipur'],
  'Gaibandha': ['Gaibandha', 'Fulchhari', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata', 'Sundarganj'],
  'Kurigram': ['Kurigram', 'Bhurungamari', 'Char Rajibpur', 'Chilmari', 'Phulbari', 'Rajarhat', 'Raomari', 'Ulipur'],
  'Lalmonirhat': ['Lalmonirhat', 'Aditmari', 'Hatibandha', 'Kaliganj', 'Patgram'],
  'Nilphamari': ['Nilphamari', 'Dimla', 'Domar', 'Jaldhaka', 'Kishoreganj', 'Saidpur'],
  'Panchagarh': ['Panchagarh', 'Atwari', 'Boda', 'Debiganj', 'Tetulia'],
  'Thakurgaon': ['Thakurgaon', 'Baliadangi', 'Haripur', 'Pirganj', 'Ranisankail'],
  'Barisal': ['Barisal', 'Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara', 'Gaurnadi', 'Hizla', 'Mehendiganj', 'Muladi', 'Wazirpur'],
  'Barguna': ['Barguna', 'Amtali', 'Bamna', 'Betagi', 'Patharghata', 'Taltali'],
  'Bhola': ['Bhola', 'Borhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan', 'Manpura', 'Tazumuddin'],
  'Jhalokati': ['Jhalokati', 'Kathalia', 'Nalchity', 'Rajapur'],
  'Patuakhali': ['Patuakhali', 'Bauphal', 'Dashmina', 'Dumki', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Rangabali'],
  'Pirojpur': ['Pirojpur', 'Bhandaria', 'Kaukhali', 'Mathbaria', 'Nazirpur', 'Nesarabad', 'Zianagar'],
  'Khulna': ['Khulna', 'Batiaghata', 'Dacope', 'Dumuria', 'Dighalia', 'Dumuria', 'Dacope', 'Fultala', 'Koyra', 'Paikgachha', 'Phultala', 'Rupsa', 'Terokhada'],
  'Bagerhat': ['Bagerhat', 'Chitalmari', 'Fakirhat', 'Kachua', 'Mollahat', 'Mongla', 'Morrelganj', 'Rampal', 'Sarankhola'],
  'Chuadanga': ['Chuadanga', 'Alamdanga', 'Damurhuda', 'Jibannagar'],
  'Jashore': ['Jashore', 'Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jhikargachha', 'Keshabpur', 'Manirampur', 'Sharsha'],
  'Jhenaidah': ['Jhenaidah', 'Harinakunda', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa'],
  'Magura': ['Magura', 'Mohammadpur', 'Shalikha', 'Sreepur'],
  'Meherpur': ['Meherpur', 'Gangni', 'Mujibnagar'],
  'Narail': ['Narail', 'Kalia', 'Lohagara'],
  'Satkhira': ['Satkhira', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Shyamnagar', 'Tala'],
  'Kushtia': ['Kushtia', 'Bheramara', 'Daulatpur', 'Khoksa', 'Kumarkhali', 'Mirpur']
}

// Form data
const shippingInfo = ref({
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  zone: '',
  postalCode: '',
  country: 'Bangladesh', // Default to Bangladesh
  city_id: null as number | null,
  zone_id: null as number | null
})


// Store all cities from API (cached)
const allCities = ref<any[]>([])

// Fetch all cities from API once
const fetchCities = async () => {
  // If cities are already loaded, don't fetch again
  if (allCities.value.length > 0) {
    return
  }

  isLoadingCities.value = true
  try {
    const { backendUrl } = useApi()
    const response = await $fetch<any>(`${backendUrl}/area/cities`, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    
    console.log('Cities API Response:', response)
    
    if (response.success && response.data && Array.isArray(response.data)) {
      allCities.value = response.data
      console.log('Cities loaded from API:', allCities.value.length, 'cities')
      if (allCities.value.length > 0) {
        console.log('Sample city object structure:', allCities.value[0])
        console.log('Sample city object keys:', Object.keys(allCities.value[0]))
        // Initialize cities list
        initializeCities()
      }
    } else {
      allCities.value = []
    }
  } catch (error) {
    console.error('Error fetching cities:', error)
    allCities.value = []
  } finally {
    isLoadingCities.value = false
  }
}

// Initialize cities from API when loaded
const initializeCities = () => {
  if (allCities.value.length > 0) {
    cities.value = allCities.value
  }
}

// Computed property for available cities
const availableCities = computed(() => {
  if (shippingInfo.value.country === 'Bangladesh') {
    // Use API cities if available
    if (cities.value.length > 0) {
      // Return city names from API response
      // Handle both string arrays and object arrays
      return cities.value.map((city: any) => {
        if (typeof city === 'string') {
          return city
        }
        // API uses city_name field
        return city.city_name || city.name || city.city || city.title || ''
      }).filter((name: string) => name !== '' && name.trim() !== '')
    }
    // If cities haven't been initialized yet, initialize them
    if (allCities.value.length > 0 && cities.value.length === 0) {
      initializeCities()
      return cities.value.map((city: any) => {
        if (typeof city === 'string') {
          return city
        }
        return city.city_name || city.name || city.city || city.title || ''
      }).filter((name: string) => name !== '' && name.trim() !== '')
    }
  }
  return [] // For other countries, return empty array
})

// Computed property to check if Bangladesh is selected
const isBangladesh = computed(() => {
  return shippingInfo.value.country === 'Bangladesh'
})

// Computed property for filtered countries based on search term
const filteredCountries = computed(() => {
  if (!countrySearchTerm.value) {
    return countries
  }
  const searchLower = countrySearchTerm.value.toLowerCase()
  return countries.filter((country: string) =>
    country.toLowerCase().includes(searchLower)
  )
})

// Computed property for filtered cities based on search term
const filteredCities = computed(() => {
  if (!citySearchTerm.value) {
    return availableCities.value
  }
  const searchLower = citySearchTerm.value.toLowerCase()
  return availableCities.value.filter((city: string) =>
    city.toLowerCase().includes(searchLower)
  )
})

// Computed property for filtered zones based on search term
const filteredZones = computed(() => {
  if (!zoneSearchTerm.value) {
    return zones.value
  }
  const searchLower = zoneSearchTerm.value.toLowerCase()
  return zones.value.filter((zone: any) => {
    const zoneName = typeof zone === 'string' 
      ? zone 
      : (zone.zone_name || zone.name || zone.zone || zone.title || '')
    return zoneName.toLowerCase().includes(searchLower)
  })
})

// Helper function to get zone display name
const getZoneDisplayName = () => {
  if (!shippingInfo.value.zone || zones.value.length === 0) {
    return ''
  }
  const zoneObj = zones.value.find((zone: any) => {
    const zoneId = typeof zone === 'string' 
      ? zone 
      : (zone.zone_id || zone.id || zone.zoneId || zone.ID)
    return zoneId === shippingInfo.value.zone || zoneId?.toString() === shippingInfo.value.zone.toString()
  })
  if (zoneObj) {
    return typeof zoneObj === 'string' 
      ? zoneObj 
      : (zoneObj.zone_name || zoneObj.name || zoneObj.zone || zoneObj.title || '')
  }
  return ''
}

// Handler for country selection from searchable dropdown
const selectCountry = (countryName: string) => {
  shippingInfo.value.country = countryName
  countrySearchTerm.value = countryName
  showCountryDropdown.value = false
  handleCountryChange()
}

// Handler for country input blur
const handleCountryBlur = () => {
  if (typeof window !== 'undefined') {
    window.setTimeout(() => {
      showCountryDropdown.value = false
      handleAddressFieldBlur()
    }, 200)
  }
}

// Handler for country change
const handleCountryChange = () => {
  // Reset city and zone when country changes
  shippingInfo.value.city = ''
  shippingInfo.value.zone = ''
  shippingInfo.value.city_id = null
  shippingInfo.value.zone_id = null
  zones.value = []
  citySearchTerm.value = ''
  zoneSearchTerm.value = ''
}


// Handler for city selection from searchable dropdown
const selectCity = (cityName: string) => {
  shippingInfo.value.city = cityName
  citySearchTerm.value = cityName
  showCityDropdown.value = false
  handleCityChange()
}

// Handler for zone selection from searchable dropdown
const selectZone = (zone: any) => {
  const zoneId = typeof zone === 'string' 
    ? zone 
    : (zone.zone_id || zone.id || zone.zoneId || zone.ID)
  shippingInfo.value.zone = zoneId
  const zoneName = typeof zone === 'string' 
    ? zone 
    : (zone.zone_name || zone.name || zone.zone || zone.title || '')
  zoneSearchTerm.value = zoneName
  showZoneDropdown.value = false
  
  // Update zone_id
  if (zone && typeof zone === 'object') {
    shippingInfo.value.zone_id = zoneId
  } else if (typeof zoneId === 'number' || !isNaN(Number(zoneId))) {
    shippingInfo.value.zone_id = typeof zoneId === 'number' ? zoneId : Number(zoneId)
  }
}

// Handler for city input blur
const handleCityBlur = () => {
  if (typeof window !== 'undefined') {
    window.setTimeout(() => {
      showCityDropdown.value = false
      handleAddressFieldBlur()
    }, 200)
  }
}

// Handler for zone input blur
const handleZoneBlur = () => {
  if (typeof window !== 'undefined') {
    window.setTimeout(() => {
      showZoneDropdown.value = false
      handleAddressFieldBlur()
    }, 200)
  }
}

// Handler for city change - ensures city_id is set immediately and zones are fetched (only for Bangladesh)
const handleCityChange = () => {
  // Only process for Bangladesh
  if (shippingInfo.value.country !== 'Bangladesh') {
    return
  }
  
  const selectedCity = shippingInfo.value.city
  console.log('handleCityChange called with city:', selectedCity)
  
  // Reset zone when city changes
  shippingInfo.value.zone = ''
  shippingInfo.value.zone_id = null
  zones.value = []
  zoneSearchTerm.value = ''
  
  if (selectedCity && selectedCity !== '') {
    // Find the city object that matches the selected city name
    // API uses city_name field
    let cityObj = cities.value.find((city: any) => {
      if (typeof city === 'string') {
        return city === selectedCity || city.toLowerCase() === selectedCity.toLowerCase()
      }
      const cityName = city.city_name || city.name || city.city || city.title || ''
      return cityName === selectedCity || cityName.trim().toLowerCase() === selectedCity.trim().toLowerCase()
    })
    
    // If not found in filtered cities, search in all cities
    if (!cityObj && allCities.value.length > 0) {
      cityObj = allCities.value.find((city: any) => {
        if (typeof city === 'string') {
          return city === selectedCity || city.toLowerCase() === selectedCity.toLowerCase()
        }
        const cityName = city.city_name || city.name || city.city || city.title || ''
        return cityName === selectedCity || cityName.trim().toLowerCase() === selectedCity.trim().toLowerCase()
      })
    }
    
    if (cityObj && typeof cityObj === 'object') {
      // API uses city_id field
      const cityId = cityObj.city_id || cityObj.id || cityObj.cityId || cityObj.ID || null
      console.log('City selected - city_id:', cityId, 'city object:', cityObj)
      shippingInfo.value.city_id = cityId
      // Always fetch zones when city is selected and city_id is available
      if (cityId) {
        console.log('Calling fetchZones with city_id:', cityId)
        fetchZones(cityId)
      } else {
        console.error('City ID is null or undefined. City object:', cityObj)
        shippingInfo.value.zone = ''
        shippingInfo.value.zone_id = null
        zones.value = []
      }
    } else {
      console.warn('City object not found for selected city:', selectedCity)
      shippingInfo.value.city_id = null
      shippingInfo.value.zone = ''
      shippingInfo.value.zone_id = null
      zones.value = []
    }
  } else {
    shippingInfo.value.city_id = null
    shippingInfo.value.zone = ''
    shippingInfo.value.zone_id = null
    zones.value = []
  }
}

// Watch for country changes to ensure city is reset
watch(() => shippingInfo.value.country, (newCountry) => {
  if (!newCountry || newCountry === '') {
    shippingInfo.value.city = ''
    shippingInfo.value.zone = ''
    shippingInfo.value.city_id = null
    shippingInfo.value.zone_id = null
    zones.value = []
  }
})


// Fetch zones from API based on city_id
const fetchZones = async (cityId: number | null) => {
  console.log('fetchZones called with cityId:', cityId, 'type:', typeof cityId)
  
  if (!cityId) {
    console.warn('fetchZones: cityId is null or undefined, returning early')
    zones.value = []
    shippingInfo.value.zone = ''
    shippingInfo.value.zone_id = null
    return
  }

  isLoadingZones.value = true
  try {
    const { backendUrl } = useApi()
    const apiUrl = `${backendUrl}/area/zones?city=${cityId}`
    console.log('Fetching zones from API:', apiUrl)
    
    const response = await $fetch<any>(apiUrl, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    
    console.log('Zones API Response:', response)
    
    if (response.success && response.data && Array.isArray(response.data)) {
      zones.value = response.data
      console.log('Zones loaded:', zones.value.length, 'zones')
    } else {
      console.warn('Zones API response format unexpected:', response)
      zones.value = []
    }
  } catch (error) {
    console.error('Error fetching zones:', error)
    zones.value = []
  } finally {
    isLoadingZones.value = false
  }
}

// Watch for city changes to store city_id and fetch zones (only for Bangladesh)
watch(() => shippingInfo.value.city, (newCity, oldCity) => {
  console.log('City watch triggered - newCity:', newCity, 'oldCity:', oldCity)
  
  // Only process city changes for Bangladesh
  if (shippingInfo.value.country !== 'Bangladesh') {
    // For non-Bangladesh countries, clear city_id and zone_id
    shippingInfo.value.city_id = null
    shippingInfo.value.zone = ''
    shippingInfo.value.zone_id = null
    zones.value = []
    return
  }
  
  // Reset zone when city changes
  if (newCity !== oldCity) {
    shippingInfo.value.zone = ''
    shippingInfo.value.zone_id = null
    zones.value = []
  }
  
  if (newCity && newCity !== '') {
    // First try to find in filtered cities
    // API uses city_name field
    let cityObj = cities.value.find((city: any) => {
      if (typeof city === 'string') {
        return city === newCity || city.toLowerCase() === newCity.toLowerCase()
      }
      const cityName = city.city_name || city.name || city.city || city.title || ''
      return cityName === newCity || cityName.trim().toLowerCase() === newCity.trim().toLowerCase()
    })
    
    // If not found in filtered cities, search in all cities
    if (!cityObj && allCities.value.length > 0) {
      cityObj = allCities.value.find((city: any) => {
        if (typeof city === 'string') {
          return city === newCity || city.toLowerCase() === newCity.toLowerCase()
        }
        const cityName = city.city_name || city.name || city.city || city.title || ''
        return cityName === newCity || cityName.trim().toLowerCase() === newCity.trim().toLowerCase()
      })
    }
    
    if (cityObj && typeof cityObj === 'object') {
      // API uses city_id field (primary), fallback to other field names
      const cityId = cityObj.city_id || cityObj.id || cityObj.cityId || cityObj.ID || null
      console.log('Found city object:', cityObj, 'city_id:', cityId, 'city object keys:', Object.keys(cityObj))
      shippingInfo.value.city_id = cityId
      // Always fetch zones when city is selected and city_id is available
      if (cityId) {
        console.log('Calling fetchZones with city_id:', cityId)
        fetchZones(cityId)
      } else {
        console.warn('City ID is null or undefined, cannot fetch zones. City object:', cityObj)
        shippingInfo.value.zone = ''
        shippingInfo.value.zone_id = null
        zones.value = []
      }
    } else {
      console.warn('City object not found for:', newCity)
      console.warn('Searched in cities.value (length:', cities.value.length, ') and allCities.value (length:', allCities.value.length, ')')
      shippingInfo.value.city_id = null
      shippingInfo.value.zone = ''
      shippingInfo.value.zone_id = null
      zones.value = []
    }
  } else {
    shippingInfo.value.city_id = null
    shippingInfo.value.zone = ''
    shippingInfo.value.zone_id = null
    zones.value = []
  }
}, { immediate: false })

// Watch for city_id changes to fetch zones (backup to ensure zones are fetched)
watch(() => shippingInfo.value.city_id, (newCityId, oldCityId) => {
  console.log('city_id watch triggered - newCityId:', newCityId, 'oldCityId:', oldCityId)
  
  if (newCityId && newCityId !== oldCityId) {
    console.log('city_id changed, calling fetchZones with:', newCityId)
    fetchZones(newCityId)
  } else if (!newCityId) {
    // Reset zones when city_id is cleared
    zones.value = []
    shippingInfo.value.zone = ''
    shippingInfo.value.zone_id = null
  }
})

// Watch for country changes to sync search term
watch(() => shippingInfo.value.country, (newCountry) => {
  if (newCountry) {
    countrySearchTerm.value = newCountry
  } else {
    countrySearchTerm.value = ''
  }
}, { immediate: true })

// Watch for city changes to sync search term
watch(() => shippingInfo.value.city, (newCity) => {
  if (newCity) {
    citySearchTerm.value = newCity
  } else {
    citySearchTerm.value = ''
  }
})

// Watch for zone changes to store zone_id and sync search term
watch(() => shippingInfo.value.zone, (newZone) => {
  console.log('Zone watch triggered - newZone:', newZone, 'zones:', zones.value)
  
  // Sync zone search term with selected zone
  if (newZone && zones.value.length > 0) {
    const zoneObj = zones.value.find((zone: any) => {
      const zoneId = typeof zone === 'string' 
        ? zone 
        : (zone.zone_id || zone.id || zone.zoneId || zone.ID)
      return zoneId === newZone || zoneId?.toString() === newZone.toString()
    })
    if (zoneObj) {
      const zoneName = typeof zoneObj === 'string' 
        ? zoneObj 
        : (zoneObj.zone_name || zoneObj.name || zoneObj.zone || zoneObj.title || '')
      zoneSearchTerm.value = zoneName
    }
  } else {
    zoneSearchTerm.value = ''
  }
  
  if (newZone && zones.value.length > 0) {
    // Find the zone object that matches the selected zone
    // API uses zone_id field
    const zoneObj = zones.value.find((zone: any) => {
      if (typeof zone === 'string') {
        return zone === newZone || zone.toString() === newZone.toString()
      }
      const zoneId = zone.zone_id || zone.id || zone.zoneId || zone.ID
      return zoneId === newZone || zoneId?.toString() === newZone.toString()
    })
    
    if (zoneObj && typeof zoneObj === 'object') {
      // API uses zone_id field (primary)
      const zoneId = zoneObj.zone_id || zoneObj.id || zoneObj.zoneId || zoneObj.ID || null
      console.log('Found zone object:', zoneObj, 'zone_id:', zoneId)
      shippingInfo.value.zone_id = zoneId
    } else if (typeof newZone === 'number' || !isNaN(Number(newZone))) {
      // If zone is already an ID, use it directly
      shippingInfo.value.zone_id = typeof newZone === 'number' ? newZone : Number(newZone)
      console.log('Using zone value directly as zone_id:', shippingInfo.value.zone_id)
    } else {
      console.warn('Zone object not found for selected zone:', newZone)
      shippingInfo.value.zone_id = null
    }
  } else {
    shippingInfo.value.zone_id = null
  }
})

const billingInfo = ref({
  fullName: '',
  address: '',
  city: ''
})

const billingSameAsShipping = ref(true)
const shippingMethod = ref('')
const isInternationalOrder = computed(() => shippingMethod.value === 'international_shipping')
const selectedOutlet = ref<number | string>('')
const deliveryPartner = ref('') // Format: "pathao", "sa_paribahan", or "sundarban"
const deliveryLocation = ref('') // Format: "inside_dhaka" or "outside_dhaka" (for SA Paribahan and Sundarban)
const locations = ref<any[]>([])
const isLoadingLocations = ref(false)
const shippingMethods = ref<any>({}) // Changed to object to store the new API response structure
const isLoadingShippingMethods = ref(false)
const cities = ref<any[]>([]) // Store cities from API
const isLoadingCities = ref(false)
const zones = ref<any[]>([]) // Store zones from API
const isLoadingZones = ref(false)

// Searchable select state
const citySearchTerm = ref('')
const showCityDropdown = ref(false)
const zoneSearchTerm = ref('')
const showZoneDropdown = ref(false)

// Computed property to get the selected outlet location
const selectedOutletLocation = computed(() => {
  if (!selectedOutlet.value || locations.value.length === 0) {
    return null
  }
  return locations.value.find(location => location.id === selectedOutlet.value || location.id?.toString() === selectedOutlet.value.toString())
})
const paymentMethod = ref('')
const orderNotes = ref('')
const isPlacingOrder = ref(false)
const isGiftPackage = ref(false)

// Inline validation errors (shown under fields)
const errors = ref<Record<string, string>>({})

const clearError = (key: string) => {
  if (errors.value[key]) {
    delete errors.value[key]
  }
}

// Settings data
const settingsData = ref<any>(null)
const isLoadingSettings = ref(false)

// Watch shipping method to reset outlet selection and delivery partner when changed
watch(shippingMethod, (newValue) => {
  if (newValue !== 'store_pickup') {
    selectedOutlet.value = ''
  }
  if (newValue !== 'home_delivery') {
    deliveryPartner.value = ''
    deliveryLocation.value = ''
  }
  
  // Auto-select PayPal when international shipping is selected
  if (newValue === 'international_shipping') {
    // Check if PayPal is supported before auto-selecting
    if (supportsPayPal.value) {
      paymentMethod.value = 'paypal'
    }
  }
  
  // Call shipping methods API when delivery option changes or is set for the first time
  if (newValue) {
    fetchShippingMethodsWithAddress(true)
  }
})

// Computed property to generate delivery partner options
// Since API data is always the same, we always show the 3 delivery partners
const deliveryPartnerOptions = computed(() => {
  // Always return the 3 delivery partners regardless of API data
  // The API data will be used for cost calculation
  return [
    {
      value: 'pathao',
      label: 'Pathao'
    },
    {
      value: 'sa_paribahan',
      label: 'SA Paribahan'
    },
    {
      value: 'sundarban',
      label: 'Sundarban Paribahan'
    }
  ]
})

// Computed property to check if location selection is required
const requiresLocationSelection = computed(() => {
  return deliveryPartner.value === 'sa_paribahan' || deliveryPartner.value === 'sundarban'
})

// Computed property to check if current location supports PayPal
// PayPal is available for international locations (non-Bangladesh countries)
const supportsPayPal = computed(() => {
  const country = shippingInfo.value.country
  if (!country || country.trim() === '') {
    return false
  }
  // PayPal is supported for all countries except Bangladesh (where local payment methods are preferred)
  // Also support PayPal when currency is USD (international customers)
  const isBangladesh = country.toLowerCase() === 'bangladesh'
  const isUSDCurrency = currency.value === 'USD'
  return !isBangladesh || isUSDCurrency
})

// Watch delivery partner to call shipping methods API when changed
watch(deliveryPartner, (newValue) => {
  // Call shipping methods API when delivery partner is set or changed
  if (newValue && shippingMethod.value === 'home_delivery') {
    fetchShippingMethodsWithAddress(true)
  }
})

// Coupon functionality
const couponCode = ref('')
const isValidatingCoupon = ref(false)
const couponValidated = ref(false)
const couponError = ref('')
const couponData = ref<any>(null)

// Watch billing same as shipping
watch(billingSameAsShipping, (same) => {
  if (same) {
    billingInfo.value = {
      fullName: shippingInfo.value.fullName,
      address: [shippingInfo.value.addressLine1, shippingInfo.value.addressLine2].filter(Boolean).join(', '),
      city: shippingInfo.value.city
    }
  }
})

// Watch shipping info changes to update billing if same
watch(shippingInfo, () => {
  if (billingSameAsShipping.value) {
    billingInfo.value = {
      fullName: shippingInfo.value.fullName,
      address: [shippingInfo.value.addressLine1, shippingInfo.value.addressLine2].filter(Boolean).join(', '),
      city: shippingInfo.value.city
    }
  }
}, { deep: true })

// Shipping cost in BDT (base currency)
// Returns null if amount is not found in API response (don't show "Free")
const shippingCostBDT = computed(() => {
  if (!shippingMethod.value) {
    return null
  }
  
  // Handle store_pickup and international_shipping
  if (shippingMethod.value === 'store_pickup' || shippingMethod.value === 'international_shipping') {
    const cost = shippingMethods.value[shippingMethod.value]
    // Return the value if it exists (including 0), otherwise null
    return cost !== undefined && cost !== null ? cost : null
  }
  
  // Handle home_delivery
  if (shippingMethod.value === 'home_delivery' && deliveryPartner.value) {
    const partner = String(deliveryPartner.value)
    const homeDelivery = shippingMethods.value.home_delivery
    
    console.log('shippingCostBDT computed - home_delivery:', {
      partner,
      homeDelivery,
      shippingMethods: shippingMethods.value,
      hasHomeDelivery: !!homeDelivery,
      homeDeliveryType: typeof homeDelivery
    })
    
    // If home_delivery data doesn't exist in API response, return null
    if (!homeDelivery || typeof homeDelivery !== 'object') {
      console.log('shippingCostBDT: home_delivery data not found or invalid')
      return null
    }
    
    // Pathao is a flat rate
    if (partner === 'pathao') {
      const cost = homeDelivery.pathao
      console.log('shippingCostBDT: pathao cost:', cost, 'type:', typeof cost)
      // Return the value if it exists (including 0), otherwise null
      return cost !== undefined && cost !== null ? cost : null
    }
    
    // For SA Paribahan and Sundarban, get cost based on location
    if (partner === 'sa_paribahan' || partner === 'sundarban') {
      if (!deliveryLocation.value) {
        // If location not selected yet, return null
        return null
      }
      
      const partnerData = homeDelivery[partner]
      
      // If partner data doesn't exist, return null
      if (!partnerData || typeof partnerData !== 'object') {
        return null
      }
      
      const location = String(deliveryLocation.value)
      const cost = partnerData[location]
      
      // Return the value if it exists (including 0), otherwise null
      return cost !== undefined && cost !== null ? cost : null
    }
    
    return null
  }
  
  return null
})

// Shipping cost in current currency
const shippingCost = computed(() => {
  if (shippingCostBDT.value === null || shippingCostBDT.value === undefined) {
    return null
  }
  if (currency.value === 'USD') {
    // Convert BDT shipping cost to USD
    return shippingCostBDT.value / exchangeRate.value
  }
  return shippingCostBDT.value
})

// Gift package charge in BDT (base currency)
const giftPackageChargeBDT = computed(() => {
  if (!isGiftPackage.value) {
    return 0
  }
  // Use gift_wrap_cost from settings API if available, otherwise default to 50
  const giftWrapCost = settingsData.value?.gift_wrap_cost
  return giftWrapCost ? parseFloat(giftWrapCost) : 50
})

// Gift package charge in current currency
const giftPackageCharge = computed(() => {
  if (!isGiftPackage.value) {
    return 0
  }
  if (currency.value === 'USD') {
    // Convert BDT gift package charge to USD
    return giftPackageChargeBDT.value / exchangeRate.value
  }
  return giftPackageChargeBDT.value
})

// Gift package charge display
const giftPackageChargeDisplay = computed(() => {
  if (!isGiftPackage.value) {
    return ''
  }
  if (currency.value === 'USD') {
    const usdCharge = giftPackageCharge.value
    if (!isFinite(usdCharge) || isNaN(usdCharge)) {
      return '$0.00'
    }
    return `$${usdCharge.toFixed(2)}`
  }
  return `Tk ${giftPackageChargeBDT.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
})

const shippingCostDisplay = computed(() => {
  console.log('shippingCostDisplay computed:', {
    shippingMethod: shippingMethod.value,
    deliveryPartner: deliveryPartner.value,
    shippingCostBDT: shippingCostBDT.value,
    shippingMethods: shippingMethods.value,
    currency: currency.value
  })
  
  if (!shippingMethod.value) {
    return 'Select delivery option'
  }
  
  // If amount is not found in API response, don't show "Free"
  if (shippingCostBDT.value === null || shippingCostBDT.value === undefined) {
    // For home_delivery, show different messages based on what's missing
    if (shippingMethod.value === 'home_delivery') {
      if (!deliveryPartner.value) {
        return 'Select delivery partner'
      }
      if (requiresLocationSelection.value && !deliveryLocation.value) {
        return 'Select delivery location'
      }
    }
    return 'Select delivery option'
  }
  
  // Only show "Free" if amount is explicitly 0 in API response
  if (shippingCostBDT.value === 0) {
    return 'Free'
  }
  
  if (currency.value === 'USD') {
    const usdShipping = shippingCost.value
    if (usdShipping === null || usdShipping === undefined || !isFinite(usdShipping) || isNaN(usdShipping)) {
      return 'Select delivery option'
    }
    return `$${usdShipping.toFixed(2)}`
  }
  return `Tk ${shippingCostBDT.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
})

// Effective coupon discount: apply min_cost rule when API returns discount 0
// (e.g. when order amount >= min_cost, fixed coupon should give full value)
const effectiveCouponDiscount = computed(() => {
  if (!couponValidated.value || !couponData.value) return 0
  const data = couponData.value
  // const coupon = data.coupon
  // const orderAmount = subtotal.value ?? 0
  // if (coupon && typeof coupon.min_cost === 'number' && orderAmount >= coupon.min_cost) {
  //   if (coupon.discount_type === 'fixed' && typeof coupon.value === 'number') {
  //     return coupon.value
  //   }
  //   if (coupon.discount_type === 'percentage' && typeof coupon.value === 'number') {
  //     const amount = (orderAmount * coupon.value) / 100
  //     const cap = coupon.max_discount != null ? Number(coupon.max_discount) : Infinity
  //     return Math.min(amount, cap)
  //   }
  // }
  return data.discount ?? 0
})

// Calculate grand total with coupon discount
// Note: totalPrice already includes VAT, so we use it directly
const grandTotal = computed(() => {
  const baseTotal = totalPrice.value // This already includes VAT
  const discount = effectiveCouponDiscount.value
  
  // Convert discount to current currency if needed
  let discountInCurrentCurrency = discount
  if (currency.value === 'USD' && discount > 0) {
    discountInCurrentCurrency = discount / exchangeRate.value
  }
  
  const shipping = shippingCost.value !== null && shippingCost.value !== undefined ? shippingCost.value : 0
  const giftPackage = giftPackageCharge.value
  const total = baseTotal - discountInCurrentCurrency + shipping + giftPackage
  
  // Check for invalid values
  if (!isFinite(total) || isNaN(total)) {
    return 0
  }
  
  return total
})

const grandTotalDisplay = computed(() => {
  // Calculate total with discounts and gift package, but without shipping if not selected
  const baseTotal = totalPrice.value // This already includes VAT
  const discount = effectiveCouponDiscount.value
  
  // Convert discount to current currency if needed
  let discountInCurrentCurrency = discount
  if (currency.value === 'USD' && discount > 0) {
    discountInCurrentCurrency = discount / exchangeRate.value
  }
  
  const shipping = shippingMethod.value && shippingCost.value !== null && shippingCost.value !== undefined ? shippingCost.value : 0
  const giftPackage = giftPackageCharge.value
  const total = baseTotal - discountInCurrentCurrency + shipping + giftPackage
  
  // Check for invalid values
  if (!isFinite(total) || isNaN(total)) {
    return currency.value === 'USD' ? '$0.00' : 'Tk 0'
  }
  
  // Format the total
  if (currency.value === 'USD') {
    return `$${total.toFixed(2)}`
  } else {
    return `Tk ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
})

// Validate coupon function
const validateCoupon = async () => {
  if (!couponCode.value || couponCode.value.trim() === '') {
    couponError.value = 'Please enter a coupon code'
    return
  }

  isValidatingCoupon.value = true
  couponError.value = ''
  couponValidated.value = false
  couponData.value = null

  try {
    const { backendUrl } = useApi()
    const response = await $fetch<any>(`${backendUrl}/order/validate-coupon`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: {
        coupon_code: couponCode.value.trim(),
        item_total: subtotal.value // Use subtotal (without VAT) for coupon validation
      }
    })

    if (response && response.success) {
      couponValidated.value = true
      couponData.value = response.data || response
      couponError.value = ''
    } else {
      couponError.value = response?.message || 'Invalid coupon code'
      couponValidated.value = false
      couponData.value = null
    }
  } catch (error: any) {
    console.error('Error validating coupon:', error)
    couponError.value = error?.data?.message || error?.message || 'Failed to validate coupon. Please try again.'
    couponValidated.value = false
    couponData.value = null
  } finally {
    isValidatingCoupon.value = false
  }
}

// Remove coupon function
const removeCoupon = () => {
  couponCode.value = ''
  couponValidated.value = false
  couponData.value = null
  couponError.value = ''
}

const validateCheckout = (): boolean => {
  const nextErrors: Record<string, string> = {}

  const required = (key: string, value: any, message: string) => {
    if (value === null || value === undefined || String(value).trim() === '') {
      nextErrors[key] = message
    }
  }

  required('fullName', shippingInfo.value.fullName, 'Full name is required.')
  required('phone', shippingInfo.value.phone, 'Phone number is required.')
  required('addressLine1', shippingInfo.value.addressLine1, 'Address line 1 is required.')
  required('country', shippingInfo.value.country, 'Country is required.')
  required('city', shippingInfo.value.city, 'City is required.')

  if (isInternationalOrder.value) {
    required('email', shippingInfo.value.email, 'Email is required for international orders.')
  }

  if (shippingInfo.value.country === 'Bangladesh' && shippingInfo.value.city_id && !shippingInfo.value.zone) {
    nextErrors.zone = 'Zone is required.'
  }

  required('shippingMethod', shippingMethod.value, 'Delivery option is required.')

  if (shippingMethod.value === 'store_pickup') {
    required('selectedOutlet', selectedOutlet.value, 'Outlet is required.')
  }

  if (shippingMethod.value === 'home_delivery') {
    required('deliveryPartner', deliveryPartner.value, 'Delivery partner is required.')
    if (requiresLocationSelection.value) {
      required('deliveryLocation', deliveryLocation.value, 'Delivery location is required.')
    }
  }

  required('paymentMethod', paymentMethod.value, 'Payment option is required.')
  required('orderNotes', orderNotes.value, 'Order notes is required.')

  errors.value = nextErrors
  return Object.keys(nextErrors).length === 0
}

// Clear validation errors as user fixes inputs (on change)
watch(() => shippingInfo.value.fullName, (v) => { if (String(v || '').trim()) clearError('fullName') })
watch(() => shippingInfo.value.phone, (v) => { if (String(v || '').trim()) clearError('phone') })
watch(() => shippingInfo.value.addressLine1, (v) => { if (String(v || '').trim()) clearError('addressLine1') })
watch(() => shippingInfo.value.country, (v) => { if (String(v || '').trim()) clearError('country') })
watch(() => shippingInfo.value.city, (v) => { if (String(v || '').trim()) clearError('city') })
watch(() => shippingInfo.value.zone, (v) => { if (String(v || '').trim()) clearError('zone') })
watch(() => shippingInfo.value.email, (v) => { if (String(v || '').trim()) clearError('email') })
watch(orderNotes, (v) => { if (String(v || '').trim()) clearError('orderNotes') })

watch(shippingMethod, (v) => {
  if (String(v || '').trim()) clearError('shippingMethod')
  // Clear dependent errors when switching delivery type
  if (v !== 'store_pickup') clearError('selectedOutlet')
  if (v !== 'home_delivery') {
    clearError('deliveryPartner')
    clearError('deliveryLocation')
  }
})

watch(deliveryPartner, (v) => { if (String(v || '').trim()) clearError('deliveryPartner') })
watch(deliveryLocation, (v) => { if (String(v || '').trim()) clearError('deliveryLocation') })
watch(selectedOutlet, (v) => { if (String(v || '').trim()) clearError('selectedOutlet') })
watch(paymentMethod, (v) => { if (String(v || '').trim()) clearError('paymentMethod') })

watch(isInternationalOrder, (isIntl) => {
  // If international is turned off, don't keep email error around
  if (!isIntl) clearError('email')
})


const handleSubmit = () => {
  if (!validateCheckout()) return
  handlePlaceOrder()
}

const handlePlaceOrder = async () => {
  if (isEmpty.value) {
    alert('Your cart is empty!')
    return
  }

  // Inline validation (show errors under fields)
  if (!validateCheckout()) return

  // Validate that cart items have product_id and variant_id (or products array for combo items in new format)
  console.log('Cart items for validation:', cartItems.value)
  const itemsWithoutIds = cartItems.value.filter(item => {
    // Check if item is a combo product with new format (has products array)
    const hasProductsArray = (item as any).products && Array.isArray((item as any).products) && (item as any).products.length > 0
    
    console.log('Validating item:', {
      id: item.id,
      name: item.name,
      hasProductsArray,
      products: (item as any).products,
      product_id: item.product_id,
      variant_id: item.variant_id
    })
    
    if (hasProductsArray) {
      // New format: check if product_id exists and products array has valid entries
      const productId = (item as any).product_id || item.product_id
      if (!productId) {
        console.log('Combo product missing product_id')
        return true // Invalid - missing product_id
      }
      // Check if all products in the array have product_id (variant_id is optional for products without variants)
      const hasInvalidProducts = (item as any).products.some((p: any) => !p.product_id)
      if (hasInvalidProducts) {
        console.log('Invalid products array - missing product_id:', (item as any).products)
      }
      return hasInvalidProducts
    }
    
    // Check for old format (backward compatibility)
    const hasComboProducts = (item as any).combo_products && Array.isArray((item as any).combo_products)
    const isCombo = (item as any).is_combo === true || hasComboProducts
    
    if (isCombo && hasComboProducts) {
      const comboProducts = (item as any).combo_products
      if (comboProducts.length === 0) {
        console.log('Invalid combo product - empty array')
        return true // Invalid combo product - empty array
      }
      // Check if all combo products have product_id and variant_id (or can be extracted from full product object)
      const hasInvalidComboProducts = comboProducts.some((cp: any) => {
        // Check if it's in the direct format (product_id/variant_id)
        if (cp.product_id && cp.variant_id) {
          return false // Valid
        }
        // Check if it's a full product object with id and variants
        if (cp.id && cp.variants && Array.isArray(cp.variants) && cp.variants.length > 0) {
          const firstVariant = cp.variants[0]
          if (firstVariant?.id) {
            return false // Valid - can extract product_id and variant_id
          }
        }
        return true // Invalid - missing required data
      })
      if (hasInvalidComboProducts) {
        console.log('Invalid combo products - missing product_id or variant_id:', comboProducts)
      }
      return hasInvalidComboProducts
    }
    
    // For regular products, check product_id (variant_id is optional for products without variants)
    const missingProductId = !item.product_id
    if (missingProductId) {
      console.log('Regular product missing product_id')
    }
    return missingProductId
  })
  if (itemsWithoutIds.length > 0) {
    console.error('Items without valid IDs:', itemsWithoutIds)
    alert('Some items in your cart are missing required information. Please remove them and add them again.')
    return
  }

  isPlacingOrder.value = true

  try {
    const { backendUrl } = useApi()
    
    // Prepare products array - handle combo products differently
    const productsData: any[] = []
    
    for (const item of cartItems.value) {
      // Check if item is a combo product with the new format (has products array)
      const hasProductsArray = (item as any).products && Array.isArray((item as any).products) && (item as any).products.length > 0
      
      if (hasProductsArray) {
        // For combo products in new format, append the entire object with product_id, qty, and products array
        productsData.push({
          product_id: (item as any).product_id || item.product_id,
          qty: (item as any).qty || item.quantity || 1,
          products: (item as any).products
        })
      } else {
        // For regular products, send with quantity
        // variant_id is optional for products without variants
        const productData: any = {
          product_id: item.product_id!,
          qty: item.quantity
        }
        // Only include variant_id if it exists (products with variants)
        if (item.variant_id) {
          productData.variant_id = item.variant_id
        }
        productsData.push(productData)
      }
    }

    // Prepare order data according to API structure
    const orderData: any = {
      coupon_code: couponValidated.value && couponCode.value ? couponCode.value.trim() : null,
      customer_notes: orderNotes.value?.trim() || '',
      shipping_method: shippingMethod.value === 'home_delivery' && deliveryPartner.value 
        ? (deliveryLocation.value 
          ? `home_delivery.${deliveryPartner.value}.${deliveryLocation.value}` 
          : `home_delivery.${deliveryPartner.value}`)
        : shippingMethod.value,
      payment_method: paymentMethod.value,
      is_gift: isGiftPackage.value,
      gift_package_charge: isGiftPackage.value ? giftPackageChargeBDT.value : 0,
      currency: currencyCode.value,
      address: {
        name: shippingInfo.value.fullName,
        phone: shippingInfo.value.phone || '',
        email: shippingInfo.value.email || '',
        line_1: shippingInfo.value.addressLine1,
        line_2: shippingInfo.value.addressLine2 || '',
        city: shippingInfo.value.city,
        country: shippingInfo.value.country,
        postal_code: shippingInfo.value.postalCode || ''
      },
      products: productsData
    }
    
    // Add city_id and zone_id if available
    if (shippingInfo.value.city_id) {
      orderData.address.city_id = shippingInfo.value.city_id
    }
    if (shippingInfo.value.zone_id) {
      orderData.address.zone_id = shippingInfo.value.zone_id
    }

    // Add outlet information if outlet is selected
    if (shippingMethod.value === 'store_pickup' && selectedOutlet.value) {
      orderData.pickup_location_id = selectedOutlet.value
    }


    console.log('Order Data:', orderData)
    
    // Make API call to create order
    const response = await $fetch<any>(`${backendUrl}/order`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: orderData
    })

    console.log('Order API Response:', response)

    // Check if order was successful
    if (response && (response.success !== false)) {
      // Clear cart after successful order
      clearCart()

      // Get order number from response (for testing use 202511JJC)
      const orderNumber = (response as any)?.data?.number
      
      // Determine gateway based on payment method
      let gateway = 'ssl' // Default to SSL for online payments
      if (paymentMethod.value === 'cash_on_delivery') {
        gateway = 'cod'
      } else if (paymentMethod.value === 'paypal') {
        gateway = 'paypal'
      }

      // Navigate to order confirmation page with order number, gateway, and order value for Meta Pixel
      navigateTo({
        path: '/checkout/success',
        query: {
          orderNumber: orderNumber,
          gateway: gateway,
          orderTotal: String(grandTotal.value),
          currency: currencyCode.value
        }
      })
    } else {
      throw new Error((response as any)?.message || 'Failed to create order')
    }
  } catch (error: any) {
    console.error('Error placing order:', error)
    const errorMessage = error?.data?.message || error?.message || 'There was an error placing your order. Please try again.'
    alert(errorMessage)
  } finally {
    isPlacingOrder.value = false
  }
}
</script>



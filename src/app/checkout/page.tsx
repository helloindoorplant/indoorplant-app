'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/store/useCartStore';
import { ShieldCheck, ArrowLeft, Truck, CreditCard, ChevronRight, Check, MapPin, User, Plus } from 'lucide-react';
import Link from 'next/link';
import { FALLBACK_PLANT_IMAGE } from '@/lib/utils';

// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Must be a valid 10-digit Indian mobile number'),
  address1: z.string().min(5, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Must be a valid 6-digit PIN code'),
  instructions: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, subtotal, clearCart, updateQuantity } = useCartStore();
  const { data: session } = useSession();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGiftPackaging, setIsGiftPackaging] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);

  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [useNewAddress, setUseNewAddress] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (session?.user) {
        try {
          const res = await fetch('/api/user/addresses');
          if (res.ok) {
            const data = await res.json();
            setSavedAddresses(data.addresses);
            if (data.addresses.length > 0) {
              setUseNewAddress(false);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchAddresses();
  }, [session]);

  const currentSubtotal = subtotal();
  let shippingCost = 0;
  if (currentSubtotal < 500) {
    shippingCost = 40;
  } else {
    shippingCost = 0;
  }
  const giftPackagingCost = isGiftPackaging ? 50 : 0;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = currentSubtotal + shippingCost + giftPackagingCost - discountAmount;

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    const code = couponCode.toUpperCase();
    if (code === 'TEST5') {
      setAppliedCoupon({ code: 'TEST5', discount: currentSubtotal * 0.05 });
    } else {
      setAppliedCoupon(null);
      alert('Invalid coupon code. Try TEST5!');
    }
  };

  const { register, handleSubmit, formState: { errors, isValid }, trigger, getValues, setValue, watch } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched',
  });

  const pincodeValue = watch('pincode');
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);

  useEffect(() => {
    if (pincodeValue && pincodeValue.length === 6) {
      const verifyPincode = async () => {
        setIsVerifyingPin(true);
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${pincodeValue}`);
          const data = await res.json();
          if (data && data[0] && data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            setValue('city', postOffice.District, { shouldValidate: true });
            setValue('state', postOffice.State, { shouldValidate: true });
          }
        } catch (e) {
          console.error("Pincode verification failed", e);
        } finally {
          setIsVerifyingPin(false);
        }
      };
      verifyPincode();
    }
  }, [pincodeValue, setValue]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Redirect if cart is empty
  if (items.length === 0 && !isProcessing) {
    router.push('/cart');
    return null;
  }

  const handleNextStep = async () => {
    if (step === 1) {
      const isStep1Valid = await trigger();
      if (isStep1Valid) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    const formData = getValues();
    
    try {
      const res = await loadRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setIsProcessing(false);
        return;
      }

      // 1. Create order on backend
      const orderResponse = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: grandTotal }),
      });
      const orderData = await orderResponse.json();

      if (orderData.error) {
        alert('Could not create order. ' + orderData.error);
        setIsProcessing(false);
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your Live Key ID
        amount: orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: orderData.currency,
        name: 'IndoorPlant',
        description: 'Plant Purchase Transaction',
        image: 'https://cdn-icons-png.flaticon.com/512/628/628283.png', // Temporary generic plant icon
        order_id: orderData.id, 
        handler: function (response: any) {
          // Payment successful
          console.log('Payment Success:', response.razorpay_payment_id);
          clearCart();
          router.push(`/order-confirmation/${orderData.id}`);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#1B4332',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error(response.error.description);
        alert('Payment failed. Please try again.');
        setIsProcessing(false);
      });
      rzp.open();

    } catch (error) {
      console.error('Payment Error', error);
      setIsProcessing(false);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link href="/cart" className="text-muted-foreground hover:text-primary font-medium flex items-center gap-2 inline-flex">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Main Checkout Area */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Contact & Delivery */}
          <div className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${step === 1 ? 'border-primary/50 shadow-md ring-4 ring-primary/5' : 'border-border/50 opacity-70'}`}>
            <div className="p-6 bg-slate-50 flex items-center justify-between border-b border-border/40 cursor-pointer" onClick={() => step > 1 && setStep(1)}>
              <h2 className="text-xl font-extrabold text-[#1B4332] flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
                Contact & Delivery
              </h2>
              {step > 1 && <Button variant="ghost" size="sm" className="font-bold">Edit</Button>}
            </div>
            
            {step === 1 && (
              <div className="p-6 space-y-6">
                
                {/* Saved Addresses Section */}
                {savedAddresses.length > 0 && (
                  <div className="space-y-4 mb-8">
                    <h3 className="font-bold text-slate-700 text-sm">Select a Saved Address</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {savedAddresses.map(addr => (
                        <div 
                          key={addr.id} 
                          onClick={() => {
                            setSelectedAddressId(addr.id);
                            setUseNewAddress(false);
                            setValue('fullName', addr.fullName, { shouldValidate: true });
                            setValue('phone', addr.phone, { shouldValidate: true });
                            setValue('address1', addr.street, { shouldValidate: true });
                            setValue('city', addr.city, { shouldValidate: true });
                            setValue('state', addr.state, { shouldValidate: true });
                            setValue('pincode', addr.pincode, { shouldValidate: true });
                            if(session?.user?.email) setValue('email', session.user.email, { shouldValidate: true });
                          }}
                          className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                            selectedAddressId === addr.id && !useNewAddress
                              ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                              : 'border-gray-200 hover:border-primary/30 bg-white'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-0.5 rounded text-xs">
                              {addr.label}
                            </span>
                            {selectedAddressId === addr.id && !useNewAddress && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <p className="font-bold text-gray-800 text-sm">{addr.fullName}</p>
                          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{addr.street}, {addr.city}, {addr.state} {addr.pincode}</p>
                          <p className="text-gray-500 text-xs mt-1">{addr.phone}</p>
                        </div>
                      ))}
                      
                      <div 
                        onClick={() => {
                          setUseNewAddress(true);
                          setSelectedAddressId(null);
                        }}
                        className={`cursor-pointer p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all min-h-[120px] ${
                          useNewAddress
                            ? 'border-primary bg-primary/5 text-primary' 
                            : 'border-gray-300 hover:border-primary/50 text-gray-500 bg-gray-50'
                        }`}
                      >
                        <Plus className="w-6 h-6 mb-2" />
                        <span className="font-semibold text-sm">Add New Address</span>
                      </div>
                    </div>
                  </div>
                )}

                {(useNewAddress || savedAddresses.length === 0) && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Full Name *</label>
                        <Input {...register('fullName')} className="h-12 rounded-xl" placeholder="John Doe" />
                        {errors.fullName && <p className="text-red-500 text-xs font-bold">{errors.fullName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address *</label>
                        <Input type="email" {...register('email')} defaultValue={session?.user?.email || ''} className="h-12 rounded-xl" placeholder="john@example.com" />
                        {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Mobile Number *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">+91</span>
                        <Input {...register('phone')} className="h-12 rounded-xl pl-12" placeholder="9876543210" maxLength={10} />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Delivery Address *</label>
                      <Input {...register('address1')} className="h-12 rounded-xl mb-3" placeholder="House/Flat No., Building Name, Street" />
                      {errors.address1 && <p className="text-red-500 text-xs font-bold mb-3">{errors.address1.message}</p>}
                      <Input {...register('address2')} className="h-12 rounded-xl" placeholder="Locality / Landmark (Optional)" />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">PIN Code *</label>
                        <div className="relative">
                          <Input {...register('pincode')} className="h-12 rounded-xl" placeholder="400001" maxLength={6} />
                          {isVerifyingPin && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          )}
                        </div>
                        {errors.pincode && <p className="text-red-500 text-xs font-bold">{errors.pincode.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">City / District *</label>
                        <Input {...register('city')} className="h-12 rounded-xl bg-slate-50 cursor-not-allowed" placeholder="Auto-filled via PIN" readOnly />
                        {errors.city && <p className="text-red-500 text-xs font-bold">{errors.city.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">State *</label>
                        <Input {...register('state')} className="h-12 rounded-xl bg-slate-50 cursor-not-allowed" placeholder="Auto-filled via PIN" readOnly />
                        {errors.state && <p className="text-red-500 text-xs font-bold">{errors.state.message}</p>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4 text-sm font-bold text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                  <Truck className="w-5 h-5" /> Shipping across India only.
                </div>

                <Button onClick={handleNextStep} size="lg" className="w-full mt-6 h-14 rounded-xl text-lg font-bold">
                  Continue to Shipping
                </Button>
              </div>
            )}
          </div>

          {/* Step 2: Shipping Method */}
          <div className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${step === 2 ? 'border-primary/50 shadow-md ring-4 ring-primary/5' : 'border-border/50 opacity-70'}`}>
            <div className="p-6 bg-slate-50 flex items-center justify-between border-b border-border/40 cursor-pointer" onClick={() => step > 2 && setStep(2)}>
              <h2 className="text-xl font-extrabold text-[#1B4332] flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
                Shipping Method
              </h2>
              {step > 2 && <Button variant="ghost" size="sm" className="font-bold">Edit</Button>}
            </div>
            
            {step === 2 && (
              <div className="p-6 space-y-4">
                <div 
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-4 transition-all border-primary bg-primary/5`}
                >
                  <div className="mt-1">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center border-primary`}>
                      <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-lg text-foreground">Standard Delivery</h3>
                      <span className="font-extrabold text-primary">{currentSubtotal >= 500 ? 'Free' : '₹40'}</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">3 - 5 business days across India</p>
                    {currentSubtotal < 500 && (
                      <p className="text-[12px] text-amber-600 font-bold mt-2">Add ₹{(500 - currentSubtotal).toFixed(2)} more for FREE shipping!</p>
                    )}
                  </div>
                </div>

                <div 
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-4 transition-all mt-4 ${isGiftPackaging ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'}`}
                  onClick={() => setIsGiftPackaging(!isGiftPackaging)}
                >
                  <div className="mt-1">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border-2 ${isGiftPackaging ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                      {isGiftPackaging && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-lg text-foreground">Gift Packaging</h3>
                      <span className="font-extrabold text-foreground">₹50</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Add a beautiful ribbon and a personalized card.</p>
                  </div>
                </div>

                <Button onClick={handleNextStep} size="lg" className="w-full mt-6 h-14 rounded-xl text-lg font-bold">
                  Continue to Payment
                </Button>
              </div>
            )}
          </div>

          {/* Step 3: Payment */}
          <div className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${step === 3 ? 'border-primary/50 shadow-md ring-4 ring-primary/5' : 'border-border/50 opacity-70'}`}>
            <div className="p-6 bg-slate-50 flex items-center justify-between border-b border-border/40">
              <h2 className="text-xl font-extrabold text-[#1B4332] flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>3</span>
                Secure Payment
              </h2>
            </div>
            
            {step === 3 && (
              <div className="p-6 space-y-6 text-center">
                <div className="bg-[#F8FFF9] p-6 rounded-2xl border border-primary/20 flex flex-col items-center">
                  <CreditCard className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Pay securely with Razorpay</h3>
                  <p className="text-muted-foreground text-sm font-medium mb-6">UPI, Credit/Debit Cards, NetBanking, and Wallets accepted.</p>
                  
                  <Button 
                    onClick={handlePayment} 
                    disabled={isProcessing}
                    size="lg" 
                    className="w-full sm:w-auto px-10 h-14 rounded-xl text-lg font-extrabold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                  >
                    {isProcessing ? 'Processing securely...' : `Pay ₹${grandTotal.toFixed(2)} Now`}
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Secure Checkout
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-border/50 shadow-sm sticky top-24">
            <h2 className="text-2xl font-extrabold text-[#1B4332] mb-6">Order Summary</h2>
            
            {/* Miniature Item List */}
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={`${item.id}-${item.potColor || 'none'}`} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-secondary/50 rounded-xl overflow-hidden border border-border/50 shrink-0">
                    <img src={item.image || FALLBACK_PLANT_IMAGE} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-[#1B4332] line-clamp-1">{item.name}</h4>
                    {item.potColor && (
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.potColor} Pot</p>
                    )}
                    <div className="flex items-center gap-2 mt-1 bg-secondary/30 w-fit rounded-lg border border-border/50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.potColor, Math.max(1, item.quantity - 1))} 
                        className="px-2 py-0.5 text-xs font-bold text-muted-foreground hover:text-primary"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.potColor, item.quantity + 1)} 
                        className="px-2 py-0.5 text-xs font-bold text-muted-foreground hover:text-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="font-bold text-sm">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            
            {/* Coupon Code Section */}
            <div className="mb-6 flex gap-2">
              <Input 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code" 
                className="h-12 rounded-xl flex-1 bg-slate-50 uppercase"
              />
              <Button onClick={handleApplyCoupon} className="h-12 rounded-xl px-6 font-bold bg-slate-900 text-white hover:bg-slate-800">
                Apply
              </Button>
            </div>
            
            <div className="space-y-3 text-sm font-medium mb-6 border-t border-border/40 pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground font-bold">₹{currentSubtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground font-bold">{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
              </div>
              {isGiftPackaging && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Gift Packaging</span>
                  <span className="text-foreground font-bold">₹50</span>
                </div>
              )}
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-₹{appliedCoupon.discount.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="border-t border-border/40 pt-4 bg-[#F8FFF9] -mx-6 -mb-6 p-6 lg:p-8 rounded-b-3xl">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total to Pay</span>
                <span className="text-3xl font-extrabold text-primary">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

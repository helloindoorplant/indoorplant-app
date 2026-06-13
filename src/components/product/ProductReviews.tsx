'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { submitReview } from '@/app/actions/reviews';
import Link from 'next/link';

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  path: string;
}

export function ProductReviews({ productId, reviews, path }: ProductReviewsProps) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : 0;

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage('');
    
    // Add missing fields to formData
    formData.append('productId', productId);
    formData.append('rating', rating.toString());
    formData.append('path', path);

    const result = await submitReview(formData);
    
    setIsSubmitting(false);
    setMessage(result.message);
    
    if (result.success) {
      // Reset form on success
      const form = document.getElementById('review-form') as HTMLFormElement;
      if (form) form.reset();
      setRating(5);
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-border/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Reviews Summary & List */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-stone-900">Customer Reviews</h2>
            
            {reviews.length > 0 ? (
              <div className="flex items-center gap-4 mb-10 pb-10 border-b border-border/40">
                <div className="text-5xl font-extrabold text-stone-900">{averageRating}</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-5 w-5 ${star <= Number(averageRating) ? 'fill-current' : 'text-stone-300'}`} />
                    ))}
                  </div>
                  <p className="text-stone-500 font-medium">Based on {reviews.length} review{reviews.length !== 1 && 's'}</p>
                </div>
              </div>
            ) : (
              <p className="text-stone-500 font-medium mb-10">No reviews yet. Be the first to review this plant!</p>
            )}

            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-border/40 last:border-0 pb-8 last:pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {review.user.image ? (
                        <img src={review.user.image} alt={review.user.name || 'User'} className="w-10 h-10 rounded-full bg-stone-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {(review.user.name || 'A')[0]}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-[16px] text-stone-900 leading-none mb-1">{review.user.name || 'Anonymous User'}</div>
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`h-3 w-3 ${star <= review.rating ? 'fill-current' : 'text-stone-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-stone-400 text-sm font-medium">
                      {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-stone-600 leading-relaxed mt-3">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review Form */}
          <div className="lg:col-span-5">
            <div className="bg-stone-50 rounded-[32px] p-8 md:p-10 sticky top-32">
              <h3 className="text-2xl font-extrabold mb-6 text-stone-900">Write a Review</h3>
              
              {!session ? (
                <div className="text-center py-8">
                  <p className="text-stone-500 font-medium mb-6">You must be logged in to share your experience.</p>
                  <Button asChild size="lg" className="rounded-full w-full h-14 font-bold shadow-xl shadow-primary/20">
                    <Link href={`/account/login?callbackUrl=${encodeURIComponent(path)}`}>
                      Log in to Review
                    </Link>
                  </Button>
                </div>
              ) : (
                <form id="review-form" action={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-900 mb-2">Overall Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 transition-colors ${star <= rating ? 'text-yellow-400' : 'text-stone-300 hover:text-yellow-200'}`}
                      >
                        <Star className="h-8 w-8 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-bold text-stone-900 mb-2">Your Review</label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={5}
                    className="w-full rounded-2xl border-stone-200 bg-white px-4 py-3 text-stone-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Tell us what you think about this plant..."
                    required
                  ></textarea>
                </div>

                {message && (
                  <div className={`p-4 rounded-xl text-sm font-medium ${message.includes('success') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message}
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-full text-[16px] font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  userRating?: boolean;
}

interface ReviewStats {
  productId: string;
  productName: string;
  image: string;
  averageRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
}

const ReviewsPage = () => {
  const [reviewsData, setReviewsData] = useState<ReviewStats[]>([
    {
      productId: "1",
      productName: "Classic T-Shirt",
      image: "/lovable-uploads/default.jpg",
      averageRating: 4.5,
      totalReviews: 28,
      distribution: { 5: 18, 4: 7, 3: 2, 2: 1, 1: 0 },
      reviews: [
        {
          id: "r1",
          productId: "1",
          productName: "Classic T-Shirt",
          author: "Sarah Johnson",
          rating: 5,
          title: "Perfect fit and great quality!",
          content:
            "Bought this shirt and I'm extremely happy with it. The fabric is soft, comfortable, and true to size. The print quality is excellent and hasn't faded after several washes.",
          date: "2026-01-25",
          verified: true,
          helpful: 24,
          notHelpful: 1,
        },
        {
          id: "r2",
          productId: "1",
          productName: "Classic T-Shirt",
          author: "Mike Chen",
          rating: 4,
          title: "Great value for money",
          content:
            "Excellent t-shirt at this price point. The only reason I'm not giving it 5 stars is that the collar could be slightly wider, but overall very satisfied.",
          date: "2026-01-20",
          verified: true,
          helpful: 15,
          notHelpful: 0,
        },
      ],
    },
    {
      productId: "2",
      productName: "Premium Polo",
      image: "/lovable-uploads/default.jpg",
      averageRating: 4.8,
      totalReviews: 42,
      distribution: { 5: 38, 4: 3, 3: 1, 2: 0, 1: 0 },
      reviews: [
        {
          id: "r3",
          productId: "2",
          productName: "Premium Polo",
          author: "Emma Williams",
          rating: 5,
          title: "Worth every penny!",
          content:
            "This polo is absolutely fantastic. Premium quality, elegant design, and it holds up beautifully after multiple washes. Highly recommended for anyone looking for a high-quality polo shirt.",
          date: "2026-01-22",
          verified: true,
          helpful: 32,
          notHelpful: 0,
        },
      ],
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(0);
  const [sortBy, setSortBy] = useState<"helpful" | "recent" | "rating">(
    "helpful"
  );
  const [newReview, setNewReview] = useState({
    title: "",
    content: "",
    rating: 5,
  });

  const currentProduct = reviewsData[selectedProduct];
  const sortedReviews = [...currentProduct.reviews].sort((a, b) => {
    if (sortBy === "helpful") {
      return b.helpful - a.helpful;
    } else if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.rating - a.rating;
    }
  });

  const handleAddReview = () => {
    if (!newReview.title || !newReview.content) {
      toast.error("Please fill in all fields");
      return;
    }

    const review: Review = {
      id: `r${currentProduct.reviews.length + 1}`,
      productId: currentProduct.productId,
      productName: currentProduct.productName,
      author: "Current User",
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      date: new Date().toISOString().split("T")[0],
      verified: true,
      helpful: 0,
      notHelpful: 0,
    };

    setReviewsData(
      reviewsData.map((product) =>
        product.productId === currentProduct.productId
          ? {
              ...product,
              reviews: [...product.reviews, review],
              totalReviews: product.totalReviews + 1,
              averageRating:
                (product.averageRating * product.totalReviews +
                  newReview.rating) /
                (product.totalReviews + 1),
            }
          : product
      )
    );

    setNewReview({ title: "", content: "", rating: 5 });
    toast.success("Review posted successfully!");
  };

  const handleHelpful = (reviewId: string) => {
    setReviewsData(
      reviewsData.map((product) =>
        product.productId === currentProduct.productId
          ? {
              ...product,
              reviews: product.reviews.map((review) =>
                review.id === reviewId
                  ? {
                      ...review,
                      helpful: review.helpful + 1,
                      userRating:
                        review.userRating === true ? undefined : true,
                    }
                  : review
              ),
            }
          : product
      )
    );
  };

  const handleNotHelpful = (reviewId: string) => {
    setReviewsData(
      reviewsData.map((product) =>
        product.productId === currentProduct.productId
          ? {
              ...product,
              reviews: product.reviews.map((review) =>
                review.id === reviewId
                  ? {
                      ...review,
                      notHelpful: review.notHelpful + 1,
                      userRating:
                        review.userRating === false ? undefined : false,
                    }
                  : review
              ),
            }
          : product
      )
    );
  };

  const renderStars = (rating: number, interactive = false, onChange?: (r: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onChange?.(star)}
            disabled={!interactive}
            className={interactive ? "cursor-pointer" : "cursor-default"}
          >
            <Star
              size={interactive ? 24 : 20}
              className={
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Customer Reviews & Ratings
          </h1>
          <p className="text-gray-600">
            Read what customers think about our products
          </p>
        </div>

        {/* Product Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Product</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reviewsData.map((product, idx) => (
              <button
                key={product.productId}
                onClick={() => setSelectedProduct(idx)}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedProduct === idx
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p className="font-semibold text-sm">{product.productName}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.averageRating}</span>
                  <span className="text-xs text-gray-500">
                    ({product.totalReviews})
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Rating Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rating Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Rating */}
                <div className="text-center pb-6 border-b">
                  <div className="text-4xl font-bold mb-2">
                    {currentProduct.averageRating}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.round(currentProduct.averageRating))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on {currentProduct.totalReviews} reviews
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count =
                      currentProduct.distribution[
                      stars as keyof typeof currentProduct.distribution
                      ];
                    const percentage = (
                      (count / currentProduct.totalReviews) *
                      100
                    ).toFixed(0);
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-sm font-medium w-8">{stars}⭐</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-8">
                          {percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Add Review Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Write a Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Write Your Review</DialogTitle>
                      <DialogDescription>
                        Share your experience with {currentProduct.productName}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Rating</label>
                        <div className="mt-2">
                          {renderStars(newReview.rating, true, (r) =>
                            setNewReview({ ...newReview, rating: r })
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Review Title</label>
                        <Input
                          placeholder="Give your review a title"
                          value={newReview.title}
                          onChange={(e) =>
                            setNewReview({ ...newReview, title: e.target.value })
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Your Review</label>
                        <Textarea
                          placeholder="Share your thoughts about this product..."
                          value={newReview.content}
                          onChange={(e) =>
                            setNewReview({ ...newReview, content: e.target.value })
                          }
                          rows={5}
                          className="mt-1"
                        />
                      </div>
                      <Button
                        onClick={handleAddReview}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Submit Review
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Reviews List */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>All Reviews</CardTitle>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "helpful" | "recent" | "rating")
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="helpful">Most Helpful</option>
                    <option value="recent">Most Recent</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                {sortedReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No reviews yet. Be the first to review!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {sortedReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b pb-6 last:border-b-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{review.author}</h4>
                              {review.verified && (
                                <Badge className="bg-green-100 text-green-800">
                                  Verified Buyer
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-600">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="font-semibold mb-2">{review.title}</h5>
                        <p className="text-gray-700 mb-4">{review.content}</p>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleHelpful(review.id)}
                            className={`flex items-center gap-1 text-sm ${
                              review.userRating === true
                                ? "text-green-600"
                                : "text-gray-600 hover:text-green-600"
                            }`}
                          >
                            <ThumbsUp size={16} />
                            Helpful ({review.helpful})
                          </button>
                          <button
                            onClick={() => handleNotHelpful(review.id)}
                            className={`flex items-center gap-1 text-sm ${
                              review.userRating === false
                                ? "text-red-600"
                                : "text-gray-600 hover:text-red-600"
                            }`}
                          >
                            <ThumbsDown size={16} />
                            Not Helpful ({review.notHelpful})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewsPage;

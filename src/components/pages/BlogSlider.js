import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const blogPosts = [
    {
        title: "How to Invest in Stocks",
        image: "/blogs/blog1.jpg",
        summary: "A beginner’s guide to investing wisely.",
        url: "/blog/how-to-invest-in-stocks",
    },
    {
        title: "SIP vs SWP",
        image: "/blogs/blog2.jpg",
        summary: "Understand the difference between SIP and SWP.",
        url: "/blog/sip-vs-swp",
    },
    {
        title: "What is a Stock Average?",
        image: "/blogs/blog3.jpg",
        summary: "Learn how to calculate stock averages effectively.",
        url: "/blog/stock-average",
    },
    {
        title: "Mutual Funds Basics",
        image: "/blogs/blog4.jpg",
        summary: "Everything you need to know about mutual funds.",
        url: "/blog/mutual-funds",
    },
    {
        title: "Top Investment Apps",
        image: "/blogs/blog5.jpg",
        summary: "Best apps to track and manage your investments.",
        url: "/blog/top-investment-apps",
    },
];

const BlogSlider = () => {
    return (
        <div className="my-5 px-3">
            <h4 className="mb-3 text-center">Latest Blogs</h4>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                }}
            >
                {blogPosts.map((blog, index) => (
                    <SwiperSlide key={index}>
                        <div className="card h-100 shadow-sm" style={{ borderRadius: "12px" }}>
                            <img
                                src={blog.image}
                                className="card-img-top"
                                alt={blog.title}
                                style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">{blog.summary}</p>
                                <a href={blog.url} className="btn btn-primary btn-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    )
}

export default BlogSlider
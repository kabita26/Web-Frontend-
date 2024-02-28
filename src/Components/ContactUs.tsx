import React from 'react';
import '../css/ContactUs.css';

const ContactUs: React.FC = () => {
    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <p>
                AboutUs: Our skin care e-commerce project is designed with your trust in mind.
                We prioritize quality, authenticity, and transparency in every product we offer.
                With a commitment to sourcing from reputable brands and ensuring product efficacy through rigorous testing,
                we aim to deliver skincare solutions
                that inspire confidence. Our platform provides detailed product information, customer reviews, and a seamless
                shopping experience to empower you to make informed choices tailored to your unique skin needs. Trust us to be your reliable partner in
                achieving healthy, radiant skin that you can feel good about.
            </p>
            <div className="contact-info">
                <p>Email: SkinCare@gmail.com</p>
                <p>Mobile No: 980000000</p>
                <p>Location: Currently we are only available online.</p>
            </div>
            <p className="thank-you">Thank you for reaching out to us. We will get back to you shortly.</p>
        </div>
    );
};

export default ContactUs;

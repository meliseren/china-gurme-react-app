import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    return (
        <div className='contact'>
            <div style={{ width: '100%', height: '400px' }}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.952039789583!2d-122.42067908468199!3d37.77993297975713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807f2b9039b9%3A0x8b1c5c0d5e33f5b0!2sAT%26T%20Park!5e0!3m2!1sen!2sus!4v1630622997491!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps"
                ></iframe>
            </div>
            <div className="contact-container">
                <div className="contact-info">
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
                        <div className="text">
                            <p className="contact-text-title">Adres</p>
                            <p className="contact-text">Bağdat Cad. Caddebostan Mah.</p>
                            <p className="contact-text">No: 258G Kadıköy/İstanbul</p>
                        </div>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faPhone} className="contact-icon" />
                        <div className="text">
                            <p className="contact-text-title">Telefon</p>
                            <p className="contact-text">+90 123 456 78 90</p>
                        </div>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                        <div className="text">
                            <p className="contact-text-title">E-posta</p>
                            <p className="contact-text">info@chinagurme.com</p>
                        </div>
                    </div>
                </div>
                <div className="contact-form">
                    <form>
                        <div className="name-phone">
                            <div className='name'>
                                <label htmlFor="name">İsim</label>
                                <input
                                    type="text"
                                    id="isim"
                                    name="isim"
                                    required
                                />
                            </div>
                            <div className='phone'>
                                <label htmlFor="phone">Telefon</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="telefon"
                                    required
                                />
                            </div>
                        </div>
                        <div className='eposta'>
                            <label htmlFor="email">E-posta</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                            />
                        </div>
                        <div className='subject'>
                            <label htmlFor="konu">Konu</label>
                            <input
                                type="text"
                                id="subject"
                                name="konu"
                                required
                            />
                        </div>
                        <div className='message'>
                            <label htmlFor="mesaj">Mesaj</label>
                            <textarea
                                id="message"
                                name="mesaj"
                                required
                            />
                        </div>
                        <div className="submit">
                            <button type="submit">Gönder</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
